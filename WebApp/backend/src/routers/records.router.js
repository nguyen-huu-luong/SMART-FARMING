let express = require('express')
let router = express.Router()
let Record = require('../controllers/records.controller')
router.route("/records").get(Record.getOne())

exports.recordRouter = router