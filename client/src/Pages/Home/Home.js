import React, { useEffect } from 'react';
import './Home.scss';
import bookingStore from '../../Store/booking.store';
import HTTP from '../../Utils/HTTP';

function Home(props) {
    const [pageContent, setPageContent] = React.useState(undefined);

    useEffect(() => {
        const abortController = new AbortController();
        getContent(abortController.signal);

        return () => abortController.abort();
    }, []);

    const getContent = async (signal) => {
        const response = await HTTP.GET('/page-content/home', signal);
        setPageContent(response.data);
    }

    return (
        <div className="home-page">
            {pageContent !== undefined && <div className="hero-section" style={{ backgroundImage: `url(${HTTP.serverAddr}/uploads/${pageContent.img1})` }}>
                <div className="content">
                    <div>
                        <h1>{pageContent.title1}</h1>
                        <p>{pageContent.paragraph1}</p>
                        <button onClick={() => bookingStore.dispatch({ type: 'set', newState: true })}>Book An Appointment</button>
                    </div>
                </div>
            </div>}
        </div>
    );
}

export default Home;