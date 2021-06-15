import React from 'react';
import './DashboardNav.scss';
import { Link } from 'react-router-dom';

function DashboardNav(props) {
    return (
        <nav className="dashboard-nav">
            <Link to="/dashboard/manage-requests">Manage Requests</Link>
            <Link to="/dashboard/manage-services">Manage Services</Link>
            <Link to="/dashboard/add-template">Add Template</Link>
            <Link to="/dashboard/manage-images">Manage Images</Link>
            <Link to="/dashboard/manage-content">Manage Content</Link>
        </nav>
    )
}

export default DashboardNav;