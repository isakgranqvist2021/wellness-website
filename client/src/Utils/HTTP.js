const serverAddr = 'http://localhost:3000';

async function GET(url) {
    try {
        const response = await fetch(serverAddr + url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        return await response.json();
    } catch (err) {
        return Promise.reject(err);
    }
}

async function POST(url, body) {
    try {
        const response = await fetch(serverAddr + url, {
            method: 'POST',
            body: body,
            headers: { 'Content-Type': 'application/json' }
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