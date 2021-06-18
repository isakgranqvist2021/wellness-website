import React from 'react';
import './DashboardNav.scss';
import { Link } from 'react-router-dom';

function DashboardNav(props) {
    return (
        <nav className="dashboard-nav">
            <div className="container">
                <Link to="/dashboard/manage-bookings">Bookings</Link>
                <Link to="/dashboard/manage-templates">My Templates</Link>
                <Link to="/dashboard/add-template">Add Template</Link>
                <Link to="/dashboard/manage-images">Images</Link>
                <Link to="/dashboard/content">Content</Link>
            </div>
        </nav>
    )
}

export default DashboardNav;