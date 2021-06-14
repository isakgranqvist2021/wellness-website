import JWT from 'jwt-client';

function isLoggedIn() {
    let OK = JWT.validate(getToken());

    if (!OK) {
        localStorage.removeItem('session');
        return false;
    }

    return true;
}

function setToken(token) {
    if (JWT.validate(token)) {
        localStorage.setItem('session', token);
        return true;
    } else {
        return false;
    }
}

function getToken() {
    return localStorage.getItem('session');
}

function clearToken() {
    return localStorage.removeItem('session');
}

const exports = {
    isLoggedIn,
    setToken,
    getToken,
    clearToken
};


export default exports;