import React from 'react';
import DashboardNav from '../DashboardNav/DashboardNav';
import HTTP from '../../../../Utils/HTTP';
import alertsStore from '../../../../Store/alerts.store';
import '../Page.scss';
import './Content.scss';

function TextInput(props) {
    const [text, setText] = React.useState(props.text.value);

    const setTextProp = (val) => {
        setText(val);
        props.updateSetting({ part: props.label, prop: 'text', val: val });
    }


    return (
        <div className="form-group">
            <section className="text">
                <label>{props.label} Text</label>
                <input type={props.text.inputType} value={text} onChange={(e) => setTextProp(e.target.value)} />
            </section>
        </div>
    )
}

function FileInput(props) {
    const setValue = (v) => {

    }

    return (
        <div className="form-group">
            <section className="text">
                <label>{props.label} Alt</label>
                <input type={props.alt.inputType} value={props.alt.value} onChange={(e) => setValue(e.target.value)} />
            </section>
            <section>
                <label>{props.label} Src</label>
                <input type={props.src.inputType} />
            </section>
        </div>
    )
}

function PageSetting(props) {
    const [pageSetting, setPageSetting] = React.useState(props);

    const settingTitle = () => {
        let title = props.title.match(/[A-Z][a-z]+/g);

        if (title !== null) {
            return title;
        }

        return props.title;
    }

    const updateSetting = (injection) => {
        let newState = pageSetting;
        let part = newState.data.find(ps => ps.label === injection.part);
        part[injection.prop].value = injection.val;
        setPageSetting(newState);
    }

    const save = async () => {
        const response = await HTTP.PUT('/api/update-page-settings', JSON.stringify(pageSetting));

        alertsStore.dispatch({
            type: 'set', newState: {
                text: response.message,
                error: !response.success
            }
        });
    }

    return (
        <div className="page-setting">
            <h3>{settingTitle()}</h3>
            <form>
                {props.data.map((prop, i) => {
                    if (prop.type === 'text') {
                        return (
                            <div key={'ti-' + i} className="form-container">
                                <TextInput {...prop} updateSetting={updateSetting} />
                            </div>
                        )
                    } else if (prop.type === 'image') {
                        return (
                            <div key={'fi-' + i} className="form-container">
                                <FileInput {...prop} updateSetting={updateSetting} />
                            </div>
                        )
                    } else {
                        return (
                            <div key={'empty-' + i}></div>
                        )
                    }
                })}

                <button type="button" onClick={save}>Save</button>
            </form>
        </div>
    )
}

function Content(props) {
    return (
        <div className="Dashboard-Page container">
            <DashboardNav />
            <h1>Content</h1>
            {Object.keys(props.pageSettings).map((key, i) => {
                return (
                    <div key={'ps-' + i}>
                        <PageSetting title={key} data={props.pageSettings[key]} />
                    </div>
                )
            })}
        </div>
    )
}

export default Content;