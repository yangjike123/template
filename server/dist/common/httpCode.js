"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpCodeMsg = exports.HttpCode = void 0;
var HttpCode;
(function (HttpCode) {
    HttpCode[HttpCode["Ok"] = 200] = "Ok";
    HttpCode[HttpCode["Error"] = 500] = "Error";
    HttpCode[HttpCode["NotFound"] = 404] = "NotFound";
    HttpCode[HttpCode["BadRequest"] = 400] = "BadRequest";
    HttpCode[HttpCode["Unauthorized"] = 401] = "Unauthorized";
    HttpCode[HttpCode["Forbidden"] = 403] = "Forbidden";
    HttpCode[HttpCode["NotAcceptable"] = 406] = "NotAcceptable";
})(HttpCode || (exports.HttpCode = HttpCode = {}));
var HttpCodeMsg;
(function (HttpCodeMsg) {
    HttpCodeMsg["Ok"] = "\u8BBF\u95EE\u6210\u529F";
    HttpCodeMsg["Error"] = "\u670D\u52A1\u5668\u9519\u8BEF";
    HttpCodeMsg["NotFound"] = "\u627E\u4E0D\u5230";
    HttpCodeMsg["BadRequest"] = "\u8BF7\u6C42\u9519\u8BEF";
    HttpCodeMsg["Unauthorized"] = "\u672A\u6388\u6743";
    HttpCodeMsg["Forbidden"] = "\u7981\u6B62\u8BBF\u95EE";
})(HttpCodeMsg || (exports.HttpCodeMsg = HttpCodeMsg = {}));
