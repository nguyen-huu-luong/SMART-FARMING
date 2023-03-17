import  random
import  time
import  sys
from    Adafruit_IO         import MQTTClient
from    uart                import *
from    stop_and_wait_fsm   import *

AIO_FEED_IDs = ["button1", "button2", "Temp_Sensor", "Light_Sensor", "Humi_Sensor"]
AIO_USERNAME = "triethoang"
AIO_KEY = "aio_fqZi58nUoVz5g3QuOX1HiBg2nIfN"

def connected(client):
    print("Ket noi thanh cong ...")
    for topic in AIO_FEED_IDs:
        client.subscribe(topic)

def subscribe(client , userdata , mid , granted_qos):
    print("Subscribe thanh cong ...")

def disconnected(client):
    print("Ngat ket noi ...")
    sys.exit (1)

ack_data = None  #ack data from adafruit server
def message(client , feed_id , payload):
    print("Nhan du lieu: " + payload + " , feed id: " + feed_id)
    global ack_data
    ack_data = (feed_id, payload)
    #print("ACK Data: ", ack_data)

client = MQTTClient(AIO_USERNAME , AIO_KEY)
client.on_connect = connected
client.on_disconnect = disconnected
client.on_message = message
client.on_subscribe = subscribe
client.connect()
client.loop_background()

counter = 5

while True:
    counter -= 1
    
    stop_and_wait_fsm(client, counter, ack_data)

    if counter <= 0:
        counter = 10
    
    time.sleep(1)
    
    #readSerial(client)
    #time.sleep(1)
    pass
