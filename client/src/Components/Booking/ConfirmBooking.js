import React from 'react';
import './Window.scss';
import './ConfirmBooking.scss';
import HTTP from '../../Utils/HTTP';
import alertsStore from '../../Store/alerts.store';

function ConfirmBooking(props) {
    const [name, setName] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [email, setEmail] = React.useState('');

    const submit = async () => {
        const response = await HTTP.POST('/create-booking', JSON.stringify({
            template: props.selectedTemplate._id,
            service: props.selectedTime._id,
            name,
            phone,
            email
        }));

        if (response.success) {
            setName('');
            setPhone('');
            setEmail('');

            props.setOpen(false);
            props.setActivePage(0);
        }

        alertsStore.dispatch({
            type: 'set', newState: {
                text: response.message,
                error: !response.success
            }
        });
    }

    return (
        <div className="Booking-Window">
            <h3>Confirm Your Booking</h3>

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