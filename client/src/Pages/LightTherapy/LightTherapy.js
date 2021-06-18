import React from 'react';
import '../Static.page.scss';
import './LightTherapy.scss';

function LightTherapy(props) {
    return (
        <div className="container lightTherapy-page">
            <h1>Light Therapy</h1>
            <section>
                <p>Light therapy—or phototherapy, classically referred to as heliotherapy—consists either of exposure to daylight or some equivalent form of light as a treatment for seasonal affective disorder, or exposure of the skin to specific wavelengths of light using polychromatic polarised light to treat a skin condition.</p>

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