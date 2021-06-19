import React from 'react';
import HTTP from '../../Utils/HTTP';
import alertsStore from '../../Store/alerts.store';
import '../Static.page.scss';
import './Contact.scss';

function Contact(props) {
    const [form, setForm] = React.useState({ name: '', email: '', phone: '', message: '' });
    const [loading, setLoading] = React.useState(false);

    const valChange = (val, input) => {
        setForm({
            ...form,
            [input]: val
        });
    }

    const submit = async () => {
        setLoading(true);

        const response = await HTTP.POST('/contact', JSON.stringify(form));

        alertsStore.dispatch({
            type: 'set', newState: {
                text: response.message,
                error: !response.success
            }
        });

        if (response.success) {
            setForm({ name: '', email: '', phone: '', message: '' });
        }

        setLoading(false);
    }

    return (
        <div className="container contact-page">
            <form>
                <h1>Contact</h1>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input value={form.name} onChange={(e) => valChange(e.target.value, 'name')} id="name" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input value={form.email} onChange={(e) => valChange(e.target.value, 'email')} id="email" />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input value={form.phone} onChange={(e) => valChange(e.target.value, 'phone')} id="phone" />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea value={form.message} onChange={(e) => valChange(e.target.value, 'message')} id="message"></textarea>
                </div>

                <button type="button" onClick={submit} disabled={loading}>Send Message</button>
            </form>
        </div>
    );
}

export default Contact;