let express = require("express")
let Threshold = require("../controllers/threshold.controller")
let router = express.Router()

router.route("/threshold")
    .get(Threshold.getThreshold)
    .post(Threshold.setThreshold)
    .put(Threshold.updateThreshold)



exports.thresRouter = router