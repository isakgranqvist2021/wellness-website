import React, { useEffect } from 'react';
import HTTP from '../../../../Utils/HTTP';
import Template from './Template';
import alertsStore from '../../../../Store/alerts.store';
import '../Page.scss';

function Templates(props) {
    const [templates, setTemplates] = React.useState([]);
    const onDeleteTemplate = async (id) => {
        if (window.confirm('are you sure you wish to delete this template?')) {
            const response = await HTTP.DELETE('/api/delete-template/' + id);

            if (response.success) {
                setTemplates(templates.filter(t => t._id !== id));
            }

            alertsStore.dispatch({
                type: 'set', newState: {
                    text: response.message,
                    error: !response.success
                }
            });
        }
    }

    useEffect(() => {
        const abort = new AbortController();

        (async () => {
            const response = await HTTP.GET('/api/get-templates', abort.signal);
            setTemplates(response.data);
        })(abort)

        return () => abort.abort();
    }, []);

    return (
        <div className="manage-services">
            <h1>Manage Services</h1>
            <div className="active-services">
                {templates.map(template => <Template key={template._id} {...template} onDeleteTemplate={onDeleteTemplate} />)}
            </div>
        </div>
    )
}

export default Templates;