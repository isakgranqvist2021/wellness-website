import React, { useEffect } from 'react';
import HTTP from '../../Utils/HTTP';

import '../Static.page.scss';

function About(props) {
    const [content, setContent] = React.useState([]);

    useEffect(() => {
        const abortController = new AbortController();
        fetchContent(abortController.signal);
        return () => abortController.abort();
    }, []);

    const fetchContent = async (signal) => {
        const response = await HTTP.GET('/content/about');

        if (response.success) {
            setContent(response.data.content);
        }
    }

    return (
        <div className="container about-page">
            <h1>About Us</h1>
            <section className="block-layout">
                {content.map((block, i) => <div className="block" key={'block-' + i} dangerouslySetInnerHTML={{ __html: block }}></div>)}
            </section>
        </div>
    );
}

export default About;