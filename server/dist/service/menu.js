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
// 创建菜单
function createMenu(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
// 查询菜单
function getMenu(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
function getMenuById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
// 更新菜单
function updateMenu(req, res) {
}
// 删除菜单
function deleteMenu(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
exports.default = { createMenu, getMenu, updateMenu, deleteMenu, getMenuById };
