let express = require('express')
let router = express.Router()
let userActs = require('../controllers/userAct.controller')
router.route("/useract").get(userActs.getUserAct)
exports.userActRouter = router