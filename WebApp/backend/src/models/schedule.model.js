let mongoose = require("mongoose");

let schedules = mongoose.Schema(
    {
    time: Date,
    weekly: Boolean,
    type: String
    },
    { timestamps: true }
);

exports.model = mongoose.model("Schedules", schedules);
