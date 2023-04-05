let user = require("./user.router").userRouter
let devices = require("./devices.router").deviceRouter
let record = require("./records.router").recordRouter
let userAct = require("./userAct.router").userActRouter
let schedule = require("./schedules.router").scheduleRouter
exports.route = (app) => {
    app.use("", user)
    app.use("",devices)
    app.use("", record)
    app.use("", userAct)
    app.use("", schedule)
}
