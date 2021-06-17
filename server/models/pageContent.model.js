import fs from 'fs';

const filePath = './store/page-settings.json';

async function getContent() {
    try {
        const file = JSON.parse(fs.readFileSync(filePath));
        return Promise.resolve(file);
    } catch (err) {
        Promise.reject(err);
    }
}

async function updateContent(field, data) {
    try {
        const file = JSON.parse(fs.readFileSync(filePath));
        file[field] = data;
        fs.writeFileSync(filePath, JSON.stringify(file));
        return Promise.resolve(file);
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
}

async function createPageContent() {

}

export default { getContent, updateContent, createPageContent };