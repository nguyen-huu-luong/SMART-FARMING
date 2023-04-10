let mongoose = require("mongoose");

let devices = mongoose.Schema({
  name: String,
  dev_id: String,
  status: Number,
  type: String,
  nearest_value: Number,
  speed: Number,
  publish_btn: String,
});

exports.model = mongoose.model("Devices", devices);
