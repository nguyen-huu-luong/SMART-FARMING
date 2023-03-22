let express = require("express")
let cors = require('cors')
let bodyParse = require('body-parser')
let socketServer = require('socket.io')
let http = require('http');
let load = require('./loaders/index')
let route = require("../src/routers/index").route

require('dotenv').config()

const startServer = async () => {
    try {
        let app = express()
        app.use(bodyParse())
        let server = http.Server(app);

        let socket = socketServer(server, {
            cors: {
                origin: 'http://localhost:3000'
            }
        })

        console.log("Create socket")
        await load.loader(socket)

        app.use(cors({
            origin: ['http://localhost:3000'],
            credentials: true
        }))

        socket.on('connection', (socket) => {
            console.log('We have new connection !!!');
            socket.on('disconnect', () => {
                console.log('User has left !!!')
            });
        });

        route(app)
        server.listen(process.env.PORT || 3003, () => {
            console.log("Connect to port", process.env.PORT)
        })

    }
    catch (err) {
        console.log(err)
    }
}

startServer()