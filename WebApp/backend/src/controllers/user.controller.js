let user = require("../models/user.model").model
let bcrypt = require('bcrypt')

exports.addUser = async (req, res, next) => {
    try {
        data = req.body
        let userName = data.userName
        let pwd = data.password
        let check = await user.find({ userName: userName })
        if (userName == "" || pwd == "") {
            res.status(400).send("Please fill out all username and password info")
        }

        else if (check.length > 0) {
            res.status(400).send("Username existed")
        }

        else {
            let pwdNew = await bcrypt.hash(pwd, 10)
            let User = new user({ userName: userName, passWord: pwdNew })
            await User.save()
            res.send("success")
        }

    }
    catch (err) {
        res.send("Err: " + err)
    }
}

exports.auth = async (req, res, next) => {
    try {
        data = req.body
        let userName = data.userName
        let pwd = data.password
        let check = await user.find({ userName: userName })
        if (userName == "" || pwd == "") {
            res.status(400).send("Please fill out all username and password info")
        }
        else if (check.length == 0) {
            res.status(400).send("Username doesn't exist")
        }
        else {

            let checkPwd = await bcrypt.compare(pwd, check[0].passWord)
            if (checkPwd) {
                res.send({userID: check[0]._id, userName: check[0].userName})
            }
            else {
                res.status(400).send("Incorrect password")
            }
        }
    }
    catch (err) {
        ré.send("Err: " + err)
    }
}