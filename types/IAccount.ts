import { IDepartment } from "./IDepartment";
import { IRole } from "./IRole";
import { ESex } from "./enum";
import { ICommonField, ICommonPaginatin, ICommonResultArray, ICommonResultObject } from "./common";

export interface IAccount extends ICommonField {
    username: string; // 名称
    account: string; // 账号
    sex: ESex;// 性别
    password: string; // 密码
    status: boolean; // 账号状态
    departmentId?: number; // 部门
    department?: IDepartment; // 部门对象
    roleId?: number; // 角色
    role?: IRole; // 角色对象
    remark?: string; // 备注
};
export interface IAccountCreate extends Omit<IAccount, "id"> { };
export interface IAccountUpdate extends IAccount { };
export interface IAccountList extends ICommonResultArray<IAccount> { };
export interface IAccountSearchParams extends ICommonPaginatin, Partial<Omit<IAccount, 'password' | 'remark' | 'department' | 'role'>> {
    startTime?: string;
    endTime?: string;
};
export interface IAccountDetail extends ICommonResultObject<Omit<IAccount & { token: string }, 'password'>> {

};
export interface IAccountLogin extends Pick<IAccount, "account" | "password"> {
    code: string;
};
export interface IAccountDelete extends Pick<ICommonField, 'id'> { };

export interface IAccountChangePassword extends Pick<IAccount, 'password'> {};
