import React from 'react';
import './Nav.scss';
import { Link, useHistory } from 'react-router-dom';
import logo from './main-logo.png';
import navStore from '../../Store/nav.store';
import auth from '../../Utils/Auth';
import authStore from '../../Store/auth.store';

function Nav(props) {
    const history = useHistory();
    const [loggedIn, setLoggedIn] = React.useState(auth.isLoggedIn());

    authStore.subscribe(() => setLoggedIn(authStore.getState().loggedIn));

    const closeNav = () => {
        navStore.dispatch({ type: 'set', newState: false });
    }

    const logout = () => {
        setLoggedIn(false);
        auth.clearToken();
        history.push('/login');
        authStore.dispatch({ type: 'logout' });
        navStore.dispatch({ type: 'set', newState: false });
    }

    return (
        <nav className={props.open ? 'main-nav open' : 'main-nav closed'} onClick={(e) => e.stopPropagation()}>
            <div className="nav-content">
                <Link to="/" onClick={closeNav}>
                    <img src={logo} alt="Page Logo" />
                </Link>

                <div className="link-group">
                    <Link to="/" onClick={closeNav}>Home</Link>
                    <Link to="/pricing" onClick={closeNav}>Pricing</Link>
                    <Link to="/opening-times" onClick={closeNav}>Opening Times</Link>
                    <Link to="/about" onClick={closeNav}>About</Link>
                    <Link to="/contact" onClick={closeNav}>Contact</Link>
                </div>

                <div className="link-group">
                    <Link to="/ems-training" onClick={closeNav}>Ems Training</Link>
                    <Link to="/abdominal-training" onClick={closeNav}>Abdominal Training</Link>
                    <Link to="/light-therapy" onClick={closeNav}>Light Therapy</Link>
                </div>

                <div className="link-group">
                    {!loggedIn ? (
                        <div>
                            <Link to="/login" onClick={closeNav}>Login</Link>

                        </div>
                    ) : (
                        <div>
                            <Link to="/dashboard" onClick={closeNav}>Dashboard</Link>
                            <button onClick={logout}>Logout</button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Nav;