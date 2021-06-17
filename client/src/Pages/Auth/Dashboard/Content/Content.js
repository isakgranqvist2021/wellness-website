import React, { useEffect } from 'react';
import DashboardNav from '../DashboardNav/DashboardNav';
import HTTP from '../../../../Utils/HTTP';
import alertsStore from '../../../../Store/alerts.store';
import '../Page.scss';
import './Content.scss';

function Input(props) {
    const [value, setValue] = React.useState(props.value);

    useEffect(() => {
        setValue(props.value);

        return () => { };
    }, [props.value]);

    const mSetValue = (val) => {
        setValue(val);
        props.valueChange(val, props.i);
    }

    return (
        <section>
            <label>{props.label}</label>
            {props.inputType === 'text' && <input type={props.inputType} value={value} onChange={(e) => mSetValue(e.target.value)} />}
            {props.inputType === 'file' && <input type={props.inputType} onChange={(e) => mSetValue(e.target.value)} />}
        </section>
    )
}

function PageSetting(props) {
    const [pageSetting, setPageSetting] = React.useState(props.data);

    const settingTitle = () => {
        let title = props.title.match(/[A-Z][a-z]+/g);

        if (title !== null) {
            return title;
        }

        return props.title;
    }

    const save = async () => {
        const response = await HTTP.PUT('/api/update-page-settings', JSON.stringify({
            title: props.title,
            data: pageSetting
        }));

        alertsStore.dispatch({
            type: 'set', newState: {
                text: response.message,
                error: !response.success
            }
        });
    }

    const setValue = (val, i) => {
        let newState = pageSetting;
        newState[i].value = val;
        setPageSetting(newState);
    }

    return (
        <div className="page-setting">
            <h3>{settingTitle()}</h3>
            <form>
                {pageSetting.map((input, i) => <Input key={'psn-' + i} i={i} {...input} valueChange={setValue.bind(this)} />)}
                <button type="button" onClick={save}>Save</button>
            </form>
        </div >
    )
}

function Content(props) {
    return (
        <div className="Dashboard-Page container">
            <DashboardNav />
            <h1>Content</h1>
            {Object.keys(props.pageSettings).map((key, i) =>
            (
                <div key={'ps-' + i}>
                    <PageSetting title={key} data={props.pageSettings[key]} />
                </div>
            ))}
        </div>
    )
}

export default Content;