import React, { useEffect } from 'react';
import '../Auth.scss';
import { Link, useHistory } from 'react-router-dom';
import FOG from 'vanta/dist/vanta.fog.min';
import HTTP from '../../../Utils/HTTP';
import auth from '../../../Utils/Auth';
import authStore from '../../../Store/auth.store';
import alertsStore from '../../../Store/alerts.store';

function Login(props) {
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
            if (vantaEffect) vantaEffect.destroy()
        }
    }, [vantaEffect])

    const history = useHistory();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const submit = async () => {
        try {
            const response = await HTTP.POST('/login', JSON.stringify({
                email: email,
                password: password
            }));

            if (response.success) {
                if (auth.setToken(response.data)) {
                    history.push('/dashboard');
                    authStore.dispatch({ type: 'login' });
                }
            }
            alertsStore.dispatch({
                type: 'set', newState: {
                    text: response.message,
                    error: !response.success
                }
            });

        } catch (err) {

        }
    }

    return (
        <div className="auth-form" ref={myRef}>
            <div>
                <form>
                    <h1>Log in</h1>
                    <section className="form-group">
                        <label>E-mail</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </section>
                    <section className="form-group">
                        <label>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </section>
                    <button type="button" onClick={submit}>Log in</button>
                    <Link to="/register">Don't have an account?</Link>
                </form>
            </div>
        </div>
    );
}

export default Login;