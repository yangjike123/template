"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const menu_1 = __importDefault(require("../service/menu"));
const route = (0, express_1.Router)();
// 菜单列表
route.get('/', menu_1.default.getMenu);
// 菜单详情
route.get('/:id', menu_1.default.getMenuById);
// 添加菜单
route.post('/', menu_1.default.createMenu);
// 删除菜单
route.delete('/:id', menu_1.default.deleteMenu);
// 修改菜单
route.put('/:id', menu_1.default.updateMenu);
exports.default = route;
