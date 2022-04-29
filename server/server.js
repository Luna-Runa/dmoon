import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import userRouter from "./routes/userRouter.js";
import diaryRouter from "./routes/diaryRouter.js";
import authRouter from "./routes/authRouter.js";
import cors from "cors";
import passport from "passport";
import passportLocal from "passport-local";
import expressSession from "express-session";
import connectFlash from "connect-flash";

dotenv.config();

const __dirname = path.resolve();

const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

const LocalStrategy = passportLocal.Strategy;
server.use(
  expressSession({
    secret: "secretCode",
    resave: true,
    saveUninitialized: false,
  })
);
server.use(passport.initialize());
server.use(passport.session());
server.use(connectFlash());

server.use(userRouter);
server.use(diaryRouter);
server.use(authRouter);

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true }, (err) => {
  if (err) return console.log("ERR", err);

  console.log("DB Connection Successful");
  server.listen(process.env.PORT, () =>
    console.log("server start http://127.0.0.1:4000/")
  );
});

server.use(cors());
//static 파일 보관을 위해 해당 폴더 사용 선언
server.use(express.static(path.join(__dirname, "../client/build")));

server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

server.use("/public", express.static("public"));
