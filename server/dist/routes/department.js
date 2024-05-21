"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const department_1 = __importDefault(require("../service/department"));
const route = (0, express_1.Router)();
//部门列表
route.get('/', department_1.default.getDepartment);
// 部门详情
route.get('/:id', department_1.default.getDepartmentById);
// 创建部门
route.post('/', department_1.default.createDepartment);
// 更新部门
route.put('/:id', department_1.default.updateDepartment);
// 删除部门
route.delete('/:id', department_1.default.deleteDepartment);
exports.default = route;
