import React, { useEffect } from 'react';
import HTTP from '../../Utils/HTTP';
import Calendar from 'react-calendar';
import moment from 'moment';
import 'react-calendar/dist/Calendar.css';
import './PickTime.scss';
import './Window.scss';

function PickTime(props) {
    const [date, pickDate] = React.useState(new Date());
    const [times, setTimes] = React.useState([]);
    const [program, setProgram] = React.useState(undefined);
    const [store, setStore] = React.useState([]);

    const dateToUnix = (date) => new Date(moment(date).format('MM/DD/YYYY')).getTime() / 1000;
    const onDateChange = (date) => {
        pickDate(date);
        setTimes(store.filter(time => dateToUnix(time.date) === dateToUnix(date)));
    }

    useEffect(() => {
        const abortController = new AbortController();

        (async () => {
            setProgram(props.program);
            const response = await HTTP.GET('/programs/' + props.program.program, abortController.signal);
            if (response.success) {
                setStore(response.data);
                setTimes(response.data);
            }
        })();

        return () => abortController.abort();
    }, [props.program]);

    const pickTime = (time) => {
        props.pickTime(time);
        props.setActivePage(2);
    }

    return (
        <div className="Booking-Window">
            <h3>Pick A Time</h3>
            <Calendar onChange={onDateChange} value={date} style={{ margin: '0 auto', display: 'block' }} />
            <div className="times">
                <h4>{program !== undefined && program.program} <span onClick={() => {
                    setTimes(store);
                    pickDate(new Date());
                }}>Show all times</span></h4>
                {times.map((time, i) => <div key={'ad-' + i} className="available-date" onClick={() => pickTime(time)}>
                    <p>{moment(time.date).format('MM/DD')} {time.time}</p>
                    <p>{time.duration}min</p>
                </div>)}
            </div>
        </div>
    )
}

export default PickTime;