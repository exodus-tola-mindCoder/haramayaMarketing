import mongoose from "mongoose";


export const connectDB = async () => {
  try{
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`mongoDB Connected: ${connect.connection.host}`);
    // console.log(connect);
  } catch (err){
    console.error(`error: ${err.message}`);
    process.exit(1);  // 1 for exist 0 for failure
  }
};