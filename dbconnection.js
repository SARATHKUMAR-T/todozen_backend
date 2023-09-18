import mongoose from "mongoose";
import "dotenv/config";

const dbConnection = () => {
  const params = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    mongoose.connect(process.env.MONGODB_URL, params);
    console.log("Db connected successfully");
  } catch (error) {
    console.log("error occured while connecting Db", error);
  }
};
export default dbConnection;
