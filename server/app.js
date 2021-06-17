import express from 'express';
import http from 'http';
import config from './config';
import database from './database';
import validateSession from './middlewares/jwt';
import cors from 'cors';
import pageContentModel from './models/pageContent.model';

const app = express();
const server = http.createServer(app);

if (false) {
    (async () => {
        try {
            await pageContentModel.dropCollection();
            console.log(await pageContentModel.createPageContent());
            console.log('Refreshed page content');
        } catch (err) {
            console.log(err);
        }
    })();
}

database.connect();

import index from './routers/index';
import api from './routers/api';
import stream from './routers/stream';

app.use('/uploads', express.static('./uploads'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', index);
app.use('/api', validateSession, api);
app.use('/stream', stream);

server.listen(config.PORT, () =>
    console.log(`Server listening on port ${config.PORT}`));