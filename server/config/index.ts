import { SequelizeOptions } from "sequelize-typescript";
const ENVBOL = process.env.NODE_ENV === 'development';
// console.log('process.env.NODE_ENV: ', ENVBOL);
import { ECookies } from "../../types/ECookies";
interface Config {
    dbConfig: {
        development: SequelizeOptions;
        production: SequelizeOptions;
    },
    apiPrefix: string;
    cookieName: string;
    sessionSecretKey: string;
    jwtSecret: string;
}
export default {
    dbConfig: {
        development: { // 开发环境数据库链接
            database: 'test',
            username: 'root',
            password: 'root',
            host: '127.0.0.1',
            port: 3308,
            dialect: 'mysql',
            define: {
                timestamps: false, // 关闭自动添加时间戳
            },
            timezone: '+08:00', //东八时区

        },
        production: { // 测试环境数据库链接
            database: 'test',
            username: 'root',
            password: 'root',
            host: '127.0.0.1',
            port: 3308,
            dialect: 'mysql',
            timezone: '+08:00', //东八时区
            define: {
                timestamps: false, // 关闭自动添加时间戳
            },
            models: [__dirname + '/models/*.ts'],
        }
    },
    apiPrefix: '/v1/api',
    cookieName: ECookies.TOKENCOOKIENAME,
    sessionSecretKey: 'secretKey',
    jwtSecret: 'jwtCode606355683',
} as Config;