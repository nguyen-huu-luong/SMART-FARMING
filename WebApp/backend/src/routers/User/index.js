let express = require("express")
let User = require("../../controllers/User/user.controller")
let router = express.Router()

router.route("/user/:id")
    .get(User.getUserId)
    .post(User.insertUserId)

exports.userRouter = router