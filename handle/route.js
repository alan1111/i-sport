const { test } = require("./v1/test");
const { addUser, checkUser } = require("./v1/module");

module.exports.route = (server) => {
  server.get("/echo/:name", test);
  server.post("/user/add", addUser);
  server.post("/user/check", checkUser);
};
