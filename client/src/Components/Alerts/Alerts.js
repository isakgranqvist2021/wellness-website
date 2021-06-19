import React from 'react';
import alertsStore from '../../Store/alerts.store';
import './Alerts.scss';

function Alerts(props) {
    const [alert, setAlert] = React.useState({
        text: 'Big Alert!',
        error: true,
        show: false
    });

    alertsStore.subscribe(() => {
        let newState = alertsStore.getState();

        onNewAlert({
            text: newState.text,
            error: newState.error,
            show: true
        })
    });

    const onNewAlert = (newAlert) => {
        setAlert(newAlert);

        setTimeout(() => setAlert({
            text: '',
            error: false,
            show: false
        }), 3900)
    }

    return (
        <div className={`alerts-container ${alert.error ? 'error' : 'success'} ${alert.show ? 'show' : 'hide'}`}>
            <div className="alerts-content">
                <div className="icon">
                    {alert.error ?
                        (<span className="material-icons">close</span>) :
                        (<span className="material-icons">done</span>)
                    }

                </div>
                <p>{alert.text}</p>
                <span className="material-icons close-icon" onClick={() => setAlert({ ...alert, show: false })}>close</span>
            </div>
        </div>
    );
}

export default Alerts;