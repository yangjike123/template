import { ICommonField, ICommonResultArray, ICommonResultObject } from "./common";

export interface IMenu extends ICommonField {
    // 权限
    authority?: string[] | string;
    // 菜单名称
    name: string;
    // 菜单路径
    path: string;
    // 菜单图标
    icon: string;
    // 菜单子项
    children?: IMenu[];
    // 是否隐藏菜单
    hideInMenu?: boolean;
    // 是否隐藏子菜单
    hideChildrenInMenu?: boolean;
    // 父级id
    parentId?: number;
    // 组件路径
    component?: string;
    // 菜单排序
    sort?: number | 0;
}

// 创建菜单
export interface ICreateMenu extends Omit<IMenu, 'id'> { };
// 修改菜单
export interface IUpdateMenu extends IMenu { };
// 菜单列表
export interface IMenuList extends ICommonResultArray<IMenu> { };
// 菜单可搜索参数
export interface ISearchMenuParams extends Partial<Pick<IMenu, 'name' | 'path'>> {
    startTime?: string;
    endTime?: string;
};
// 菜单详情
export interface IMenuDetail extends ICommonResultObject<IMenu> {};
// 删除菜单
export interface IDeleteMenu extends Pick<IMenu, 'id'> { };
