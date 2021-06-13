import JWT from 'jwt-client';

function isLoggedIn() {
    return JWT.validate(getToken());
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