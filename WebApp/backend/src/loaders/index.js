let dbConnect = require("./MongoDB/index")

exports.loader = async () => {
    await dbConnect.db()
}