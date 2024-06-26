import { Form, Input, Modal, Select, TreeSelect, message } from "antd";
import { useEffect, useState } from "react";
import { IAccount } from "../../../../../../types/IAccount";
import { createdAccount, updatedAccount } from "../../../../api/account";
import { ESex, EUserLevel } from "../../../../../../types/enum";
import { IRole } from "../../../../../../types/IRole";
import { getDepartmentList } from "../../../../api/department";
import { IDepartment } from "../../../../../../types/IDepartment";

interface Props extends ModalProps<IAccount> {
    roleList: IRole[];
};
export default function ({ data, openModal, setOpenModal, reload, roleList }: Props) {
    const [form] = Form.useForm();
    const sexMap = [
        { value: ESex.Male, label: '男' },
        { value: ESex.Female, label: '女' }
    ];
    const [departmentTree, setDepartmentTree] = useState<IDepartment[]>([]);
    function onCancel() {
        setOpenModal(false);
    }
    async function getDepartment() {
        const { data } = await getDepartmentList();
        setDepartmentTree(data);
    }
    async function onOk() {
        const values = await form.validateFields();
        if (data?.id) {
            values.id = data.id;
            await updatedAccount(values);
            message.success('修改成功');
        } else {
            await createdAccount(values);
            message.success('创建成功');
        }
        onCancel();
        reload && reload();
    }
    useEffect(() => {
        getDepartment();
    }, [])
    useEffect(() => {
        if (openModal) {
            form.setFieldsValue(data)
        } else {
            form.resetFields();
        }
    }, [openModal]);
    return (
        <Modal
            title={(data?.id ? "修改" : "创建") + '账户'}
            open={openModal}
            onOk={onOk}
            onCancel={onCancel}
            width={'38%'}
        >
            <Form form={form} labelCol={{ span: 4 }}>
                <Form.Item label="账号" name={'account'} rules={[
                    { required: true, message: '请输入登录账号' },
                    { pattern: /^[\w]{10,11}$/, message: '请输入10-11位账号' }
                ]}>
                    <Input placeholder="请输入登录账号" />
                </Form.Item>
                {
                    !data && <Form.Item label="密码" name="password" rules={[
                        { required: true, message: '请输入登录密码' },
                        { pattern: /^[\w]{6,12}$/, message: '密码格式错误' }]}>
                        <Input.Password placeholder="请输入登录密码" />
                    </Form.Item>
                }
                <Form.Item label="用户名称" name={'username'} rules={[{ required: true, message: '请输入用户名称' }]}>
                    <Input placeholder="请输入用户名称" />
                </Form.Item>
                <Form.Item label="性别" name={'sex'} rules={[{ required: true, message: '请选择性别' }]}>
                    <Select placeholder="请选择性别">
                        {sexMap.map((item, index) => (
                            <Select.Option key={index} value={item.value}>
                                {item.label}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="角色" name={'roleId'}>
                    <Select
                        placeholder="请选择"
                        showSearch
                        filterOption={(value, options) => (options?.name && options?.name.includes(value.trim()) || false)}
                        fieldNames={{ label: 'name', value: 'id' }}
                        options={roleList.filter((item) => item.level !== EUserLevel.SuperAdmin)}>
                    </Select>
                </Form.Item>
                <Form.Item label="归属部门" name={'departmentId'}>
                    <TreeSelect
                        allowClear
                        treeData={departmentTree}
                        fieldNames={{ label: 'name', value: 'id' }}
                        placeholder="请选择"
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}