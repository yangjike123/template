import { Form, Input, Modal, Select, message } from "antd";
import { useEffect } from "react";
import { IDepartment } from "../../../../../../types/IDepartment";

interface Props extends ModalProps<IDepartment> {
};
export default function ({ data, openModal, setOpenModal, reload }: Props) {
    const [form] = Form.useForm();

    function onCancel() {
        setOpenModal(false);
    }
    async function onOk() {
        const values = await form.validateFields();

        onCancel();
        reload && reload();
    }
    useEffect(() => {
        if (openModal) {
            form.setFieldsValue(data)
        } else {
            form.resetFields();
        }
    }, [openModal]);
    return (
        <Modal
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