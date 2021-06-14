import React from 'react';
import DashboardNav from '../DashboardNav/DashboardNav';
import HTTP from '../../../../Utils/HTTP';
import Service from './Service';

import './Services.scss';

function Services(props) {
    const [services, setServices] = React.useState([]);

    (async () => {
        const response = await HTTP.GET('/api/get-services');

        if (response.success) {
            setServices(response.data);
        }
    })();

    return (
        <div className="manage-services container">
            <DashboardNav />
            <h1>Manage Services</h1>
            <div className="active-services">
                {
                    services.map(service => <Service key={service._id} {...service} />)
                }
            </div>
        </div>
    )
}

export default Services;