import { createStore } from 'redux';

const initialState = {
    loggedIn: false
}

function authReducer(state = initialState, action) {
    switch (action.type) {
        case 'logout': return { loggedIn: false };
        case 'login': return { loggedIn: true };
        default: return state;
    }
}

export default createStore(authReducer);
