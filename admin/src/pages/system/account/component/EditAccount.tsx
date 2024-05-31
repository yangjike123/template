import { Modal } from "antd";
import { useEffect } from "react";
import { IAccount } from "../../../../../../types/IAccount";

interface Props extends ModalProps<IAccount> {

}
export default function ({ data, openModal, setOpenModal, reload }: Props) {
    function onCancel() {
        setOpenModal(false);
    }
    function onOk() {
        onCancel();
        reload && reload();
    }
    useEffect(() => {
        
    }, [data]);
    return <Modal
        title={data?.id ? "修改账户" : "创建账户"}
        open={openModal}
        onOk={onOk}
        onCancel={onCancel}
    ></Modal>
}