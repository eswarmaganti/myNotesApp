import mongoose from "mongoose";
import colors from "colors";
const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_ATLAS_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log(
      `Connected to MongoDB ${conn.connection.host} Successfully`.cyan.underline
    );
  } catch (error) {
    console.error(`Error Connecting Mongodb ${error}`.red.underline.bold);
    process.exit(1);
  }
};
export default connectDb;
