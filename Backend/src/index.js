// require('dotenv').config({path: "./env"}) // first approch

import dotenv from 'dotenv';
import conncetDB from './db/db.js';
import { app } from './app.js';

dotenv.config({
  path: './env',
});

conncetDB()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`server is running : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log('server error', err);
  });
