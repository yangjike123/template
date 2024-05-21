export enum HttpCode {
    Ok = 200,//访问成功
    Error = 500,//服务器错误
    NotFound = 404,//找不到
    BadRequest = 400,//请求错误
    Unauthorized = 401,//未授权
    Forbidden = 403,//禁止访问
}
export enum HttpCodeMsg {
    Ok = '访问成功',
    Error = '服务器错误',
    NotFound = '找不到',
    BadRequest = '请求错误',
    Unauthorized = '未授权',
    Forbidden = '禁止访问',
    CreatedSuccess = '创建成功',
    UpdatedSuccess = '更新成功',
    DeleteSuccess = '删除成功',
}
