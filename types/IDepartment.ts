import { ICommonField, ICommonPaginatin, ICommonResultArray, ICommonResultObject } from "./common";

export interface IDepartment extends ICommonField {
    id: number
    // 部门名称
    name: string;
    // 上级部门id
    departmentParentId?: number;
    // 部门负责人
    departmentLeaderId?: number;
};

// 创建部门
export interface ICreateDepartment extends Omit<IDepartment, 'id'> {

}
// 部门列表
export interface IGetDepartmentList extends ICommonResultArray<IDepartment> {

}
// 部门搜索参数
export interface ISearchDepartmentParams extends ICommonPaginatin, Pick<IDepartment, 'name' | 'departmentLeaderId'> {

}
// 更新部门信息
export interface IUpdateDepartment extends IDepartment {

}

// 删除部门
export interface IDeleteDepartment extends Pick<IDepartment, 'id'> {

};

// 获取部门详情
export interface IDepartmentDetail extends ICommonResultObject<IDepartment> {
}