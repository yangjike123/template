import { ActionType, ProColumns, ProTable } from "@ant-design/pro-components";
import { deleteDepartment, getDepartmentList } from "../../../api/department";
import { IDepartment, ISearchDepartmentParams } from "../../../../../types/IDepartment";
import { Button, Modal, Select, Space, message } from "antd";
import { useEffect, useRef, useState } from "react";
import { getAccountList } from "../../../api/account";
import EditDepartment from "./component/EditDepartment";
import { IAccount } from "../../../../../types/IAccount";

export default function () {
    const tableRef = useRef<ActionType>();
    const [accountList, setAccountList] = useState<IAccount[]>([]);
    const [openModal, setOpenModal] = useState(false);
    const [editData, setEditData] = useState<Partial<IDepartment> | undefined>(undefined);
    function onViewDepartmentDetails(data: IDepartment) {
        // if (data.departmentCount && data.departmentCount > 0) {

        // }
    }
    function onEditDepartment(type?: 'add' | 'edit', data?: IDepartment) {
        const newData: Partial<IDepartment> & { title: string } = { title: '创建部门' };
        switch (type) {
            case 'add':
                Object.assign(newData, { departmentParentId: data?.id, title: `新增【${data?.name}】下级部门` });
                break;
            case "edit":
                Object.assign(newData, {
                    title: `编辑【${data?.name}】部门`,
                    id: data?.id,
                    name: data?.name,
                    departmentLeaderId: data?.departmentLeaderId
                });
                break;
        }
        setEditData(newData);
        setOpenModal(true);
    }

    function onDeleteDepartment(data: IDepartment) {
        Modal.confirm({
            title: '系统提示',
            content: `您确定要删除【${data.name}】吗？`,
            onOk: async () => {
                await deleteDepartment(data.id);
                message.success('删除成功');
                tableRef.current?.reload();
            }
        })
    }
    async function searchAccount(keyword: string = '') {
        const { data } = await getAccountList({ pageSize: 50, current: 1, keyword });
        setAccountList(data);
    }
    useEffect(() => {
        searchAccount();
    }, [])

    const columns: ProColumns<IDepartment>[] = [
        {
            title: '部门名称',
            dataIndex: 'name',
            hideInSearch: true,
        },
        {
            title: '部门领导',
            dataIndex: ['departmentLeader', 'username'],
            key: 'departmentLeaderId',
            renderFormItem: () => {
                return (
                    <Select
                        showSearch
                        placeholder="请选择部门领导名称或登录账号"
                        fieldNames={{ label: 'username', value: 'id' }}
                        options={accountList}
                        filterOption={false}
                        onSearch={searchAccount}
                    />
                )
            }
        },
        {
            title: '部门描述',
            dataIndex: 'description',
            key: 'description',
            hideInSearch: true
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
            key: 'createdAt',
            hideInSearch: true
        },
        {
            title: '更新时间',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            hideInSearch: true
        },
        {
            title: '操作',
            dataIndex: 'option',
            valueType: 'option',
            width: 100,
            render: (_, record) => {
                return (
                    <Space size={0}>
                        <Button type="link" danger onClick={() => onDeleteDepartment(record)}>删除</Button>
                        <Button type="link" onClick={() => onEditDepartment('edit', record)}>编辑</Button>
                        <Button type="link" onClick={() => onEditDepartment('add', record)}>添加部门</Button>
                    </Space>
                )
            }
        }
    ]
    return (
        <main>
            <ProTable
                rowKey={'id'}
                columns={columns}
                actionRef={tableRef}
                request={(params: ISearchDepartmentParams) => {
                    return getDepartmentList(params);
                }}
                toolBarRender={() => [
                    <Button key={'add'} type="primary" onClick={() => onEditDepartment()}>创建新部门</Button>,
                ]}
                onReset={() => {
                    searchAccount('');
                }}
                pagination={false}
            />
            <EditDepartment
                openModal={openModal}
                setOpenModal={setOpenModal}
                data={editData}
                reload={tableRef.current?.reload}
            />
        </main>
    )
}