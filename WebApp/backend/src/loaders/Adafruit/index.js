let check = require('../../services/checkThreshold')
const mqtt = require("mqtt");
require("dotenv").config();

let Record = require("../../models/records.model").model;
let Device = require("../../models/devices.model").model

let bt1 = 0
let bt2 = 0
let checker = { emitCheck: false, mess: "" }

exports.adafruit = (socketIo) => {
  let client = mqtt.connect(
    `mqtt://${process.env.ADAFRUIT_IO_USERNAME}:${process.env.ADAFRUIT_IO_KEY}@io.adafruit.com`,
    8883
  );
  socketIo.on("connection", (socket) => {
    socket.on("toggleButton", (message) =>
      client.publish(
        `${process.env.ADAFRUIT_IO_USERNAME}/feeds/${message.publish_btn}`,
        message.value.toString(),
        (err) => {
          if (err) {
            console.error(`Failed to publish message to feed: ${err}`);
            return;
          }
          console.log(`Message published to feed`);
          socketIo.emit("waitingAck", message)
        }
      )
    );
  });
  client.on("connect", function () {
    client.subscribe(`${process.env.ADAFRUIT_IO_USERNAME}/feeds/cambien1`); // temp
    client.subscribe(`${process.env.ADAFRUIT_IO_USERNAME}/feeds/cambien2`); // light
    client.subscribe(`${process.env.ADAFRUIT_IO_USERNAME}/feeds/cambien3`); // humi
    client.subscribe(`${process.env.ADAFRUIT_IO_USERNAME}/feeds/button1`); // light
    client.subscribe(`${process.env.ADAFRUIT_IO_USERNAME}/feeds/button2`); // pump
    client.subscribe(`${process.env.ADAFRUIT_IO_USERNAME}/feeds/ack`);
    console.log("Connect to adafruit success");
  });
  client.on("message", async function (topic, message) {
    if (topic == `${process.env.ADAFRUIT_IO_USERNAME}/feeds/cambien1`) {
      check.HumiThreshold(client, { value: message.toString(), type: "Temperature" }, bt2, socketIo, checker)
      let record = new Record({ value: message, type: "Temp", dev_id: 100, createAt: new Date() });
      try {
        await record.save();
        socketIo.emit("CollectTemperature", {
          value: record.value,
          createAt: record.createAt,
        });
      } catch (error) {
        console.log(error);
      }
    } else if (topic == `${process.env.ADAFRUIT_IO_USERNAME}/feeds/cambien2`) {
      check.LightTheshold(client, message.toString(), bt1, socketIo, checker)
      let record = new Record({
        value: message,
        type: "Light",
        dev_id: 101,
        createAt: new Date(),
      });

      try {
        await record.save();
        socketIo.emit("CollectLight", {
          value: record.value,
          createAt: record.createAt,
        });
      } catch (error) {
        console.log(error);
      }
    } else if (topic == `${process.env.ADAFRUIT_IO_USERNAME}/feeds/cambien3`) {
      check.HumiThreshold(client, { value: message.toString(), type: "Humidity" }, bt2, socketIo, checker)
      let record = new Record({
        value: message,
        type: "Humi",
        dev_id: 102,
        createAt: new Date(),
      });
      try {
        await record.save();
        socketIo.emit("CollectHumidity", { value: record.value, createAt: record.createAt });
      } catch (error) {
        console.log(error)
      }
    } else if (topic == `${process.env.ADAFRUIT_IO_USERNAME}/feeds/ack`) {
      if (checker.emitCheck) {
        checker.emitCheck = false
        socketIo.emit("receiveMess", checker.mess)
      }
      else {
        let ack = message.toString();
        ack = ack.split(':');
        try {
          let device = await Device.findOne({ publish_btn: { $eq: ack[0] } });
          device.set({ status: Number(ack[1]) })
          let result = await device.save()
          console.log(result)
          socketIo.emit("receiveACk", { publish_btn: ack[0], value: Number(ack[1]) });
        } catch (error) {
          socketIo.emit("DatabaseError", { error: error })
        }
      }
    }
    else if (topic == `${process.env.ADAFRUIT_IO_USERNAME}/feeds/button1`) {
      try {
        bt1 = message.toString()
      } catch (error) {
        console.log(error)
      }
    }
    else if (topic == `${process.env.ADAFRUIT_IO_USERNAME}/feeds/button2`) {
      try {
        bt2 = message.toString()
      } catch (error) {
        console.log(error)
      }
    }
  });
};
