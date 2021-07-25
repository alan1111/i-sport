const restify = require("restify");
const { route } = require("./handle/route");

const server = restify.createServer({
  name: "i-sports",
  version: "1.0.0",
});

//before route choose 
server.pre(restify.plugins.pre.userAgentConnection());
//after router choose ,before handler
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser({mapParams: false}));
server.use(restify.plugins.bodyParser());
// server.use(restify.CORS())
// server.use(restify.CORS({

//   // Defaults to ['*'].
//   origins: ['http://localhost:3000', 'http://bar.com', 'http://baz.com:8081'], 

//   // Defaults to false.
//   credentials: true,

//   // Sets expose-headers.
//   headers: ['x-foo']   

// }));

server.use(
  function crossOrigin(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", req.header("Access-Control-Request-Method"));
    res.header("Access-Control-Allow-Headers", req.header("Access-Control-Request-Headers"));
    res.send(200);
    return next();
  }
);


route(server);

server.listen(3001, function () {
  console.log("%s listening at %s", server.name, server.url);
});
