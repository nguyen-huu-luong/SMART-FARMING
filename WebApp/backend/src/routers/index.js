let user = require("./user.router").userRouter
let devices = require("./devices.router").deviceRouter
let record = require("./records.router").recordRouter
exports.route = (app) => {
    app.use("", user)
    app.use("",devices)
    app.use("", record)
}
