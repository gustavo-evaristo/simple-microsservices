import express from "express";
import helmet from "helmet";
import logger from 'morgan';
import httpProxy from 'express-http-proxy';

const app = express();

app.use(helmet());

app.use(express.json());

app.use(logger('dev'));

const port = process.env.PORT || 3000;

app.use('/users', httpProxy('http://localhost:3001', { timeout: 3000}));

app.use('/posts', httpProxy('http://localhost:3002', { timeout: 3000}));

app.use('/feed', httpProxy('http://localhost:3003', { timeout: 3000}));

app.listen(port, () => console.log(`server running on port ${port}`));