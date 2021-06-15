const serverAddr = 'http://localhost:3000';

function headers() {
    return {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('session')
    }
}

async function GET(url, signal) {
    try {
        const response = await fetch(serverAddr + url, {
            method: 'GET',
            headers: headers(),
            signal: signal
        });

        return await response.json();
    } catch (err) {
        return Promise.reject(err);
    }
}

async function POST(url, body, signal) {
    try {
        const response = await fetch(serverAddr + url, {
            method: 'POST',
            body: body,
            signal: signal,
            headers: headers()
        });

        return await response.json();
    } catch (err) {
        return Promise.reject(err);
    }
}

async function PUT() {

}

async function DELETE(url, signal) {
    try {
        const response = await fetch(serverAddr + url, {
            method: 'DELETE',
            signal: signal,
            headers: headers()
        });

        return await response.json();
    } catch (err) {
        return Promise.reject(err);
    }
}

const exports = {
    GET,
    POST,
    PUT,
    DELETE
};

export default exports;