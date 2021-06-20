import React, { useEffect } from 'react';
import './Nav.scss';
import { Link, useHistory } from 'react-router-dom';
import navStore from '../../Store/nav.store';
import auth from '../../Utils/Auth';
import authStore from '../../Store/auth.store';
import alertsStore from '../../Store/alerts.store';
import HTTP from '../../Utils/HTTP';

function Nav(props) {
    const history = useHistory();
    const [loggedIn, setLoggedIn] = React.useState(auth.isLoggedIn());
    const [content, setContent] = React.useState(undefined);

    useEffect(() => {
        const abortController = new AbortController();
        authStore.subscribe(() => setLoggedIn(authStore.getState().loggedIn));
        fetchContent(abortController.signal);
        history.listen((location) => {
            navStore.dispatch({ type: 'set', newState: false });
        });

        return () => abortController.abort();
    }, [history])

    const fetchContent = async (signal) => {
        const response = await HTTP.GET('/content/extra', signal);

        if (response.success) {
            setContent(response.data.nav);
        }
    }

    const logout = () => {
        setLoggedIn(false);
        auth.clearToken();
        history.push('/login');
        authStore.dispatch({ type: 'logout' });
        navStore.dispatch({ type: 'set', newState: false });
        alertsStore.dispatch({
            type: 'set', newState: {
                text: 'see you!',
                error: false
            }
        });
    }

    return (
        <nav className={props.open ? 'main-nav open' : 'main-nav closed'} onClick={(e) => e.stopPropagation()}>
            <div className="nav-content">
                {content !== undefined &&
                    <Link to="/">
                        <img src={`${HTTP.serverAddr}/uploads/${content.logo}`} alt="Page Logo" />
                    </Link>
                }


                <div className="link-group">
                    <p>
                        <span className="material-icons">phone</span>
                        +41 0800 35 77 00
                    </p>
                </div>
                <div className="link-group">
                    <h3>Useful Links</h3>
                    <Link to="/">Home</Link>
                    <Link to="/pricing">Our Prices</Link>
                    <Link to="/opening-times">Location & Opening Times</Link>
                    <Link to="/about">About Us</Link>
                    <Link to="/contact">Contact Us</Link>
                </div>

                <div className="link-group">
                    <h3>Training Programs</h3>
                    <Link to="/ems-training">Ems Training</Link>
                    <Link to="/abdominal-training">Abdominal Training</Link>
                    <Link to="/light-therapy">Light Therapy</Link>
                </div>

                <div className="link-group">
                    {!loggedIn ?
                        (
                            <div>
                                <Link to="/login">Login</Link>
                            </div>
                        ) :
                        (
                            <div>
                                <h3>Administration</h3>
                                <Link to="/dashboard/bookings">Dashboard</Link>
                                <button onClick={logout}>Logout</button>
                            </div>
                        )}
                </div>
            </div>
        </nav>
    );
}

export default Nav;