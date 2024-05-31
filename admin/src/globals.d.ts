declare interface ModalProps<T = any> {
    openModal: boolean;
    setOpenModal: (value: boolean) => void;
    data?: T
    reload?: (resetPageIndex?: boolean) => Promise<void>
}
