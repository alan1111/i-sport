const { test } = require("./v1/test");
const { addUser, getUser } = require("./v1/module");

module.exports.route = (server) => {
  server.get("/echo/:name", test);
  server.post("/add", addUser);
  server.get("/all", getUser);
};
