import { body, check, param, query } from "express-validator";
import verifyPayload from "../../utils/verifyPayload";
import { ESex } from "../../../types/enum";
import AccountModel from "../../models/account";

export default {
    // 创建账户
    createAccount: verifyPayload([
        body('account')
            .notEmpty()
            .withMessage('账户不能为空')
            .isLength({ min: 10, max: 11 })
            .withMessage('账号格式错误')
            .custom(async (account) => {
                const data = await AccountModel.findOne({ where: { account } });
                if (data) return Promise.reject('账户已存在');
                return Promise.resolve(true);
            }),
        body('username')
            .notEmpty()
            .withMessage('用户名不能为空'),
        body('password')
            .notEmpty()
            .withMessage('密码不能为空')
            .isLength({ min: 6 })
            .withMessage('密码长度不能小于6'),
        body('sex')
            .notEmpty()
            .withMessage('性别不能为空').custom((value) => {
                const include = Object.values(ESex).includes(value);
                if (include) return Promise.resolve(true);
                else return Promise.reject('性别不合法 —— 1:男 0:女');
            })
    ]),
    updateAccount: verifyPayload([
        // param('id').custom(async (id) => {
        //     const data = await AccountModel.findByPk(id);
        //     if (!data) return Promise.reject('账户不存在');
        //     return Promise.resolve(true);
        // }),
        body('account')
            .notEmpty()
            .withMessage('账户不能为空')
            .isLength({ min: 10, max: 11 })
            .withMessage('账号格式错误'),
        body('username')
            .notEmpty()
            .withMessage('用户名不能为空'),
        // body('password')
        //     .notEmpty()
        //     .withMessage('密码不能为空')
        //     .isLength({ min: 6 })
        //     .withMessage('密码长度不能小于6'),
        body('sex')
            .notEmpty()
            .withMessage('性别不能为空').custom((value) => {
                const include = Object.values(ESex).map(String).includes(value);
                if (include) return Promise.resolve(true);
                else return Promise.reject('性别不合法 —— 1:男 0:女');
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
    ]),
    updatePassword: verifyPayload([
        body('password')
            .notEmpty()
            .withMessage('密码不能为空')
            .isLength({ min: 6, max: 12 })
            .withMessage('密码长度不能小于6或大于12位'),
    ])
}