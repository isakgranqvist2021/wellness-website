import React from 'react';
import '../Static.page.scss';

function LightTherapy(props) {
    return (
        <div className="container">
            <h1>Light Therapy</h1>
            <iframe
                width="922"
                height="518"
                src="https://www.youtube.com/embed/SK0uPnPu7Sc"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
    );
}

export default LightTherapy;