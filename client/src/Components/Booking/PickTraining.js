import React, { useEffect } from 'react';
import HTTP from '../../Utils/HTTP';
import './Window.scss';

function PickTraining(props) {
    const [templates, setTemplates] = React.useState([]);

    useEffect(() => {
        const abort = new AbortController();

        (async () => {
            const response = await HTTP.GET('/get-templates', abort.signal);
            setTemplates(response.data);
        })();

        return () => abort.abort();
    }, []);

    const selectTemplate = (t) => {
        props.selectTemplate(t);
        props.setActivePage(1);
    }


    return (
        <div className="Booking-Window">
            <h3>Pick Training</h3>

            {templates.map((t, i) => {
                return (
                    <div className="category" key={i} onClick={() => selectTemplate(t)}>
                        <p>{t.serviceName}</p>
                        <span className="material-icons">arrow_right</span>
                    </div>
                );
            })}
        </div>
    )
}

export default PickTraining;