let userAct = require("../models/userAct.model").model
let moment = require("moment")
exports.getUserAct = async (req, res, next) => {
    try {
        from = new Date(req.query.from)
        to = new Date(req.query.to)
        const userActs = await userAct.find({
          createdAt: {
            $gte: moment(from).toISOString(),
            $lte: moment(to).toISOString()
          }
        }).sort({createdAt: -1 }); 
        res.send(userActs)
    }
    catch (err) {
        res.send("Err: " + err)
    }
}
