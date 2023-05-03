let userAct = require("../models/userAct.model").model
let moment = require("moment")
exports.getUserAct = async (req, res, next) => {
    try {
      from = new Date(req.query.from)
      to = new Date(req.query.to)
      page = req.query.page
      const LIMIT = 8;
      const startIndex = (Number(page) - 1) * LIMIT;
      const total = await userAct.countDocuments(
        {
          createdAt: {
            $gte: moment(from).toISOString(),
            $lte: moment(to).toISOString()
          },
        }
      )
      const useracts = await userAct.find({
        createdAt: {
          $gte: moment(from).toISOString(),
          $lte: moment(to).toISOString()
        },
      }).limit(LIMIT).sort({createdAt: -1 }).skip(startIndex);
      res.status(200).json({data: useracts, totalPages: total});
    }
    catch (err) {
        res.send("Err: " + err)
    }
}
