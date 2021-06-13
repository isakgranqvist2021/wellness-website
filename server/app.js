import express from 'express';
import http from 'http';
import config from './config';
import database from './database';
import validateSession from './middlewares/jwt';
import cors from 'cors';

const app = express();
const server = http.createServer(app);

database.connect();

import index from './routers/index';
import api from './routers/api';
import stream from './routers/stream';

app.use(cors());
app.use(express.json());
app.use('/', index);
app.use('/api', validateSession, api);
app.use('/stream', stream);

server.listen(config.PORT, () =>
    console.log(`Server listening on port ${config.PORT}`));