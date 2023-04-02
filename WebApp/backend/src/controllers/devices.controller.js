let DeviceModel = require('../models/devices.model').model

exports.getAll = async (req, res) => {
    try {
        let data = await DeviceModel.find().exec()
        res.status(200).send(data)
    } catch (error) {
        console.log(error)
       res.status(500).send(error);
    }
}

exports.updateDevice = async (req, res) => {
    try {
        let device = await DeviceModel.findById(req.params.id).exec() 
        device.set(req.body);
        let result = await device.save() ;
        res.status(200).send(result)
    } catch (error) {
       res.status(500).send(error);
    }
}
