let record = require("../models/records.model").model;

const transferTime = (type, time) => {
  if (type === "today" || type === "yesterday" || type === "day") {
    return time.toLocaleString('en-GB', {hour: '2-digit', minute:'2-digit', hour12: false})
  } else if (type === "week"){
    return time.toLocaleString("en-US", {
      hour: '2-digit',
      minute: '2-digit',
      weekday: "long",
      hour12: false
    }
    )
  } else if (type === "month" || type === "avgDay") {
    return time.toLocaleString("en-US", {
      day: "numeric",
      month: 'long',
      year: 'numeric'
    })
  } else if (type === "days") {
   return time.toLocaleString("en-US", {
    day: "numeric" ,
    month: 'long',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit'
   })
  }
}
exports.getOne = async (req, res, next) => {
  try {
    let temperature = await record.find({ type: "Temp" }).sort({ createAt: -1 }).limit(1);
    let light = await record.find({ type: "Light" }).sort({ createAt: -1 }).limit(1);
    let humi = await record.find({ type: "Humi" }).sort({ createAt: -1 }).limit(1);
    res.status(200).send([temperature[0], light[0], humi[0]]);
  } catch (err) {
    res.status(500).send(err);
  }
};
exports.getAll = async (req, res, next) => {
  try {
    let data = await record.find({}).limit(20).sort({ createAt: - 1 });
    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getByTime = async (req, res, next) => {
  let time = req.params.time;
  let data = [];
  let endTime = new Date() ;
  let startTime = new Date();
  let numDays = 0 ;
  try {
    if (time === "range") {
      let from = req.query.from ;
      let to = req.query.to ;
      if (from && to && !isNaN(Date.parse(from)) && !isNaN(Date.parse(to)))  {
        startTime = new Date(from)
        endTime = new Date(to) 
      } else {
        return res.status(400).send({error: "Invalid argument!", message: "'from'and 'to' are validated date format and required"})
      } 

      numDays = Math.ceil((endTime - startTime) / 86400000) ;
      if (numDays <= 2) {
        time = "day"
      } else if (numDays <= 12) {
        time = "days"
      } else if (numDays <= 45) {
        time = "avgDay"
      } else {
        return res.status(400).send({error: "Out of range!", message: "Maximum range is 45 days"})
      }
    }
  
    if (time === "today" || time === "yesterday" || time === "day") {
      if (time === "yesterday") {
        startTime.setDate(startTime.getDate()-1)
        startTime.setHours(0,0,0,0)
        endTime.setDate(endTime.getDate()-1)
        endTime.setHours(23,59,59,999)
      } else if (time === "today") {
        startTime = new Date()
        startTime.setHours(0,0,0,0)
        endTime = new Date()
      }
      data = await record.aggregate([
        {
          $match: {
            createAt: {$gt: startTime, $lt: endTime},
          },
        },
        {
          $group: {
            _id: {
              hour: { $hour: "$createAt" },
              date: {
                $dateToString: { format: "%Y-%m-%d", date: "$createAt" },
              },
              type: "$type"
            },
            value: {$first: "$$ROOT.value" },
            createAt: {$first: "$$ROOT.createAt"}
          },
        },
        {
          $sort: {
            "createAt": 1,
          },
        },
      ]);
    } else if (time === "week" || time === "days") {
      if (time === "week") {
        startTime = new Date()
        startTime = new Date(startTime - (startTime.getDay() == 0 ? 6 : startTime.getDay() - 1)*86400000)
        startTime.setHours(0,0,0,0)
        endTime = new Date()
        endTime.setHours(23,59,59,999)
      }
      data = await record.aggregate([
        {
          $match: {
            createAt: {$gte: startTime, $lt: endTime},
            $expr: {$in: [{$hour: "$createAt"}, [0,6,12,18]]}
          },
        },
        {
          $group: {
            _id: {
              hour: { $hour: "$createAt" },
              date: {
                $dateToString: { format: "%Y-%m-%d", date: "$createAt" },
              },
              type: "$type"
            },
            value: {$first: "$$ROOT.value" },
            createAt: {$first: "$$ROOT.createAt"}
          }
        },

        {
          $sort: {"createAt": 1}
        }
      ])

    } else if (time === "month" || time === "avgDay") {
      if (time === "month") {
        startTime.setDate(startTime.getDate()-30)
        endTime.setDate(endTime.getDate()-1)
        startTime = new Date(startTime - (startTime.getDate()-1)*86400000)
        startTime.setHours(0,0,0,0)
        endTime.setHours(23,59,59,999)
      }

      data = await record.aggregate([
        {
          $match: {"createAt": {$gt: startTime, $lt: endTime},},
        },
        {
          $group: {
            _id: {
              date: {
                $dateToString: { format: "%Y-%m-%d", date: "$createAt" },
              },
              type: "$type",
            },
            data: {$push: "$value"},
            value: {$avg: "$value"},
            createAt: {$first: "$$ROOT.createAt"}
          }
        },

        {
          $sort: {"createAt": 1}
        }
      ])
    } 

    res.send({
      from: startTime,
      to: endTime,
      is_avg_value: time === "month" || time === "avgDay",
      ligth : data.filter(item => (item._id.type === "Light")).map(item => item.value),
      temperature : data.filter(item => (item._id.type === "Temp")).map(item => item.value),
      humidity : data.filter(item => (item._id.type === "Humi")).map(item => item.value),
      lightTime: data.filter(item =>item._id.type === "Light").map((item) => transferTime(time === "day" && numDays === 2 ? "days" : time, item.createAt)),
      humidityTime: data.filter(item => item._id.type === "Humi").map((item) =>  transferTime(time === "day" && numDays === 2 ? "days" : time, item.createAt)),
      temperatureTime: data.filter(item => item._id.type === "Temp").map((item) =>  transferTime(time === "day" && numDays === 2 ? "days" : time, item.createAt)),
    });
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
};

exports.getAvegareValues = async(req, res, next) => {
  try {
    let date = new Date()
    date.setHours(0,0,0,0).toLocaleString()
    let today = await record.aggregate([
      {
        $match: {createAt: {$gte: new Date(date),  $lt: new Date()}}
      }, {
        $group: {
          _id: { type: "$type" },
          value: {$avg: "$value"}
        }
      }
    ])

    date = new Date(date - (date.getDay() === 0 ? 6 : date.getDay() - 1)*86400000)
    let week = await record.aggregate([
      {
        $match: {createAt: {$gte: date,  $lt: new Date()}}
      }, {
        $group: {
          _id: { type: "$type" },
          value: {$avg: "$value"}
        }
      }
    ])

    date.setDate(date.getDate()-30)
    date = new Date(date - (date.getDate()-1)*86400000) ;
    let month = await record.aggregate([
      {
        $match: {createAt: {$gte: date,  $lt: new Date()}}
      }, {
        $group: {
          _id: { type: "$type" },
          value: {$avg: "$value"}
        }
      }
    ])

    res.send({
      today: {
        temp: today.find(item => item._id.type === "Temp").value,
        light: today.find(item => item._id.type === "Light").value,
        humi: today.find(item => item._id.type === "Humi").value
      },
      this_week: {
        temp: week.find(item => item._id.type === "Temp").value,
        light: week.find(item => item._id.type === "Light").value,
        humi: week.find(item => item._id.type === "Humi").value
      },
      this_month: {
        temp: month.find(item => item._id.type === "Temp").value,
        light: month.find(item => item._id.type === "Light").value,
        humi: month.find(item => item._id.type === "Humi").value
      },
      last_updated: new Date()
    })

  } catch (error) {
    res.status(500).send(error)
    console.log(error)
  }
}

/*
  {
    today: {
      humi:
      temp:
      light: 
    },
    this_week: {
      humi:
      temp:
      light:
    },

    this_month: {
      humi:
      temp:
      light:
    }

    last_updated: 
  }
*/

exports.createRandomData = async (req, res, next) => {
  let data = [];
  const DAY = 86400000
  const TIME_SLOT =  30000 // cứ 30 giây thêm 1 records, 1 ngày = 2880, 1 tháng = 30 ngày 86400 records
  // Số lượng records lớn có thể gây đứng máy :v 
  const NUM_DAYS = 0 // Số ngày cần tạo dữ liệu
  let date1 = new Date(new Date().getTime() - NUM_DAYS*DAY);
  date1.setHours(0, 0, 12, 0);
  let date2 = new Date(new Date().getTime() - NUM_DAYS*DAY);
  date2.setHours(0, 0, 13, 0);
  let date3 = new Date(new Date().getTime() - NUM_DAYS*DAY);
  date3.setHours(0, 0, 14, 0); 

  for (let i = 0; i < NUM_DAYS*DAY + 86400000; i += TIME_SLOT) {
    data.push({
      value: 20 + (Math.random() > 0.5 ? Number((Math.random() * 20).toFixed(1)) : Math.floor(Math.random()*20)),
      createAt: new Date(date1.getTime() + i),
      type: "Temp",
      dev_id: "100",
    });
    data.push({
      value: 20 + Math.random() > 0.5 ? Number((Math.random() * 2000).toFixed(1)) : Math.floor(Math.random()*2000),
      createAt: new Date(date2.getTime() + i),
      type: "Light",
      dev_id: "101",
    });
    data.push({
      value: 0 + Math.random() > 0.5 ? Number((Math.random() *100).toFixed(1)) : Math.floor(Math.random()*100),
      createAt: new Date(date3.getTime() + i),
      type: "Humi",
      dev_id: "102",
    });

  }

  // Thêm records vô mongoDB bằng hàm dưới dây
  result = await record.insertMany(data).catch(err => console.log(err))
  res.send([result]);
  // res.send(data) // trong trường hợp muốn xem trước dữ liệu, 
                         //nếu thêm số lượng lớn thì kh nên chạy dòng này vì kết quả trả về có thể lên đến hàng triệu dòng :v
};
