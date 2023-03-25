import  time
import  sys
from    Adafruit_IO         import MQTTClient
from    uart                import *
from    protocol            import *
from    software_timer      import *
from    button_processing   import *

AIO_FEED_IDs    = ["button1", "button2", "Temp_Sensor", "Light_Sensor", "Humi_Sensor", "ack"]
AIO_USERNAME    = "triethoang"
AIO_KEY         = "aio_chNI54RK6vvna3Rdr3IM52LcnMdF"
BUTTON_IDs      = ["button1", "button2"]

#Sensor ID
TEMP_SENSOR     = 1
LIGHT_SENSOR    = 2
HUMI_SENSOR     = 3

def connected(client):
    print("Ket noi thanh cong ...")
    for topic in AIO_FEED_IDs:
        client.subscribe(topic)

def subscribe(client , userdata , mid , granted_qos):
    print("Subscribe thanh cong ...")

def disconnected(client):
    print("Ngat ket noi ...")
    sys.exit (1)

def message(client , feed_id , payload):
    #print("Nhan du lieu: " + payload + " , feed id: " + feed_id)

    if feed_id in BUTTON_IDs:
        BUTTONs[feed_id].initARQ
        BUTTONs[feed_id].setButton(payload)

    elif feed_id == "ack":
        splitACK = payload.split(":")
        BUTTONs[splitACK[0]].button_processing(splitACK[1])
    
    else:
        sensor_ARQ.publishSuccess(feed_id, payload)

client = MQTTClient(AIO_USERNAME , AIO_KEY)
client.on_connect = connected
client.on_disconnect = disconnected
client.on_message = message
client.on_subscribe = subscribe
client.connect()
client.loop_background()

#Initialize ARQ object
sensor_ARQ          = stop_and_wait_ARQ(client, setTimer1, extern.timer1_flag)
BUTTONs             = {}
BUTTONs["button1"]  = Button(client, "button1", setTimer2, extern.timer2_flag)
BUTTONs["button2"]  = Button(client, "button2", setTimer3, extern.timer3_flag)

sensor_type         = "INIT"
feed_id             = "INIT"
sensor_data         = 0

def main_fsm():
    global sensor_type, feed_id, sensor_data

    if sensor_type == "INIT":
        setTimer0(10)
        sensor_type = TEMP_SENSOR
        feed_id     = "Temp_Sensor"
        sensor_data = extern.temp

    elif extern.timer0_flag:
        if sensor_type == TEMP_SENSOR:
            sensor_type = LIGHT_SENSOR
            feed_id     = "Light_Sensor"
            sensor_data = extern.light

        elif sensor_type == LIGHT_SENSOR:
            sensor_type = HUMI_SENSOR
            feed_id     = "Humi_Sensor"
            sensor_data = extern.humi

        elif sensor_type == HUMI_SENSOR:
            sensor_type = TEMP_SENSOR
            feed_id     = "Temp_Sensor"
            sensor_data = extern.temp
        
        setTimer0(10)
        sensor_ARQ.initARQ

while True:
    timer_run()
    main_fsm()
    readSerial()
    sensor_ARQ.publishData(feed_id, sensor_data)

    for button in  BUTTON_IDs:
        BUTTONs[button].send_ack()

    time.sleep(1)
