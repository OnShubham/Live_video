import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

// basic config
app.use(express.json({ limit: '12kb' })); // data upload in db
app.use(
  express.urlencoded({
    extended: true,
    limit: '16kb',
  })
);
app.use(express.static('public'));
app.use(cookieParser());

// routes
import userRoute from './routes/user.routes.js';

// routes declaration

app.use('/api/v1/user', userRoute);



export { app };
