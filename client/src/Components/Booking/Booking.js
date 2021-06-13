import React from 'react';
import './Booking.scss';
import bookingStore from '../../Store/booking.store';

function Booking(props) {
    const [open, setOpen] = React.useState(false);

    bookingStore.subscribe(() => {
        setOpen(bookingStore.getState().open);
    });

    return (
        <div className="booking-component">
            <div className={`toggle-booking ${!open ? 'open' : 'closed'}`} onClick={() => setOpen(true)}>
                <span className="material-icons">
                    insert_invitation
                </span>
                Book An Appointment
            </div>

            <div className={`booking-window ${open ? 'open' : 'closed'}`}>
                <div className="booking-window-content">
                    <span className="material-icons close-window" onClick={() => setOpen(false)}>
                        close
                    </span>
                    <h3>Create A Booking</h3>
                </div>
            </div>
        </div>
    )
}

export default Booking;