import React from 'react';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';

function ServicesMangement(props) {
    const [time, setTime] = React.useState(new Date());

    return (
        <div>
            <h2>Services</h2>
            <DateTimePicker onChange={setTime} value={time} />
        </div>
    )
}

export default ServicesMangement;