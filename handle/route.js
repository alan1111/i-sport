const { test } = require("./v1/test");

const route = (server) => {
  server.get("/echo/:name", test);
};

module.exports = {
  route,
};
