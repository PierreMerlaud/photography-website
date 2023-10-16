import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      return true;
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
    return true;
  } catch (error) {
    console.log("error", error);
  }
};

export default connectToDB;
