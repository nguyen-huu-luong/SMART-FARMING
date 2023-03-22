let dbConnect = require("./MongoDB")
let ioConnect = require("./adafruit")
exports.loader = async (socket) => {
    await dbConnect.db()
    ioConnect.adafruit(socket)
}