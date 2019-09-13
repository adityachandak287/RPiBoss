import socket
import threading
#import random
import time
#import sys
import ssl
import subprocess
import shlex
from datetime import datetime
import socketio

flaskServer = 'http://localhost:8080'
# Socket.io client
sio = socketio.Client()


# path to PEM files
server_cert = 'servercertchainf.crt'
#server_key = 'server.key'
client_certs = 'certchainf.crt'

hostname = socket.gethostname()
hostinfo = socket.gethostbyname_ex(hostname)
hostipv4 = '172.16.209.89'
port = 8989

'''
context = ssl.create_default_context(ssl.Purpose.CLIENT_AUTH)
context.verify_mode = ssl.CERT_REQUIRED
context.load_cert_chain(certfile=server_cert)
context.load_verify_locations(cafile=client_certs)
'''
context = ssl.SSLContext(protocol=ssl.PROTOCOL_TLSv1_2)
context.verify_mode = ssl.CERT_REQUIRED
context.load_cert_chain(certfile=server_cert)
context.load_verify_locations(cafile=client_certs)
cipher = 'TLS_ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384'
context.set_ciphers(cipher)

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s = context.wrap_socket(s, server_hostname=hostipv4)


all_client_newsockfd = []
all_client_ip = []
all_clients = {}
logs = []
faults = []
r1 = []


@sio.event
def connect():
    print("Connected to Flask Server!")
    sendDevices()
    sendLogs()


@sio.event
def disconnect():
    print("Disconnected from Flask Server!")


def sendDevices():
    deviceData = []
    for key, value in all_clients.items():
        deviceData.append({
            "ip": key,
            "timestamp": value["timestamp"],
            "status": value["status"]
        })
    sio.emit("rpmsDevices", deviceData)


def sendLogs():
    sio.emit("rpmsLogs", logs)


def CreateSocket():
    global all_client_ip
    global all_client_newsockfd
   # global all_client
    global faults
    global r1
    try:
        s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        # the SO_REUSEADDR flag tells the kernel to reuse a local
        # socket in TIME_WAIT state, without waiting for its natural timeout to expire.
        s.bind((hostipv4, port))
        print("[ OK ] Socket Bind Successfull")
        # LISTEN
        while True:
            try:
                s.listen()
                print("[ OK ] Listening...")
                # ACCEPT
                try:
                    conn, addr = s.accept()
                    conn = context.wrap_socket(conn, server_side=True)
                    all_clients[addr[0]] = {
                        "timestamp": datetime.timestamp(datetime.now()),
                        "status": "active"
                    }
                    sendDevices()
                    if addr[0] in faults:
                        faults.remove(addr[0])
                        logs.append({
                            "ip": str(addr[0]),
                            "timestamp": datetime.timestamp(datetime.now())
                            "message": "Reconnected To : "+str(addr[0])
                        })
                        print("[ OK ] Reconnected To : "+str(addr[0]))
                    else:
                        logs.append({
                            "ip": str(addr[0]),
                            "timestamp": datetime.timestamp(datetime.now())
                            "message": "News Connection Accepted from "+str(addr[0])
                        })
                        print("[ OK ] News Connection Accepted from "+str(addr[0]))
                    sendLogs()
                    # all_client.append(addr[0])
                    all_client_newsockfd.append(conn)
                    all_client_ip.append(addr[0])
                except ssl.SSLCertVerificationError as errmssg:
                    print("[ FAILED ] Failed To Accept Connection"+str(errmssg))
            except socket.error as errmssg:
                print("[ FAILED ] Failed to Listen"+str(errmssg))
    except socket.error as errmsg:
        print("[ FAILED ] Socket Bind Failed : "+str(errmsg))


def ifActive():
    global all_client_ip
    global all_client_newsockfd
  #  global all_client
    global faults
    global r1
    while True:
        rf = 0
        if(len(all_client_newsockfd) > 0):
            for j, c in enumerate(all_client_newsockfd):
                try:
                    c.send(str.encode("testsig"))

                except:
                    faults.append(all_client_ip[j])
                    all_clients[all_client_ip[j]] = {
                        "timestamp": datetime.timestamp(datetime.now()),
                        "status": "disconnected"
                    }
                    sendDevices()

                    print("[ FAILED ] Connection Lost to : " +
                          str(all_client_ip[j]))
                    # all_client_ip.remove(all_client_ip[j])
                    # all_client_newsockfd.remove(all_client_newsockfd[j])
                    # break
                    r1.append(j)
            if(len(r1) > 0):
                for r in r1:
                    all_client_ip.remove(all_client_ip[r])
                    all_client_newsockfd.remove(all_client_newsockfd[r])
                    # print(all_client_newsockfd)
                    r1 = []

        time.sleep(1)


def MyCmds():
    global cmds
    global faults
    while True:
        cmds = input("RPMS> ")
        if(cmds == "ConnIpList"):
            for j1, ip1 in enumerate(all_client_ip):
                print(str(j1)+"   "+str(ip1))

        if(cmds == "FaultIp"):
            print(str(faults))
        if(cmds == "delConn"):
            if(len(all_client_newsockfd) > 0):
                for j1, ip1 in enumerate(all_client_ip):
                    print(str(j1)+"   "+str(ip1))

                cmds = int(input("delConn>"))
                all_client_newsockfd[cmds].shutdown(socket.SHUT_RDWR)
                all_client_newsockfd[cmds].close()
            else:
                print("No Active Connections...")
        if(cmds == "SendCmdsTo"):
            if(len(all_client_newsockfd) > 0):
                for j1, ip1 in enumerate(all_client_ip):
                    print(str(j1)+"   "+str(ip1))
                SendCmdsTo = int(input("SendCmdsTo>"))
                if SendCmdsTo in range(0, j1+1):
                    while True:
                        cmds = input("cmd?>")
                        if(cmds != "disconnect"):
                            all_client_newsockfd[SendCmdsTo].send(
                                str.encode(cmds))
                        else:
                            break
                else:
                    print("Conn No. Not In Range")
        if(cmds == "quit"):
            quitcmd = shlex.split(
                "PID=`ps ax | grep ./pyserver| awk '{print $1}'`")
            out = subprocess.Popen(
                quitcmd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
            stdout, stderr = out.communicate()
            print(stdout)


def RecvData():
    while True:
        if(len(all_client_newsockfd) > 0):
            for rj, rc in enumerate(all_client_newsockfd):
                try:
                    ServerData = rc.recv(1024)
                    ServerData = ServerData.decode("utf-8")
                    if(len(ServerData) > 0):
                        print("Data From " +
                              all_client_ip[rj]+" :   "+ServerData)
                        ServerData = ""
                except socket.timeout:
                    print("inactive Client : "+all_client_ip[rj])


if __name__ == "__main__":
    t1 = threading.Thread(target=CreateSocket)
    # Thread not required if sensor data is available
    t2 = threading.Thread(target=ifActive)
    t3 = threading.Thread(target=MyCmds)
    t4 = threading.Thread(target=RecvData)
    t1.start()
    t2.start()
    t3.start()
    t4.start()
    sio.connect(flaskServer)
    t1.join()
    t2.join()
    t3.join()
    t4.join()
