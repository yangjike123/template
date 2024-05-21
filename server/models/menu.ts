import { Column, Model, Table, DataType } from "sequelize-typescript";


@Table({
    tableName: 'menus',
    comment: '菜单表'
})
export default class MenuModel extends Model {
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
    name!: string;

    @Column({
        type: DataType.JSON,
        comment: '菜单路径'
    })
    authority: string[] = [];

    @Column({
        type: DataType.STRING,
        allowNull: true,
        comment: '菜单图标'
    })
    icon?: string;

    @Column({
        type: DataType.JSON,
        comment: '子菜单'
    })
    children?: string[];

    @Column({
        type: DataType.BOOLEAN,
        allowNull: true,
        comment: '是否隐藏菜单'
    })
    hideInMenu?: boolean = false;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: true,
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
        comment: '菜单排序 默认0'
    })
    sort?: number = 0;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        comment: '父级id 默认0'
    })
    parentId?: number = 0;
}