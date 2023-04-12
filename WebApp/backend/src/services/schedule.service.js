let scheduleModel = require("../models/schedule.model").model
let userAct = require("../models/userAct.model").model
let moment = require('moment')
let client = require('socket.io-client')
let react = require('react')
exports.scheduleService = async (clientIO) => {
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  const schedule = await scheduleModel.find({
    time: {
      $gt: moment(new Date()).toISOString(),
      $lt: moment(new Date()).add(2, "seconds").toISOString()
    }
  }).limit(1).sort({ time: 1 });
  let temp = "button2"
  if (schedule.length != 0) {
    if (!schedule[0]['weekly']) {
      await scheduleModel.findByIdAndRemove({ _id: schedule[0]['id'] })
      if (schedule[0]['type'] === "light") temp = "button1";
      let userAct1 = new userAct({
        action: "Auto turn on the " + `${(temp === "button1") ? "light bulb" : "water pump"}` +
          " at " + moment(schedule[0]['time']).format('h:mm A, dddd, MMMM Do YYYY'), actor: "Server"
      })
      clientIO.emit("toggleButton", { publish_btn: temp, value: 1 });
      await userAct1.save();
      sleep(schedule[0]["run_time"]*1000).then(() => {
        let userAct2 = new userAct({
          action: "Auto turn off the " + `${(temp === 1) ? "light bulb" : "water pump"}` +
            " at " + moment(schedule[0]['time']).add(schedule[0]["run_time"], "seconds").format('h:mm A, dddd, MMMM Do YYYY'), actor: "Server"
        })
        userAct2.save();
        clientIO.emit("toggleButton", { publish_btn: temp, value: 0 });
      });
    } else {
      await scheduleModel.findByIdAndUpdate(schedule[0]['id'], { time: moment(schedule[0]['time']).add(1, "week").toISOString() })
      if (schedule[0]['type'] === "light") temp = "button1";
      let userAct1 = new userAct({
        action: "Auto turn on the " + `${(temp === "button1") ? "light bulb" : "water pump"}` +
          " at " + moment(schedule[0]['time']).format('h:mm A, dddd, MMMM Do YYYY'), actor: "Server"
      })
      clientIO.emit("toggleButton", { publish_btn: temp, value: 1 });
      await userAct1.save();
      sleep(schedule[0]["run_time"]*1000).then(() => {
        let userAct2 = new userAct({
          action: "Auto turn off the " + `${(temp === 1) ? "light bulb" : "water pump"}` +
            " at " + moment(schedule[0]['time']).add(schedule[0]["run_time"], "seconds").format('h:mm A, dddd, MMMM Do YYYY'), actor: "Server"
        })
        userAct2.save();
        clientIO.emit("toggleButton", { publish_btn: temp, value: 0 });
      });
    }
  }
}

