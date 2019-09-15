from flask import Flask, render_template
from flask_socketio import SocketIO, send, emit
import random
from time import sleep, localtime, strftime
# from generateData import g
from flask_cors import CORS, cross_origin
import threading
import socket
# from flaskserver import startSocketServer
import socketio
import json

# standard Python

sio = socketio.Client()


@sio.event
def connect():
    sio.emit("getDevices", "test")
    sio.emit("getLogs", "test")


@sio.event
def disconnect():
    print("I'm disconnected!")


@sio.on("updateDevices")
def gotDevices(deviceData):
    print("Got Devices")
    print(deviceData)


@sio.on("updateLogs")
def gotLogs(logData):
    print("Got Logs")
    print(logData)


hostname = socket.gethostname()
hostinfo = socket.gethostbyname_ex(hostname)
hostipv4 = '172.16.209.89'
port = 8989

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)


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
                    #conn = context.wrap_socket(conn, server_side=True)
                    if addr[0] in faults:
                        faults.remove(addr[0])
                        print("[ OK ] Reconnected To : "+str(addr[0]))
                    else:
                        print("[ OK ] New Connection Accepted from "+str(addr[0]))
                       # all_client.append(addr[0])
                    all_client_newsockfd.append(conn)
                    all_client_ip.append(addr[0])
                except ssl.SSLCertVerificationError as errmssg:
                    print("[ FAILED ] Failed To Accept Connection"+str(errmssg))
            except socket.error as errmssg:
                print("[ FAILED ] Failed to Listen"+str(errmssg))
    except socket.error as errmsg:
        print("[ FAILED ] Socket Bind Failed : "+str(errmsg))


if __name__ == "__main__":
    # startSocketServer()
    t1 = threading.Thread(target=CreateSocket)
    # Thread not required if sensor data is available
    # t2 = threading.Thread(target=startSocketServer)
    t1.start()
    sio.connect('http://localhost:8080')
    # t2.start()
    t1.join()
    # t2.join()
