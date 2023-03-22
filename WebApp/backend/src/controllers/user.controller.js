let user = require("../models/user.model").model

exports.getUserId = async (req, res, next) => {
    try {
        res.send("User id is: " + req.params['id'])
    }
    catch (err) {
        res.send("Err: " + err)
    }
}

exports.insertUserId = async (req, res, next) => {
    try {
        let user1 = new user({ userName: req.params['id'], passWord: "12345" })
        await user1.save();
        res.send("Success")
    }
    catch (err) {
        res.send("Err: " + err)
    }
}