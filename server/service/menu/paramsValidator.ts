import { body, param } from "express-validator";
import verifyPayload from "../../utils/verifyPayload";
import MenuModel from "../../models/menu";

export default {
    createMenu: verifyPayload([
        body('name')
            .notEmpty()
            .withMessage('菜单名称不能为空')
            .isLength({ min: 2, max: 10 })
            .withMessage('菜单名称长度为2-10'),
        body('path')
            .notEmpty()
            .withMessage('菜单路径不能为空'),
        body('parentId')
            .custom(async (parentId) => {
                if (!parentId) return Promise.resolve(true);
                if (Number.isNaN(Number(parentId))) return Promise.reject('父级菜单id必须为数字');
                const data = await MenuModel.findByPk(parentId);
                if (data) return Promise.resolve(true);
                return Promise.reject('父级菜单不存在');
            }),
    ]),
    updateMenu: verifyPayload([
        param('id').custom(async (id) => {
            if (Number.isNaN(Number(id))) return Promise.reject('菜单id必须为数字');
            const data = await MenuModel.findByPk(id);
            if (data) return Promise.resolve(true);
            return Promise.reject('菜单不存在');
        }),
        body('name')
            .notEmpty()
            .withMessage('菜单名称不能为空')
            .isLength({ min: 2, max: 10 })
            .withMessage('菜单名称长度为2-10'),
        body('path')
            .notEmpty()
            .withMessage('菜单路径不能为空'),
        body('parentId')
            .custom(async (parentId) => {
                const id = Number(parentId);
                if (!parentId) return Promise.resolve(true);
                if (Number.isNaN(id)) return Promise.reject('父级菜单id必须为数字');
                if(id === 0) return Promise.resolve(true);
                const data = await MenuModel.findByPk(parentId);
                if (parentId !== data.id) return Promise.reject('自己不能成为自己的父级菜单');
                if (data) return Promise.resolve(true);
                return Promise.reject('父级菜单不存在');
            }),
    ]),
}