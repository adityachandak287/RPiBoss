from time import localtime, strftime
import random


def getData():
    devices = []
    logs = []
    ct = strftime("%H:%M:%S", localtime())
    data = {"devices": [{"ip": "10.10.10.10",
                         "time": ct,
                         "status": "active"}],
            "logs": [{"ip": "10.10.10.10",
                      "message": "Device Connected"}]}

    for i in range(10):
        ip = [str(random.randint(10, 99))]*4
        ip = ".".join(ip)
        status = random.choice(["active", "failed"])

        devices.append({
            "ip": ip,
            "time": ct,
            "status": status
        })
        if random.randint(1, 10) < 4:
            logs.append({
                "ip": ip,
                "message": "Device Failed"
            })
    return {
        "devices": devices,
        "logs": logs
    }


print(getData())
