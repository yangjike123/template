"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("./user"));
const menu_1 = __importDefault(require("./menu"));
const account_1 = __importDefault(require("./account"));
const department_1 = __importDefault(require("./department"));
const route = (0, express_1.Router)();
// 用户登录 
route.use('/user', user_1.default);
// 菜单
route.use('/menu', menu_1.default);
// 账号管理
route.use('/account', account_1.default);
// 部门
route.use('/department', department_1.default);
exports.default = route;
