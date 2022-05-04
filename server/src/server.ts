import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";
import path from "path";
import userRouter from "./routes/userRouter.js";
import diaryRouter from "./routes/diaryRouter.js";
import authRouter from "./routes/authRouter.js";
import cors from "cors";
import connectFlash from "connect-flash";
import passport from "passport";
import expressSession from "express-session";

dotenv.config();

const server = express();

const __dirname = path.resolve();

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.use(cors({ origin: true, credentials: true }));

server.use(
  expressSession({
    secret: "secretCode",
    resave: true,
    saveUninitialized: true,
  })
);
server.use(passport.initialize());
server.use(passport.session());
server.use(connectFlash());

server.use(userRouter);
server.use(diaryRouter);
server.use(authRouter);

typeof process.env.MONGODB_URL === "string"
  ? mongoose.connect(process.env.MONGODB_URL, (err) => {
      if (err) return console.log(err);

      console.log("DB Connection Successful");
      server.listen(process.env.PORT, () =>
        console.log("server start http://127.0.0.1:4000/")
      );
    })
  : console.log("ERR", "MONGODB_URL is not string");
