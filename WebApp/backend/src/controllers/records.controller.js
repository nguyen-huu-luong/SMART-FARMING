let record = require("../models/records.model").model;
let moment = require("moment");

const transferTime = (type, time) => {
  if (type === "today" || type === "yesterday" || type === "day") {
    return time.toLocaleString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  } else if (type === "week") {
    return time.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      weekday: "long",
      hour12: false,
    });
  } else if (type === "month" || type === "avgDay") {
    return time.toLocaleString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } else if (type === "days") {
    return time.toLocaleString("en-US", {
      day: "numeric",
      month: "long",
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
  }
};
exports.getOne = async (req, res, next) => {
  try {
    let temperature = await record
      .find({ type: "Temp" })
      .sort({ createAt: -1 })
      .limit(1);
    let light = await record
      .find({ type: "Light" })
      .sort({ createAt: -1 })
      .limit(1);
    let humi = await record
      .find({ type: "Humi" })
      .sort({ createAt: -1 })
      .limit(1);
    res.status(200).send([temperature[0], light[0], humi[0]]);
  } catch (err) {
    res.status(500).send(err);
  }
};
exports.getAll = async (req, res, next) => {
  try {
    let page = req.params.id;
    const LIMIT = 6;
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await record.countDocuments({});
    let records = await record
      .find({})
      .limit(LIMIT)
      .sort({ createdAt: -1 })
      .skip(startIndex);
    res.status(200).json({ data: records, totalPages: total });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getByTime = async (req, res, next) => {
  let time = req.params.time;
  let data = [];
  let endTime = new Date();
  let startTime = new Date();
  let numDays = 0;
  try {
    if (time === "range") {
      let from = req.query.from;
      let to = req.query.to;
      if (from && to && !isNaN(Date.parse(from)) && !isNaN(Date.parse(to))) {
        startTime = new Date(from);
        endTime = new Date(to);
      } else {
        return res
          .status(400)
          .send({
            error: "Invalid argument!",
            message: "'from'and 'to' are validated date format and required",
          });
      }

      numDays = Math.ceil((endTime - startTime) / 86400000);
      if (numDays <= 2) {
        time = "day";
      } else if (numDays <= 12) {
        time = "days";
      } else if (numDays <= 45) {
        time = "avgDay";
      } else {
        return res
          .status(400)
          .send({
            error: "Out of range!",
            message: "Maximum range is 45 days",
          });
      }
    }

    if (time === "today" || time === "yesterday" || time === "day") {
      if (time === "yesterday") {
        startTime.setDate(startTime.getDate() - 1);
        startTime.setHours(0, 0, 0, 0);
        endTime.setDate(endTime.getDate() - 1);
        endTime.setHours(23, 59, 59, 999);
      } else if (time === "today") {
        startTime = new Date();
        startTime.setHours(0, 0, 0, 0);
        endTime = new Date();
      }
      data = await record.aggregate([
        {
          $match: {
            createAt: { $gt: startTime, $lt: endTime },
          },
        },
        {
          $group: {
            _id: {
              hour: { $hour: "$createAt" },
              date: {
                $dateToString: { format: "%Y-%m-%d", date: "$createAt" },
              },
              type: "$type",
            },
            value: { $first: "$$ROOT.value" },
            createAt: { $first: "$$ROOT.createAt" },
          },
        },
        {
          $sort: {
            createAt: 1,
          },
        },
      ]);
    } else if (time === "week" || time === "days") {
      if (time === "week") {
        startTime = new Date();
        startTime = new Date(
          startTime -
            (startTime.getDay() == 0 ? 6 : startTime.getDay() - 1) * 86400000
        );
        startTime.setHours(0, 0, 0, 0);
        endTime = new Date();
        endTime.setHours(23, 59, 59, 999);
      }
      data = await record.aggregate([
        {
          $match: {
            createAt: { $gte: startTime, $lt: endTime },
            $expr: { $in: [{ $hour: "$createAt" }, [0, 6, 12, 18]] },
          },
        },
        {
          $group: {
            _id: {
              hour: { $hour: "$createAt" },
              date: {
                $dateToString: { format: "%Y-%m-%d", date: "$createAt" },
              },
              type: "$type",
            },
            value: { $first: "$$ROOT.value" },
            createAt: { $first: "$$ROOT.createAt" },
          },
        },

        {
          $sort: { createAt: 1 },
        },
      ]);
    } else if (time === "month" || time === "avgDay") {
      if (time === "month") {
        startTime.setDate(startTime.getDate() - 30);
        endTime.setDate(endTime.getDate() - 1);
        startTime = new Date(startTime - (startTime.getDate() - 1) * 86400000);
        startTime.setHours(0, 0, 0, 0);
        endTime.setHours(23, 59, 59, 999);
      }

      data = await record.aggregate([
        {
          $match: { createAt: { $gt: startTime, $lt: endTime } },
        },
        {
          $group: {
            _id: {
              date: {
                $dateToString: { format: "%Y-%m-%d", date: "$createAt" },
              },
              type: "$type",
            },
            data: { $push: "$value" },
            value: { $avg: "$value" },
            createAt: { $first: "$$ROOT.createAt" },
          },
        },

        {
          $sort: { createAt: 1 },
        },
      ]);
    }

    res.send({
      from: startTime,
      to: endTime,
      is_avg_value: time === "month" || time === "avgDay",
      ligth: data
        .filter((item) => item._id.type === "Light")
        .map((item) => item.value),
      temperature: data
        .filter((item) => item._id.type === "Temp")
        .map((item) => item.value),
      humidity: data
        .filter((item) => item._id.type === "Humi")
        .map((item) => item.value),
      lightTime: data
        .filter((item) => item._id.type === "Light")
        .map((item) =>
          transferTime(
            time === "day" && numDays === 2 ? "days" : time,
            item.createAt
          )
        ),
      humidityTime: data
        .filter((item) => item._id.type === "Humi")
        .map((item) =>
          transferTime(
            time === "day" && numDays === 2 ? "days" : time,
            item.createAt
          )
        ),
      temperatureTime: data
        .filter((item) => item._id.type === "Temp")
        .map((item) =>
          transferTime(
            time === "day" && numDays === 2 ? "days" : time,
            item.createAt
          )
        ),
    });
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
};
exports.getRecordByTime = async (req, res, next) => {
  try {
    from = new Date(req.query.from);
    to = new Date(req.query.to);
    page = req.query.page;
    data_type = req.query.type;
    if (data_type == "All") {
      data_type = ["Humi", "Temp", "Light"];
    }
    const LIMIT = 10;
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await record.countDocuments({
      createAt: {
        $gte: moment(from).toISOString(),
        $lte: moment(to).toISOString(),
      },
      type: data_type,
    });
    const records = await record
      .find({
        createAt: {
          $gte: moment(from).toISOString(),
          $lte: moment(to).toISOString(),
        },
        type: data_type,
      })
      .limit(LIMIT)
      .sort({ createAt: -1 })
      .skip(startIndex);
    res.status(200).json({ data: records, totalPages: total });
  } catch (err) {
    console.log(err);
  }
};
exports.getAvegareValues = async (req, res, next) => {
  try {
    let date = new Date();
    date.setHours(0, 0, 0, 0).toLocaleString();
    let today = await record.aggregate([
      {
        $match: { createAt: { $gte: new Date(date), $lt: new Date() } },
      },
      {
        $group: {
          _id: { type: "$type" },
          value: { $avg: "$value" },
        },
      },
    ]);

    date = new Date(
      date - (date.getDay() === 0 ? 6 : date.getDay() - 1) * 86400000
    );
    let week = await record.aggregate([
      {
        $match: { createAt: { $gte: date, $lt: new Date() } },
      },
      {
        $group: {
          _id: { type: "$type" },
          value: { $avg: "$value" },
        },
      },
    ]);

    date.setDate(date.getDate() - 30);
    date = new Date(date - (date.getDate() - 1) * 86400000);
    let month = await record.aggregate([
      {
        $match: { createAt: { $gte: date, $lt: new Date() } },
      },
      {
        $group: {
          _id: { type: "$type" },
          value: { $avg: "$value" },
        },
      },
    ]);

    let temp1 = today.find((item) => item._id.type === "Temp");
    let temp2 = week.find((item) => item._id.type === "Temp");
    let temp3 = month.find((item) => item._id.type === "Temp");

    let light1 = today.find((item) => item._id.type === "Light");
    let light2 = week.find((item) => item._id.type === "Light");
    let light3 = month.find((item) => item._id.type === "Light");

    let humi1 = today.find((item) => item._id.type === "Humi");
    let humi2 = week.find((item) => item._id.type === "Humi");
    let humi3 = month.find((item) => item._id.type === "Humi");
    res.send({
      today: {
        temp: temp1 ? temp1.value : 0.0,
        light: light1 ? light1.value : 0.0,
        humi: humi1 ? humi1.value : 0.0,
      },
      this_week: {
        temp: temp2 ? temp2.value : 0.0,
        light: light2 ? light2.value : 0.0,
        humi: humi2 ? humi2.value : 0.0,
      },
      this_month: {
        temp: temp3 ? temp3.value : 0.0,
        light: light3 ? light3.value : 0.0,
        humi: humi3 ? humi3.value : 0.0,
      },
      last_updated: new Date(),
    });
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

exports.getTemp = async () => {
  try {
    let temperature = await record
      .find({ type: "Temp" })
      .sort({ createAt: -1 })
      .limit(1);
    return temperature;
  } catch (err) {
    console.log(err);
  }
};

exports.getLight = async () => {
  try {
    let light = await record
      .find({ type: "Light" })
      .sort({ createAt: -1 })
      .limit(1);
    return light;
  } catch (err) {
    console.log(err);
  }
};

exports.getHumi = async () => {
  try {
    let humi = await record
      .find({ type: "Humi" })
      .sort({ createAt: -1 })
      .limit(1);
    return humi;
  } catch (err) {
    console.log(err);
  }
};

exports.createRandomData = async (req, res, next) => {
  let data = [];
  const DAY = 86400000;
  const TIME_SLOT = 300000; // cứ 30 giây thêm 1 records, 1 ngày = 2880, 1 tháng = 30 ngày 86400 records
  // Số lượng records lớn có thể gây đứng máy :v
  const NUM_DAYS = 60; // Số ngày cần tạo dữ liệu
  let date1 = new Date(new Date().getTime() - NUM_DAYS * DAY);
  date1.setHours(0, 0, 12, 0);
  let date2 = new Date(new Date().getTime() - NUM_DAYS * DAY);
  date2.setHours(0, 0, 13, 0);
  let date3 = new Date(new Date().getTime() - NUM_DAYS * DAY);
  date3.setHours(0, 0, 14, 0);

  for (let i = 0; i < NUM_DAYS * (DAY - 1); i += TIME_SLOT) {
    if (date1.getTime() + i < new Date().getTime()) {
      data.push({
        value:
          20 +
          (Math.random() > 0.5
            ? Number((Math.random() * 20).toFixed(1))
            : Math.floor(Math.random() * 20)),
        createAt: new Date(date1.getTime() + i),
        type: "Temp",
        dev_id: "100",
      });
      data.push({
        value:
          20 + Math.random() > 0.5
            ? Number((Math.random() * 2000).toFixed(1))
            : Math.floor(Math.random() * 2000),
        createAt: new Date(date2.getTime() + i),
        type: "Light",
        dev_id: "101",
      });
      data.push({
        value:
          0 + Math.random() > 0.5
            ? Number((Math.random() * 100).toFixed(1))
            : Math.floor(Math.random() * 100),
        createAt: new Date(date3.getTime() + i),
        type: "Humi",
        dev_id: "102",
      });
    }
  }

  try {
    // clear records cũ:
    await record.deleteMany({});

    // Thêm records mới
    await record.insertMany(data);
  } catch (err) {
    console.log(err);
  }
  res.send([]);
};
