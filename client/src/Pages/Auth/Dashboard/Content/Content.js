import React, { useEffect } from 'react';
import HTTP from '../../../../Utils/HTTP';
import alertsStore from '../../../../Store/alerts.store';

import '../Page.scss';
import './Content.scss';

function Content(props) {
    const [data, setData] = React.useState({});
    const [n, setN] = React.useState(0);

    useEffect(() => {
        const abortController = new AbortController();
        (async () => {
            const response = await HTTP.GET('/', abortController.signal);
            setData(response.data);
        })();

        return () => abortController.abort();
    }, []);

    const updateField = (attr) => {
        let ns = data;
        ns[attr.k][attr.nk] = attr.val;
        setData(ns);
        setN(n + 1);
    }

    const fileChange = async (attr) => {
        // upload file 
        const abortController = new AbortController();
        const formData = new FormData();
        formData.append('file', attr.val[0]);
        const response = await HTTP.PUT('/api/upload-img', formData, abortController.signal, true);

        // update state
        let ns = data;
        ns[attr.k][attr.nk] = response.data;
        setData(ns);
        setN(n + 1);

        // dispatch an alert event 
        alertsStore.dispatch({
            type: 'set', newState: {
                text: response.message,
                error: !response.success
            }
        });
    }

    const save = () => {
        console.log(data);
    }

    return (
        <div>
            <h1>Content</h1>
            {Object.keys(data).map((key, i) => {
                return <div key={'outer-' + i} className="form-container">
                    <h3>{key}</h3>
                    {Object.keys(data[key]).map((nestedKey, i) => {
                        return <section key={'inner-' + i} className="form-group">
                            <label>{nestedKey}</label>
                            {nestedKey !== 'img' && <input type="text" value={data[key][nestedKey]} k={key} nk={nestedKey} onChange={(e) => updateField({ val: e.target.value, k: key, nk: nestedKey })} />}
                            {nestedKey === 'img' && <input type="file" k={key} nk={nestedKey} onChange={(e) => fileChange({ val: e.target.files, k: key, nk: nestedKey })} />}
                        </section>
                    })}

                    <button onClick={save}>Save Changes</button>
                </div>
            })}
        </div>
    );
}

export default Content;