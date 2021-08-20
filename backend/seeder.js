import Notes from "../backend/models/notesModel.js";
import User from "../backend/models/userModel.js";
import users from "./data/users.js";
import notes from "./data/notes.js";
import colors from "colors";
import dotenv from "dotenv";
import connectDb from "./config/connectDB.js";
dotenv.config();

connectDb();

const createData = async () => {
  try {
    await Notes.deleteMany();
    await User.deleteMany();

    const savedUsers = await User.insertMany(users);

    const sampleNotes = notes.map((note) => {
      return { ...note, user: savedUsers[0]._id };
    });

    await Notes.insertMany(sampleNotes);

    console.log(`Data Import Successful`.green.inverse);
    process.exit();
  } catch (error) {
    console.log(`Error occured while import ${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Notes.deleteMany();
    await User.deleteMany();
    console.log(`Data Destroy Successful`.red.inverse);
    process.exit();
  } catch (error) {
    console.log(`Error occured while Destroy ${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  createData();
}
