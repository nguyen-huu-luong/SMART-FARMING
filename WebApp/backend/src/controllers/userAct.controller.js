let userAct = require("../models/userAct.model").model

exports.getUserAct = async (req, res, next) => {
    try {
        let page = req.params.id;
        const LIMIT = 6;
        const startIndex = (Number(page) - 1) * LIMIT;
        const total = await userAct.countDocuments({})
        const userActs = await userAct.find({}).limit(LIMIT).sort({createdAt: -1}).skip(startIndex);
        res.status(200).json({data: userActs, totalPages: total});
    }
    catch (err) {
        res.send("Err: " + err)
    }
}