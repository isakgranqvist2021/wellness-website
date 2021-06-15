import React from 'react';
import './Modal.scss';
import HTTP from '../../Utils/HTTP';
import alertsStore from '../../Store/alerts.store';

function Modal(props) {
    const [date, setDate] = React.useState(new Date().toISOString().split('T')[0]);
    const [startTime, setStartTime] = React.useState('00:00');
    const [endTime, setEndTime] = React.useState('00:00');
    const [price, setPrice] = React.useState(1);

    const submit = async (tid) => {
        const response = await HTTP.POST('/api/create-service', JSON.stringify({
            template: tid,
            date: date,
            startTime: startTime,
            endTime: endTime,
            price: price
        }));

        if (response.success) {
            props.toggleModal();
        }

        alertsStore.dispatch({
            type: 'set', newState: {
                text: response.message,
                error: !response.success
            }
        });

        props.addService(response.data);
    }

    return (
        <div className={`modal ${props.modalOpen ? 'open' : 'closed'}`} onClick={props.toggleModal}>
            <form className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Create New Time</h2>
                <section>
                    <label>Date</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </section>
                <section>
                    <label>Start Time</label>
                    <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                </section>
                <section>
                    <label>End Time</label>
                    <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                </section>
                <section>
                    <label>Price</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                </section>
                <button type="button" onClick={() => submit(props._id)}>Add Time</button>
            </form>
        </div>
    );
}

export default Modal;