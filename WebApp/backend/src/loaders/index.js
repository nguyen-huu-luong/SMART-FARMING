let dbConnect = require("./MongoDB")
let ioConnect = require("./adafruit")
let socketServer = require("./SocketIo")
exports.loader = async () => {
    await dbConnect.db()
    ioConnect.adafruit()
    socketServer.connect()
}