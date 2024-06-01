import { Request, Response } from 'express';
import RoleModel from '../../models/role';
import { setQueryPayload } from '../../utils';
import { ICreateRole, IRoleSearchParams, IUpdateRole } from '../../../types/IRole';
import { HttpCode, HttpCodeMsg } from '../../../types/httpCode';
import { Op } from 'sequelize';
import dayjs from 'dayjs';

// 创建角色
async function createRole(req: Request, res: Response) {
    try {
        const body = req.body as ICreateRole;
        const data = await RoleModel.create(body);
        res.status(HttpCode.Ok).json({
            status: HttpCode.Ok,
            message: HttpCodeMsg.CreatedSuccess,
            data,
        });
    } catch (error) {
        res.status(HttpCode.BadRequest).send(error);
    }
}

// 查询角色列表
async function getRoleList(req: Request, res: Response) {
    try {
        const query = setQueryPayload(req.query as unknown as IRoleSearchParams);
        const where = {};
        query.name && Object.assign(where, { name: { [Op.like]: `%${query.name}%` } });
        query.status && Object.assign(where, { status: query.status });
        const { rows, count } = await RoleModel.findAndCountAll({
            where,
            offset: query.offset,
            limit: query.limit
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
// 查询角色详情
async function getRoleById(req: Request, res: Response) {
    try {
        const data = await RoleModel.findByPk(req.params.id);
        if (!data) throw '角色不存在';
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

// 更新角色
async function updateRole(req: Request, res: Response) {
    try {
        const body = req.body as IUpdateRole;
        const data = await RoleModel.findByPk(req.params.id);
        if (!data) throw '角色不存在';
        const result = await data.update({ ...body, updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss') });
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

// 删除角色
async function deleteRole(req: Request, res: Response) {
    try {
        const data = await RoleModel.findByPk(req.params.id);
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

export default {
    createRole,
    getRoleList,
    getRoleById,
    updateRole,
    deleteRole
};