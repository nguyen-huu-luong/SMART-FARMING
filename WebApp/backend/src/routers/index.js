let user = require("./User/index").userRouter
let devideAcivity = require("./DevideActivity/index").userRouter
exports.route = (app) => {
    app.use("", user)
    app.use("",devideAcivity)
}


