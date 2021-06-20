import React, { useEffect } from 'react';
import HTTP from '../../../../Utils/HTTP';
import alertsStore from '../../../../Store/alerts.store';
import Calendar from 'react-calendar';
import moment from 'moment';
import '../Page.scss';
import './Schedule.scss';

function Templates(props) {
    const [date, setDate] = React.useState(new Date());
    const [program, setProgram] = React.useState('');
    const [duration, setDuration] = React.useState(30);
    const [times, setTimes] = React.useState([]);

    const getTimes = React.useCallback((t) => {
        let times = [];
        const minPerDay = 60 * 24;
        const timesPerDay = minPerDay / t;

        for (let i = 0; i <= timesPerDay; i++) {
            times.push({
                selected: false,
                time: moment().startOf('day').add(i * t, 'minutes').format('hh:mm A'),
                date: date
            });
        }

        return times;
    }, [date]);

    useEffect(() => {
        setTimes(getTimes(duration));
    }, [duration, getTimes]);

    const dateChange = (date) => {
        setDate(date);
        setTimes(getTimes(duration));
    }

    const selectTime = (time, i) => {
        let newTimes = times;
        newTimes[i].selected = !newTimes[i].selected ? true : false;
        setTimes([...newTimes]);
    }

    const onDurationChange = (t) => {
        setDuration(parseInt(t));
        setTimes(getTimes(parseInt(t)));
    }

    const addTimes = async () => {
        if (window.confirm(`Add ${times.filter(time => time.selected).length} times to booking window?`)) {
            if (program.length <= 1) {
                return alertsStore.dispatch({
                    type: 'set', newState: {
                        error: true,
                        text: 'please enter the program name'
                    }
                });
            }

            const addToBooking = times.filter(time => time.selected);
            let newBookings = addToBooking.map(booking => {
                return {
                    time: booking.time,
                    date: booking.date,
                    program: program,
                    duration: duration
                };
            });

            const response = await HTTP.POST('/api/insert-bookings', JSON.stringify(newBookings), null);

            if (response.success) {
                dateChange(new Date());
            }

            alertsStore.dispatch({
                type: 'set', newState: {
                    text: response.message,
                    error: !response.success
                }
            })
        }
    }

    return (
        <div className="schedule">
            <h1>Schedule</h1>
            <form>
                <section>
                    <label>What's the service called?</label>
                    <input type="text" placeholder="Ems Training" value={program} onChange={(e) => setProgram(e.target.value)} />
                </section>
                <section>
                    <label>Duration of training? (in minutes)</label>
                    <select onChange={(e) => onDurationChange(e.target.value)}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="25">25</option>
                        <option value="30">30</option>
                        <option value="35">35</option>
                        <option value="40">40</option>
                        <option value="45">45</option>
                        <option value="50">50</option>
                        <option value="55">55</option>
                        <option value="60">60</option>
                    </select>
                </section>
                <section>
                    <label>Date</label>
                    <Calendar value={date} onChange={dateChange} />
                </section>
                <section>
                    <label>Times</label>
                    <div className="times">
                        {times.map((time, i) => <div key={'time-' + i} className={`time ${time.selected ? 'selected' : ''}`} onClick={() => selectTime(time, i)}>
                            {time.time}
                        </div>)}
                    </div>
                </section>
                {
                    times.filter(time => time.selected).length > 0 &&
                    <button className="submit-times" type="button" onClick={addTimes}>
                        Add Times To Booking Window
                        ({times.filter(time => time.selected).length})
                    </button>
                }
            </form>
        </div>
    )
}

export default Templates;