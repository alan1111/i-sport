const { test } = require("./v1/test");
const { meican } = require("./v1/module");

module.exports.route = (app) => {
  // app.get("/echo/:name", test);
  // app.post("/user/add", addUser);
  // app.post("/user/check", checkUser);

  app.get("/", meican);
  app.get("/meican", meican);
};
