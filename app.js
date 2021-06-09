const restify = require("restify");
const { route } = require("./handle/route");

const server = restify.createServer({
  name: "i-sports",
  version: "1.0.0",
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

route(server);

server.listen(3000, function () {
  console.log("%s listening at %s", server.name, server.url);
});
