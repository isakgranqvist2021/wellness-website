import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import HTTP from '../../Utils/HTTP';
import './ConfirmBooking.scss';

function ConfirmBooking(props) {
    const [confirmed, setConfirmed] = React.useState(false);
    const { confirmKey } = useParams();


    useEffect(() => {
        (async () => {
            const response = await HTTP.GET('/confirm-booking/' + confirmKey);
            setConfirmed(response.data.confirmed)
        })();
    }, [confirmKey]);

    return (
        <div className="container bookingConfirmation">
            <div className="bookingConfirmation-content">
                <h1>
                    {confirmed ? (
                        <div>
                            <h1 className="gr">Your booking has been confirmed!</h1>
                        </div>
                    ) : (
                        <div>
                            <h1 className="re">Your booking has not been confirmed</h1>
                        </div>
                    )}
                </h1>

                <p>Your booking will be approved shortly, please check your email</p>
            </div>
        </div>
    );
}

export default ConfirmBooking;