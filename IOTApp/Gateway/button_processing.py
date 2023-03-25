from protocol       import *
from uart           import *

class Button(object):
    """Interface for a feed button on Adafruit IO 
    """
    def __init__(self, client, feed_id, setTimer, timer_flag):
        """Create instance of button.

        :param client: MQTT client
        :param feed_id: Adafruit.IO feed id for your button.
        :param setTimer: timer function use for ack timeout
        :param timer_flag: timer_flag of setTimer function

        """
        self.client  = client
        self.feed_id = feed_id
        self.status  = 0
        self.ARQ     = stop_and_wait_ARQ(self.client, setTimer, timer_flag)
        
    def send_ack(self):
        """Send ack back to server"""
        ack = self.feed_id + ":" + str(self.status)
        self.ARQ.publishData("ack", ack)

    def button_processing(self, data):
        """Button processing after send ack to server"""
        msg = "!" + self.feed_id + ":" + data + "#"
        print(msg)
        writeSerial(msg)
    
    def setButton(self, value):
        self.status = value

    @property
    def initARQ(self):
        self.ARQ.initARQ
    
