import React from 'react';
import './DashboardNav.scss';
import { Link } from 'react-router-dom';

function DashboardNav(props) {
    return (
        <nav className="dashboard-nav">
            <Link to="/dashboard/manage-requests">Requests</Link>
            <Link to="/dashboard/manage-services">Services</Link>
            <Link to="/dashboard/add-template">Add Template</Link>
            <Link to="/dashboard/manage-images">Images</Link>
        </nav>
    )
}

export default DashboardNav;