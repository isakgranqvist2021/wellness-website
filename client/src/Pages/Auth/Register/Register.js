import React, { useEffect } from 'react';
import '../Auth.scss';
import { Link, useHistory } from 'react-router-dom';
import FOG from 'vanta/dist/vanta.fog.min';
import HTTP from '../../../Utils/HTTP';
import auth from '../../../Utils/Auth';
import authStore from '../../../Store/auth.store';
import alertsStore from '../../../Store/alerts.store';

function Register(props) {
    const [vantaEffect, setVantaEffect] = React.useState(0);
    const myRef = React.useRef(null);
    useEffect(() => {
        if (!vantaEffect) {
            setVantaEffect(FOG({
                el: myRef.current,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                highlightColor: 0xffffff,
                midtoneColor: 0x230d9,
                lowlightColor: 0xffffff,
                baseColor: 0xffffff
            }))
        }
        return () => {
            if (vantaEffect) vantaEffect.destroy();
        }
    }, [vantaEffect])

    const history = useHistory();
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [key, setKey] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const submit = async () => {
        setLoading(true);
        try {
            const response = await HTTP.POST('/register', JSON.stringify({
                name: name,
                email: email,
                password: password,
                key: key
            }));

            if (response.success) {
                if (auth.setToken(response.data)) {
                    history.push('/dashboard/bookings');
                    authStore.dispatch({ type: 'login' });
                }
            } else {
                setLoading(false);
            }
            alertsStore.dispatch({
                type: 'set', newState: {
                    text: response.message,
                    error: !response.success
                }
            });

        } catch (err) {
            setLoading(false);
            alertsStore.dispatch({
                type: 'set', newState: {
                    error: true,
                    message: 'something went wrong...'
                }
            });
            setLoading(false);
        }
    }

    return (
        <div className="auth-form" ref={myRef}>
            <div>
                <form>
                    <h1>Register</h1>
                    <section className="form-group">
                        <label>Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </section>
                    <section className="form-group">
                        <label>E-mail</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </section>
                    <section className="form-group">
                        <label>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </section>
                    <section className="form-group">
                        <label>Key</label>
                        <input type="text" value={key} onChange={(e) => setKey(e.target.value)} />
                    </section>
                    <button type="button" onClick={submit} disabled={loading}>Create Account</button>
                    <Link to="/login">Already have an account?</Link>
                </form>
            </div>
        </div>
    )
}

export default Register;