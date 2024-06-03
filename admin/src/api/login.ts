import { IAccountDetail, IAccountLogin } from "../../../types/IAccount";
import { requestGet, requestPost } from "../../utils/request";
// 登录
export async function login(data: IAccountLogin) {
    return requestPost<IAccountDetail>('user/login', data);
}
// 获取用户信息
export async function getUserInfo() {
    return requestGet<IAccountDetail>('user/userinfo');
}
// 验证码
export async function getCaptcha() {
    return requestGet<{ data: string }>('user/code');
}
// 退出登录
export async function logout() {
    return requestPost('user/logout');
}