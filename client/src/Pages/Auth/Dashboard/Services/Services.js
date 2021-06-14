import React, { useEffect } from 'react';
import DashboardNav from '../DashboardNav/DashboardNav';
import HTTP from '../../../../Utils/HTTP';
import Service from './Service';

import './Services.scss';

function Services(props) {
    const [services, setServices] = React.useState([]);

    useEffect(() => {
        const abort = new AbortController();

        (async () => {
            try {
                const response = await HTTP.GET('/api/get-services', abort.signal);

                if (response.success) {
                    setServices(response.data);
                }
            } catch (err) {
                console.log('it was aborted')
            }
        })(abort)

        return () => abort.abort();
    });

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