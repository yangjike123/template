import { Request } from "express";
import { Session } from "express-session";

// 这么在express Response对象里面添加一个新函数

declare global {
    namespace Express {
        interface Request {
            userId: number;
        }
    }
}
declare type DataType = 'string' | 'number' | 'boolean' | 'object' | 'symbol' | 'bigint';