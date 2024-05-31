import { ActionType, ProColumns, ProTable } from "@ant-design/pro-components";
import { Button, DatePicker, Modal, Space, Switch, message } from 'antd';
import { getAccountList, updatedAccount } from "../../../api/account"
import { IAccount, IAccountDelete, IAccountSearchParams, IAccountUpdate } from "../../../../../types/IAccount";
import { useRef, useState } from "react";
import dayjs from "dayjs";
import { EUserLevel } from "../../../../../types/enum";
import EditAccount from "./component/EditAccount";

export default () => {
    const tableRef = useRef<ActionType>();
    const [openModal, setOpenModal] = useState<boolean>(false);
    function onDeleteAccount(id: IAccountDelete['id']) {

    }
    // 编辑账户信息 \ 修改客户登录状态
    async function onChangeStatus(data: IAccountUpdate) {
        Modal.confirm({
            title: '系统提示',
            content: `确定要${data.status ? '禁用' : '开启'}【${data.username}】该账户吗？`,
            onOk: async () => {
                data.status = !data.status;
                await updatedAccount(data);
                message.success('修改成功');
                tableRef.current?.reload();
            },
        });
    }

    const columns: ProColumns<IAccount, 'id'>[] = [
        {
            title: '名称',
            dataIndex: 'username',
            key: 'username'
        },
        {
            title: '账号',
            dataIndex: 'account',
            key: 'account',
        },
        {
            title: '角色',
            dataIndex: ['role', 'name'],
            key: 'roleId',
        },
        {
            title: '部门',
            dataIndex: ['department', 'name'],
            key: 'departmentId',
        },
        {
            title: '登录状态',
            dataIndex: 'status',
            key: 'status',
            valueEnum: {
                '0': {
                    text: '禁用',
                    status: 'Error'
                },
                '1': {
                    text: '启用',
                    status: 'Success'
                }
            },
            render: (_, record) => {
                const disabled = record.role?.level === EUserLevel.SuperAdmin;
                return (
                    <Switch
                        disabled={disabled}
                        checkedChildren="开启"
                        unCheckedChildren="禁用"
                        value={record.status}
                        onChange={() => onChangeStatus(record)}
                    ></Switch>
                )
            }
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
            key: 'createdAt',
            renderFormItem: () => (<DatePicker.RangePicker />)
        },
        {
            title: '更新时间',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            search: false
        },
        {
            title: '操作',
            key: 'option',
            valueType: 'option',
            render: (_, record) => {
                const disabled = record.role?.level === EUserLevel.SuperAdmin;
                return (
                    <Space>
                        <Button disabled={disabled} danger type="link" onClick={() => onDeleteAccount(record.id)}>删除</Button>
                        <Button disabled={disabled} type="link" >编辑</Button>
                    </Space>
                )
            }
        }
    ];
    return (
        <main>
            <ProTable
                rowKey={'id'}
                columns={columns}
                actionRef={tableRef}
                request={(params: IAccountSearchParams) => {
                    if (params.createdAt) {
                        params.startTime = dayjs(params.createdAt[0]).format('YYYY-MM-DD 00:00:00');
                        params.endTime = dayjs(params.createdAt[1]).format('YYYY-MM-DD 23:59:59');
                        delete params.createdAt;
                    }
                    return getAccountList(params);
                }}
            >
            </ProTable>
            <EditAccount reload={tableRef.current?.reload} openModal={openModal} setOpenModal={setOpenModal} />
        </main>
    )
}