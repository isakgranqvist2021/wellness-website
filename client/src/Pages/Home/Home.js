import React from 'react';
import './Home.scss';
import bgImage from './pexels-run-ffwpu-2402777.jpg';
import bookingStore from '../../Store/booking.store';

function Home(props) {
    return (
        <div className="home-page">
            <div className="hero-section">
                <div className="content">
                    <div>
                        <h1>BOOK AN APPOINTMENT QUICK AND EASY</h1>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        <button onClick={() => bookingStore.dispatch({ type: 'set', newState: true })}>Book An Appointment</button>
                    </div>
                </div>
                <div className="bg-img" style={{ backgroundImage: 'url(' + bgImage + ')' }}></div>
            </div>
        </div>
    );
}

export default Home;