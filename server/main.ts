import express from "express";
import index from "./routes/index";
import varifyJwt from "./utils/verifyJwt";
import config from "./config";
import cookieParser from "cookie-parser";
import session from "express-session";
import { getLocalIpAddress } from "./utils";
import initModels from "./config/common";

const app = express();
const port = process.env.PORT || 3000;


initModels();
// 允许跨域
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.use(cookieParser()); // 解析cookie 设置
app.use(express.json()); // 允许json传输格式
app.use(express.urlencoded({ extended: false })); // 允许urlencoded传输格式
app.use(session({
  secret: config.sessionSecretKey,  // 每一次在生成Cookie的时候，通过一个私钥生成一个字符串然后再交给客户端(读取我的配置文件里面的私钥key)
  resave: false,
  cookie: { httpOnly: true, maxAge: 60 * 1000 * 5 },
  saveUninitialized: false,
}));
app.use(varifyJwt); // 验证token
app.use(config.apiPrefix, index);// 接口路由
app.listen(port, () => {
  getLocalIpAddress().forEach((ip) => {
    console.log(`http://${ip}:${port}`);
  });
});