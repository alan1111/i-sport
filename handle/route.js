const { test } = require("./v1/test");

module.exports.route = (server) => {
  server.get("/echo/:name", test);
};
