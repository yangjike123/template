import { IAccount, IAccountDetail, IAccountLogin } from "../../../types/IAccount";
import { requsetGet, requsetPost } from "../../utils/request";
// 登录
export async function login(data: IAccountLogin) {
    return requsetPost<IAccountDetail>('user/login', data);
}
// 获取用户信息
export async function getUserInfo() {
    return requsetGet<IAccount>('user/userinfo');
}
// 验证码
export async function getCaptcha() {
    return requsetGet<{ data: string }>('user/code');
}