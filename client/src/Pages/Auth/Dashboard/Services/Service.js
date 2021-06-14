import React from 'react';
import './Service.scss';

function Service(props) {
    return (
        <div className="service">
            <h3>{props.serviceName}</h3>
        </div>
    );
}

export default Service;