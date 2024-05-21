import { Column, Model, Table, DataType } from "sequelize-typescript";
import dayjs from "dayjs";
@Table({
    tableName: 'menus',
    comment: '菜单表'
})
export default class MenuModel extends Model{
    @Column({
        primaryKey: true,
        autoIncrement: true,
    })
    id?: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        comment: '菜单名称'
    })
    name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        comment: '菜单路径'
    })
    path: string;

    @Column({
        type: DataType.JSON,
        comment: '菜单功能权限',
        allowNull: true,
    })
    authority?: string[];

    @Column({
        type: DataType.STRING,
        allowNull: true,
        comment: '菜单图标'
    })
    icon?: string;

    @Column({
        type: DataType.STRING,
        comment: '子菜单',
        get() {
            const value = this.getDataValue('children') as string;
            return value ? value.split(',') : [];
        }
    })
    children?: MenuModel[];

    @Column({
        type: DataType.BOOLEAN,
        allowNull: true,
        defaultValue: false,
        comment: '是否隐藏菜单'
    })
    hideInMenu?: boolean;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: true,
        defaultValue: false,
        comment: '是否隐藏所有子菜单'
    })
    hideChildrenInMenu?: boolean;

    @Column({
        type: DataType.STRING,
        allowNull: true,
        comment: '组件路径',
    })
    component?: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        comment: '菜单排序 默认0',
        defaultValue: 0
    })
    sort?: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        comment: '父级id 默认0',
        defaultValue: 0
    })
    parentId?: number;

    @Column({
        type: DataType.DATE,
        defaultValue: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        get() {
            const value = this.getDataValue('createdAt');
            return value ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : null;
        }
    })
    createdAt: string; // 创建时间

    @Column({
        type: DataType.DATE,
        get() {
            const value = this.getDataValue('updatedAt');
            return value ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : null;
        }
    })
    updatedAt: string; // 更新时间
}
