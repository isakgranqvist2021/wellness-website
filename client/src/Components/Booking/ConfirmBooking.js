import React from 'react';
import moment from 'moment';
import './Window.scss';
import './ConfirmBooking.scss';

function ConfirmBooking(props) {
    const [name, setName] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [email, setEmail] = React.useState('');

    const submit = () => {
        props.placeBooking({
            name: name,
            phone: phone,
            email: email
        });
    }

    return (
        <div className="Booking-Window">
            <h3>Confirm Your Booking</h3>

            <div className="bookingOverview">
                <p>{props.pickedTime.program}</p>
                <p>{moment(props.pickedTime.date).format('MM/DD')} {props.pickedTime.time}</p>
            </div>

            <form>
                <section>
                    <label>Your Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </section>
                <section>
                    <label>Your Phone Number</label>
                    <input type="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </section>
                <section>
                    <label>Your E-mail</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </section>

                <button type="button" onClick={submit}>Place Booking</button>
            </form>
        </div>
    );
}

export default ConfirmBooking;