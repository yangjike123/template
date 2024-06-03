import { IDeleteRole, IRole, IRoleDetail, IRoleList, IRoleSearchParams } from "../../../types/IRole";
import { requestDelete, requestGet, requestPost, requestPut } from "../../utils/request";

// 获取角色列表
export function getRoleList(params: IRoleSearchParams) {
    return requestGet<IRoleList>('role', params);
}

// 添加角色
export function createdRole(data: IRole) {
    return requestPost<IRoleDetail>('role', data);
}

// 修改角色
export function updatedRole(data: IRole) {
    return requestPut<IRoleDetail>(`role/${data.id}`, data);
}

// 删除角色
export function deletedRole(id: IDeleteRole['id']) {
    return requestDelete(`role/${id}`);
}