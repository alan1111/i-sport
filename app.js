const express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
const { route } = require("./handle/route");

const app = express();
// 解决跨域问题
const allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://dev.iyunbao.com:8081"); //自定义中间件，设置跨域需要的响应头。
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, x-custom, Content-Type");
  res.header("Access-Control-Allow-Credentials", "true"); //和客户端对应，必须设置以后，才能接收cookie.
  next();
};

app.use(allowCrossDomain); //运用跨域的中间件
app.use(cookieParser()); //运用cookie解析的中间件
app.use(bodyParser.text());
route(app);

app.listen(3000, () => {
  console.log("正在监听3000端口");
});
