import { createStore } from "redux";

const initalState = {
    text: '',
    error: false
}

function alertsReducer(state = initalState, action) {
    switch (action.type) {
        case 'set':
            return action.newState;
        case 'remove':
            return {};
        default:
            return state;
    }
}

export default createStore(alertsReducer);