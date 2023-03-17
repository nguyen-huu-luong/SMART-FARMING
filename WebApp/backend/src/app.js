let express = require("express")
let cors = require('cors')
let bodyParse = require('body-parser')
let load = require('./loaders/index')
let route = require("../src/routers/index").route
require('dotenv').config()

const startServer = async () => {

    await load.loader()

    let app = express()
    app.use(bodyParse())
    app.use(cors({
        origin: ['http://localhost:3000'],
        credentials: true
    }))
    route(app)
    app.listen(process.env.PORT || 3003, () => {
        console.log("Connect to port", process.env.PORT)
    })

}

startServer()