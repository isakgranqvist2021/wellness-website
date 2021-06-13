import { createStore } from 'redux';

const initalState = {
    open: false
}

function navReducer(state = initalState, action) {
    switch (action.type) {
        case 'toggle':
            return { open: !state.open ? true : false };
        case 'set':
            return { open: action.newState };
        default:
            return state;
    }
}

export default createStore(navReducer);