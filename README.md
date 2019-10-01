# Edge Computing using RaspberryPi Management System

![python](https://img.shields.io/badge/python-3.5-blue) ![Node](https://img.shields.io/badge/node-11.8-green)

This project was a part of our IBM Make-A-Thon competition.

## How does it work ?

![dfd](https://raw.githubusercontent.com/adityachandak287/Make-A-Thon/master/Data%20Flow%20Triggers.jpg?token=AH6I55B76AXAB7FLVCVOCOC5Q6BFC)

## RPMS

### Installation

```python
pip install -r RPMS/requirements.txt
```

### Run Flask Server

```python
python flaskserver.py
```

### Socket.io Triggers

#### Get data from server

Trigger `getDevices` emits `updateDevices` with device list.

Trigger `getLogs` emits `updateLogs` with logs list.

Trigger `rpmsOutput` emits `cmdOutput` with output of executed command.

#### Trigger event on server

Trigger `rpmsDevices` broadcasts `updateDevices`.

Trigger `rpmsLogs` broadcasts `updateLogs`.

Trigger `reading` emits `newReading` with new reading data from client.

Trigger `execCmd` emits `rpmsCmd` which triggers RPMS to execute command on client.

## PORTAL

### Installation

```javascript
cd PORTAL/
npm install
```

### Running

```javascript
npm run start
```

### Contributors
- [Aditya Chandak](https://github.com/adityachandak287)
- [Allandhir Megharaj](https://github.com/allandhir)
- [Yash Mehrotra](https://github.com/YashMeh)
