let mongoose = require("mongoose")

let threshold = mongoose.Schema({
    minValue: Number,
    maxValue: Number,
    typeThres: String,
    userID: Number, 
}, { timestamps: true });

exports.model = mongoose.model("threshold", threshold)