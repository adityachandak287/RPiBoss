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


def generateReading():
    reading = {}
    month = random.choice(
        "jan feb mar apr may jun jul aug sep oct nov dec".split(" "))
    day = random.choice(
        "mon tue wed thu fri sat sun".split(" "))
    FFMC = random.random()*random.randint(1, 100)
    DMC = random.random()*random.randint(1, 100)
    DC = random.random()*random.randint(1, 100)
    ISI = random.random()*random.randint(1, 100)
    temp = random.random()*random.randint(1, 50)
    RH = random.randint(1, 100)
    wind = random.random()*random.randint(1, 50)
    rain = random.random()
    prediction = random.random()*random.randint(1, 100)
    confidence = random.random()*100

    return {
        "data": {
            "month": month,
            "day": day,
            "FFMC": FFMC,
            "DC": DC,
            "ISI": ISI,
            "temp": temp,
            "RH": RH,
            "wind": wind,
            "prediction": prediction,
            "confidence": confidence,
            "timestamp": datetime.timestamp(datetime.now())
        }
    }


# print(getData())
