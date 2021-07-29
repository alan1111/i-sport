const { test } = require("./v1/test");
const { addUser, getUser } = require("./v1/module");

module.exports.route = (app) => {
  app.get("/echo/:name", test);
  app.post("/add", addUser);
  app.get("/all", getUser);
};
