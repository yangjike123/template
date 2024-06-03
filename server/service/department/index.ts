import { Request, Response } from 'express';
import { HttpCode, HttpCodeMsg } from '../../../types/httpCode';
import DepartmentModel from '../../models/department';
import AccountModel from '../../models/account';
import { combineChildren, setQueryPayload } from '../../utils';
import { ICreateDepartment, IDepartment, ISearchDepartmentParams } from '../../../types/IDepartment';
import { Op } from 'sequelize';
import dayjs from 'dayjs';
// 创建部门
async function createDepartment(req: Request, res: Response) {
    try {
        const data = await DepartmentModel.create(req.body as Request['body'] & ICreateDepartment);
        res.status(HttpCode.Ok).json({
            status: HttpCode.Ok,
            message: HttpCodeMsg.CreatedSuccess,
            data
        })
    } catch (error) {
        res.status(HttpCode.BadRequest).json({
            status: HttpCode.BadRequest,
            message: error
        })
    }
}

// 更新部门信息
async function updateDepartment(req: Request, res: Response) {
    try {
        const data = await DepartmentModel.findByPk(req.params.id);
        req.body['updatedAt'] = dayjs().format('YYYY-MM-DD HH:mm:ss');
        await data.update(req.body as ICreateDepartment);
        res.status(HttpCode.Ok).json({
            status: HttpCode.Ok,
            message: HttpCodeMsg.UpdatedSuccess,
            data: data.toJSON()
        })
    } catch (error) {
        res.status(HttpCode.BadRequest).json({
            status: HttpCode.BadRequest,
            message: error
        })
    }
}

// 查询部门列表
async function getDepartment(req: Request, res: Response) {
    try {
        const query = setQueryPayload(req.query as qs.ParsedQs & ISearchDepartmentParams);
        const where = {};
        query.name && Object.assign(where, { name: { [Op.like]: `%${query.name}%` } });
        query.departmentLeaderId && Object.assign(where, { departmentLeaderId: query.departmentLeaderId });
        const { rows, count } = await DepartmentModel.findAndCountAll({
            include: [{
                model: AccountModel,
                as: 'departmentLeader',
                foreignKey: 'departmentLeaderId',
                attributes: ['username', 'account']
            }],
            where,
            limit: query.limit,
            offset: query.offset,
        });
        res.status(HttpCode.Ok).json({
            status: HttpCode.Ok,
            message: HttpCodeMsg.Ok,
            data: combineChildren<IDepartment>(JSON.parse(JSON.stringify(rows)), { parentId: 'departmentParentId' }),
            total: count
        });
    } catch (error) {
        res.status(HttpCode.BadRequest).json({
            status: HttpCode.BadRequest,
            message: error
        });
    }
}

// 查询部门详情
async function getDepartmentById(req: Request, res: Response) {
    try {
        if (!req.params.id) throw 'ID不能为空';
        const data = await DepartmentModel.findByPk(req.params.id, {
            include: [{
                model: AccountModel,
                as: 'departmentLeader',
                foreignKey: 'departmentLeaderId',
                attributes: ['username', 'account']
            }]
        });
        if (!data) throw '部门不存在';
        res.status(HttpCode.Ok).json({
            status: HttpCode.Ok,
            message: HttpCodeMsg.Ok,
            data
        });
    } catch (error) {
        res.status(HttpCode.BadRequest).json({
            status: HttpCode.BadRequest,
            message: error
        });
    }
}



// 删除部门
async function deleteDepartment(req: Request, res: Response) {
    try {
        const list = await DepartmentModel.findAll({ where: { departmentParentId: req.params.id } });
        if (list.length > 0) throw `存在子部门，无法删除 【${list.map(t => t.name).join('，')}】`;

        if (!req.params.id) throw 'ID不能为空';
        const data = await DepartmentModel.findByPk(req.params.id);
        if (!data) throw '部门不存在';
        await data.destroy();
        res.status(HttpCode.Ok).json({
            status: HttpCode.Ok,
            message: HttpCodeMsg.DeleteSuccess,
        });
    } catch (error) {
        res.status(HttpCode.BadRequest).json({
            status: HttpCode.BadRequest,
            message: error
        });
    }
}

export default {
    createDepartment,
    getDepartment,
    getDepartmentById,
    updateDepartment,
    deleteDepartment
};