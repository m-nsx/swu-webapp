import React from 'react';
import './InfoModal.css'; // Assuming you have a separate CSS file for InfoModal

const InfoModal = ({ show, onClose, message }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-info-content">
                <h2>Info</h2>
                <p>{message}</p>
                <div className="modal-info-actions">
                    <button className="modal-button-info" onClick={onClose}>OK</button>
                </div>
            </div>
        </div>
    );
};

export default InfoModal;