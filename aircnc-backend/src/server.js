const express = require("express");
const mongoose = require("mongoose");
const socketio = require("socket.io");
const cors = require("cors");
const path = require("path");
const http = require("http");

const routes = require("./routes");

const app = express();
const server = http.Server(app);
const io = socketio(server);

mongoose.connect(process.env.DAB || "mongodb://localhost:27017/omnistack", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const connectedUsers = {};

io.on("connection", socket => {
  const { user_id } = socket.handshake.query;
  console.log(user_id, socket.id);
  connectedUsers[user_id] = socket.id;
});

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
});

app.use(cors());
app.use(express.json());
app.use(routes);
app.use("/files", express.static(path.resolve(__dirname, "..", "uploads")));

server.listen(3333);
