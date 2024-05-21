import { BelongsTo, Column, DataType, ForeignKey, HasOne, Length, Model, Table } from "sequelize-typescript";
import { ESex } from "../../types/enum";
import { md5 } from "../utils";
import RoleModel from "./role";
import DepartmentModel from "./department";
import dayjs from "dayjs";

@Table({
    tableName: 'accounts',
    comment: '账号表'
})
export default class AccountModel extends Model {
    @Column({ primaryKey: true, autoIncrement: true })
    id!: number;

    @Length({ max: 11, min: 10, msg: '账号长度为必须10-11位' })
    @Column({ type: DataType.UUID, allowNull: false })
    account: string;

    @Column({ type: DataType.STRING, allowNull: false })
    username: string;

    @Column({ type: DataType.ENUM, values: [ESex.Male.toString(), ESex.Female.toString()], allowNull: false })
    sex: string;

    @Length({ min: 6 })
    @Column({
        type: DataType.STRING,
        allowNull: false,
        set(value: string) {
            this.setDataValue('password', md5(value))
        }
    })
    password!: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: true
    })
    status: boolean = true;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    remark: string = '';

    @ForeignKey(() => RoleModel)
    @Column({ type: DataType.INTEGER, allowNull: true })
    roleId: number;

    @BelongsTo(() => RoleModel)
    role: RoleModel;

    @ForeignKey(() => DepartmentModel)
    @Column({ type: DataType.INTEGER, allowNull: true })
    departmentId: number;

    @BelongsTo(() => DepartmentModel)
    department: DepartmentModel;

    @Column({
        type: DataType.DATE,
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