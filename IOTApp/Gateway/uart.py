import serial.tools.list_ports

def getPort():
    ports = serial.tools.list_ports.comports()
    N = len(ports)
    commPort = "None"
    for i in range(0, N):
        port = ports[i]
        strPort = str(port)
        #print(strPort)
        if "com0com" in strPort:
            splitPort = strPort.split(" ")
            commPort = (splitPort[0])
    return commPort

try: 
    ser = serial.Serial( port=getPort(), baudrate=115200)
    print("Serial: ",ser)
except:
    print("Can not get port")

def processData(client, data):
    data = data.replace("!", "")
    data = data.replace("#", "")
    splitData = data.split(":")
    print(splitData)
    try:
        if splitData[1] == "TEMP":
            client.publish("Temp_Sensor", splitData[2])
        elif splitData[1] == "HUMI":
            client.publish("Humi_Sensor", splitData[2])
        elif splitData[1] == "LIGHT":
            client.publish("Light_Sensor", splitData[2])
    except:
        pass

mess = ""
def readSerial(client):
    if getPort() == "None":
        return

    bytesToRead = ser.inWaiting()
    if (bytesToRead > 0):
        global mess
        mess = mess + ser.read(bytesToRead).decode("UTF-8")
        while ("#" in mess) and ("!" in mess):
            start = mess.find("!")
            end = mess.find("#")
            processData(client, mess[start:end + 1])
            if (end == len(mess)):
                mess = ""
            else:
                mess = mess[end+1:]