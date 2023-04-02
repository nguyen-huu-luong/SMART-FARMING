let express = require("express");
let router = express.Router();
let DeviceController = require("../controllers/devices.controller")

router.route("/devices").get(DeviceController.getAll)
router.route("/devices/:id").put(DeviceController.updateDevice);

exports.deviceRouter = router;
