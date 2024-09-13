import mongoose from 'mongoose';
import { DB_NAME } from '../constant.js';


const conncetDB = async () => {
  try {
    const conncetInstanct = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );
    console.log(`\n MonogoFb Conncet ${conncetInstanct.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};


export default conncetDB