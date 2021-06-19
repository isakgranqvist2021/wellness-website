import React, { useEffect } from 'react';
import HTTP from '../../../../Utils/HTTP';
import moment from 'moment';
import alertsStore from '../../../../Store/alerts.store';
import './Messages.scss';



function Messages(props) {
    const [messages, setMessages] = React.useState([]);

    useEffect(() => {
        const abortController = new AbortController();
        fetchMessages(abortController.signal);
        return () => abortController.abort();
    }, []);

    const fetchMessages = async (signal) => {
        const response = await HTTP.GET('/api/messages', signal);

        if (response.success) {
            setMessages(response.data);
        }
    }

    const deleteMsg = async (id) => {
        if (window.confirm('Delete message?')) {
            const response = await HTTP.DELETE('/api/delete-message/' + id);

            if (response.success) {
                fetchMessages();
            }

            alertsStore.dispatch({
                type: 'set', newState: {
                    error: !response.success,
                    text: response.message
                }
            });
        }
    }


    return (
        <div className="Messages">
            <h1>Messages</h1>

            <div className="Messages-List">
                {messages.map((message, i) =>
                    <div key={'message-' + i} className="Message">
                        <header>
                            <div>
                                <span>{message.email}</span>
                                <span>{message.phone}</span>
                            </div>
                            <span>{moment(message.createdAt).format('MMMM d, YYYY')}</span>
                        </header>
                        <section>
                            <p><span>{message.name}:</span>{message.message}</p>

                            <button onClick={() => deleteMsg(message._id)}>Delete</button>
                        </section>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Messages;