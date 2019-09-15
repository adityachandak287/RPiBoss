import os
import socket
import subprocess
import shlex
import time
import ssl
import random
import json
import threading
import pickle
import datetime
# Available on Raspberry Pi
import Adafruit_DHT

clientname = socket.gethostname()
clientipv4 = socket.gethostbyname(clientname)

host = '192.168.43.66'
port = 8989

server_sni_hostname = 'RPMS'
server_cert = 'server.crt'
client_cert = 'rpiclientcertchainf.crt'
#client_key = 'client.key'


sensor_args = {'11': Adafruit_DHT.DHT11,
               '22': Adafruit_DHT.DHT22,
               '2302': Adafruit_DHT.AM2302}

context = ssl.SSLContext(protocol=ssl.PROTOCOL_TLSv1_2,
                         purpose=ssl.Purpose.SERVER_AUTH, cafile=server_cert)
#context = ssl.create_default_context(ssl.Purpose.SERVER_AUTH, cafile=server_cert)
context.load_cert_chain(certfile=client_cert)
cipher = 'TLS_ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384'
context.set_ciphers(cipher)
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s = context.wrap_socket(s, server_side=False,
                        server_hostname=server_sni_hostname)

model = None
with open("model", "rb") as infile:
    model = pickle.load(infile)


def ConnectToHost():
    global s
    # while True:
    try:
        s.connect((host, port))
        s = context.wrap_socket(s, server_side=False,
                                server_hostname=server_sni_hostname)
        print("[ OK ] Connected to host : ", str(host))
        # Clientdata=input()
        # s.send(str.encode(Clientdata))
        while True:
            # time.sleep(5)
            try:
                #s.send(str.encode("HEY MOTHERFUCKER"))
                cmd = s.recv(1024)  # decode before use
                cmd = cmd.decode("utf-8")
                if(cmd != "testsig"):
                    cmd = shlex.split(cmd)
                    out = subprocess.Popen(
                        cmd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
                    stdout, stderr = out.communicate()
                    # print(type(stdout))
                    stdoutJSON = json.dumps({"stdout": stdout.decode("utf-8")})
                    # print(len(stdoutJSON))
                    sendLen = str(len(stdoutJSON)).rjust(4)
                    s.send(str.encode(sendLen+stdoutJSON))
                    # s.send(stdout)
            except socket.error as errmssg:
                stdoutJSON = json.dumps({"stdout": str(errmssg)})
                # print(len(stdoutJSON))
                sendLen = str(len(stdoutJSON)).rjust(4)
                s.send(str.encode(sendLen+stdoutJSON))
                print("[ FAILED ] " + str(errmssg))
    except KeyboardInterrupt:
        print("BYE----------")
        s.shutdown()
        s.close()
    except socket.error as errmssg:
        print("[ FAILED ] Failed To connect To Host : "+str(errmssg))


def getTimeStamp():
    return time.strftime("%H:%M:%S", time.localtime())


def GetReading():
    sensor = sensor_args['11']
    pin = '17'
    humidity, temperature = Adafruit_DHT.read_retry(sensor, pin)
    return [humidity, temperature]


def getMonth():
    index = int(time.strftime("%m", time.localtime()))
    return index


def getDay():
    return datetime.datetime.today().weekday() + 1


def SendReading():
    while True:
        hum, temp = GetReading()
        print("{}%\t{}*".format(hum, temp))
        month = "jan feb mar apr may jun jul aug sep oct nov dec".split(" ")[
            getMonth()-1]
        day = "mon tue wed thu fri sat sun".split(" ")[getDay()-1]
        xcoord = random.randint(1, 10)
        ycoord = random.randint(1, 10)
        FFMC = random.random()*random.randint(1, 100)
        DMC = random.random()*random.randint(1, 100)
        DC = random.random()*random.randint(1, 100)
        ISI = random.random()*random.randint(1, 100)
        wind = random.random()*random.randint(1, 50)
        rain = random.random()
        x_test = [xcoord, ycoord, getMonth(), getDay(), FFMC, DMC, DC,
                  ISI,  temp, hum, wind, rain]
        # print(x_test)
        y_pred_test = model.predict([x_test])
        print("Prediction = {}".format(int(y_pred_test[0])))
        print("*"*20)
        reading = {
            "data": {
                "ip": clientname,
                "month": month,
                "day": day,
                "FFMC": FFMC,
                "DMC": DMC,
                "DC": DC,
                "ISI": ISI,
                "temp": temp,
                "RH": hum,
                "wind": wind,
                "rain": rain,
                "prediction": int(y_pred_test[0]),
                "timestamp": getTimeStamp()
            }
        }

        readingJSON = json.dumps(reading)
        # print(len(readingJSON))
        sendLen = str(len(readingJSON)).rjust(4)
        s.send(str.encode(sendLen+readingJSON))
        time.sleep(5)


def checkExit():
    while True:
        try:
            cmd = input()
            if cmd == "q":
                s.shutdown(socket.SHUT_RDWR)
                s.close()
                exit()
        except Exception as e:
            print(e)


if __name__ == "__main__":
    try:
        tc1 = threading.Thread(target=ConnectToHost)
        tc2 = threading.Thread(target=SendReading)
        tc3 = threading.Thread(target=checkExit)
        tc1.start()
        time.sleep(2)
        tc2.start()
        tc3.start()
        tc1.join()
        tc2.join()
        tc3.join()
    except (KeyboardInterrupt, SystemExit):
        print("BYE----------")
        s.shutdown(socket.SHUT_RDWR)
        s.close()
        exit()
    except Exception as e:
        print(e)
