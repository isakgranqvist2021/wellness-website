import React, { useEffect } from 'react';
import './Home.scss';
import bookingStore from '../../Store/booking.store';
import HTTP from '../../Utils/HTTP';

function Home(props) {
    const [content, setContent] = React.useState(undefined);

    useEffect(() => {
        const abortController = new AbortController();
        fetchContent(abortController.signal);
        return () => abortController.abort();
    }, [])

    const fetchContent = async (signal) => {
        const response = await HTTP.GET('/content/extra', signal);
        if (response.success) {
            setContent(response.data.home);
        }
    }

    return (
        <div className="home-page">
            {content !== undefined &&
                <div className="hero-section" style={{ backgroundImage: `url(${HTTP.serverAddr}/uploads/${content.image})` }}>

                    <div className="content">
                        <div>
                            <h1>{content.title}</h1>
                            <p>{content.subtitle}</p>
                            <button onClick={() => bookingStore.dispatch({ type: 'set', newState: true })}>{content.cta}</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default Home;