let mongoose = require("mongoose")

let record = mongoose.Schema({
    value: Number,
    type: String,
    dev_id: String,
    createAt: Date,
},
    // { timestamps: true }
);

exports.model = mongoose.model("Record", record)