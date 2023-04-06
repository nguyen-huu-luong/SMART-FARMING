let mongoose = require("mongoose")

let userAct = mongoose.Schema({
    action: String,
    actor: String
},
    { timestamps: true }
);

exports.model = mongoose.model("UserAct", userAct)