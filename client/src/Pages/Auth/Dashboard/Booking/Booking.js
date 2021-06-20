import React, { useEffect } from 'react';
import '../Page.scss';
import './Booking.scss';
import HTTP from '../../../../Utils/HTTP';
import alertsStore from '../../../../Store/alerts.store';
import moment from 'moment';


function Bookings(props) {
    const [bookings, setBookings] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const fetchBookings = React.useCallback(async (signal) => {
        const response = await HTTP.GET('/api/bookings', signal);
        if (response.success) {
            setBookings(response.data.sort((a, b) => b.date - a.date));
        }
    }, []);

    useEffect(() => {
        const abortController = new AbortController();
        fetchBookings(abortController.signal);
        return () => abortController.abort();
    }, [fetchBookings]);



    return (
        <div className="bookingsPage">
            <h1>Bookings</h1>
            <div className="bookings">
                {
                    bookings.map(booking => <div className="booking">
                        <h3>{booking.program}</h3>
                        <p>{moment(booking.date).format('MM/DD/YYYY')} {booking.time}</p>
                        <p>{booking.duration}min</p>
                        <p>Bookings: {booking.bookedBy.length}</p>
                    </div>)
                }
            </div>
        </div>
    )
}

export default Bookings;