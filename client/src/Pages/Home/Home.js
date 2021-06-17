import React from 'react';
import './Home.scss';
import bookingStore from '../../Store/booking.store';
import { Link } from 'react-router-dom';
import HTTP from '../../Utils/HTTP';



function Home(props) {
    const img = () => {
        if (props.pageSettings !== undefined) {
            return HTTP.serverAddr + '/uploads/' + props.pageSettings.find(ps => ps.label === 'img').value;
        }
    }

    return (
        <div className="home-page">
            <div className="hero-section">
                <div className="content">
                    <nav>
                        <Link to="/pricing">Pricing</Link>
                        <Link to="/opening-times">Opening Times</Link>
                        <Link to="/contact">Contact</Link>
                    </nav>
                    {props.pageSettings !== undefined && (
                        <div>
                            <h1>
                                {props.pageSettings.find(ps => ps.label === 'title').value}
                            </h1>
                            <p>
                                {props.pageSettings.find(ps => ps.label === 'subtitle').value}
                            </p>
                            <button onClick={() => bookingStore.dispatch({ type: 'set', newState: true })}>
                                {props.pageSettings.find(ps => ps.label === 'button').value}
                            </button>
                        </div>
                    )}
                </div>
                <div className="bg-img" style={{ backgroundImage: 'url(' + img() + ')' }}></div>
            </div>
        </div>
    );
}

export default Home;