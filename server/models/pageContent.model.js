import fs from 'fs';


async function getContent() {
    return JSON.parse(fs.readFileSync('./store/page-settings.json'));
}

async function updateContent() {

}

async function createPageContent() {

}

export default { getContent, updateContent, createPageContent };