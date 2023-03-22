const mqtt = require("mqtt");
require("dotenv").config();
let client = mqtt.connect(
  `mqtt://${process.env.ADAFRUIT_IO_USERNAME}:${process.env.ADAFRUIT_IO_KEY}@io.adafruit.com`,
  8883
);
let Record = require("../../models/records.model").model;
let socketIo = require("../SocketIo").socketIo;

exports.adafruit = () => {
  client.on("connect", function () {
    client.subscribe("vuonglht/feeds/cambien1"); // temp
    client.subscribe("vuonglht/feeds/cambien2"); // light
    client.subscribe("vuonglht/feeds/cambien3"); // humi
    console.log("Connect to adafruit success");
  });
  client.on("message", async function (topic, message) {
    if (topic == "vuonglht/feeds/cambien1") {
      let record = new Record({ value: message, type: "Temp", dev_id: 100, createAt: new Date()});
      console.log("Nhận được dữ liẹue");
      try {
        await record.save();
        socketIo.emit("CollectTemperature", {value: record.value, createAt: record.createAt});
      } catch (error) {
        console.log(error);
      }
    } else if (topic == "vuonglht/feeds/cambien2") {
      let record = new Record({ value: message, type: "Light", dev_id: 101, createAt: new Date()});
      try {
        await record.save();
        socketIo.emit("CollectLight", { value: record.value, createAt: record.createAt,});
      } catch (error) {
        console.log(error)
      }
    } else if (topic == "vuonglht/feeds/cambien3") {
      let record = new Record({value: message, type: "Humi", dev_id: 102, createAt: new Date()});
      try {
        await record.save();
        socketIo.emit("CollectHumidity", { value: record.value, createAt: record.createAt});
      } catch (error) {
        console.log(error)
      }
    }
  });
};
