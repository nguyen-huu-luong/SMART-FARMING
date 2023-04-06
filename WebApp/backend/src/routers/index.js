let user = require("./user.router").userRouter
let devideAcivity = require("./deviceAtivity.router").userRouter
let record = require("./records.router").recordRouter
let threshold = require("./threshold.router").thresRouter
let notify = require("./notify.router").notifyRouter
exports.route = (app) => {
    app.use("", user)
    app.use("",devideAcivity)
    app.use("",record)
    app.use("", threshold)
    app.use("", notify)
}


