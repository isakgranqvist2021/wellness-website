import React from 'react';
import '../Static.page.scss';
import './EmsTraining.scss';

function EmsTraining(props) {
    return (
        <div className="container emsTrainingPage">
            <h1>Ems Training</h1>

            <section>
                <div className="block">
                    <h3>Benefits of Ems-Training</h3>
                    <ul>
                        <li>Joint-friendly training without having to lift heavy weights</li>
                        <li>Strength and endurance, including cardio training</li>
                        <li>Targeted muscle building</li>
                        <li>(for example in the event of injuries)</li>
                        <li>Building and strengthening the back muscles</li>
                        <li>Slimming, shaping and firming the body</li>
                        <li>Reduction of musculoskeletal pain</li>
                        <li>Cellulite reduction</li>
                        <li>Skin tightening</li>
                        <li>Release muscle tension</li>
                        <li>Improve mobility</li>
                        <li>Stress relief</li>
                    </ul>
                </div>

                <div className="block">
                    <h3>EMS training is versatile</h3>
                    <p>The electrical muscle stimulation is ideal for back</p>
                    <p>problems : With the XBODY device you can activate and strengthen the striated muscles of the upper body in a targeted and comprehensive manner. The result is a strong, relaxed and mobile back.</p>
                    <p>EMS technology is also suitable for strength training and sports injuries:</p>
                    <p>you can build and maintain muscles in a targeted manner without stressing the joints.</p>
                    <p>Muscle building in the right place. It's easy with XBODY!</p>
                    <p>Within a very short time you will achieve a maximum increase in muscle mass and generate a high increase in performance.</p>
                    <p>The EMS training method is ideal for people who cannot achieve their goals with conventional fitness methods.</p>
                </div>

                <div className="block">
                    <h3>EMS training is efficient</h3>
                    <p>EMS training takes around 20 minutes. During this time, each individual muscle group contracts up to 180 times - ten times compared to conventional training. All this with full muscle power!</p>
                    <p>The efficient and intensive training with the XBODY device enables you to achieve maximum training effect in the shortest possible time. Your muscles will be formed faster and stronger and your fat will be burned faster. This is not possible with conventional training methods.</p>
                    <p>EMS (electrical muscle stimulation) can be used for training purposes or for health care. The device sends the impulses to the skin directly via the muscles via electrodes. You make them contract, much like normal movement.</p>
                    <p>The electrodes stimulate and promote the entire musculature or just individual muscle groups. In this way, the otherwise weaker parts of the body can also be strengthened.</p>
                    <p>Because all muscles are working at the same time, 20 to 25 minutes of training is enough.</p>
                </div>
            </section>
        </div>
    );
}

export default EmsTraining;