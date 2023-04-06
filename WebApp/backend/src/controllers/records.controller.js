let record = require('../models/records.model').model

exports.getOne = () => async (req, res, next) => {
    try {
        let temperature = await record.find({type: "Temp"}).sort({createAt:-1}).limit(1)
        let light = await record.find({type: "Light"}).sort({createAt:-1}).limit(1)
        let humi = await record.find({type: "Humi"}).sort({createAt:-1}).limit(1)
        res.send([temperature[0], light[0], humi[0]])
    } catch(err) {
        console.log(err)
    }
}
exports.getAll = () => async (req, res, next) => {
    try {
        let data = await record.find({}).sort({createAt:-1})
        res.send(data)
    } catch(err){
        console.log(err)
    }
}

exports.getTemp = async () => {
    try{
        let temperature = await record.find({type: "Temp"}).sort({createAt:-1}).limit(1)
        return temperature
    }
    catch(err) {
        console.log(err)
    }
}

exports.getLight = async () => {
    try{
        let light = await record.find({type: "Light"}).sort({createAt:-1}).limit(1)
        return light
    }
    catch(err) {
        console.log(err)
    }
}

exports.getHumi = async () => {
    try{
        let humi = await record.find({type: "Humi"}).sort({createAt:-1}).limit(1)
        return humi
    }
    catch(err) {
        console.log(err)
    }
}