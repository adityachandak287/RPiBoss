# IBM Make-A-Thon

## Installation

```cmd
pip install -r RPMS/requirements.txt
```

## Run Flask Server

```cmd
python flaskserver.py
```

## Socket.io Triggers

#### Get data from server

Trigger `getDevices` emits `updateDevices` with device list.

Trigger `getLogs` emits `updateLogs` with logs list.

Trigger `rpmsOutput` emits `cmdOutput` with output of executed command.

#### Trigger event on server

Trigger `rpmsDevices` broadcasts `updateDevices`.

Trigger `rpmsLogs` broadcasts `updateLogs`.

Trigger `reading` emits `newReading` with new reading data from client.

Trigger `execCmd` emits `rpmsCmd` which triggers RPMS to execute command on client.
