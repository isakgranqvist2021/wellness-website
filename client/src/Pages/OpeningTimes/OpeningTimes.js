import React from 'react';
import '../Static.page.scss';
import './OpeningTimes.scss';

function OpeningTimes(props) {
    return (
        <div className="container opening-times-page">
            <h1>Location & Opening Times</h1>

            <section>
                <p><span>Monday to Friday:</span>7.30 a.m. - 8.00 p.m.</p>
                <p><span>Saturday:</span>9 a.m. - 3 p.m.</p>
                <p><span>Our Location:</span>St. Johanns-Vorstadt 74</p>
            </section>
            <div className="map">
                <iframe title="Our Location" frameBorder="0" scrolling="no" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=St.%20Johanns-Vorstadt%2074,%204056%20Basel,%20Switzerland+(Fitsonic)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
            </div>
        </div>
    )
}

export default OpeningTimes;