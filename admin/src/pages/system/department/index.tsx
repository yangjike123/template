import { ActionType, ProColumns, ProTable } from "@ant-design/pro-components";
import { deleteDepartment, getDepartmentList } from "../../../api/department";
import { IDepartment, ISearchDepartmentParams } from "../../../../../types/IDepartment";
import { Button, Modal, Select, Space, message } from "antd";
import { useEffect, useRef, useState } from "react";
import { getAccountList } from "../../../api/account";
import { IAccount } from "../../../../../types/IAccount";

export default function () {
    const tableRef = useRef<ActionType>();
    const [accountList, setAccountList] = useState<IAccount[]>([])
    function onViewDepartmentDetails(data: IDepartment) {
        if (data.departmentCount && data.departmentCount > 0) {

        }
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
            hideInSearch: true
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
            title: '部门人数',
            dataIndex: 'departmentCount',
            hideInSearch: true,
            render: (text, record) => {
                return (
                    <Button
                        type="link"
                        onClick={() => onViewDepartmentDetails(record)}
                    >
                        {text}
                    </Button>
                )
            }
        },
        {
            title: '部门描述',
            dataIndex: 'description',
            hideInSearch: true
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
            dataIndex: 'option',
            valueType: 'option',
            width: 100,
            render: (_, record) => {
                return (
                    <Space size={0}>
                        <Button type="link" danger onClick={() => onDeleteDepartment(record)}>删除</Button>
                        <Button type="link">编辑</Button>
                        <Button type="link">添加部门</Button>
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
                    <Button key={'add'} type="primary">创建新部门</Button>,
                ]}
                onReset={() => {
                    searchAccount('');
                }}
                pagination={false}
            />
        </main>
    )
}