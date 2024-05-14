import React from "react";
import ReactDOM from "react-dom";
import '../styles/modal.scss';

const Modal = ({ visible, component,className, small }) => visible ? ReactDOM.createPortal(
    <div className="modal">
        <div className={`${small?'modal-content-small': 'modal-content'}`} role="dialog" aria-modal="true">
            {/*<AiOutlineCloseCircle onClick={toggle} color='black' size='2rem' style={{cursor:'pointer'}}/>*/}
            <div className={className}>
                {component}
            </div>
        </div>
    </div>, document.body
) : null;

export default Modal;
