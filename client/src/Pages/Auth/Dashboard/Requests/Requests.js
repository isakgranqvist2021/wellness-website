import React from 'react';
import DashboardNav from '../DashboardNav/DashboardNav';
import '../Page.scss';

function Requests(props) {
    return (
        <div className="Dashboard-Page container">
            <DashboardNav />
            <h1>Requests</h1>
        </div>
    )
}

export default Requests;