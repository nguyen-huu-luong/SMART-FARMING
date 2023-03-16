import random

NO_OF_SENSOR    = 3     #we aim to work with more than one sensors
NO_OF_RESENDING = 3     #try to resend up to 3 times if can not receive ack from server

sensor          = 1     #define which sensor is publishing
ack_timeout     = 3     #timeout for waiting ack from adafruit server
data            = None  #data packet we send from gateway to adafruit server
no_of_resending = 0

def stop_and_wait_fsm(client, counter, ack_data):
    global sensor
    global ack_timeout
    global data
    global no_of_resending

    if sensor == 1:
        if counter <= 0:
            temp_value = random.randint(0,100)
            print("Updating temperature value...: ", temp_value)
            client.publish("Temp_Sensor", temp_value)
            data = ("Temp_Sensor", str(temp_value))
            print("Data: ", data)
            sensor = "1"

    elif sensor == 2:
        if counter <= 0:
            light_value = random.randint(0,100)
            print("Updating light value...: ", light_value)
            client.publish("Light_Sensor", light_value)
            data = ("Light_Sensor", str(light_value))
            sensor = "2"

    elif sensor == 3:
        if counter <= 0:
            humi_value = random.randint(0,100)
            print("Updating humidity value...: ", humi_value)
            client.publish("Humi_Sensor", humi_value)
            data = ("Humi_Sensor", str(humi_value))
            sensor = "3"

    else:
        #Waiting for ack from server
        if ack_data != None and data == ack_data:
            print("Data has published: ", ack_data)
            data = None
            ack_data = None
            ack_timeout = 3
            sensor = int(sensor) + 1
            if sensor > NO_OF_SENSOR: 
                sensor = 1
        else:
            if no_of_resending == NO_OF_RESENDING:
                print("Failed to send data")
                no_of_resending = 0
                sensor = int(sensor) + 1
                if sensor > NO_OF_SENSOR: 
                    sensor = 1
                return

            if ack_timeout <= 0:
                print("Resending data...: ", data)
                client.publish(data[0], data[1])
                ack_timeout = 3
                no_of_resending += 1
            else:
                ack_timeout -= 1
    