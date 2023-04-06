let express = require("express")
let notifys = require("../controllers/notify.controller")
let router = express.Router()

router.route("/notify")
    .get(notifys.getNotify)

router.route("/notify/setView")
    .put(notifys.setView)

exports.notifyRouter = router