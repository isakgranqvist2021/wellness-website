import React, { useEffect } from 'react';
import HTTP from '../../Utils/HTTP';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './PickTime.scss';
import './Window.scss';

function PickTime(props) {
    const [times, setTimes] = React.useState([]);
    const [date, pickDate] = React.useState(new Date());
    const [availableTimes, setAvailableTimes] = React.useState([]);

    useEffect(() => {
        const abort = new AbortController();

        (async () => {
            const response = await HTTP.GET('/find-services/' + props.selectedTemplate._id, abort.signal)
            console.log(response);
            setTimes(response.data);
            setAvailableTimes(response.data);
        })();

        return () => abort.abort();
    }, [props.selectedTemplate._id]);

    const onDateChange = (d) => {
        pickDate(d);
        let availableTimes = times.filter((s) => {
            let pickedDate = new Date(d).toLocaleDateString();
            let availableDate = new Date(s.date).toLocaleDateString();

            return pickedDate === availableDate;
        });

        setAvailableTimes(availableTimes);
    }

    const pickTime = (t) => {
        props.selectTime(t);
        props.setActivePage(2);
    }

    return (
        <div className="Booking-Window">
            <h3>Pick A Time</h3>
            <Calendar onChange={onDateChange} value={date} style={{ margin: '0 auto', display: 'block' }} />
            <button className="showAllTimes" onClick={() => setAvailableTimes(times)}>Show all available times</button>
            {availableTimes.map((t, i) => {
                return <div key={i} className="available-date" onClick={() => pickTime(t)}>
                    <p>{t.instructor.name}</p>
                    <div>
                        <span>{t.startTime}</span>
                        <span>{t.endTime}</span>
                    </div>
                </div>
            })}
        </div>
    )
}

export default PickTime;