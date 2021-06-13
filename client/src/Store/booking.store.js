import { createStore } from "redux";

const initialState = {
    open: false
}

function bookingReducer(state = initialState, action) {
    switch (action.type) {
        case 'toggle':
            return { open: !state.open ? true : false };
        case 'set':
            return { open: action.newState };
        default: return state;
    }
}

export default createStore(bookingReducer);