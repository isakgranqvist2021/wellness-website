import React, { useEffect } from 'react';
import './Template.scss';
import Modal from '../../../../Components/Modal/Modal';
import HTTP from '../../../../Utils/HTTP';
import alertsStore from '../../../../Store/alerts.store';

function Service(props) {
    const [showDel, setShowDel] = React.useState(false);

    const deleteRow = async () => {
        if (window.confirm('are you sure you wish to delete that row?')) {
            const response = await HTTP.DELETE('/api/delete-service/' + props._id);

            if (response.success) {
                props.onDeleteService(props._id);
            }

            alertsStore.dispatch({
                type: 'set', newState: {
                    text: response.message,
                    error: !response.success
                }
            });
        }
    }

    return (
        <div className="service" onMouseEnter={() => setShowDel(true)} onMouseLeave={() => setShowDel(false)}>
            {showDel && <span className="material-icons" onClick={deleteRow}>delete</span>}
            <p>{props.instructor.name}</p>
            <div className="time">
                <span>{props.date.split('T')[0]}</span>
                <span>{props.startTime} - {props.endTime}</span>
            </div>
        </div>
    );
}

function Template(props) {
    const [modalOpen, setModalOpen] = React.useState(false);
    const [services, setServices] = React.useState([]);
    const toggleModal = () => setModalOpen(modalOpen ? false : true);
    const addService = (data) => setServices([...services, data]);
    const onDeleteService = (id) => setServices(services.filter(s => s._id !== id));
    const onDeleteTemplate = () => props.onDeleteTemplate(props._id);

    useEffect(() => {
        const abort = new AbortController();

        (async (abort) => {
            const response = await HTTP.GET('/api/find-services/' + props._id, abort.signal);
            setServices(response.data);
        })(abort);

        return () => abort.abort();
    }, [props._id])


    return (
        <div className="template">
            <h3>{props.serviceName}</h3>

            <div className="services">
                {services.map((service, i) => <Service key={i} {...service} onDeleteService={onDeleteService} />)}
            </div>

            <div className="actions">
                <button onClick={toggleModal}><span className="material-icons">add</span></button>
                <button><span className="material-icons">edit</span></button>
                <button className="danger" onClick={onDeleteTemplate}><span className="material-icons">delete</span></button>
            </div>

            <Modal {...props} modalOpen={modalOpen} toggleModal={toggleModal} addService={addService} />
        </div>
    );
}

export default Template;