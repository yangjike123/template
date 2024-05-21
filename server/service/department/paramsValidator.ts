import { body, param, query } from "express-validator";
import verifyPayload from "../../utils/verifyPayload";
import AccountModel from "../../models/account";
import DepartmentModel from "../../models/department";

export default {
    // 创建部门
    createDepartment: verifyPayload([
        body('name').notEmpty().withMessage('部门名称不能为空'),
        body('parentId').custom(async (value) => {
            if(!value) return Promise.resolve(true);
            const data = await DepartmentModel.findByPk(value);
            if(!data) return Promise.reject('该父级部门不存在');
            return Promise.resolve(true);
        }),
        body('departmentLeaderId').custom(async (id) => {
            if(!id) return Promise.resolve(true);
            const data = await AccountModel.findByPk(id);
            if (!data) return Promise.reject('该负责人不存在账户列表中');
            return Promise.resolve(true);
        })
    ]),
    updatedDepartment: verifyPayload([
        param('id').custom(async (value) => {
            if(!value) return Promise.resolve(true);
            const data = await DepartmentModel.findByPk(value);
            if(!data) return Promise.reject('该部门不存在');
            return Promise.resolve(true);
        }),
        body('name').notEmpty().withMessage('部门名称不能为空'),
        body('parentId').custom(async (value) => {
            if(!value) return Promise.resolve(true);
            const data = await DepartmentModel.findByPk(value);
            if(!data) return Promise.reject('该父级部门不存在');
            return Promise.resolve(true);
        }),
        body('departmentLeaderId').custom(async (id) => {
            if(!id) return Promise.resolve(true);
            const data = await AccountModel.findByPk(id);
            if (!data) return Promise.reject('该负责人不存在账户列表中');
            return Promise.resolve(true);
        })
    ]),
    paginatinPayloady: verifyPayload([
        query('current').custom((value) => {
            if (!value) return Promise.resolve(true);
            if (Number.isNaN(Number(value))) return Promise.reject('页码必须为数字');
            else return Promise.resolve(true);
        }),
        query('pageSize').custom((value) => {
            if (!value) return Promise.resolve(true);
            if (Number.isNaN(Number(value))) return Promise.reject('分页必须为数字');
            else return Promise.resolve(true);
        })
    ])
}