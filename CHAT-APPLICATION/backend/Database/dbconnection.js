import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log("db is connected");
  } catch (error) {
    console.log("db connection failed", error);
  }
};

export default dbConnect;