export default {
    dbConfig: {
        development: { // 开发环境数据库链接
            dataBaseName: 'test',
            account: 'root',
            password: 'root',
            host: '127.0.0.1',
            port: 3308,
            dialect: 'mysql',
        },
        production: { // 测试环境数据库链接
            dataBaseName: 'test',
            account: 'root',
            password: 'root',
            host: '127.0.0.1',
            port: 3308,
            dialect: 'mysql',
        }
    },
    apiPrefix: '/v1/api',
    cookieName: 'TOKEN_COOKIE',
    sessionSecretKey: 'secretKey',
    jwtSecret: 'jwtCode606355683',
}