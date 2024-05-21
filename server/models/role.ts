// import { CommonBasics } from './common';
// import { DataTypes } from "sequelize";
// import connectSequelize from './db';
// import { EUserLevel } from '../types/enum';
// import MenuModel from './menu';
// import AccountModel from './account';

import { Column, Model, Table, DataType, ForeignKey, HasMany, BelongsTo, Unique } from "sequelize-typescript";
import { EUserLevel } from "../../types/enum";

@Table({
    tableName: 'roles',
    comment: '角色表',
})
export default class RoleModel extends Model {
    @Column({ primaryKey: true, autoIncrement: true })
    id!: number;

    @Column({
        type: DataType.STRING,
        comment: '角色名称',
        allowNull: false
    })
    name!: string;

    @Column({
        type: DataType.BOOLEAN,
        comment: '状态',
        defaultValue: true,
    })
    status: boolean = true;

    @Column({
        comment: '备注信息',
        type: DataType.STRING,
    })
    remark: string = '';

    @Column({
        comment: '用户级别',
        type: DataType.ENUM(EUserLevel.SuperAdmin.toString(), EUserLevel.Admin.toString(), EUserLevel.User.toString()),
        allowNull: true,
    })
    level?: string;

    // @ForeignKey(() => MenuModel)
    @Column({
        type: DataType.STRING,
        comment: '菜单ID集合',
        allowNull: true,
        get() {
            return this.getDataValue('menuIds').split(',');
        },
        set(value: number[]) {
            return this.setDataValue('menuIds', value.join(','));
        }
    })
    menuIds: number[] = [];

    // @BelongsTo(() => MenuModel)
    // menus: MenuModel[];
}