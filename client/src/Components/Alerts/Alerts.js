import React from 'react';
import alertsStore from '../../Store/alerts.store';
import './Alerts.scss';

function Alerts(props) {
    const [show, setShow] = React.useState(false);
    const [alert, setAlert] = React.useState({
        text: 'Big Alert!',
        error: true
    });

    alertsStore.subscribe(() => {
        setAlert(alertsStore.getState());
        setShow(true);
        window.setTimeout(() => {
            setShow(false);
        }, 5000);
    });

    return (
        <div className={`alerts-container ${alert.error ? 'error' : 'success'} ${show ? 'show' : 'hide'}`}>
            <div className="alerts-content">
                <div className="icon">
                    {alert.error ?
                        (<span className="material-icons">close</span>) :
                        (<span className="material-icons">done</span>)
                    }

                </div>
                <p>{alert.text}</p>
                <span className="material-icons close-icon" onClick={() => setShow(false)}>close</span>
            </div>
        </div>
    );
}

export default Alerts;