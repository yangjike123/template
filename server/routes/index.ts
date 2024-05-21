import { Router } from 'express';
import User from './login';
import Menu from './menu';
import Account from './account';
import Department from './department';
import Role from './role';

const route = Router();
// 用户登录 
route.use('/user', User);

// 菜单
route.use('/menu', Menu);

// 账号管理
route.use('/account', Account);

// 账号角色
route.use('/role', Role);

// 部门
route.use('/department', Department);

export default route;