let express = require("express");
let cors = require("cors");
let bodyParse = require("body-parser");
let load = require("./loaders/index");
let socketServer = require('socket.io')
let http = require('http');
let route = require("../src/routers/index").route;
let service = require("./services/schedule.service").scheduleService
let client = require('socket.io-client')

require("dotenv").config();

const startServer = async () => {
  try {
    let app = express();
    app.use(bodyParse());
    let server = http.Server(app);

    let socket = socketServer(server, {
      cors: {
        origin: '*',
      },
    });
    socket.on("connection", (socket) => {
      console.log("We have new connection !!!");
      socket.on("disconnect", () => {
        console.log("User has left !!!");
      });
    });
    console.log("Create socket");
    await load.loader(socket);

    app.use(
      cors({
        origin: "*",
        credentials: true,
      })
    );
    const clientIO = client.connect(process.env.HOST || "http://localhost:3003")
    // Schedule service
    route(app);
    server.listen(process.env.PORT || 3003, () => {
      console.log("Connect to port", process.env.PORT);
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();
