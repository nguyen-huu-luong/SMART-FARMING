let dbConnect = require("./MongoDB/index")
let ioConnect = require("./Adafruit/index")
exports.loader = async (socket) => {
    try {
        await dbConnect.db()
        ioConnect.adafruit(socket)
    }
    catch(err) {
        console.log(err)
    }
}