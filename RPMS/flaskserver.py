from flask import Flask, render_template
from flask_socketio import SocketIO, send, emit
import random
from time import sleep, localtime, strftime
from generateData import getData
from flask_cors import CORS, cross_origin


app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")


@app.route('/')
def do_get():
    return render_template('./testClient.html')


@socketio.on('newConnection')
def handle_message(message):
    print(message)
    print("New Connection")
    ct = strftime("%H:%M:%S", localtime())
    # data = {"devices": [{"ip": "10.10.10.10",
    #                      "time": ct,
    #                      "status": "active"}],
    #         "logs": [{"ip": "10.10.10.10",
    #                   "message": "Device healthy"}]}
    # sleep(1)
    emit('gotData', getData())  # , broadcast=True)


'''
TODO:
@socketio.on('getDevices')
def sendDevices(message):

@socketio.on('getLogs')
def sendLogs(message):
'''


if __name__ == '__main__':
    socketio.run(app, host='192.168.43.66', port=8080, debug=True)
