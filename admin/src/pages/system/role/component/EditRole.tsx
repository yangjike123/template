import { Form, Input, Modal, Select, Switch, message } from "antd";
import { useContext, useEffect } from "react";
import { IRole } from "../../../../../../types/IRole";
import { createdRole, updatedRole } from "../../../../api/role";
import { UserInfoData } from "../../../../../Provider";
import { EUserLevel } from "../../../../../../types/enum";

interface Props extends ModalProps<IRole> { };
export default function ({ data, openModal, setOpenModal, reload }: Props) {
    const [form] = Form.useForm();
    const { role } = useContext(UserInfoData);
    const levelList = [
        { label: '管理员', value: EUserLevel.Admin },
        { label: '普通员工', value: EUserLevel.User }
    ]

    function onCancel() {
        setOpenModal(false);
    }
    async function onOk() {
        const values = await form.validateFields();
        if (data?.id) {
            values.id = data.id;
            await updatedRole(values);
            message.success('修改成功');
        } else {
            await createdRole(values);
            message.success('创建成功');
        }
        onCancel();
        reload && reload();
    }
    useEffect(() => {
        if (openModal) {
            form.setFieldsValue(data);
        } else {
            form.resetFields();
        }
    }, [openModal]);
    return (
        <Modal
            title={(data?.id ? "修改" : "创建") + '角色'}
            open={openModal}
            onOk={onOk}
            onCancel={onCancel}
            width={'38%'}
        >
            <Form form={form} labelCol={{ span: 4 }}>
                <Form.Item label="角色名称" name="name" rules={[{ required: true, message: '请输入角色名称' }]}>
                    <Input placeholder="请输入角色名称" />
                </Form.Item>
                {role?.level === EUserLevel.SuperAdmin && (
                    <Form.Item label="角色类型" name={'level'} rules={[{ required: true, message: '请选择角色类型' }]} >
                        <Select placeholder={"请选择角色类型"}>
                            {levelList.map((item, index) => {
                                return <Select.Option key={index} value={item.value}>{item.label}</Select.Option>
                            })}

                        </Select>
                    </Form.Item>
                )}
                <Form.Item label="描述" name="description">
                    <Input.TextArea placeholder="请输入角色描述" />
                </Form.Item>
                <Form.Item label="状态" name="status">
                    <Switch checkedChildren="启用" unCheckedChildren="禁用" defaultChecked={true} />
                </Form.Item>
            </Form>
        </Modal>
    )
}