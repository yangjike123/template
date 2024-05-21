"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require('express');
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
const httpCode_1 = require("./common/httpCode");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(index_1.default);
// // 统一处理返回成功 失败数据结果
app.use((err, req, res, next) => {
    console.log('req: ', req);
    res.status(httpCode_1.HttpCode.Error).json({
        status: httpCode_1.HttpCode.Error,
        message: err.message,
    });
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://127.0.0.1:${port}`);
});
