import { HttpCode, HttpCodeMsg } from "./httpCode";

// 通用字段
export type ICommonField = {
    readonly id: number; // 主键
    readonly createdAt?: string; // 创建时间
    readonly updatedAt?: string; // 更新时间
}

// 通用的分页参数
export type ICommonPaginatin = {
    current: number | 1; // 当前页码  默认1
    pageSize: number | 10; // 每页数量  默认10
}

// 返回结果类型 数组
export type ICommonResultArray<T> = {
    readonly data: T[]; // 列表数据
    readonly total: number; // 总数
    readonly status: HttpCode; // 状态码
    readonly message: HttpCodeMsg; // 返回是否成功
}

// 返回结果类型 对象
export type ICommonResultObject<T> = {
    readonly data: T; // 列表对象数据
    readonly status: HttpCode; // 状态码
    readonly message: HttpCodeMsg; // 返回是否成功
}