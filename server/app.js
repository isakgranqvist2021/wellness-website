import express from 'express';
import http from 'http';
import config from './config';
import database from './database';
import validateSession from './middlewares/jwt';
import cors from 'cors';


const app = express();
const server = http.createServer(app);

database.connect();
//database.reload();

import index from './routers/index';
import api from './routers/api';
import stream from './routers/stream';

app.use('/static', express.static('./public/static'));
app.use('/uploads', express.static('./uploads'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', index);
app.use('/api', validateSession, api);
app.use('/stream', stream);

app.get('*', (req, res) => {
    res.sendFile('index.html', { root: './public' });
});

server.listen(config.PORT, () =>
    console.log(`Server listening on port ${config.PORT}`));