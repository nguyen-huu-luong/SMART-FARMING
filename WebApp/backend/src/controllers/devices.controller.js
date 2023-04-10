let DeviceModel = require("../models/devices.model").model;
let ScheduleModel = require("../models/schedule.model").model;

exports.getAll = async (req, res) => {
  try {
    let data = await DeviceModel.aggregate([
      {
        $lookup: {
          from: "schedules",
          localField: "dev_id",
          foreignField: "dev_id",
          as: "schedules",
        },
      },
      {
        $unwind: {
          path: "$schedules",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          time: "$schedules.time",
        },
      },
      {
        $project: {
          time: {
            $ifNull: ["$time", null]
          },
          _id: 1,
          dev_id: 1,
          name: 1,
          type: 1,
          status: 1,
          nearest_value: 1,
          publish_btn: 1,
        },
      },
    ]);

    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.updateDevice = async (req, res) => {
  try {
    let device = await DeviceModel.findById(req.params.id).exec();
    device.set(req.body);
    let result = await device.save();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};
