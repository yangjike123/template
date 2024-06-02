import { Form, Input, Modal, Select, message } from "antd";
import { useEffect } from "react";
import { IRole } from "../../../../../../types/IRole";
import { createdRole, updatedRole } from "../../../../api/role";

interface Props extends ModalProps<IRole> { };
export default function ({ data, openModal, setOpenModal, reload }: Props) {
    const [form] = Form.useForm();

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
        if (data) {
            form.setFieldsValue(data)
        } else {
            form.resetFields();
        }
    }, [data]);
    return (
        <Modal
            title={(data?.id ? "修改" : "创建") + '角色'}
            open={openModal}
            onOk={onOk}
            onCancel={onCancel}
            width={'38%'}
        >
            <Form form={form} labelCol={{ span: 4 }}>

            </Form>
        </Modal>
    )
}