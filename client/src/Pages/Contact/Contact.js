import React from 'react';
import '../Static.page.scss';
import './Contact.scss';

function Contact(props) {
    return (
        <div className="container contact-page">
            <form>
                <h1>Contact</h1>

                <div className="form-group">
                    <label>Name</label>
                    <input />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input />
                </div>
                <div className="form-group">
                    <label>Phone Number</label>
                    <input />
                </div>
                <div className="form-group">
                    <label>Message</label>
                    <textarea></textarea>
                </div>

                <button>Send Message</button>
            </form>
        </div>
    );
}

export default Contact;