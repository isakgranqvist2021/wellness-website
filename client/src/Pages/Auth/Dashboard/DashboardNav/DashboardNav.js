import React from 'react';
import './DashboardNav.scss';
import { Link } from 'react-router-dom';

function DashboardNav(props) {
    const [menuOpen, setMenuOpen] = React.useState(false);

    return (
        <nav className="dashboard-nav">
            <div className="toggleAdminMenu">
                <button onClick={() => setMenuOpen(!menuOpen ? true : false)}>Menu <span className={`material-icons ${!menuOpen ? 'closed' : 'open'}`}>expand_more</span></button>
            </div>
            <div className={`container ${!menuOpen ? 'closed' : 'open'}`}>
                <div>
                    <Link to="/dashboard/bookings">Bookings</Link>
                    <Link to="/dashboard/schedule">Schedule</Link>
                    <Link to="/dashboard/messages">Messages</Link>
                </div>

                <div>
                    <Link to="/dashboard/images">Images</Link>
                    <Link to="/dashboard/content">Content</Link>
                </div>
            </div>
        </nav>
    )
}

export default DashboardNav;