import { Router } from 'express';
import serviceRole from '../service/role';
import roleParamsValidator from '../service/role/paramsValidator';
const route = Router();
// 角色列表
route.get('/', roleParamsValidator.paginatinPayloady, serviceRole.getRoleList);

// 角色详情信息
route.get('/:id', serviceRole.getRoleById);

// 添加角色
route.post('/', roleParamsValidator.createRole, serviceRole.createRole);

// 删除角色
route.delete('/:id', serviceRole.deleteRole);

// 修改角色信息
route.put('/:id', roleParamsValidator.createRole, serviceRole.updateRole);

export default route;