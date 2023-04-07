let threshold = require('../controllers/threshold.controller')
let record = require('../controllers/records.controller')
let notify = require('../controllers/notify.controller')
require("dotenv").config();

exports.LightTheshold = async (client, data, bt,socketIo) => {
    try {
        let thres = await threshold.getLight()
        let maxValue = thres.maxValue
        let minValue = thres.minValue
        if (data < minValue) {
            if (bt == 0) {
                //client.publish(`${process.env.ADAFRUIT_IO_USERNAME}/feeds/button1`, "1")
                await notify.addNotify({title: "Light is less than threshold", content: "Turn on light", buttonStatus: "Off", current1: data, current2: "" , type: 0})
            }
            else {
                await notify.addNotify({title: "Light is less than threshold", content: "None", buttonStatus: "On", current1: data, current2: "", type: 0})
            }
            socketIo.emit("receiveMess", "Light is less than threshold")
        }
        else if (data > maxValue) {
            if (bt == 1) {
                // client.publish(`${process.env.ADAFRUIT_IO_USERNAME}/feeds/button1`, "0")
                await notify.addNotify({title: "Light is greater than threshold", content: "Turn off light", buttonStatus: "On", current1: data, type: 0})
            }
            else {
                await notify.addNotify({title: "Light is greater than threshold", content: "None",  buttonStatus: "Off", current1: data, type: 0})
            }
            socketIo.emit("receiveMess", "Light is greater than threshold")
        }
    }
    catch (err) {
        console.log("Err: ", err)
    }
}

exports.HumiThreshold = async (client, data, bt, socketIo) => {
    try {
        let thresHumi = 0
        let thresTemp = 0
        let humi = await threshold.getHumidity()
        let temp = await threshold.getTemperature()
        let minHumi = humi.minValue
        let maxHumi = humi.maxValue
        let minTemp = temp.minValue
        let maxTemp = temp.maxValue
        if (data.type == "Humidity") {
            thresHumi = data.value
            thresTemp = await record.getTemp()
            thresTemp = thresTemp[0].value

        }
        else {
            thresHumi = await record.getHumi()
            thresHumi = thresHumi[0].value
            thresTemp = data.value
        }
        if (thresHumi >= minHumi && thresHumi <= maxHumi) {
            if (thresTemp > maxTemp) {
                if (bt == 0) {
                    //client.publish(`${process.env.ADAFRUIT_IO_USERNAME}/feeds/button2`, "1")

                    await notify.addNotify({title: "Temp is greater than threshold", content: "Turn on pump", buttonStatus: "Off", current1: thresHumi, current2: thresTemp, type:1})
                }
                else {
                    await notify.addNotify({title: "Temp is greater than threshold", content: "None", buttonStatus: "On", current1: thresHumi, current2: thresTemp, type:1})
                }
                socketIo.emit("receiveMess", "Temp is greater than threshold")
            }
        }
        else if (thresHumi < minHumi) {
            if (thresTemp >= minTemp && thresTemp <= maxTemp) {
                if (bt == 0) {
                   // client.publish(`${process.env.ADAFRUIT_IO_USERNAME}/feeds/button2`, "1")
                    await notify.addNotify({title: "Humidity is less than threshold", content: "Turn on pump", buttonStatus: "Off", current1: thresHumi, current2: thresTemp, type:1})
                }
                else {
                    await notify.addNotify({title: "Humidity is less than threshold", content: "None", buttonStatus: "On", current1: thresHumi, current2: thresTemp, type:1})
                }
                socketIo.emit("receiveMess",  "Humidity is less than threshold")
            }
        }
        else if (thresHumi > maxHumi) {
            if (thresTemp >= minTemp && thresTemp <= maxTemp) {
                if (bt == 1) {
                   // client.publish(`${process.env.ADAFRUIT_IO_USERNAME}/feeds/button2`, "0")
                    await notify.addNotify({title: "Humidity is greater than threshold", content: "Turn off pump", buttonStatus: "On", current1: thresHumi, current2: thresTemp, type:1})
                }
                else {
                    await notify.addNotify({title: "Humidity is greater than threshold", content: "None", buttonStatus: "Off", current1: thresHumi, current2: thresTemp, type:1})
                }
                socketIo.emit("receiveMess",  "Humidity is greater than threshold")
            }
            else if (thresTemp < minTemp) {
                if (bt == 1) {
                  //  client.publish(`${process.env.ADAFRUIT_IO_USERNAME}/feeds/button2`, "0")
                    await notify.addNotify({title: "Humidity is greater than threshold", content: "Turn off pump", buttonStatus: "On", current1: thresHumi, current2: thresTemp, type:1})
                }
                else {
                    await notify.addNotify({title: "Humidity is greater than threshold", content: "None", buttonStatus: "Off", current1: thresHumi, current2: thresTemp, type:1})
                }
                socketIo.emit("receiveMess", "Humidity is greater than threshold")
            }
        }
    }
    catch (err) {
        console.log("Err: ", err)
    }
} 