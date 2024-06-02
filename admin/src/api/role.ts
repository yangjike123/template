import { IDeleteRole, IRole, IRoleDetail, IRoleList, IRoleSearchParams } from "../../../types/IRole";
import { requsetDelete, requsetGet, requsetPost, requsetPut } from "../../utils/request";

// 获取角色列表
export function getRoleList(params: IRoleSearchParams) {
    return requsetGet<IRoleList>('role', params);
}

// 添加角色
export function createdRole(data: IRole) {
    return requsetPost<IRoleDetail>('role', data);
}

// 修改角色
export function updatedRole(data: IRole) {
    return requsetPut<IRoleDetail>(`role/${data.id}`, data);
}

// 删除角色
export function deletedRole(id: IDeleteRole['id']) {
    return requsetDelete(`role/${id}`);
}