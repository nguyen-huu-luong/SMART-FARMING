let schedule = require("../models/schedule.model").model
let userAct = require("../models/userAct.model").model
let moment = require('moment')
exports.getLight = async (req, res, next) => {
    try {
        const light = await schedule.find({type: "light"}).sort({createdAt: -1});
        res.send(light);    
    }
    catch (err) {
        res.send("Err: " + err)
    }
}

exports.getWater = async (req, res, next) => {
    try {
        const water = await schedule.find({type: "water"}).sort({createdAt: -1});
        res.send(water);    
    }
    catch (err) {
        res.send("Err: " + err)
    }
}

exports.sendSchedule = async (req, res, next) => {
    try {
        let schedule1 = new schedule({ time: req.body['time'], weekly: req.body['weekly'],
                        type: req.body['type']})
        let userAct1 = new userAct({action: "Set schedule for " + req.body['type'] + " at " + moment(req.body['time']).format('h:mm A, dddd, MMMM Do YYYY'), actor: "User"})
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
        await schedule.findByIdAndUpdate(req.body['id'], {weekly: req.body['weekly']})
        res.send("Success")
    }
    catch (err) {
        res.send("Err: " + err)
    }
}

exports.deleteSchedule = async (req, res, next) => {
    try {   
        const schedule1 = await schedule.findOne({_id: req.body['id']})  
        let userAct1 = new userAct({action: "Delete " + schedule1['type'] + " schedule at " + moment(schedule1['time']).format('h:mm A, dddd, MMMM Do YYYY'), actor: "User"})
        await schedule.findByIdAndRemove({_id: req.body['id']})
        await userAct1.save();
        res.send("Success")
    }
    catch (err) {
        res.send("Err: " + err)
    }
}

