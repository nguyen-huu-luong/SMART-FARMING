let scheduleModel = require("../models/schedule.model").model;
let userAct = require("../models/userAct.model").model;
let moment = require("moment");
let client = require("socket.io-client");
let react = require("react");
const mqtt = require("mqtt");

exports.scheduleService = async (client, clientIO, checkTurnOff, bt1, bt2) => {
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const schedule = await scheduleModel
    .find({
      time: {
        $gt: moment(new Date()).toISOString(),
        $lt: moment(new Date()).add(2, "seconds").toISOString(),
      },
    })
    .limit(1)
    .sort({ time: 1 });
  let temp = "button2";
  if (schedule.length != 0) {
    if (!schedule[0]["weekly"]) {
      await scheduleModel.findByIdAndRemove({ _id: schedule[0]["id"] });
      if (schedule[0]["type"] === "light") temp = "button1";
      let btn = temp == "button1" ? bt1 : bt2;
      let userAct1 = null;
      if (btn != 0) {
        userAct1 = new userAct({
          action:
            "Auto turn on the " +
            `${temp === "button1" ? "light bulb" : "water pump"}` +
            ` but the ${
              temp === "button1" ? "light bulb" : "water pump"
            } is already turned on`,
          actor: "Server",
        });
      } else {
        userAct1 = new userAct({
          action:
            "Auto turn on the " +
            `${temp === "button1" ? "light bulb" : "water pump"}`,
          actor: "Server",
        });
        client.publish(
          `${process.env.ADAFRUIT_IO_USERNAME}/feeds/${temp}`,
          "1"
        );
        clientIO.emit("waitingAck", { publish_btn: temp, value: 1 });
      }
      await userAct1.save();
      sleep(schedule[0]["run_time"] * 1000).then(() => {
        checkTurnOff.action =
          "Auto turn off the " +
          `${temp === "button1" ? "light bulb" : "water pump"}`;
        checkTurnOff.btn = temp;
      });
    } else {
      await scheduleModel.findByIdAndUpdate(schedule[0]["id"], {
        time: moment(schedule[0]["time"]).add(1, "week").toISOString(),
      });
      if (schedule[0]["type"] === "light") temp = "button1";
      let btn = temp == "button1" ? bt1 : bt2;
      let userAct1 = null;
      if (btn != 0) {
        userAct1 = new userAct({
          action:
            "Auto turn on the " +
            `${temp === "button1" ? "light bulb" : "water pump"}` +
            ` but the ${
              temp === "button1" ? "light bulb" : "water pump"
            } is already turned on`,
          actor: "Server",
        });
      } else {
        userAct1 = new userAct({
          action:
            "Auto turn on the " +
            `${temp === "button1" ? "light bulb" : "water pump"}`,
          actor: "Server",
        });
        client.publish(
          `${process.env.ADAFRUIT_IO_USERNAME}/feeds/${temp}`,
          "1"
        );
        clientIO.emit("waitingAck", { publish_btn: temp, value: 1 });
      }
      await userAct1.save();
      sleep(schedule[0]["run_time"] * 1000).then(() => {
        checkTurnOff.action =
          "Auto turn off the " +
          `${temp === "button1" ? "light bulb" : "water pump"}`;
        checkTurnOff.btn = temp;
      });
      await userAct1.save();
      sleep(schedule[0]["run_time"] * 1000).then(() => {
        checkTurnOff.action =
          "Auto turn off the " +
          `${temp === "button1" ? "light bulb" : "water pump"}`;
        checkTurnOff.btn = temp;
      });
    }
  }
};
