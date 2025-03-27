import React from 'react';
import './ConfirmModal.css';

const InfoModal = ({ show, onClose, message }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Info</h2>
                <p>{message}</p>
                <div className="modal-actions">
                    <button className="modal-button-info" onClick={onClose}>OK</button>
                </div>
            </div>
        </div>
    );
};

export default InfoModal;