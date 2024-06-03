import { ISearchDepartmentParams, IGetDepartmentList, ICreateDepartment, IDeleteDepartment, IUpdateDepartment, IDepartmentDetail } from "../../../types/IDepartment";
import { requestDelete, requestGet, requestPost, requestPut } from "../../utils/request";

//部门列表
export function getDepartmentList(params: ISearchDepartmentParams) {
    return requestGet<IGetDepartmentList>('department', params);
}
// 创建部门
export function createdDepartment(data: ICreateDepartment) {
    return requestPost<IDepartmentDetail>('department', data);
}
// 更新部门
export function updateDepartment(data: IUpdateDepartment) {
    return requestPut<IDepartmentDetail>(`department/${data.id}`, data);
}
// 删除部门
export function deleteDepartment(id: IDeleteDepartment['id']) {
    return requestDelete(`department/${id}`);
}