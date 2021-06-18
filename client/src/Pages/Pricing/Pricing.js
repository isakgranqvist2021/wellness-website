import React from 'react';
import '../Static.page.scss';
import './Pricing.scss';

function Pricing(props) {
    return (
        <div className="container pricing-page">
            <h1>Pricing</h1>

            <section>
                <div className="card">
                    <h3>EMS training</h3>
                    <ul>
                        <li><span>Monthly subscription:</span> valid for 30 days (10 TE *)	CHF	550</li>
                        <li><span>3 month subscription:</span> valid max. 120 days (24 TE / CHF 41)	CHF	990</li>
                        <li><span>6 month subscription:</span> valid max. 210 days (48 TE / CHF 35)	CHF	1,700</li>
                        <li><span>Annual subscription:</span> valid for 12 months (96 TE / CHF 26)	CHF	2,750</li>
                    </ul>
                    <p>*) TE = training unit</p>
                </div>

                <div className="card">
                    <h3>Ultrasound abdominal training</h3>
                    <ul>
                        <li><span>Turbo treatment:</span> 6 days in a row (6 TE *)	CHF	510</li>
                        <li><span>2 week course:</span> 3 days in a row (6 TE)	CHF	510</li>
                        <li><span>10 subscription:</span> valid 21 days (1 TE / CHF 80)	CHF	800</li>
                        <li><span>Monthly subscription:</span> valid for 30 days (12 TE / CHF 75)	CHF	900</li>
                        <li><span>2 month subscription:</span> valid for a maximum of 90 days (24 TE / CHF 70)	CHF	1,680</li>
                        <li><span>3 month subscription:</span> valid max. 120 days (36 TE / CHF 65)	CHF	2,340</li>
                        <li><span>6 month subscription:</span> valid max. 210 days (80 TE / CHF 50)	CHF	3,990</li>
                        <li><span>Annual subscription:</span> valid for 12 months (96 TE / CHF 45)	CHF	4,770</li>
                    </ul>
                    <p>*) TE = training unit</p>
                </div>

                <div className="card">
                    <h3>Additional offers</h3>
                    <ul>
                        <li><span>Bio-impedance analysis:</span>	CHF	60</li>
                        <li><span>Vital substances and nutritional advice:</span> including bio scan analysis (measuring blood instead of taking)	CHF	120</li>
                    </ul>
                </div>

                <p>Prices for combination training (EMS and abdominal training): After individual advice and tailored to your needs</p>
            </section>
        </div>
    );
}

export default Pricing;