import React from 'react';
import './Static.page.scss';

function Pricing(props) {
    return (
        <div className="container">
            <h1>Pricing</h1>
            <p>

                EMS training
                Monthly subscription: valid for 30 days (10 TE *)	CHF	550
                3 month subscription: valid max. 120 days (24 TE / CHF 41)	CHF	990
                6 month subscription: valid max. 210 days (48 TE / CHF 35)	CHF	1,700
                Annual subscription: valid for 12 months (96 TE / CHF 26)	CHF	2,750

                *) TE = training unit

                Additional offers

                Bio-impedance analysis:	CHF	60
                Vital substances and nutritional advice:
                including bio scan analysis (measuring blood instead of taking)	CHF	120
                Ultrasound abdominal training
                Turbo treatment: 6 days in a row (6 TE *)	CHF	510
                2 week course: 3 days in a row (6 TE)	CHF	510
                10 subscription: valid 21 days (1 TE / CHF 80)	CHF	800
                Monthly subscription: valid for 30 days (12 TE / CHF 75)	CHF	900
                2 month subscription: valid for a maximum of 90 days (24 TE / CHF 70)	CHF	1,680
                3 month subscription: valid max. 120 days (36 TE / CHF 65)	CHF	2,340
                6 month subscription: valid max. 210 days (80 TE / CHF 50)	CHF	3,990
                Annual subscription: valid for 12 months (96 TE / CHF 45)	CHF	4,770

                *) TE = training unit

                Prices for combination training (EMS and abdominal training): After individual advice and tailored to your needs
            </p>
        </div>
    );
}

export default Pricing;