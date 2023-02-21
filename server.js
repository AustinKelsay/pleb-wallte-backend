const express = require("express");
const cors = require("cors");
const { connect, grpc } = require("./lnd.js");
const lightningRouter = require("./routers/lightningRouter.js");
const userRouter = require("./routers/userRouter.js");

const server = express();

server.use(express.json());

server.use(cors());

connect();

server.get("/", (req, res) => {
  res.status(200).json({ message: `Welcome! Connection status ${grpc.state}` });
});

server.use("/lightning", lightningRouter);
server.use("/user", userRouter);

module.exports = server;
