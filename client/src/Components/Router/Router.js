import React, { useEffect } from 'react';
import navStore from '../../Store/nav.store';
import './Router.scss';
import {
    BrowserRouter,
    Switch,
    Route
} from "react-router-dom";

import Nav from '../Nav/Nav';
import Booking from '../Booking/Booking';
import Home from '../../Pages/Home/Home';
import Pricing from '../../Pages/Pricing';
import About from '../../Pages/About';
import Contact from '../../Pages/Contact';
import OpeningTimes from '../../Pages/OpeningTimes';
import Login from '../../Pages/Login';

function Router(props) {
    const [open, setOpen] = React.useState(false);
    navStore.subscribe(() => setOpen(navStore.getState().open));

    window.addEventListener('click', (e) => {
        if (open) {
            navStore.dispatch({ type: 'set', newState: false });
        }
    });

    const toggle = (e) => {
        e.stopPropagation();
        navStore.dispatch({ type: 'toggle' });
    }

    return (
        <BrowserRouter>
            <Nav open={open}></Nav>
            <Booking></Booking>
            <div onClick={toggle} className={`toggle-nav ${open ? 'open' : 'closed'}`}>
                {!open ? <span className="material-icons">menu</span> : <span className="material-icons">close</span>}
            </div>

            <div className={`filler ${open ? 'open' : 'closed'}`}></div>

            <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/pricing" component={Pricing} exact />
                <Route path="/about" component={About} exact />
                <Route path="/opening-times" component={OpeningTimes} exact />
                <Route path="/contact" component={Contact} exact />
                <Route path="/login" component={Login} exact />
            </Switch>
        </BrowserRouter>
    );
}

export default Router;