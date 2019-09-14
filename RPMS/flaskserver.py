from flask import Flask, render_template
from flask_socketio import SocketIO, send, emit
import random
from time import sleep, localtime, strftime
from generateData import generateDevices, generateLogs
from flask_cors import CORS, cross_origin
import threading

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")

devices = []
logs = []


@app.route('/')
def do_get():
    return render_template('./testClient.html')


@socketio.on('rpmsDevices')
def devicesFromRpms(rpmsDevices):
    devices = rpmsDevices
    emit('updateDevices', devices, broadcast=True)


@socketio.on('rpmsLogs')
def logsFromRpms(rpmsLogs):
    logs = rpmsLogs
    emit('updateLogs', logs, broadcast=True)


@socketio.on('getDevices')
def sendDevices(message):
    # devices = generateDevices()
    emit('updateDevices', devices)


@socketio.on('getLogs')
def sendLogs(message):
    # logs = generateLogs()
    emit('updateLogs', logs)


@socketio.on('reading')
def readingFromClient(reading):
    emit('newReading', reading)


@socketio.on('execCmd')
def execCommand(cmd):
    emit('rpmsCmd', cmd, broadcast=True)


@socketio.on('cmdOutput')
def commandOutputp(cmdOp):
    emit('rpmsOutput', cmdOp, broadcast=True)


def startSocketServer():
    socketio.run(app, host='localhost', port=8080, debug=True)


if __name__ == '__main__':
    devices = generateDevices()
    logs = generateLogs()
    startSocketServer()
