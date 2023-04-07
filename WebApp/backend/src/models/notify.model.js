let mongoose = require("mongoose")

let notify = mongoose.Schema({
    title: String,
    content: String,
    current1: String,
    current2: String,
    buttonStatus: String,
    type: Number,
    view: Boolean
}, { timestamps: true });

exports.model = mongoose.model("notify", notify)