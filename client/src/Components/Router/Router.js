import React from 'react';
import navStore from '../../Store/nav.store';
import { GuardProvider, GuardedRoute } from 'react-router-guards';
import auth from '../../Utils/Auth';
import './Router.scss';
import {
    BrowserRouter,
    Switch
} from "react-router-dom";

import pageStore from '../../Store/page.store';

import Nav from '../Nav/Nav';
import Alerts from '../Alerts/Alerts';
import Booking from '../Booking/Booking';
import Home from '../../Pages/Home/Home';
import Pricing from '../../Pages/Pricing';
import About from '../../Pages/About';
import Contact from '../../Pages/Contact';
import OpeningTimes from '../../Pages/OpeningTimes';
import Login from '../../Pages/Auth/Login/Login';
import Register from '../../Pages/Auth/Register/Register';
import LightTherapy from '../../Pages/LightTherapy';
import EmsTraining from '../../Pages/EmsTraining';
import AbdominalTraining from '../../Pages/AbdominalTraining';
import Content from '../../Pages/Auth/Dashboard/Content/Content';
import Images from '../../Pages/Auth/Dashboard/Images/Images';
import Requests from '../../Pages/Auth/Dashboard/Requests/Requests';
import Templates from '../../Pages/Auth/Dashboard/Services/Templates';
import AddTemplate from '../../Pages/Auth/Dashboard/AddTemplate/AddTemplate';
import ConfirmBooking from '../../Pages/ConfirmBooking/ConfirmBooking';

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
    const [pageSettings, setPageSettings] = React.useState({});
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
            next.redirect('/dashboard/manage-services');
        }
    };

    pageStore.subscribe(() => {
        console.log(pageStore.getState());
        setPageSettings(pageStore.getState().data);
    });

    return (
        <BrowserRouter>
            <Nav open={open}></Nav>
            <Booking pageSettings={pageSettings.bookingWindow}></Booking>
            <div onClick={toggle} className={`toggle-nav ${open ? 'open' : 'closed'}`}>
                {!open ? <span className="material-icons">menu</span> : <span className="material-icons">close</span>}
            </div>

            <div className={`filler ${open ? 'open' : 'closed'}`}></div>
            <GuardProvider guards={[requireLogin]} loading={Loading} error={NotFound}>
                <Switch>
                    <GuardedRoute path="/" exact>
                        <Home pageSettings={pageSettings.home} />
                    </GuardedRoute>

                    <GuardedRoute path="/pricing" exact >
                        <Pricing pageSettings={pageSettings.pricing} />
                    </GuardedRoute>

                    <GuardedRoute path="/about" exact >
                        <About pageSettings={pageSettings.about} />
                    </GuardedRoute>

                    <GuardedRoute path="/opening-times" exact >
                        <OpeningTimes pageSettings={pageSettings.openingTimes} />
                    </GuardedRoute>

                    <GuardedRoute path="/contact" exact >
                        <Contact pageSettings={pageSettings.contact} />
                    </GuardedRoute>

                    <GuardedRoute path="/ems-training" exact >
                        <EmsTraining pageSettings={pageSettings.emsTraining} />
                    </GuardedRoute>

                    <GuardedRoute path="/light-therapy" exact >
                        <LightTherapy pageSettings={pageSettings.lightTherapy} />
                    </GuardedRoute>

                    <GuardedRoute path="/abdominal-training" exact >
                        <AbdominalTraining pageSettings={pageSettings.abdonimalTraining} />
                    </GuardedRoute>

                    <GuardedRoute path="/confirm-booking/:confirmKey" exact >
                        <ConfirmBooking pageSettings={pageSettings.confirmBooking} />
                    </GuardedRoute>

                    <GuardedRoute path="/login" meta={{ auth: false }} exact >
                        <Login pageSettings={pageSettings.login} />
                    </GuardedRoute>

                    <GuardedRoute path="/register" meta={{ auth: false }} exact >
                        <Register pageSettings={pageSettings.register} />
                    </GuardedRoute>

                    <GuardedRoute path="/dashboard/manage-content" meta={{ auth: true }} exact >
                        <Content pageSettings={pageSettings} />
                    </GuardedRoute>

                    <GuardedRoute path="/dashboard/manage-images" meta={{ auth: true }} exact >
                        <Images pageSettings={pageSettings.manageImages} />
                    </GuardedRoute>
                    <GuardedRoute path="/dashboard/manage-requests" meta={{ auth: true }} exact >
                        <Requests pageSettings={pageSettings.manageRequests} />
                    </GuardedRoute>

                    <GuardedRoute path="/dashboard/manage-services" meta={{ auth: true }} exact>
                        <Templates pageSettings={pageSettings.manageServices} />
                    </GuardedRoute>

                    <GuardedRoute path="/dashboard/add-template" meta={{ auth: true }} exact >
                        <AddTemplate pageSettings={pageSettings.addTemplate} />
                    </GuardedRoute>
                </Switch>
            </GuardProvider>

            <Alerts />
        </BrowserRouter>
    );
}

export default Router;