let record = require('../models/records.model').model

exports.getOne = () => async (req, res, next) => {
    try {
        let temperature = await record.find({type: "Temp"}).sort({createAt:-1}).limit(1)
        let light = await record.find({type: "Light"}).sort({createAt:-1}).limit(1)
        let humi = await record.find({type: "Humi"}).sort({createAt:-1}).limit(1)
        console.log(temperature)
        res.send([temperature[0], light[0], humi[0]])
    } catch(err) {
        console.log(err)
    }
}