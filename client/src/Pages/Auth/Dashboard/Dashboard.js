import React from 'react';
import './Dashboard.scss';

import { Link } from 'react-router-dom';

function Dashboard(props) {
    return (
        <div className="dashboard">
            <div className="dashboard-content">
                <h1>Dashboard</h1>
                <div className="dashboard-actions">
                    <Link to="/dashboard/manage-content">
                        <div className="manage m-content">Manage Content</div>
                    </Link>
                    <Link to="/dashboard/manage-requests">
                        <div className="manage m-requests">Manage Requests</div>
                    </Link>
                    <Link to="/dashboard/manage-services">
                        <div className="manage m-services">Manage Services</div>
                    </Link>
                    <Link to="/dashboard/manage-images">
                        <div className="manage m-images">Manage Images</div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;