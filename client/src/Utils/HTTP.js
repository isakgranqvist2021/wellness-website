const serverAddr = 'http://localhost:3000';

function headers() {
    return {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('session')
    }
}

async function GET(url) {
    try {
        const response = await fetch(serverAddr + url, {
            method: 'GET',
            headers: headers()
        });

        return await response.json();
    } catch (err) {
        return Promise.reject(err);
    }
}

async function POST(url, body) {
    console.log(headers());

    try {
        const response = await fetch(serverAddr + url, {
            method: 'POST',
            body: body,
            headers: headers()
        });

        return await response.json();
    } catch (err) {
        return Promise.reject(err);
    }
}

async function PUT() {

}

async function DELETE() {

}

const exports = {
    GET,
    POST,
    PUT,
    DELETE
};

export default exports;