let mongoose = require("mongoose")

let threshold = mongoose.Schema({
    minValue: Number,
    maxValue: Number,
    typeThres: String,
    userID: String, 
}, { timestamps: true });

exports.model = mongoose.model("threshold", threshold)