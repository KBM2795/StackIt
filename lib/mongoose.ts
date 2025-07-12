import mongoose from 'mongoose';

let isConnected: boolean = false;

export const connectToDataBase = async () => {
  mongoose.set('strictQuery', true);

  if (!process.env.MONGODB_URI) {
    return console.error('MONGODB_URI is not defined');
  }

  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'StackIt',
    });
    isConnected = true;
    console.info('Connected to DB');
  } catch (error) {
    console.error(error);
  }
};
