let notify = require('../models/notify.model').model

exports.addNotify = async (data) => {
    try{
        let value = new notify({title: data.title, content: data.content, current1: data.current1, current2: data.current2, buttonStatus: data.buttonStatus ,view: false, type: data.type})
        await value.save()
    }
    catch(err){
        console.log("Err: ", err)
    }
}

exports.getNotify = async (req, res, next) => {
    try{
        let data = await notify.find().sort({createdAt: -1})
        let count = await notify.find({view: false})
        res.send({data: data, count: count.length})
    }
    catch(err) {
        console.log("Err: ", err)
    }
}

exports.setView = async (req, res, next) => {
    let data = req.body
    try{
        await notify.updateOne({_id: data.id}, {$set: {view: true}})
        res.send("success")
    }
    catch(err) {
        console.log("Err: ", err)
    }
}
