import React from 'react';
import './Dashboard.scss';

import { Link } from 'react-router-dom';

function Dashboard(props) {
    return (
        <div className="dashboard container">
            <div className="dashboard-content">
                <h1>Dashboard</h1>
                <div className="dashboard-actions">
                    <Link to="/dashboard/manage-content" className="manage m-content">Manage Content</Link>
                    <Link to="/dashboard/manage-requests" className="manage m-requests">Manage Requests</Link>
                    <Link to="/dashboard/manage-services" className="manage m-services">Manage Services</Link>
                    <Link to="/dashboard/manage-images" className="manage m-images">Manage Images</Link>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;