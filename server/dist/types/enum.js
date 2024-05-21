"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EClinetType = exports.EUserLevel = void 0;
// 用户等级
var EUserLevel;
(function (EUserLevel) {
    EUserLevel[EUserLevel["SuperAdmin"] = 1] = "SuperAdmin";
    EUserLevel[EUserLevel["Admin"] = 2] = "Admin";
    EUserLevel[EUserLevel["User"] = 3] = "User";
})(EUserLevel || (exports.EUserLevel = EUserLevel = {}));
// 用户类型
var EClinetType;
(function (EClinetType) {
    EClinetType[EClinetType["Normal"] = 1] = "Normal";
    EClinetType[EClinetType["Member"] = 2] = "Member";
    EClinetType[EClinetType["SuperMember"] = 3] = "SuperMember";
})(EClinetType || (exports.EClinetType = EClinetType = {}));
