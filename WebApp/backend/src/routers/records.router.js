let express = require('express')
let router = express.Router()
let Record = require('../controllers/records.controller')
router.route("/records").get(Record.getOne)
router.route("/allrecs/:id").get(Record.getAll)
router.route("/records/average").get(Record.getAvegareValues)
router.route("/records/:time").get(Record.getByTime)
router.route("/random").get(Record.createRandomData)
exports.recordRouter = router