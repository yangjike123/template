import { NextFunction, Request, Response } from 'express';
import { HttpCode, HttpCodeMsg } from '../../types/httpCode';
import config from '../config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IJwtInfo } from '../../types/IUser';
import AccountModel from '../models/account';

const whiteList = ['/user/login', '/user/code'];
export default async function varifyJwt(req: Request, res: Response, next: NextFunction) {
    try {
        const url = req.url.replace(config.apiPrefix, '');
        const token = req.cookies[config.cookieName];
        if (whiteList.includes(url)) return next(); // 如果在白名单内跳过
        else { // 不在白名单内校验token
            if (!token) throw HttpCodeMsg.Unauthorized; // 如果没有token结束返回
            const { userId } = jwt.verify(token, config.jwtSecret) as IJwtInfo & JwtPayload;
            if (!userId) throw HttpCodeMsg.Unauthorized; // 如果里面没有userId结算返回
            else {
                const user = await AccountModel.findByPk(userId, { include: ['role'] });
                if (!user) throw HttpCodeMsg.Unauthorized; // 如果userId查询失败结束返回
                else {
                    req['user'] = user.toJSON();
                    req['userId'] = userId;
                }; // 把userId挂载到req上 
                // 查询数据库 判断用户是否存在
                next();
            }
        }
    } catch (error) {
        // 如果校验失败就是未授权
        res.status(HttpCode.Unauthorized).json({
            message: error,
            status: HttpCode.Unauthorized
        });
    }
}