import { IAccount, IAccountChangePassword, IAccountDetail, IAccountList, IAccountSearchParams, IAccountUpdate } from "../../../types/IAccount";
import { requsetDelete, requsetGet, requsetPost, requsetPut } from "../../utils/request";

// 修改用户密码
export async function changePassword(data: IAccountChangePassword) {
    return requsetPost<{ data: IAccount }>('account/changePassword', data);
}
// 账户列表
export async function getAccountList(params: IAccountSearchParams) {
    return requsetGet<IAccountList>('account', params);
}
// 修改账户信息
export async function updatedAccount(data: IAccountUpdate) {
    return requsetPut<IAccountDetail>(`account/${data.id}`, data);
}
// 创建账户
export async function createdAccount(data: IAccount) {
    return requsetPost<IAccount>('account', data);
}
// 获取账户详情
export async function getAccountDetail(id: number) {
    return requsetGet<IAccountDetail>(`account/${id}`);
}
// 删除账户
export async function deleteAccount(id: number) {
    return requsetDelete<IAccountDetail>(`account/${id}`);
}