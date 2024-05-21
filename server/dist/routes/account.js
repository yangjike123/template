"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const account_1 = __importDefault(require("../service/account"));
const route = (0, express_1.Router)();
// 账号列表
route.get('/', account_1.default.getAccount);
// 账号详情
route.get('/:id', account_1.default.getAccountById);
// 创建账号
route.post('/', account_1.default.createAccount);
// 更新账号
route.put('/:id', account_1.default.updateAccount);
// 删除账号
route.delete('/:id', account_1.default.deleteAccount);
exports.default = route;
