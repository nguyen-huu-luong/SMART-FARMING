let express = require('express')
let router = express.Router()
let schedule = require('../controllers/schedule.controller')
router.route("/getlight/:id").get(schedule.getLight)
router.route("/getwater/:id").get(schedule.getWater)
router.route("/sendSched").post(schedule.sendSchedule)
router.route("/deleteSched").post(schedule.deleteSchedule)
router.route("/modifySched").post(schedule.modifySchedule)
exports.scheduleRouter = router