import React, { useState } from 'react';
import axios from 'axios'; // Use axios for HTTP requests
import InfoModal from '../InfoModal';
import './TestApi.css';

const TestApi = () => {
    const [apiStatus, setApiStatus] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const checkApiStatus = async () => {
        try {
            const response = await axios.get('https://www.swu-db.com');
            setApiStatus(response.status === 200 ? 'Site is responding correctly!' : `Unexpected response: ${response.status}`);
        } catch (error) {
            setApiStatus('Site is not responding. Please check the connection.');
        }
        setShowModal(true);
    };

    return (
        <div className="test-api-container">
            <h1 className="test-api-title">Test Site Status</h1>
            <button className="test-api-button" onClick={checkApiStatus}>
                Check Site
            </button>
            {showModal && (
                <InfoModal
                    show={showModal}
                    title="Site Status"
                    message={apiStatus}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
};

export default TestApi;