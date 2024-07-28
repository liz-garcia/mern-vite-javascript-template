import mongoose from "mongoose";

const connectDB = () => mongoose.connect(process.env.MONGODB_URL);
// TODO add error handling

export default connectDB;
