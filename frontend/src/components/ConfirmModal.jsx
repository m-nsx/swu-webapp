import React from 'react';
import './ConfirmModal.css';

const ConfirmModal = ({ show, onClose, onConfirm, message }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Are you sure ?</h2>
                <p>{message}</p>
                <div className="modal-actions">
                    <button className="modal-button-danger" onClick={onConfirm}>CONFIRM</button>
                    <button className="modal-button-info" onClick={onClose}>CANCEL</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;