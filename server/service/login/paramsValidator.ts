import { body } from "express-validator";
import verifyPayload from "../../utils/verifyPayload";
import AccountModel from "../../models/account";

export default {
    loginParams: verifyPayload([
        body('account')
            .notEmpty()
            .withMessage('账号不能为空')
            .isLength({ min: 10, max: 11 })
            .withMessage('账号格式错误')
            .custom(async (account, { req }) => {
                const findAccount = await AccountModel.findOne({
                    where: { account }
                })

                if (!findAccount) return Promise.reject('账号不存在');
            }),
        body('password')
            .notEmpty()
            .withMessage('密码不能为空')
    ])
}