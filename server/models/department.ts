import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import AccountModel from "./account";
import dayjs from "dayjs";

@Table({
    tableName: 'departments',
    comment: '部门表'
})
export default class DepartmentModel extends Model {
    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ type: DataType.STRING, allowNull: false, comment: '部门名称' })
    name: string;

    @Column({ type: DataType.STRING, allowNull: true, comment: '部门描述' })
    description: string;

    @Column({ type: DataType.INTEGER, allowNull: true })
    departmentParentId: number;

    @ForeignKey(() => AccountModel)
    @Column({ type: DataType.INTEGER, allowNull: true, comment: '部门负责人' })
    departmentLeaderId!: number;

    @BelongsTo(() => AccountModel, {
        foreignKey: 'departmentLeaderId',
        targetKey: 'id',
        as: 'departmentLeader',
    })
    departmentLeader!: AccountModel;

    @HasMany(() => AccountModel)
    account!: AccountModel[];

    @Column({
        type: DataType.DATE,
        get() {
            const value = this.getDataValue('createdAt');
            return value ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : null;
        },
        set() {
            const value = this.getDataValue('createdAt');
            !value && this.setDataValue('createdAt', dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'));
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