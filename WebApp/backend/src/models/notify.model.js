let mongoose = require("mongoose")

let notify = mongoose.Schema({
    title: String,
    content: String,
    view: Boolean
}, { timestamps: true });

exports.model = mongoose.model("notify", notify)