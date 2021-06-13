import React from 'react';
import './Nav.scss';
import { Link } from 'react-router-dom';
import logo from './main-logo.png';
import navStore from '../../Store/nav.store';

function Nav(props) {
    const closeNav = () => {
        navStore.dispatch({ type: 'set', newState: false });
    }

    return (
        <nav className={props.open ? 'open' : 'closed'} onClick={(e) => e.stopPropagation()}>
            <div className="nav-content">
                <Link to="/" onClick={closeNav}>
                    <img src={logo} alt="Page Logo" />
                </Link>

                <div className="link-group">
                    <Link to="/" onClick={closeNav}>Home</Link>
                    <Link to="/pricing" onClick={closeNav}>Pricing</Link>
                    <Link to="/opening-times" onClick={closeNav}>Opening Times</Link>
                    <Link to="/about" onClick={closeNav}>About</Link>
                </div>

                <div className="link-group">
                    <Link to="/" onClick={closeNav}>Ems Training</Link>
                    <Link to="/" onClick={closeNav}>Abdominal Training</Link>
                    <Link to="/" onClick={closeNav}>Light Therapy</Link>
                </div>

                <div className="link-group">
                    <Link to="/contact" onClick={closeNav}>Contact</Link>
                </div>
            </div>
        </nav>
    );
}

export default Nav;