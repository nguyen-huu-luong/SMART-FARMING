let dbConnect = require("./MongoDB")
let ioConnect = require("./Adafruit")
exports.loader = async (socket) => {
    await dbConnect.db()
    ioConnect.adafruit(socket)
}