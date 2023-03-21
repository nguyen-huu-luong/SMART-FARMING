const mqtt = require("mqtt");
let client = mqtt.connect('mqtt://triethoang:aio_chNI54RK6vvna3Rdr3IM52LcnMdF@io.adafruit.com',8883)
let devAct = require("../../models/DevideAcivity/devideAtivity.model").model

exports.adafruit = () => {
    client.on("connect", function() {
        client.subscribe("triethoang/feeds/cambien1")  // temp
        client.subscribe("triethoang/feeds/cambien2")  // light
        client.subscribe("triethoang/feeds/cambien3")  // humi
        console.log("Connect to adafruit success")
    })
    client.on("message", async function(topic, message) {
        if (topic == "triethoang/feeds/cambien1") {
            let devActTemp = new devAct({ value: message.toString(), type: "Temp", dev_id: 100 })
            await devActTemp.save()
        }
        else if (topic == "triethoang/feeds/cambien2") {
            let devActTemp = new devAct({ value: message.toString(), type: "Light", dev_id: 101 })
            await devActTemp.save()
        }
        else if (topic == "triethoang/feeds/cambien3") {
            let devActTemp = new devAct({ value: message.toString(), type: "Humi", dev_id: 102 })
            await devActTemp.save()
        }
    })
}