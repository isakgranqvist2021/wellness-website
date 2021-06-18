import React, { useEffect } from 'react';
import '../Page.scss';
import './Booking.scss';
import HTTP from '../../../../Utils/HTTP';
import alertsStore from '../../../../Store/alerts.store';
import moment from 'moment';

function Booking(props) {
    const [selected, setSelected] = React.useState(false);

    const selectBooking = () => {
        setSelected(!selected ? true : false);
        props.selectBooking(props._id);
    }

    return (
        <tr onClick={selectBooking} className={`${selected ? 'selected' : 'not-selected'}`}>
            <td>{props.bookingId}</td>
            <td>{props.template.serviceName}</td>
            <td>{props.name}</td>
            <td>{props.email}</td>
            <td>{props.phone}</td>
            <td>{moment(props.service.date).format('MMMM d, YYYY')}</td>
            <td>{props.service.startTime} - {props.service.endTime}</td>
            <td>{moment(props.createdAt).format('MMMM d, YYYY')}</td>
            <td>{props.confirmed ? 'confirmed' : 'not confirmed'}</td>
            <td>{props.approved ? 'approved' : 'not approved'}</td>
        </tr>
    );
}

function Requests(props) {
    const [bookings, setBookings] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [selectedBookings, setSelectedBooking] = React.useState([]);
    const [storage, setStorage] = React.useState([]);

    useEffect(() => {
        fetchBookings();
        return () => { };
    }, []);

    const fetchBookings = async () => {
        const abortController = new AbortController();

        setLoading(true);
        const response = await HTTP.GET('/api/get-bookings', abortController.signal);
        if (response.success) {
            setBookings(response.data);
            setStorage(response.data);
            setLoading(false);
            setSelectedBooking([]);
        } else {
            window.location.reload();
        }
    }

    const selectBooking = (id) => {
        if (selectedBookings.includes(id)) {
            let bookings = selectedBookings;
            bookings.splice(selectedBookings.findIndex(bid => bid === id), 1);
            setSelectedBooking([...bookings]);
        } else {
            setSelectedBooking([...selectedBookings, id]);
        }
    }

    const approveSelected = async () => {
        const abortController = new AbortController();
        const response = await HTTP.PUT('/api/approve-bookings', JSON.stringify({
            bookings: selectedBookings
        }), abortController.signal, false);

        if (response.success)
            fetchBookings();

        alertsStore.dispatch({
            type: 'set', newState: {
                text: response.message,
                error: !response.success
            }
        });
    }

    const removeSelected = async () => {
        if (window.confirm(`are you sure you wish to delete ${selectedBookings.length} bookings?`)) {
            const abortController = new AbortController();
            const response = await HTTP.PUT('/api/remove-bookings', JSON.stringify({
                bookings: selectedBookings
            }), abortController.signal, false);

            if (response.success)
                fetchBookings();

            alertsStore.dispatch({
                type: 'set', newState: {
                    text: response.message,
                    error: !response.success
                }
            });
        }
    }

    const filterBookings = (e) => {
        let newState = storage;
        console.log(newState);

        if (e.target.value === 'ap') {
            newState = storage.filter(booking => booking.confirmed && !booking.approved);
        } else if (e.target.value !== 'all') {
            newState = storage.filter(booking => booking[e.target.value]);
        }

        setBookings(newState);
    }

    return (
        <div className="bookings">
            <h1>Bookings</h1>
            <div className="booking-actions">
                <select onChange={filterBookings}>
                    <option value="all">Select Filter</option>
                    <option value="ap">Awaiting Approvement</option>
                    <option value="confirmed">Email Confirmed</option>
                    <option value="approved">Booking Approved</option>
                </select>
                <button onClick={fetchBookings}>Refresh Bookings <span className="material-icons">refresh</span></button>
            </div>
            {!loading && <table>
                <thead>
                    <tr>
                        <th>Booking ID</th>
                        <th>Service</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Booking Created</th>
                        <th>Email Confirmed</th>
                        <th>Booking Approved</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map(booking => <Booking key={booking._id} {...booking} selectBooking={selectBooking} />)}
                </tbody>
            </table>
            }

            {selectedBookings.length > 0 && <div className="booking-footer-actions">
                <button className="danger" onClick={removeSelected}>Remove Selected ({selectedBookings.length})</button>
                <button onClick={approveSelected}>Approve Selected ({selectedBookings.length})</button>
            </div>}
        </div>
    )
}

export default Requests;