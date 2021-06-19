import React, { useEffect } from 'react';
import HTTP from '../../Utils/HTTP';
import '../Static.page.scss';
import './OpeningTimes.scss';

function OpeningTimes(props) {
    const [content, setContent] = React.useState([]);

    useEffect(() => {
        const abortController = new AbortController();
        fetchContent(abortController.signal);
        return () => abortController.abort();
    }, []);

    const fetchContent = async (signal) => {
        const response = await HTTP.GET('/content/opening%20times');

        if (response.success) {
            setContent(response.data.content);
        }
    }

    return (
        <div className="container opening-times-page">
            <h1>Location & Opening Times</h1>

            <section className="block-layout">
                {content.map((block, i) => <div className="block" key={'block-' + i} dangerouslySetInnerHTML={{ __html: block }}></div>)}
            </section>

            <div className="map">
                <iframe title="Our Location" frameBorder="0" scrolling="no" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=St.%20Johanns-Vorstadt%2074,%204056%20Basel,%20Switzerland+(Fitsonic)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
            </div>
        </div>
    )
}

export default OpeningTimes;