import { Sequelize } from "sequelize-typescript";
import config from "../config";
const environmental = process.env.NODE_ENV === 'development' ? 'development' : 'production';
const ENVBOL = process.env.NODE_ENV === 'development';
export default function initModels() {
    const { database, username, password, host, port, dialect, define, timezone } = config.dbConfig[environmental];
    const sequelize = new Sequelize({
        database,
        username,
        password,
        host,
        port,
        dialect,
        define,
        timezone,
        logging: false && console.log, // 设置日志输出
        models: [__dirname.replace('config', '') + '/models/*.ts'], // 自动引入models文件夹下的所有模
    });

    sequelize.sync({ force: false, alter: true }).then(() => {
        console.log('success');
    }).catch((err) => {
        console.log(err);
    })
    return sequelize;
}
