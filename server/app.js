import express from 'express';
import http from 'http';
import config from './config';
import database from './database';

const app = express();
const server = http.createServer(app);

database.connect();

import index from './routers/index';
import users from './routers/users';
import stream from './routers/stream';

app.set('view engine', 'ejs');
app.use('/', index);
app.use('/users', users);
app.use('/stream', stream);

server.listen(config.PORT, () =>
    console.log(`Server listening on port ${config.PORT}`));