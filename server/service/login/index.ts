import { Request, Response } from 'express';
import { HttpCode, HttpCodeMsg } from '../../../types/httpCode';
import { IAccountLogin } from '../../../types/IAccount';
import config from '../../config';
import jwt from 'jsonwebtoken';
import svgCaptcha from 'svg-captcha';
import { Session } from 'express-session';
import AccountModel from '../../models/account';
import { md5 } from '../../utils';
import RoleModel from '../../models/role';
import DepartmentModel from '../../models/department';
// 登录
async function login({ body }: Request, res: Response) {
    const { account, password } = body as IAccountLogin;
    const data = await AccountModel.findOne({ where: { account }, include: [RoleModel, DepartmentModel] });
    if (data.password === md5(password)) {
        const token = jwt.sign({ userId: data.id }, config.jwtSecret, { expiresIn: '2d' });//存储时间为48小时
        res.cookie(config.cookieName, token);
        delete data.dataValues.password;
        res.status(HttpCode.Ok).json({
            status: HttpCode.Ok,
            message: HttpCodeMsg.Ok,
            data: { ...data.dataValues, token }
        });
    }
};
// 获取用户信息
async function getUserInfo(req: Request, res: Response) {
    const userId = req['userId'];
    const data = await AccountModel.findByPk(userId, {
        include: [RoleModel, DepartmentModel],
        attributes: { exclude: ['password'] }
    });
    res.status(HttpCode.Ok).json({
        status: HttpCode.Ok,
        message: HttpCodeMsg.Ok,
        data: data.toJSON(),
    });
};

async function getCode(req: Request, res: Response) {
    const captcha = svgCaptcha.create({
        size: 6, //验证码长度
        fontSize: 45, //验证码字号
        noise: 2, //干扰线条数目
        width: 100, //宽度
        height: 36, //高度
        color: true, //验证码字符是否有颜色，默认是没有，但是如果设置了背景颜色，那么默认就是有字符颜色
        background: '#ccc' //beijing
    });
    (req.session as Session & { captcha: string }).captcha = captcha.text;
    // console.log('captcha.text: ', captcha.text);
    res.status(HttpCode.Ok).json({
        status: HttpCode.Ok,
        message: HttpCodeMsg.Ok,
        data: captcha.data
    });
}

export default { login, getUserInfo, getCode };