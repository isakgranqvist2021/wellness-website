import { createStore } from 'redux';

function pageReducer(state = {}, action) {
    switch (action.type) {
        case 'set': return { data: action.data };
        default: return state;
    }
}

export default createStore(pageReducer);