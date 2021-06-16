import React, { useEffect } from 'react';
import './Home.scss';
import bookingStore from '../../Store/booking.store';
import { Link } from 'react-router-dom';
import HTTP from '../../Utils/HTTP';

function Home(props) {
    const [settings, setSettings] = React.useState({
        title: { text: 'What is Lorem Ipsum?', color: '' },
        subtitle: { text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It ha', color: '' },
        button: { text: 'ike Aldus PageMaker.', color: '' },
        img: { src: `${HTTP.serverAddr}/uploads/default-home.jpg`, alt: '' }
    })

    console.log(props);

    useEffect(() => {
        if (props.pageSettings !== undefined) {
            let title = props.pageSettings.find(s => s.label === 'title');
            let subtitle = props.pageSettings.find(s => s.label === 'subtitle');
            let button = props.pageSettings.find(s => s.label === 'button');
            let img = props.pageSettings.find(s => s.label === 'img');

            let updt = {
                title: {
                    text: title.text.value,
                    color: title.color.value
                },
                subtitle: {
                    text: subtitle.text.value,
                    color: subtitle.color.value
                },
                button: {
                    text: button.text.value,
                    color: button.color.value
                },
                img: {
                    src: `${HTTP.serverAddr}/uploads/${img.src.value}`,
                    alt: img.alt.value
                }
            }
            setSettings(updt);
        }

    }, [props.pageSettings])

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
                        <h1 style={{ color: settings.title.color }}>{settings.title.text}</h1>
                        <p style={{ color: settings.subtitle.color }}>{settings.subtitle.text}</p>
                        <button style={{ color: settings.title.color }} onClick={() => bookingStore.dispatch({ type: 'set', newState: true })}>{settings.button.text}</button>
                    </div>
                </div>
                <div className="bg-img" style={{ backgroundImage: 'url(' + settings.img.src + ')' }}></div>
            </div>
        </div>
    );
}

export default Home;