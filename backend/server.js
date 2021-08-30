import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import { notFound, errroHanlder } from "./middleware/errorMiddlewareHandler.js";
import connectDb from "./config/connectDB.js";
import userRouter from "./routes/userRouter.js";
import notesRouter from "./routes/notesRouter.js";
import path from "path";
dotenv.config();
const app = express();

//connecting to mongoDb
connectDb();

app.use(express.json());

//user routes
app.use("/api/user", userRouter);

//notes routes
app.use("/api/notes", notesRouter);

//middleware for handling 404 requests
app.use(notFound);

// middleware for error handling

app.use(errroHanlder);

//to serve static files
const __dirname = path.dirname(new URL(import.meta.url).pathname);
app.use(express.static(path.join(__dirname, "frontend", "build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});
const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server Running on PORT ${PORT} Successfully`.green.bold)
);
