// require('dotenv').config({path: "./env"}) // first approch

import dotenv from 'dotenv';

import conncetDB from './db/db.js';

dotenv.config({
  path: './env',
});

conncetDB();

// First Appproch to conncet a monogo

// import express from 'express';
// const app = express();
// async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);

//     app.on('error', (error) => {
//       console.log(error);

//       throw error;
//     });

//     app.listen(process.env.PORT, () => {
//       console.log(`  Runing  ${process.env.PORT}`);
//     });
//   } catch (error) {
//     console.log(error);
//     throw error
//   }
// };
