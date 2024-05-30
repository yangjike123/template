import { Request, Response } from 'express';
import { HttpCode, HttpCodeMsg } from '../../../types/httpCode';
import { IAccount, IAccountLogin } from '../../../types/IAccount';
import config from '../../config';
import jwt from 'jsonwebtoken';
import svgCaptcha from 'svg-captcha';
import AccountModel from '../../models/account';
import { exclude, md5 } from '../../utils';
import RoleModel from '../../models/role';
import DepartmentModel from '../../models/department';
// 登录
const time = 1000 * 60 * 60 * 24 * 30;
async function login(req: Request, res: Response) {
    try {
        const { account, password, code } = req.body as IAccountLogin;
        const captcha: string = req.cookies['captcha'];
        const data = await AccountModel.findOne({
            where: { account },
            include: [RoleModel, DepartmentModel],
        });
        if (data.password !== md5(password)) throw '密码错误';
        if (!data.status) throw '账号已被禁用';
        if (!captcha) throw 'cookie中的缓存已被清除';
        if (code.toLocaleLowerCase() !== captcha.toLocaleLowerCase()) throw '验证码错误';
        const token = jwt.sign({ userId: data.id }, config.jwtSecret, { expiresIn: time });
        res.cookie(config.cookieName, token, { maxAge: time, httpOnly: true });
        res.clearCookie('captcha');
        res.status(HttpCode.Ok).json({
            status: HttpCode.Ok,
            message: HttpCodeMsg.Ok,
            data: { ...exclude<IAccount>(data.dataValues, ['password']), token }
        });
    } catch (error) {
        res.status(HttpCode.BadRequest).json({
            status: HttpCode.BadRequest,
            message: error,
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
        size: 5, //验证码长度
        fontSize: 45, //验证码字号
        noise: 2, //干扰线条数目
        width: 100, //宽度
        height: 36, //高度
        color: true, //验证码字符是否有颜色，默认是没有，但是如果设置了背景颜色，那么默认就是有字符颜色
        background: '#ccc' //beijing
    });
    res.cookie('captcha', captcha.text, { maxAge: 60000, httpOnly: true });
    res.status(HttpCode.Ok).json({
        status: HttpCode.Ok,
        message: HttpCodeMsg.Ok,
        data: captcha.data
    });
}
// 退出登录
async function logout(req: Request, res: Response) {
    res.clearCookie(config.cookieName, { httpOnly: true });
    res.status(HttpCode.Ok).json({
        status: HttpCode.Ok,
        message: HttpCodeMsg.Ok,
    });
}
export default { login, getUserInfo, getCode, logout };