import React, { useEffect } from 'react';
import '../Static.page.scss';
import './About.scss';
import HTTP from '../../Utils/HTTP';

function About(props) {
    const [pageContent, setPageContent] = React.useState(undefined);

    useEffect(() => {
        const abortController = new AbortController();
        getContent(abortController.signal);
        return () => abortController.abort();
    }, []);

    const getContent = async (signal) => {
        const response = await HTTP.GET('/page-content/about', signal);
        setPageContent(response.data);
    }

    return (
        <div className="container about-page">
            {pageContent !== undefined && <section>
                <div className="block">
                    <h3>{pageContent.title1}</h3>
                    <p>{pageContent.paragraph1}</p>
                </div>
                <div className="block" style={{ backgroundImage: `url(${HTTP.serverAddr}/uploads/${pageContent.img1})` }}></div>
                <div className="block" style={{ backgroundImage: `url(${HTTP.serverAddr}/uploads/${pageContent.img2})` }}></div>
                <div className="block">
                    <h3>{pageContent.title2}</h3>
                    <p>{pageContent.paragraph2}</p>
                </div>
            </section>}
        </div>
    );
}

export default About;