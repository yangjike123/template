import { body, query } from "express-validator";
import verifyPayload from "../../utils/verifyPayload";

export default {
    createRole: verifyPayload([
        body('name').notEmpty().withMessage('角色名不能为空'),
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
}