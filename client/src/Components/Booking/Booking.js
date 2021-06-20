import React, { useEffect } from 'react';
import './Booking.scss';
import bookingStore from '../../Store/booking.store';
import PickTraining from './PickTraining';
import PickTime from './PickTime';
import ConfirmBooking from './ConfirmBooking';
import HTTP from '../../Utils/HTTP';
import alertsStore from '../../Store/alerts.store';

function Booking(props) {
    const [headerText, setHeaderText] = React.useState('Pick Training');
    const [open, setOpen] = React.useState(false);
    const [program, selectProgram] = React.useState({});
    const [pickedTime, pickTime] = React.useState({});
    const [activePage, setActivePage] = React.useState(0);
    const [content, setContent] = React.useState(undefined);

    useEffect(() => {
        const abortController = new AbortController();

        bookingStore.subscribe(() => setOpen(bookingStore.getState().open));
        fetchContent(abortController.signal);
        switch (activePage) {
            case 0:
                setHeaderText('Pick Training');
                break;
            case 1:
                setHeaderText('Pick A Time');
                break;
            case 2:
                setHeaderText('Confirm Booking');
                break;
            default:
                setHeaderText('Booking');
                break;
        }

        return () => abortController.abort();
    }, [activePage]);

    const fetchContent = async (signal) => {
        const response = await HTTP.GET('/content/extra', signal);
        if (response.success) {
            setContent(response.data.bookingWindow);
        }
    }

    const placeBooking = async (data) => {
        let newData = pickedTime;
        const emails = newData.bookedBy.map(bb => bb.email);
        console.log('place booking');

        if (!emails.includes(data.email)) {
            newData.bookedBy.push({ ...data, createdAt: new Date() });

            const response = await HTTP.POST('/place-booking', JSON.stringify(newData), null);

            alertsStore.dispatch({
                type: 'set', newState: {
                    error: !response.success,
                    text: response.message
                }
            });

            if (response.success) {
                setOpen(false);
                setActivePage(0);
            }

        } else {
            alertsStore.dispatch({
                type: 'set', newState: {
                    error: true,
                    text: 'You have already placed a booking'
                }
            });
        }
    }

    return (
        <div className="booking-component">
            <div className={`toggle-booking ${!open ? 'open' : 'closed'}`} onClick={() => setOpen(true)}>
                <span className="material-icons">
                    insert_invitation
                </span>

                {content !== undefined && content.buttonText}
            </div>

            <div className={`booking-window ${open ? 'open' : 'closed'}`}>
                <div className="booking-window-content">
                    <header>
                        <h3>{headerText}</h3>
                        <span className="material-icons close-window" onClick={() => setOpen(false)}>close</span>
                    </header>
                    <div className="booking-window-body">
                        {activePage === 0 && <PickTraining setActivePage={setActivePage} selectProgram={selectProgram} />}
                        {activePage === 1 && <PickTime setActivePage={setActivePage} pickTime={pickTime} program={program} />}
                        {activePage === 2 && <ConfirmBooking setActivePage={setActivePage} placeBooking={placeBooking} pickedTime={pickedTime} />}
                    </div>
                    {
                        activePage > 0 &&
                        <footer>
                            <button onClick={() => setActivePage(activePage - 1)}>Go Back</button>
                        </footer>
                    }
                </div>
            </div>
        </div>
    )
}

export default Booking;