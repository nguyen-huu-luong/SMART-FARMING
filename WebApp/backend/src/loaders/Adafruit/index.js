let check = require('../../services/checkThreshold')
const mqtt = require("mqtt");
require("dotenv").config();
let service = require("../../services/schedule.service").scheduleService

let Record = require("../../models/records.model").model;
let Device = require("../../models/devices.model").model;
let userAct = require("../../models/userAct.model").model


let bt1 = 0
let bt2 = 0
let checker = { emitCheck: false, mess: "" }
let checkTurnOff = { action: "", btn: ""}
exports.adafruit = (socketIo) => {
  let client = mqtt.connect(
    `mqtt://${process.env.ADAFRUIT_IO_USERNAME}:${process.env.ADAFRUIT_IO_KEY}@io.adafruit.com`,
    8883
  );
  setInterval(() => {
    service(client, socketIo, checkTurnOff, bt1, bt2);
    if (checkTurnOff.action != ""){
      let btn = (checkTurnOff.btn == "button1")?bt1:bt2;
      if (btn != 0){
        let userAct2 = new userAct({
          action: checkTurnOff.action,
          actor: "Server",
        });
        userAct2.save();
        client.publish(
          `${process.env.ADAFRUIT_IO_USERNAME}/feeds/${checkTurnOff.btn}`,
          "0"
        );
        socketIo.emit("waitingAck", { publish_btn: checkTurnOff.btn, value: 0 });
      } else {
        let finalaction = checkTurnOff.action + ` but the ${checkTurnOff.btn === "button1" ? "light bulb" : "water pump"} is already turned off`
        let userAct2 = new userAct({
          action: finalaction,
          actor: "Server",
        });
        userAct2.save();
      }
      checkTurnOff = { action: "", btn: ""}
    }
  }, 1000);
  socketIo.on("connection", (socket) => {
    socket.on("toggleButton", (message) => {
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
      let userAct1 = new userAct({
        action: `Turn ${message.value?"on":"off"} ${message.publish_btn=="button1"?" the light":" the water pump"}`, 
        actor: message.user
      })
      userAct1.save();
    }
    );
    socket.on("action", (message) => {
        let userAct1 = new userAct({
          action: message.action, actor: message.name
        })
        userAct1.save();
    })
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
        let ack = message.toString();
        ack = ack.split(':');
        try {
          let device = await Device.findOne({ publish_btn: { $eq: ack[0] } });
          device.set({ status: Number(ack[1]) })
          let result = await device.save()
          console.log(result)
          socketIo.emit("receiveACk", { publish_btn: ack[0], value: Number(ack[1]) });
          // let userAct1 = new userAct({
          //   action: "Turn "+`${(ack[0] === 0) ? "on " : "off "}`+`${(ack[0] === "200") ? "water pump" : "light bulb"}`, actor: sessionStorage.getItem('userName')
          // })
          // userAct1.save();
        } catch (error) {
          socketIo.emit("DatabaseError", { error: error })
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
