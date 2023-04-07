let threshold = require('../models/threshold.model').model

exports.getThreshold = async (req, res, next) => {
    try{
        let data = await threshold.find()
        res.send(data)
    }
    catch(err) {
        console.log("Err: ", err)
    }
}

exports.getLight = async () => {
    try{
        let data = await threshold.find({typeThres: "Light"})
        return ({minValue: data[0].minValue, maxValue: data[0].maxValue})
    }
    catch(err) {
        console.log("Err: ", err)
    }
}


exports.getHumidity = async () => {
    try{
        let data = await threshold.find({typeThres: "Humidity"})
        return ({minValue: data[0].minValue, maxValue: data[0].maxValue})
    }
    catch(err) {
        console.log("Err: ", err)
    }
}

exports.getTemperature = async () => {
    try{
        let data = await threshold.find({typeThres: "Temperature"})
        return ({minValue: data[0].minValue, maxValue: data[0].maxValue})
    }
    catch(err) {
        console.log("Err: ", err)
    }
}

exports.setThreshold = async (req, res, next) => {
    try {
        let thresValue = req.body
        let thresH = new threshold({ minValue: thresValue.minHumidity, maxValue: thresValue.maxHumidity, typeThres: "Humidity", userID: thresValue.userID })
        await thresH.save()
        let thresT = new threshold({ minValue: thresValue.minTemperature, maxValue: thresValue.maxTemperature, typeThres: "Temperature", userID: thresValue.userID })
        await thresT.save()
        let thresL = new threshold({ minValue: thresValue.minLight, maxValue: thresValue.maxLight, typeThres: "Light", userID: thresValue.userID })
        await thresL.save()
        res.send("success")
    }
    catch (err) {
        res.send("Err: ", err)
    }
}

exports.updateThreshold = async (req, res, next) => {
    try {
        let thresValue = req.body
        let minHumi = parseFloat(thresValue.minHumidity)
        let maxHumi = parseFloat(thresValue.maxHumidity)
        let minTemp = parseFloat(thresValue.minTemperature)
        let maxTemp = parseFloat(thresValue.maxTemperature)
        let minLight = parseFloat(thresValue.minLight)
        let maxLight = parseFloat(thresValue.maxLight)
        if ( (minHumi > maxHumi) || (minTemp > maxTemp) || (minLight > maxLight)) {
            res.status(400).send("Failed: Min value must less than or equal max value")
        }
        else if (maxHumi > 100) {
            res.status(400).send("Failed: Max value of Humidity is 100%")

        }
        else {
            await threshold.updateOne({ typeThres: "Humidity" }, { minValue: thresValue.minHumidity, maxValue: thresValue.maxHumidity, userID: thresValue.userID })
            await threshold.updateOne({ typeThres: "Temperature" }, { minValue: thresValue.minTemperature, maxValue: thresValue.maxTemperature,  userID: thresValue.userID })
            await threshold.updateOne({ typeThres: "Light" }, { minValue: thresValue.minLight, maxValue: thresValue.maxLight, userID: thresValue.userID })
            res.send("success")
        }
    }
    catch (err) {
        res.send("Err: ", err)
    }
}