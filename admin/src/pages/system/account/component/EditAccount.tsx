import { Form, Input, Modal } from "antd";
import { useEffect } from "react";
import { IAccount } from "../../../../../../types/IAccount";

interface Props extends ModalProps<IAccount> { };
export default function ({ data, openModal, setOpenModal, reload }: Props) {
    const [form] = Form.useForm();

    function onCancel() {
        setOpenModal(false);
    }
    function onOk() {
        onCancel();
        reload && reload();
    }
    useEffect(() => {
        if (data) {
            form.setFieldsValue(data)
        } else {
            form.resetFields();
        }

    }, [data]);
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
                <Form.Item label="角色" name={'roleId'}></Form.Item>
                <Form.Item label="部门" name={'departmentId'}></Form.Item>
            </Form>
        </Modal>
    )
}