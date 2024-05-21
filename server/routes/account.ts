import { Router } from 'express';
import serviceAccount from '../service/account';
import accountParamsValidator from '../service/account/paramsValidator'
const route = Router();
// 账号列表
route.get('/', accountParamsValidator.paginatinPayloady, serviceAccount.getAccount);
// 账号详情
route.get('/:id', serviceAccount.getAccountById);
// 创建账号
route.post('/', accountParamsValidator.createAccount, serviceAccount.createAccount);
// 更新账号
route.put('/:id', accountParamsValidator.updateAccount, serviceAccount.updateAccount);
// 删除账号
route.delete('/:id', serviceAccount.deleteAccount);

export default route;