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

//to serve static files
const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

//middleware for handling 404 requests
app.use(notFound);

// middleware for error handling

app.use(errroHanlder);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server Running in ${process.env.NODE_ENV} mode  on PORT ${PORT} Successfully`
      .green.bold
  )
);
