import express from 'express';
import cors from 'cors';
import cookieParser from 'child_process';

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

// basic config
app.use(express.json({ limit: '1mbps' })); // data upload in db
app.use(
  express.urlencoded({
    extended: true,
    limit: '16kb',
  })
);
app.use(express.static('public'));
app.use(cookieParser());

export { app };
