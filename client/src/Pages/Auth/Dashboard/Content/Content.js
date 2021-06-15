import React from 'react';
import DashboardNav from '../DashboardNav/DashboardNav';
import '../Page.scss';

function Content(props) {
    return (
        <div className="Dashboard-Page container">
            <DashboardNav />
            <h1>Content</h1>
        </div>
    )
}

export default Content;