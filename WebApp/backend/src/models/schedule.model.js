let mongoose = require("mongoose");

let schedules = mongoose.Schema(
    {
    time: Date,
    weekly: Boolean,
    type: String,
    dev_id: String,
    run_time: Number,
    },
    { timestamps: true }
);

exports.model = mongoose.model("Schedules", schedules);
