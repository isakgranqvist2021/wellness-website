import React from 'react';
import navStore from '../../Store/nav.store';
import { GuardProvider, GuardedRoute } from 'react-router-guards';
import auth from '../../Utils/Auth';
import './Router.scss';
import {
    BrowserRouter,
    Switch
} from "react-router-dom";

import Nav from '../Nav/Nav';
import Booking from '../Booking/Booking';
import Home from '../../Pages/Home/Home';
import Pricing from '../../Pages/Pricing';
import About from '../../Pages/About';
import Contact from '../../Pages/Contact';
import OpeningTimes from '../../Pages/OpeningTimes';
import Login from '../../Pages/Auth/Login/Login';
import Register from '../../Pages/Auth/Register/Register';
import Dashboard from '../../Pages/Auth/Dashboard/Dashboard';
import LightTherapy from '../../Pages/LightTherapy';
import EmsTraining from '../../Pages/EmsTraining';
import AbdominalTraining from '../../Pages/AbdominalTraining';

function Loading(props) {
    return (
        <div>Loading...</div>
    );
}

function NotFound(props) {
    return (
        <div>Not found...</div>
    );
}

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

    const requireLogin = (to, from, next) => {
        if (to.meta.auth) {
            if (auth.isLoggedIn()) {
                next();
            }
            next.redirect('/login');
        } else if (to.meta.auth === undefined) {
            next();
        } else if (!to.meta.auth) {
            if (!auth.isLoggedIn()) {
                next();
            }

            next.redirect('/dashboard');
        }
    };

    return (
        <BrowserRouter>
            <Nav open={open}></Nav>
            <Booking></Booking>
            <div onClick={toggle} className={`toggle-nav ${open ? 'open' : 'closed'}`}>
                {!open ? <span className="material-icons">menu</span> : <span className="material-icons">close</span>}
            </div>

            <div className={`filler ${open ? 'open' : 'closed'}`}></div>
            <GuardProvider guards={[requireLogin]} loading={Loading} error={NotFound}>
                <Switch>
                    <GuardedRoute path="/" component={Home} exact />
                    <GuardedRoute path="/pricing" component={Pricing} exact />
                    <GuardedRoute path="/about" component={About} exact />
                    <GuardedRoute path="/opening-times" component={OpeningTimes} exact />
                    <GuardedRoute path="/contact" component={Contact} exact />
                    <GuardedRoute path="/login" component={Login} meta={{ auth: false }} exact />
                    <GuardedRoute path="/register" component={Register} meta={{ auth: false }} exact />
                    <GuardedRoute path="/dashboard" component={Dashboard} meta={{ auth: true }} exact />
                    <GuardedRoute path="/light-therapy" component={LightTherapy} meta={{ auth: true }} exact />
                    <GuardedRoute path="/abdominal-training" component={AbdominalTraining} meta={{ auth: true }} exact />
                    <GuardedRoute path="/ems-training" component={EmsTraining} meta={{ auth: true }} exact />
                </Switch>
            </GuardProvider>
        </BrowserRouter>
    );
}

export default Router;