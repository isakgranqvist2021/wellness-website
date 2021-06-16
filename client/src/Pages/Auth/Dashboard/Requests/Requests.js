import React, { useEffect } from 'react';
import DashboardNav from '../DashboardNav/DashboardNav';
import '../Page.scss';
import './Booking.scss';
import HTTP from '../../../../Utils/HTTP';
import alertsStore from '../../../../Store/alerts.store';

function Booking(props) {
    const [approved, setApproved] = React.useState(props.approved);

    const submit = async (newState) => {
        const response = await HTTP.PUT('/api/approve-booking', JSON.stringify({
            approved: newState,
            _id: props._id
        }));

        alertsStore.dispatch({
            type: 'set', newState: {
                text: response.message,
                error: !response.success
            }
        });

        setApproved(newState);
    }

    return (
        <div className="booking">
            <h3>{props.template.serviceName}</h3>
            <h4>{props.service.date.split('T')[0]} | {props.service.startTime} - {props.service.endTime}</h4>
            <p>{props.name}</p>
            <p>{props.email}</p>
            <p>{props.phone}</p>
            <p className={approved ? 'gr' : 're'}>{approved ? 'booking approved' : 'booking not approved'}</p>
            <div className="booking-actions">
                <button onClick={() => submit(true)} className="gr"><span className="material-icons">done</span></button>
                <button onClick={() => submit(false)} className="re"><span className="material-icons">close</span></button>
            </div>
        </div>
    );
}

function Requests(props) {
    const [bookings, setBookings] = React.useState([]);

    useEffect(() => {
        (async () => {
            const response = await HTTP.GET('/api/get-bookings');
            console.log(response);
            if (response.success) {
                setBookings(response.data);
            }
        })();
    }, []);

    return (
        <div className="Dashboard-Page container">
            <DashboardNav />
            <h1>Requests</h1>

            <div className="bookings">
                {bookings.map(booking => <Booking key={booking._id} {...booking} />)}
            </div>
        </div>
    )
}

export default Requests;