let user = require("./User/index").userRouter

exports.route = (app) => {
    app.use("", user)
}


