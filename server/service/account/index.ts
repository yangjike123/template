import { Request, Response } from 'express';
import AccountModel from '../../models/account';
import { HttpCode, HttpCodeMsg } from '../../../types/httpCode';
import { exclude, setQueryPayload } from '../../utils';
import { IAccount, IAccountSearchParams } from '../../../types/IAccount';
import { Op } from 'sequelize';
import RoleModel from '../../models/role';
import DepartmentModel from '../../models/department';
import dayjs from 'dayjs';

// 创建账户
async function createAccount(req: Request, res: Response) {
    try {
        const data = await AccountModel.create(req.body);
        res.status(HttpCode.Ok).json({
            status: HttpCode.Ok,
            message: HttpCodeMsg.CreatedSuccess,
            data: exclude<IAccount>(data.toJSON(), ['password']),
        });
    } catch (error) {
        res.status(HttpCode.BadRequest).send(error);
    }
}

// 查询账户
async function getAccount(req: Request, res: Response) {
    try {
        const query = setQueryPayload(req.query as unknown as IAccountSearchParams);
        const where = {};
        query.account && Object.assign(where, { account: { [Op.like]: `%${query.account}%` } });
        query.username && Object.assign(where, { username: { [Op.like]: `%${query.username}%` } });
        query.sex && Object.assign(where, { sex: query.sex });
        query.status && Object.assign(where, { status: query.status });
        if (query.startTime && query.endTime) Object.assign(where, { createdAt: { [Op.between]: [query.startTime, query.endTime] } });

        const { count, rows } = await AccountModel.findAndCountAll({
            attributes: { exclude: ['password'] },
            include: [RoleModel, DepartmentModel],
            where,
            offset: query.offset,
            limit: query.limit,
        });
        res.status(HttpCode.Ok).json({
            status: HttpCode.Ok,
            message: HttpCodeMsg.Ok,
            data: rows,
            total: count,
        });
    } catch (error) {
        res.status(HttpCode.BadRequest).json({
            status: HttpCode.BadRequest,
            message: error,
        });
    }
}

// 查询账户详情
async function getAccountById(req: Request, res: Response) {
    try {
        const data = await AccountModel.findByPk(req.params.id, {
            attributes: { exclude: ['password'] },
            include: [RoleModel, DepartmentModel]
        });
        if (!data) throw '账户不存在';
        res.status(HttpCode.Ok).json({
            status: HttpCode.Ok,
            message: HttpCodeMsg.UpdatedSuccess,
            data: data.toJSON(),
        });
    } catch (error) {
        res.status(HttpCode.BadRequest).json({
            status: HttpCode.BadRequest,
            message: error,
        });
    }
}

// 更新账户
async function updateAccount(req: Request, res: Response) {
    try {
        const data = await AccountModel.findByPk(req.params.id, { attributes: { exclude: ['password'] } });
        if (!data) throw '账户不存在';
        const result = await data.update({ ...req.body, updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss') });
        res.status(HttpCode.Ok).json({
            status: HttpCode.Ok,
            message: HttpCodeMsg.UpdatedSuccess,
            data: result.toJSON(),
        });
    } catch (error) {
        res.status(HttpCode.BadRequest).json({
            status: HttpCode.BadRequest,
            message: error,
        });
    }
}

// 删除账户
async function deleteAccount(req: Request, res: Response) {
    try {
        const data = await AccountModel.findByPk(req.params.id);
        if (!data) throw '账户不存在';
        await data.destroy();
        res.status(HttpCode.Ok).json({
            status: HttpCode.Ok,
            message: HttpCodeMsg.DeleteSuccess,
        });
    } catch (error) {
        res.status(HttpCode.BadRequest).json({
            status: HttpCode.BadRequest,
            message: error,
        });
    }
}

// 修改密码
async function updatePassword(req: Request, res: Response) {
    try {
        const data = await AccountModel.findByPk(req['userId']);
        const result = await data.update({
            password: req.body.password,
            updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss')
        });
        res.status(HttpCode.Ok).json({
            status: HttpCode.Ok,
            message: HttpCodeMsg.UpdatedSuccess,
            data: result.toJSON(),
        });
    } catch (error) {
        res.status(HttpCode.BadRequest).json({
            status: HttpCode.BadRequest,
            message: error,
        });
    }
}

export default { createAccount, getAccount, updateAccount, deleteAccount, getAccountById, updatePassword };
