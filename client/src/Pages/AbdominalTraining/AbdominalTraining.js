import React from 'react';
import '../Static.page.scss';
import { Link } from 'react-router-dom';
import './AbdominalTraining.scss';

function AbdominalTraining(props) {
    return (
        <div className="container abdominalTraining-page">
            <h1>Abdominal Training</h1>
            <section>
                <p>Due to the effect of the ultrasonic waves in connection with physical activity, the fat pads resp. the fat, about 1400 kcal of energy, is released into the lymph and venous flow. With simultaneous observance resp. Maintaining the calorie balance (approx. 2000 Kcal / day for women and approx. 3000 Kcal / day for men), you lose unwanted centimeters without feeling hungry.</p>
                <p>We achieve extraordinary results in record time because we respect the natural body functions and accelerate the following processes:</p>

                <div className="block">
                    <h3>FAT REDUCTION</h3>
                    <p>This works vigorously, in a targeted manner and without endangering the body. Thanks to the ultrasonic waves, the body breaks down up to 1400 kcal of energy with each session.</p>
                </div>
                <div className="block">
                    <h3>LYMPH DRAINAGE</h3>
                    <p>As part of the Fitsonic method, an important process that is accelerated by the warming of the belt and physical activity.</p>
                </div>
                <div className="block">
                    <h3>VASCULAR Dilation</h3>
                    <p>Here we can see a similar phenomenon as with lymphatic drainage. The transport of fatty acids to the muscles is supported so that the fatty acids can be burned.</p>
                </div>
                <div className="block">
                    <h3>ENERGY BALANCE</h3>
                    <p>In order for the energy balance to be correct, the energy already released in the body must be taken into account when adding calories.</p>
                    <p>The FITSONIC abdominal training is ideal for people who cannot reach their body size with conventional methods.</p>
                </div>
                <div className="block">
                    <h3>Success documentation</h3>
                    <p>Sometimes losing weight doesn't want to go as planned. Eating habits, intolerances or your own microbiology can be responsible for this. With the BioScan analysis we try to find out the cause.</p>
                    <p>With a patented process, the condition of the cell membrane of the responsible organ and any resulting undersupply of essential micronutrients and vital substances is measured. This scalar wave analysis delivers approx. 230 parameters in a measurement of 90 seconds, sorted in 31 different preventive health-relevant subject areas, painless and non-invasive .</p>
                    <p>You will receive information on the cardiovascular system, bones, functions of organs (e.g. gastrointestinal), homotoxins, vitamins, trace elements, minerals, amino acids, blood sugar levels, heavy metals and the acid-base balance.</p>
                </div>
                <div className="block">
                    <h3>For your documentation of success:</h3>
                    <p>Before the 1st TE and after the 6th TE, we measure your body composition. The BIA (Bioelectrical Impedance Analysis) is a measurement method recognized worldwide by scientists, in which a weak current that is not perceptible to humans is passed through the body. The body composition can be determined using the measured flow resistance (bioelectrical impedance).</p>
                    <p>The physiological properties are used, especially the different electrical conductivity of the body's own tissue and water.</p>
                    <p>The additional costs of CHF 55.00 for the bioscan analysis are included ( <Link to="pricing">price list</Link> )</p>
                </div>
            </section>
        </div>
    );
}

export default AbdominalTraining;