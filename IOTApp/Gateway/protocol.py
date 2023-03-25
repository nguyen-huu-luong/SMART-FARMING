NO_OF_RESEND    = 3     #maximum number of resending data
ACK_TIMEOUT     = 3     #time that we wait for ack (seconds)

#Cases in FSM
SEND            = 100
WAIT            = 200
EXIT            = 300

class stop_and_wait_ARQ(object):
    """Interface for stop and wait ARQ protocol.
    """

    def __init__(self, client, setTimer, timer_flag):
        """Create instance of stop and wait ARQ.

        :param client: MQTT client
        :param setTimer: timer function use for ack timeout
        :param timer_flag: timer_flag of setTimer function

        """
        self.client     = client
        self.buffer     = ""
        self.resend     = 0
        self.case       = EXIT
        self.setTimer   = setTimer
        self.timer_flag = timer_flag
        self.feed_id    = ""

    def publishData(self, feed_id, data):
        """
        Whatever the data that sender wants to send, 
        he sends the data to the receiver. 
        After sending the data, he stops and waits 
        until he receives the acknowledgment from the receiver.
        In this case, sender is our MQTT client and receiver is the feed on Adafruit server
        """

        if self.case == EXIT:
            return
        
        elif self.case == SEND:
            print("Sending data...")
            self.client.publish(feed_id, data)
            self.case = WAIT
            self.buffer = str(data)
            self.setTimer(ACK_TIMEOUT)
            self.feed_id = feed_id
        
        elif self.case == WAIT:
            if self.timer_flag:
                if self.resend == NO_OF_RESEND:
                    print("Failed to send data")
                    self.case = EXIT
                    return
                
                #Try to resend
                self.resend += 1
                self.case = SEND

    def publishSuccess(self, feed_id, ack_data):
        """
        This function is used to detect if our data is published to server
        """
        if self.case == WAIT:
            if self.feed_id == feed_id and ack_data == str(self.buffer):
                print("Data has published: ", feed_id, ack_data)
                self.case = EXIT
                self.resend = 0
                self.buffer = ""
                self.ack_data = None

    @property
    def initARQ(self):
        self.case = SEND