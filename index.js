const server = require("./server.js");
const dotenv = require("dotenv");
const { connect, grpc } = require("./server.js");

dotenv.config();

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
