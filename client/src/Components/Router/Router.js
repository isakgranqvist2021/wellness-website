import React from 'react';
import navStore from '../../Store/nav.store';
import { GuardProvider, GuardedRoute } from 'react-router-guards';
import { BrowserRouter, Switch } from "react-router-dom";
import auth from '../../Utils/Auth';
import './Router.scss';
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
import Images from '../../Pages/Auth/Dashboard/Images/Images';
import Requests from '../../Pages/Auth/Dashboard/Requests/Requests';
import Templates from '../../Pages/Auth/Dashboard/Templates/Templates';
import AddTemplate from '../../Pages/Auth/Dashboard/AddTemplate/AddTemplate';
import ConfirmBooking from '../../Pages/ConfirmBooking/ConfirmBooking';
import Content from '../../Pages/Auth/Dashboard/Content/Content';
import DashboardNav from '../../Pages/Auth/Dashboard/DashboardNav/DashboardNav';

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

function DashboardRouter(props) {
    return (
        <div>
            <DashboardNav />
            <div className="Dashboard-Page container">
                <Switch>
                    <GuardedRoute path="/dashboard/manage-images" component={Images} meta={{ auth: true }} exact />
                    <GuardedRoute path="/dashboard/manage-requests" component={Requests} meta={{ auth: true }} exact />
                    <GuardedRoute path="/dashboard/manage-templates" component={Templates} meta={{ auth: true }} exact />
                    <GuardedRoute path="/dashboard/add-template" component={AddTemplate} meta={{ auth: true }} exact />
                    <GuardedRoute path="/dashboard/content" component={Content} meta={{ auth: true }} exact />
                </Switch>
            </div>
        </div>
    );
}

function HomeRouter(props) {
    return (
        <div>
            <Switch>
                <GuardedRoute path="/" component={Home} exact />
                <GuardedRoute path="/pricing" component={Pricing} exact />
                <GuardedRoute path="/about" component={About} exact />
                <GuardedRoute path="/opening-times" component={OpeningTimes} exact />
                <GuardedRoute path="/contact" component={Contact} exact />
                <GuardedRoute path="/ems-training" component={EmsTraining} exact />
                <GuardedRoute path="/light-therapy" component={LightTherapy} exact />
                <GuardedRoute path="/abdominal-training" component={AbdominalTraining} exact />
                <GuardedRoute path="/confirm-booking/:confirmKey" component={ConfirmBooking} exact />
                <GuardedRoute path="/login" component={Login} meta={{ auth: false }} exact />
                <GuardedRoute path="/register" component={Register} meta={{ auth: false }} exact />
            </Switch>
        </div>
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
            next.redirect('/dashboard/manage-services');
        }
    }

    return (
        <BrowserRouter>
            <Nav open={open} />
            <Booking />
            <div onClick={toggle} className={`toggle-nav ${open ? 'open' : 'closed'}`}>
                {!open ? <span className="material-icons">menu</span> : <span className="material-icons">close</span>}
            </div>

            <div className={`filler ${open ? 'open' : 'closed'}`}></div>
            <GuardProvider guards={[requireLogin]} loading={Loading} error={NotFound}>
                <GuardedRoute path="/" component={HomeRouter} />
                <GuardedRoute path="/dashboard" component={DashboardRouter} />
            </GuardProvider>

            <Alerts />
        </BrowserRouter>
    );
}

export default Router;