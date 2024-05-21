import { Router } from 'express';
import serviceRole from '../service/role';
const route = Router();
// 角色列表
route.get('/', serviceRole.getRoleList);

// 角色详情信息
route.get('/:id', serviceRole.getRoleById);

// 添加角色
route.post('/', serviceRole.createRole);

// 删除角色
route.delete('/:id', serviceRole.deleteRole);

// 修改角色信息
route.put('/:id', serviceRole.updateRole);

export default route;