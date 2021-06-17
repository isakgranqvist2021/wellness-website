import React from 'react';
import './Home.scss';
import bookingStore from '../../Store/booking.store';
import { Link } from 'react-router-dom';
import HTTP from '../../Utils/HTTP';


function Home(props) {

    const img = () => {
        return {
            backgroundImage: `url(${HTTP.serverAddr}/uploads/default-home.jpg)`
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
                    <div>
                        <h1>What is Lorem Ipsum?</h1>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                        <button onClick={() => bookingStore.dispatch({ type: 'set', newState: true })}>Book An Appointment</button>
                    </div>
                </div>
                <div className="bg-img" style={img()}></div>
            </div>
        </div>
    );
}

export default Home;