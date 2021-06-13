import React, { useEffect } from 'react';
import '../Auth.scss';
import { Link, useHistory } from 'react-router-dom';
import FOG from 'vanta/dist/vanta.fog.min';
import HTTP from '../../../Utils/HTTP';
import auth from '../../../Utils/Auth';
import authStore from '../../../Store/auth.store';

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
            if (vantaEffect) vantaEffect.destroy()
        }
    }, [vantaEffect])

    const history = useHistory();
    const [nameData, setNameData] = React.useState({ value: '', error: { text: '', show: false } });
    const [emailData, setEmailData] = React.useState({ value: '', error: { text: '', show: false } });
    const [passwordData, setPasswordData] = React.useState({ value: '', error: { text: '', show: false } });

    const submit = async () => {
        setNameData({ value: nameData.value, error: { text: '', show: false } });
        setEmailData({ value: emailData.value, error: { text: '', show: false } });
        setPasswordData({ value: passwordData.value, error: { text: '', show: false } });

        try {
            const response = await HTTP.POST('/register', JSON.stringify({
                name: nameData.value,
                email: emailData.value,
                password: passwordData.value
            }));

            if (!response.success) {
                switch (response.data) {
                    case 0: return setNameData({ value: nameData.value, error: { text: response.message, show: true } });
                    case 1: return setEmailData({ value: emailData.value, error: { text: response.message, show: true } });
                    case 2: return setPasswordData({ value: passwordData.value, error: { text: response.message, show: true } });
                    default: return;
                }
            } else {
                if (auth.setToken(response.data)) {
                    history.push('/dashboard');
                    authStore.dispatch({ type: 'login' });
                }
            }

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="auth-form" ref={myRef}>
            <div>
                <form>
                    <h1>Register</h1>
                    <section className="form-group">
                        <label>Name</label>
                        <input className={`${nameData.error.show ? 'show' : ''}`} type="text" value={nameData.value} onChange={(e) => setNameData({ value: e.target.value, error: { text: '', show: false } })} />
                        {nameData.error.show ? (<p>{nameData.error.text}</p>) : null}
                    </section>
                    <section className="form-group">
                        <label>E-mail</label>
                        <input className={`${emailData.error.show ? 'show' : ''}`} type="email" value={emailData.value} onChange={(e) => setEmailData({ value: e.target.value, error: { text: '', show: false } })} />
                        {emailData.error.show ? (<p>{emailData.error.text}</p>) : null}
                    </section>
                    <section className="form-group">
                        <label>Password</label>
                        <input className={`${passwordData.error.show ? 'show' : ''}`} type="password" value={passwordData.value} onChange={(e) => setPasswordData({ value: e.target.value, error: { text: '', show: false } })} />
                        {emailData.error.show ? (<p>{emailData.error.text}</p>) : null}
                    </section>
                    <button type="button" onClick={submit}>Create Account</button>
                    <Link to="/login">Already have an account?</Link>
                </form>
            </div>
        </div>
    )
}

export default Register;