import React from 'react';
import DashboardNav from '../DashboardNav/DashboardNav';
import HTTP from '../../../../Utils/HTTP';
import './AddTemplate.scss';
import userStore from '../../../../Store/user.store';
import alertsStore from '../../../../Store/alerts.store';
import '../Page.scss';

function AddTemplate(props) {
    const [serviceName, setServiceName] = React.useState('');
    const [active, setActive] = React.useState(false);
    const [price, setPrice] = React.useState(1);
    const [user, setUser] = React.useState({ name: 'Your Name' });

    userStore.subscribe(() => {
        setUser(userStore.getState().user);
    });

    const submit = async () => {
        const response = await HTTP.POST('/api/create-template', JSON.stringify({
            serviceName: serviceName,
            price: price,
            active: active
        }));

        if (response.success) {
            setServiceName('');
            setActive(false);
            setPrice(1);
        }

        alertsStore.dispatch({
            type: 'set', newState: {
                text: response.message,
                error: !response.success
            }
        });
    }

    return (
        <div className="Dashboard-Page container addTemplate">
            <DashboardNav />
            <h1>Add Template</h1>

            <form className="AddTemplate-form">
                <section>
                    <label>Instructor</label>
                    <input type="text" value={user.name} disabled />
                </section>
                <section>
                    <label htmlFor="serviceName">Service Name</label>
                    <input type="text" id="serviceName" value={serviceName} onChange={(e) => setServiceName(e.target.value)} />
                </section>
                <section>
                    <label htmlFor="price">Price</label>
                    <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                </section>
                <section className="checkbox-row">
                    <label htmlFor="enabled">Enabled</label>
                    <input type="checkbox" id="enabled" value={active} onChange={(e) => setActive(e.target.checked)} />
                </section>
                <button type="button" onClick={submit}>Add Service</button>
            </form>
        </div>
    );
}

export default AddTemplate;