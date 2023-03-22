let user = require("./user.router").userRouter
let devideAcivity = require("./deviceAtivity.router").userRouter
let record = require("./records.router").recordRouter
exports.route = (app) => {
    app.use("", user)
    app.use("",devideAcivity)
    app.use("",record)
}


