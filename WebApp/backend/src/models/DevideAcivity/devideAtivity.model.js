let mongoose = require("mongoose")

let dev_act = mongoose.Schema({
    value: String,
    type: String,
    dev_id: String
},
    { timestamps: true }
);

exports.model = mongoose.model("devAct", dev_act)