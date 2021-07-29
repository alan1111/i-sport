const { test } = require("./v1/test");
const { addUser, checkUser } = require("./v1/module");

module.exports.route = (app) => {
  app.get("/echo/:name", test);
  app.post("/user/add", addUser);
  app.post("/user/check", checkUser);
};
