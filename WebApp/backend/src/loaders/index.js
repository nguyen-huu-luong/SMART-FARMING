let dbConnect = require("./MongoDB/index")
let ioConnect = require("./Adafruit/index")
exports.loader = async () => {
    await dbConnect.db()
    ioConnect.adafruit()
}