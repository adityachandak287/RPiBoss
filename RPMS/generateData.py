from time import localtime, strftime
import random
from datetime import datetime


def generateDevices():
    devices = []
    for i in range(10):
        ip = [str(random.randint(10, 99))]*4
        ip = ".".join(ip)
        status = random.choice(["active", "failed"])

        devices.append({
            "ip": ip,
            "timestamp": datetime.timestamp(datetime.now()),
            "status": status
        })
    return {"devices": devices}


def generateLogs():
    logs = []
    ct = strftime("%H:%M:%S", localtime())
    for i in range(10):
        ip = [str(random.randint(10, 99))]*4
        ip = ".".join(ip)
        status = random.choice(["active", "failed"])
        if random.randint(1, 10) < 4:
            logs.append({
                "ip": ip,
                "timestamp": datetime.timestamp(datetime.now()),
                "message": "Status change " + str(random.randint(10, 99))

            })
    return {"logs": logs}

# print(getData())
