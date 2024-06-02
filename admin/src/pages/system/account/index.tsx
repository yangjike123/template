import { ActionType, ProColumns, ProTable } from "@ant-design/pro-components";
import { Button, DatePicker, Modal, Select, Space, Switch, message } from 'antd';
import { deleteAccount, getAccountList, updatedAccount } from "../../../api/account"
import { IAccount, IAccountDelete, IAccountSearchParams, IAccountUpdate } from "../../../../../types/IAccount";
import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { EUserLevel } from "../../../../../types/enum";
import EditAccount from "./component/EditAccount";
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { getRoleList } from "../../../api/role";
import { IRole } from "../../../../../types/IRole";
export default () => {
    const onNav = useNavigate()
    const tableRef = useRef<ActionType>();
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [editData, setEditData] = useState<IAccount | undefined>(undefined);
    const [roleList, setRoleList] = useState<IRole[]>([]);
    function onDeleteAccount(id: IAccountDelete['id']) {
        Modal.confirm({
            title: '系统提示',
            content: '确定要删除该账户吗？',
            onOk: async () => {
                await deleteAccount(id);
                message.success('删除成功');
                tableRef.current?.reload();
            }
        });

    }
    // 修改客户登录状态
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
    function onEditAccount(data: IAccount | undefined) {
        setEditData(data);
        setOpenModal(true);
    }

    useEffect(() => {
        getRoleList({ pageSize: 2000, current: 1 }).then(({ data }) => {
            setRoleList(data);
        });
    }, [])
    const columns: ProColumns<IAccount>[] = [
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
            width: 110,
            render: (text, record) => <Button type="link" onClick={() => {
                if (record.role) onNav('/system/role', { state: { id: record.role.id } });
            }}>{text}</Button>,
            renderFormItem: () => {
                return (
                    <Select placeholder="请选择">
                        {
                            roleList.map((item, index) => {
                                return <Select.Option key={index} value={item.id}>{item.name}</Select.Option>
                            })
                        }
                    </Select>
                )
            }
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
                        <Button disabled={disabled} type="link" onClick={() => onEditAccount(record)}>编辑</Button>
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
                request={(params: IAccountSearchParams) => {
                    if (params.createdAt) {
                        params.startTime = dayjs(params.createdAt[0]).format('YYYY-MM-DD 00:00:00');
                        params.endTime = dayjs(params.createdAt[1]).format('YYYY-MM-DD 23:59:59');
                        delete params.createdAt;
                    }
                    return getAccountList(params);
                }}
                actionRef={tableRef}
                search={{ defaultCollapsed: false }}
                toolBarRender={() => [
                    <Button
                        key="add"
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => onEditAccount(undefined)}
                    >创建账号</Button>
                ]}
            >
            </ProTable>
            <EditAccount
                reload={tableRef.current?.reload}
                data={editData}
                openModal={openModal}
                setOpenModal={setOpenModal}
                roleList={roleList}
            />
        </main>
    )
}