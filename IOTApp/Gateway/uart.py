import serial.tools.list_ports
import extern

def getPort():
    ports = serial.tools.list_ports.comports()
    N = len(ports)
    commPort = "None"
    for i in range(0, N):
        port = ports[i]
        strPort = str(port)
        #print(strPort)
        if "USB-SERIAL" in strPort:
            splitPort = strPort.split(" ")
            commPort = (splitPort[0])
    return "COM6"

try: 
    ser = serial.Serial( port=getPort(), baudrate=115200)
    print("Serial: ",ser)
    
except:
    print("Can not get port")

def processData(data):
    data = data.replace("!", "")
    data = data.replace("#", "")
    splitData = data.split(":")
    #print(splitData)
    try:
        if splitData[1] == "TEMP":
            extern.temp = splitData[2]
        elif splitData[1] == "HUMI":
            extern.humi = splitData[2]
        elif splitData[1] == "LIGHT":
            extern.light = splitData[2]
    except:
        pass

mess = ""
def readSerial():
    if getPort() == "None":
        return

    bytesToRead = ser.inWaiting()
    if (bytesToRead > 0):
        global mess
        mess = mess + ser.read(bytesToRead).decode("UTF-8")
        #if mess: print(mess)
        while ("#" in mess) and ("!" in mess):
            start = mess.find("!")
            end = mess.find("#")
            processData(mess[start:end + 1])
            if (end == len(mess)):
                mess = ""
            else:
                mess = mess[end+1:]

def writeSerial(commandToSend):
    commandToSend
    ser.write(str(commandToSend).encode())