import { Column, Model, Table, DataType } from "sequelize-typescript";
import { EUserLevel } from "../../types/enum";
import dayjs from "dayjs";

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
        allowNull: false,
        unique: {
            name: 'name',
            msg: '角色名称已存在'
        }
    })
    name: string;

    @Column({
        type: DataType.BOOLEAN,
        comment: '状态',
        defaultValue: true,
    })
    status: boolean;

    @Column({
        type: DataType.STRING,
        comment: '描述信息',
        allowNull: true,
    })
    description: string;

    @Column({
        type: DataType.ENUM(EUserLevel.SuperAdmin.toString(), EUserLevel.Admin.toString(), EUserLevel.User.toString()),
        comment: '用户级别',
        allowNull: true,
    })
    level?: string;

    // @ForeignKey(() => MenuModel)
    @Column({
        type: DataType.STRING,
        comment: '菜单ID集合',
        allowNull: true,
        get() {
            return this.getDataValue('menuIds').split(',').filter(String).map(Number);
        },
        set(value: number[]) {
            return this.setDataValue('menuIds', value.join(','));
        },
        defaultValue: ''
    })
    menuIds: number[];

    @Column({
        type: DataType.DATE,
        get() {
            const value = this.getDataValue('createdAt');
            return value ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : null;
        },
        defaultValue: dayjs().format('YYYY-MM-DD HH:mm:ss'),
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
    // @BelongsTo(() => MenuModel)
    // menus: MenuModel[];
}