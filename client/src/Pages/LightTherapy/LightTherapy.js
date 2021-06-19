import React, { useEffect } from 'react';
import HTTP from '../../Utils/HTTP';
import '../Static.page.scss';
import './LightTherapy.scss';

function LightTherapy(props) {
    const [content, setContent] = React.useState([]);

    useEffect(() => {
        const abortController = new AbortController();
        fetchContent(abortController.signal);
        return () => abortController.abort();
    }, []);

    const fetchContent = async (signal) => {
        const response = await HTTP.GET('/content/light%20therapy');

        if (response.success) {
            setContent(response.data.content);
        }
    }

    return (
        <div className="container lightTherapy-page">
            <h1>Light Therapy</h1>

            <section className="block-layout">
                {content.map((block, i) => <div className="block" key={'block-' + i} dangerouslySetInnerHTML={{ __html: block }}></div>)}
            </section>

            <section>
                <iframe
                    width="1280"
                    height="720"
                    src="https://www.youtube.com/embed/fASegf-_lBM"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen></iframe>
            </section>
        </div>
    );
}

export default LightTherapy;