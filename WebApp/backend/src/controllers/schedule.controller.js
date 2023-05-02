let schedule = require("../models/schedule.model").model
let userAct = require("../models/userAct.model").model
let moment = require('moment')
exports.getLight = async (req, res, next) => {
    try {
        let page = req.params.id;
        const LIMIT = 7;
        const startIndex = (Number(page) - 1) * LIMIT;
        const total = await schedule.countDocuments({type: "light"})
        const light = await schedule.find({type: "light"}).limit(LIMIT).sort({createdAt: -1}).skip(startIndex);
        res.status(200).json({data: light, totalPages: total});
    }
    catch (err) {
        res.send("Err: " + err)
    }
}

exports.getWater = async (req, res, next) => {
    try {
        let page = req.params.id;
        const LIMIT = 7;
        const startIndex = (Number(page) - 1) * LIMIT;
        const total = await schedule.countDocuments({type: "water"})
        const water = await schedule.find({type: "water"}).limit(LIMIT).sort({createdAt: -1}).skip(startIndex);
        res.status(200).json({data: water, totalPages: total});
    }
    catch (err) {
        res.send("Err: " + err)
    }
}

exports.sendSchedule = async (req, res, next) => {
    try {
        let schedule1 = new schedule({ time: req.body['time'], weekly: req.body['weekly'],
                        type: req.body['type'], run_time: req.body['run_time'], dev_id: req.body['dev_id']})
        let userAct1 = new userAct({action: "Set schedule for " + req.body['type'] + " at " + moment(req.body['time']).format('h:mm A, dddd, MMMM Do YYYY'), actor: req.body['userName']})
        await schedule1.save();
        await userAct1.save();

        res.send("Success")
    }
    catch (err) {
        res.send("Err: " + err)
    }
}

exports.modifySchedule = async (req, res, next) => {
    try {
        let temp = await schedule.findById(req.body['id'])
        let userAct1 = new userAct({action: "Modify schedule for " + temp['type'] + " at " + moment(temp['time']).format('h:mm A, dddd, MMMM Do YYYY'), actor: req.body['userName']})
        await userAct1.save();
        await schedule.findByIdAndUpdate(req.body['id'], {weekly: req.body['weekly'], run_time: req.body['run_time'], time: req.body['time']})
        res.send("Success")
    }
    catch (err) {
        res.send("Err: " + err)
    }
}

exports.deleteSchedule = async (req, res, next) => {
    try {   
        const schedule1 = await schedule.findOne({_id: req.body['id']})  
        let userAct1 = new userAct({action: "Delete " + schedule1['type'] + " schedule at " + moment(schedule1['time']).format('h:mm A, dddd, MMMM Do YYYY'), actor: req.body['userName']})
        await schedule.findByIdAndRemove({_id: req.body['id']})
        await userAct1.save();
        res.send("Success")
    }
    catch (err) {
        res.send("Err: " + err)
    }
}

