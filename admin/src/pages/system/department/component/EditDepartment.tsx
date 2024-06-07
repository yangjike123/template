import { Form, Input, Modal, Select, message } from "antd";
import { useEffect, useState } from "react";
import { IDepartment } from "../../../../../../types/IDepartment";
import { getAccountList } from "../../../../api/account";
import { IAccount } from "../../../../../../types/IAccount";
import { createdDepartment, updateDepartment } from "../../../../api/department";

interface Props extends ModalProps<Partial<IDepartment & { title: string }>> {
};
export default function ({ data, openModal, setOpenModal, reload }: Props) {
    const [form] = Form.useForm();
    const [accountList, setAccountList] = useState<IAccount[]>([]);
    function onCancel() {
        setOpenModal(false);
    }
    async function onOk() {
        const values: IDepartment = await form.validateFields();
        if (data?.departmentParentId) { // 创建下级部门
            Object.assign(values, { departmentParentId: data?.departmentParentId });
            await createdDepartment(values);
            message.success('新增下级部门成功');
        } else if (data?.id) { // 更新部门
            Object.assign(values, { id: data?.id, departmentLeaderId: values?.departmentLeaderId || null });
            await updateDepartment(values);
            message.success('修改部门成功');
        } else { //创建顶级部门
            await createdDepartment(values);
            message.success('创建部门成功');
        }
        onCancel();
        reload && reload();
    }
    async function searchAccount(keyword: string = '') {
        const { data } = await getAccountList({ pageSize: 50, current: 1, keyword });
        setAccountList(data);
    }
    useEffect(() => {
        searchAccount();
    }, [])
    useEffect(() => {
        if (openModal) {
            searchAccount(data?.departmentLeader?.account).then(() => {
                form.setFieldsValue(data);
            });
        } else {
            form.resetFields();
        }
    }, [openModal]);

    return (
        <Modal
            open={openModal}
            onOk={onOk}
            onCancel={onCancel}
            title={data?.title}
        >
            <Form form={form} labelCol={{ span: 4 }}>
                <Form.Item name="name" label="部门名称" rules={[{ required: true }]}>
                    <Input placeholder="请输入部门名称" />
                </Form.Item>
                <Form.Item name={'departmentLeaderId'} label="部门领导">
                    <Select
                        allowClear
                        showSearch
                        placeholder="请选择部门领导名称或输入登录账号"
                        fieldNames={{ label: 'username', value: 'id' }}
                        options={accountList}
                        filterOption={false}
                        onSearch={searchAccount}
                    />
                </Form.Item>
                <Form.Item name={'description'} label={'部门描述'}>
                    <Input.TextArea placeholder="请输入部门描述" />
                </Form.Item>
            </Form>
        </Modal>
    )
}