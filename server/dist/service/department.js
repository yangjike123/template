"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// 创建部门
function createDepartment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
// 查询部门列表
function getDepartment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
// 查询部门详情
function getDepartmentById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
// 更新部门信息
function updateDepartment(req, res) {
}
// 删除部门
function deleteDepartment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
exports.default = {
    createDepartment,
    getDepartment,
    getDepartmentById,
    updateDepartment,
    deleteDepartment
};
