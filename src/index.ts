import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router';

import dotenv from 'dotenv';
dotenv.config();


const app = express();

app.use(
  cors({
    credentials: true,
    origin: '*'
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);


server.listen(8080, () => {
  console.log('Server running on http://localhost:8080/');
});

const MONGO_URL = process.env.MONGO_URI;
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
mongoose.Promise = Promise;
mongoose.connect(MONGO_URL).then(() => console.log('Connected to Mongodb'));
mongoose.connection.on('error', (error: Error) => console.log(error));

app.use('/', router());