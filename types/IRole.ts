import { IMenu } from "./IMenu";
import { ICommonField, ICommonPaginatin, ICommonResultArray, ICommonResultObject } from "./common";
import { EUserLevel } from "./enum";

export interface IRole extends ICommonField {
    // 角色名称
    name: string;
    // 角色状态
    status: boolean;
    // 角色备注
    remark?: string;
    // 角色菜单
    menuIds: number[];
    menus?: IMenu[];
    // 角色等级
    level: EUserLevel;

}

// 角色列表
export interface IRoleList extends ICommonResultArray<IRole> { };

// 角色搜索参数
export interface IRoleSearchParams extends ICommonPaginatin, Partial<Pick<IRole, 'name' | 'status' | 'id'>> { };

// 角色详情
export interface IRoleDetail extends ICommonResultObject<IRole> { };

// 创建角色
export interface ICreateRole extends Omit<IRole, "id"> { };

// 更新角色
export interface IUpdateRole extends IRole { };

// 删除角色
export interface IDeleteRole extends Pick<IRole, 'id'> { };
