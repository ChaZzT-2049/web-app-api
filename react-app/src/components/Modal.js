import { useRef } from "react";
import { useLayoutEffect } from "react";

const Modal = ({children, open, close}) => {
    const modalRef = useRef(null)
    useLayoutEffect(()=>{
        const handleModal = () =>{
            open ? modalRef.current.showModal() : modalRef.current.close();
        }
        handleModal();
    },[open])

    const closeOutside = (e) => {
        var rect = modalRef.current.getBoundingClientRect();
        var isInDialog=(rect.top <= e.clientY && e.clientY <= rect.top + rect.height
        && rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
        if (!isInDialog) {
            close();
        }
    };

    return <dialog onClick={(e) =>{closeOutside(e)}} ref={modalRef}>
        {children}
    </dialog>
}
export default Modal