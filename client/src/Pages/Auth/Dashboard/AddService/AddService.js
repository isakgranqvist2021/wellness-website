import React, { useEffect } from 'react';
import DashboardNav from '../DashboardNav/DashboardNav';
import HTTP from '../../../../Utils/HTTP';
import './AddService.scss';
import userStore from '../../../../Store/user.store';
import alertsStore from '../../../../Store/alerts.store';

function AddServiceForm() {
    const [serviceName, setServiceName] = React.useState('');
    const [active, setActive] = React.useState(false);
    const [date, setDate] = React.useState(new Date());
    const [startTime, setStartTime] = React.useState('');
    const [endTime, setEndTime] = React.useState('');
    const [price, setPrice] = React.useState(1);


    const [user, setUser] = React.useState({ name: '' });

    userStore.subscribe(() => {
        setUser(userStore.getState().user);
    });

    //componentDidMount
    useEffect(() => {
        window.addEventListener("load", pageLoad);

        return () => {
            window.removeEventListener("load", pageLoad);
        }
    });

    const pageLoad = () => {
        console.log('Unmounting')
    }

    const submit = async () => {
        const response = await HTTP.POST('/api/create-service', JSON.stringify({
            serviceName: serviceName,
            date: date,
            startTime: startTime,
            endTime: endTime,
            price: price,
            active: active
        }));

        if (response.success) {
            setActive(false);
            setDate(Date.now());
            setStartTime('');
            setEndTime('');
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
        <div className="container">
            <DashboardNav />
            <form className="addService-form">
                <h2>Add Service</h2>
                <section>
                    <label>Instructor</label>
                    <input type="text" value={user.name} disabled />
                </section>
                <section>
                    <label htmlFor="serviceName">Service Name</label>
                    <input type="text" id="serviceName" value={serviceName} onChange={(e) => setServiceName(e.target.value)} />
                </section>
                <section>
                    <label htmlFor="date">Date</label>
                    <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </section>
                <section>
                    <label htmlFor="startTime">Start Time</label>
                    <input type="time" id="startTime" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                </section>
                <section>
                    <label htmlFor="endTime">End Time</label>
                    <input type="time" id="endTime" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
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

export default AddServiceForm;