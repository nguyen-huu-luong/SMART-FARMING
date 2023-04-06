let userAct = require("../models/userAct.model").model

exports.getUserAct = async (req, res, next) => {
    try {
        const userActs = await userAct.find({}).limit(20).sort({createdAt: -1});
        res.send(userActs);    
    }
    catch (err) {
        res.send("Err: " + err)
    }
}