import React from 'react';
import HTTP from '../../../../Utils/HTTP';
import './AddTemplate.scss';
import userStore from '../../../../Store/user.store';
import alertsStore from '../../../../Store/alerts.store';
import '../Page.scss';

function AddTemplate(props) {
    const [serviceName, setServiceName] = React.useState('');
    const [price, setPrice] = React.useState(1);
    const [user, setUser] = React.useState({ name: 'Your Name' });
    const [loading, setLoading] = React.useState(false);

    userStore.subscribe(() => {
        setUser(userStore.getState().user);
    });

    const submit = async () => {
        setLoading(true);
        const response = await HTTP.POST('/api/create-template', JSON.stringify({
            serviceName: serviceName,
            price: price,
            active: true
        }));

        if (response.success) {
            setServiceName('');
            setPrice(1);
        }

        alertsStore.dispatch({
            type: 'set', newState: {
                text: response.message,
                error: !response.success
            }
        });
        setLoading(false);
    }

    return (
        <div>
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
                <button type="button" onClick={submit} disabled={loading}>Add Service</button>
            </form>
        </div>
    );
}

export default AddTemplate;