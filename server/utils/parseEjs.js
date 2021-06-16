import ejs from 'ejs';
import fs from 'fs';

function setupView(templateName, data) {
    const email = fs.readFileSync(`./emails/${templateName}.ejs`);

    return ejs.render(email.toString(), data);
}


export default setupView;