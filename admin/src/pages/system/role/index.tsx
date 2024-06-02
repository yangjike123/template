import { ActionType, ProColumns, ProFormInstance, ProTable } from "@ant-design/pro-components";
import { useRef, useState } from "react";
import { useLocation } from "react-router-dom"
import { IDeleteRole, IRole, IRoleSearchParams } from "../../../../../types/IRole";
import { deletedRole, getRoleList, updatedRole } from "../../../api/role";
import { Button, Modal, Space, Switch, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { EUserLevel } from "../../../../../types/enum";
import EditRole from "./component/EditRole";
type LocationState = {
    id?: number
}
export default () => {
    const tableRef = useRef<ActionType>();
    const formRef = useRef<ProFormInstance>();
    const { state }: { state: LocationState } = useLocation();
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [editData, setEditData] = useState<IRole | undefined>(undefined);

    function onChangeStatus(data: IRole) {
        Modal.confirm({
            title: '系统提示',
            content: `确定要${data.status ? '禁用' : '启用'}【${data.name}】角色吗？`,
            onOk: async () => {
                data.status = !data.status;
                await updatedRole(data);
                message.success(`${data.status ? '禁用' : '启用'}成功`);
                tableRef.current?.reload();
            }
        })
    }
    function onEditRole(data?: IRole) {
        setEditData(data);
        setOpenModal(true);
    }
    function onDeleteRole(id: IDeleteRole['id']) {
        Modal.confirm({
            title: '系统提示',
            content: '确定要删除该账户吗？',
            onOk: async () => {
                await deletedRole(id);
                message.success('删除成功');
                tableRef.current?.reload();
            }
        });

    }
    function onCustomReset() {
        state.id = undefined;
    }
    const columns: ProColumns<IRole>[] = [
        {
            title: '角色名称',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '角色描述',
            dataIndex: 'remark',
            hideInSearch: true
        },
        {
            title: '角色状态',
            dataIndex: 'status',
            key: 'status',
            valueEnum: {
                '1': '启用',
                '0': '禁用'
            },
            render: (_, record) => {
                const disabled = record.level === EUserLevel.SuperAdmin;
                return (
                    <Switch
                        disabled={disabled}
                        value={record.status}
                        checkedChildren="启用"
                        unCheckedChildren="禁用"
                        onChange={() => onChangeStatus(record)}
                    />
                )
            }
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
            hideInSearch: true
        },
        {
            title: '更新时间',
            dataIndex: 'updatedAt',
            hideInSearch: true
        },
        {
            title: '操作',
            hideInSearch: true,
            render: (_, record) => {
                const disabled = record.level === EUserLevel.SuperAdmin;
                return (
                    <Space>
                        <Button disabled={disabled} danger type="link" onClick={() => onDeleteRole(record.id)}>删除</Button>
                        <Button disabled={disabled} type="link" onClick={() => onEditRole(record)}>编辑</Button>
                    </Space>
                )
            },
        }
    ]
    return (
        <main>
            <ProTable
                rowKey={'id'}
                columns={columns}
                actionRef={tableRef}
                formRef={formRef}
                request={(params: IRoleSearchParams) => {
                    state?.id && Object.assign(params, { id: state.id });
                    return getRoleList(params);
                }}
                onReset={onCustomReset}
                toolBarRender={() => [
                    <Button
                        key="add"
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => onEditRole(undefined)}
                    >
                        创建角色
                    </Button>
                ]}
            />
            <EditRole setOpenModal={setOpenModal} openModal={openModal} reload={tableRef.current?.reload} />
        </main>
    )
}