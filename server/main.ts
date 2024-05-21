import express, { Request, Response } from "express";
import index from "./routes/index";
import { HttpCode } from "../types/httpCode";
import varifyJwt from "./utils/verifyJwt";
import config from "./config";
import cookieParser from "cookie-parser";
import { Sequelize } from "sequelize-typescript";
import { Dialect } from "sequelize/types/sequelize";
import session from "express-session";

const app = express();
const port = process.env.PORT || 3000;

const environmental = process.env.NODE_ENV === 'development' ? 'development' : 'production';
const ENVBOL = process.env.NODE_ENV === 'development';
function initModels() {
  const { dataBaseName, account, password, host, port, dialect } = config.dbConfig[environmental];
  const sequelize = new Sequelize({
    database: dataBaseName,
    username: account,
    password: password,
    dialect: dialect as Dialect,
    host,
    port,
    define: {
      timestamps: false, // 关闭自动添加时间戳
    },
    timezone: '+08:00', //东八时区
    logging: ENVBOL ? console.log : false, // 设置日志输出
    models: [__dirname + '/models/*.ts'], // 自动引入models文件夹下的所有模块
  });
  sequelize.sync({ force: false, alter: false }).then(() => {
    console.log('success');
  }).catch((err) => {
    console.log(err);
  })
  return sequelize;
}
initModels();

// 允许跨域
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.json()); // 允许json传输格式
app.use(express.urlencoded({ extended: false })); // 允许urlencoded传输格式
app.use(cookieParser()); // cookie 设置
app.use(session({
  secret: config.sessionSecretKey,  // 每一次在生成Cookie的时候，通过一个私钥生成一个字符串然后再交给客户端(读取我的配置文件里面的私钥key)
  resave: false,
  saveUninitialized: true,
  // cookie : {secure : true }
}));
app.use(varifyJwt); // 验证token
app.use(config.apiPrefix, index);// 接口路由

app.listen(port, () => {
  console.log(`[server]: Server is running at http://127.0.0.1:${port}`);
});
