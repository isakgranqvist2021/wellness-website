import React, { useEffect } from 'react';
import HTTP from '../../../../Utils/HTTP';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '../Page.scss';
import './Content.scss';
import alertsStore from '../../../../Store/alerts.store';

function Content(props) {
    const [accessors, setAccessors] = React.useState([]);
    const [content, setContent] = React.useState(undefined);
    const [pageTitle, setPageTitle] = React.useState('Content');
    const [loading, setLoading] = React.useState(false);
    const [n, setN] = React.useState(0);
    const [view, setView] = React.useState('pages');
    const [extras, setExtras] = React.useState(undefined);
    const [imgBrowser, setImgBrowser] = React.useState({ block: '', open: false });
    const [images, setImages] = React.useState([]);

    useEffect(() => {
        const abortController = new AbortController();

        (async () => {
            const response = await HTTP.GET('/api/accessors', abortController.signal);
            const imagesResponse = await HTTP.GET('/api/all-images', abortController.signal);
            if (response.success) {
                setAccessors(response.data);
                fetchContent(response.data[0]._id);
            }

            if (imagesResponse.success) {
                setImages(imagesResponse.data);
            }

        })();

        return () => abortController.abort();
    }, []);

    const fetchContent = async (id) => {
        setLoading(true);
        const response1 = await HTTP.GET('/api/content/' + id);
        const response2 = await HTTP.GET('/api/content/extra');

        if (response1.success) {
            setContent(response1.data);
            setPageTitle(response1.data.accessor);
        }

        if (response2.success) {
            setExtras(response2.data);
        }

        if (response1.success && response2.success) {
            setLoading(false);
        }
    }

    const addBlock = () => {
        let c = content;
        c.content.push('');
        setContent(c);
        setN(n + 1);
    }

    const removeBlock = (i) => {
        let c = content;
        c.content.splice(i, 1);
        setContent(c);
        setN(n + 1);
        alertsStore.dispatch({
            type: 'set', newState: {
                error: false,
                text: 'block has been removed, click save before closing'
            }
        });
    }

    const save = async () => {
        const abortController = new AbortController();
        const response = await HTTP.PUT('/api/update-content', JSON.stringify(content), abortController.signal, false);

        alertsStore.dispatch({
            type: 'set', newState: {
                text: response.message,
                error: !response.success
            }
        });
    }

    const saveExtras = async () => {
        const response = await HTTP.PUT('/api/update-extras', JSON.stringify(extras), null, false);
        alertsStore.dispatch({
            type: 'set', newState: {
                text: response.message,
                error: !response.success
            }
        });

        setTimeout(() => window.location.reload(), 2400);
    }

    const uploadFile = async (files, place) => {
        const formData = new FormData();
        formData.append('file', files[0]);

        const response = await HTTP.PUT('/api/upload-img', formData, null, true);

        if (response.success) {
            setExtras({
                ...extras,
                [place]: {
                    ...extras[place],
                    [place === 'home' ? 'image' : 'logo']: response.data
                }
            });
            setN(n + 1);
        }

        alertsStore.dispatch({
            type: 'set', newState: {
                text: response.message,
                error: !response.success
            }
        });
    }

    const onImgClick = (image) => {
        let ex = extras;

        ex[imgBrowser.block][imgBrowser.block === 'nav' ? 'logo' : 'image'] = image;
        setExtras(ex);
        setN(n + 1);

        alertsStore.dispatch({
            type: 'set', newState: {
                text: 'Image updated, click save to update page',
                error: false
            }
        });
        setImgBrowser({ block: '', open: false });
    }

    return (
        <div className="EditContent">
            <header>
                <button onClick={() => setView('pages')}>Pages</button>
                <button onClick={() => setView('extras')}>Extras</button>
            </header>
            <h1>
                {pageTitle}
                {!loading && view === 'pages' &&
                    <select onChange={(e) => fetchContent(e.target.value)}>
                        {accessors.map((item, i) => <option key={'accessor-' + i} value={item._id}>{item.accessor}</option>)}
                    </select>}
            </h1>

            {loading && <p>Hold tight...</p>}
            {!loading && view === 'extras' && <div className="extras">
                <form>
                    <div className={`imgBrowser ${imgBrowser.open ? 'open' : 'closed'}`} onClick={(e) => setImgBrowser({ block: null, open: imgBrowser.open ? false : true })}>
                        <div className="imgBrowser-content" onClick={(e) => e.stopPropagation()}>
                            {images.map((image, i) => <img alt={'img ' + i} onClick={() => onImgClick(image)} key={'imgbrowser-' + i} src={`${HTTP.serverAddr}/uploads/${image}`} />)}
                        </div>
                    </div>
                    <section>
                        <h3>Home</h3>
                        <div>
                            <label>Title</label>
                            <input value={extras.home.title} onChange={(e) => setExtras({ ...extras, home: { ...extras.home, title: e.target.value } })} />
                        </div>
                        <div>
                            <label>Subtitle</label>
                            <input value={extras.home.subtitle} onChange={(e) => setExtras({ ...extras, home: { ...extras.home, subtitle: e.target.value } })} />
                        </div>
                        <div>
                            <label>Button</label>
                            <input value={extras.home.cta} onChange={(e) => setExtras({ ...extras, home: { ...extras.home, cta: e.target.value } })} />
                        </div>
                        <div className="fileUploadContainer">
                            <p>{extras.home.image}</p>
                            <button type="button" onClick={() => document.getElementById('home-file-input').click()}>Browse Files</button>
                            <button type="button" onClick={() => setImgBrowser({ block: 'home', open: true })}>My Files</button>
                            <input type="file" id="home-file-input" onChange={(e) => uploadFile(e.target.files, 'home')} accept="image/jpg, image/png, image/jpeg" />
                        </div>
                    </section>
                    <section>
                        <h3>Booking Window</h3>
                        <div>
                            <label>Button Text</label>
                            <input value={extras.bookingWindow.buttonText} onChange={(e) => setExtras({ ...extras, bookingWindow: { ...extras.bookingWindow, buttonText: e.target.value } })} />
                        </div>
                    </section>
                    <section>
                        <h3>Nav Logo</h3>
                        <div className="fileUploadContainer">
                            <p>{extras.nav.logo}</p>
                            <button type="button" onClick={() => document.getElementById('nav-file-input').click()}>Browse Files</button>
                            <button type="button" onClick={() => setImgBrowser({ block: 'nav', open: true })}>My Files</button>
                            <input type="file" id="nav-file-input" onChange={(e) => uploadFile(e.target.files, 'nav')} accept="image/jpg, image/png, image/jpeg" />
                        </div>
                    </section>
                    <button type="button" onClick={saveExtras}>Save Extras</button>
                </form>
            </div>}
            {!loading && view === 'pages' && <div>
                <button onClick={addBlock}>Add Block</button>

                {content !== undefined && content.content.map((block, i) => {
                    return <div className="block" key={'block-' + i}>
                        <h3>Block {i + 1} <span className="material-icons" title="Delete block" onClick={(e) => removeBlock(i)}>delete</span></h3>
                        <CKEditor config={{
                            toolbar: [
                                'heading', 'insertTable', 'indent',
                                'bold', 'italic', 'link', 'undo', 'redo', 'numberedList', 'bulletedList'
                            ]
                        }} editor={ClassicEditor} data={block} onReady={editor => {
                            if (editor !== null && block !== null) {
                                editor.setData(block)
                            }

                        }} onChange={(event, editor) => {
                            let c = content;
                            c.content[i] = editor.getData();
                            setContent(c);
                        }} />
                    </div>
                })}

                {content !== undefined && content.content.length > 0 && <button onClick={save}>Save</button>}
            </div>}
        </div>
    );
}

export default Content;