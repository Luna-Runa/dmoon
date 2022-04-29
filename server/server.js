import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import userRouter from "./routes/userRouter.js";
import diaryRouter from "./routes/diaryRouter.js";
import authRouter from "./routes/authRouter.js";
import cors from "cors";
import connectFlash from "connect-flash";
import passport from "passport";
import expressSession from "express-session";

dotenv.config();

const __dirname = path.resolve();

const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.use(
  expressSession({
    secret: "secretCode",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: true },
    maxAge: 1000 * 60 * 60,
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
server.use("/public", express.static("public"));
//리액트 라우터를 사용했을때 제대로 동작되게 하기 위함
server.use(express.static(path.join(__dirname, "../client/build")));
server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});
