let mongoose = require("mongoose")
require('dotenv').config()

exports.db = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Connect to mongoDB success")

    }
    catch (err) {
        console.log(err)
        return
    }
}