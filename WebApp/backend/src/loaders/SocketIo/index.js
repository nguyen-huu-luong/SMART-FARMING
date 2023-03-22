let express = require("express");
const server = require("http").createServer(express());
let socketIo = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
const connect = () => {
  socketIo.on("connection", (socket) => {
    ///Handle khi có connect từ client tới
    console.log("New client connected" + socket.id);

    socket.on("disconnect", () => {
      console.log("Client disconnected"); // Khi client disconnect thì log ra terminal.
    });
  });
  server.listen(3001, () => {
    console.log("Socket server đang chay tren cong 3001");
  });
};

module.exports = { socketIo, connect };
