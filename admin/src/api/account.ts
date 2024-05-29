import { IAccount, IAccountChangePassword } from "../../../types/IAccount";
import { requsetPost } from "../../utils/request";

// 修改用户密码
export async function changePassword(data: IAccountChangePassword) {
    return requsetPost<{ data: IAccount }>('account/changePassword', data);
}