let mongoose = require("mongoose")

let user = mongoose.Schema({
    userName: String,
    passWord: String
});

exports.model = mongoose.model("user", user)