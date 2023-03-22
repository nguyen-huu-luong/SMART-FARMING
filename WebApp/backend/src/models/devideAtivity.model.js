let mongoose = require("mongoose")

let dev_act = mongoose.Schema({
    value: String,
    type: String,
    dev_id: String,
    createAt: Date,
},
    { timestamps: true }
);

exports.model = mongoose.model("devAct", dev_act)