import React, { useEffect } from 'react';
import './Booking.scss';
import bookingStore from '../../Store/booking.store';
import PickTraining from './PickTraining';
import PickTime from './PickTime';
import ConfirmBooking from './ConfirmBooking';
import HTTP from '../../Utils/HTTP';

function Booking(props) {
    const [headerText, setHeaderText] = React.useState('Pick Training');
    const [open, setOpen] = React.useState(false);
    const [selectedTemplate, selectTemplate] = React.useState({});
    const [selectedTime, selectTime] = React.useState({});
    const [activePage, setActivePage] = React.useState(0);
    const [pageContent, setPageContent] = React.useState(undefined);

    useEffect(() => {
        const abortController = new AbortController();

        bookingStore.subscribe(() => setOpen(bookingStore.getState().open));
        getContent(abortController.signal);
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


    const getContent = async (signal) => {
        const response = await HTTP.GET('/page-content/bookingWindow', signal);
        setPageContent(response.data);
    }

    const confirmBookingProps = () => {
        return {
            selectedTemplate,
            selectedTime
        }
    }

    return (
        <div className="booking-component">
            <div className={`toggle-booking ${!open ? 'open' : 'closed'}`} onClick={() => setOpen(true)}>
                <span className="material-icons">
                    insert_invitation
                </span>

                {pageContent !== undefined && pageContent.button1}
            </div>

            <div className={`booking-window ${open ? 'open' : 'closed'}`}>
                <div className="booking-window-content">
                    <header>
                        <h3>{headerText}</h3>
                        <span className="material-icons close-window" onClick={() => setOpen(false)}>close</span>
                    </header>
                    <div className="booking-window-body">
                        {activePage === 0 && <PickTraining setActivePage={setActivePage} selectTemplate={selectTemplate} />}
                        {activePage === 1 && <PickTime setActivePage={setActivePage} selectTime={selectTime} selectedTemplate={selectedTemplate} />}
                        {activePage === 2 && <ConfirmBooking setOpen={setOpen} setActivePage={setActivePage} {...confirmBookingProps()} />}
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