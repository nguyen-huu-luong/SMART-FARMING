let express = require("express")
let User = require("../controllers/user.controller")
let router = express.Router()

router.route("/register")
    .post(User.addUser)

router.route("/login")
    .post(User.auth)

exports.userRouter = router