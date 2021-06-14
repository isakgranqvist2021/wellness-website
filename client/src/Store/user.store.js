import { createStore } from 'redux';

const initalState = {
    user: null
}

function userReducer(state = initalState, action) {
    switch (action.type) {
        case 'set': return { user: action.data };
        default: return state;
    }
}

export default createStore(userReducer);