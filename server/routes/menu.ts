import { Router } from 'express';
import serviceMenu from '../service/menu';
import menuParamsValidator from '../service/menu/paramsValidator';
const route = Router();
// 菜单列表
route.get('/', serviceMenu.getMenu);

// 菜单详情
route.get('/:id', serviceMenu.getMenuById);

// 添加菜单
route.post('/', menuParamsValidator.createMenu, serviceMenu.createMenu);

// 删除菜单
route.delete('/:id', serviceMenu.deleteMenu);

// 修改菜单
route.put('/:id', menuParamsValidator.updateMenu, serviceMenu.updateMenu);

export default route;