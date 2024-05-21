"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("../service/user"));
const route = (0, express_1.Router)();
// 用户登录
route.post('/login', user_1.default.login);
// 用户信息
route.get('/userinfo', user_1.default.getUserInfo);
exports.default = route;
