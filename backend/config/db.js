import mongoose from "mongoose";


export const connectDB = async () => {
  try{
    const connect = await mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});
    console.log(`mongoDB Connected: ${connect.connection.host}`);
    // console.log(connect);
  } catch (err){console.log('Connecting to MongoDB...');
console.log('MongoDB connection successful');
console.log('MongoDB connection failed');
    console.error(`error: ${err.message}`);
    process.exit(1);  // 1 for exist 0 for failure
  }
};