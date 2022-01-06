import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import reactRouter from "./routes/reactRouter.js";
import cors from "cors";
import methodOverride from "method-override";
import passport from "passport";
import passportLocal from "passport-local";
import expressSession from "express-session";
import connectFlash from "connect-flash";
/* import router from "./routes/mainRouter.js"; */

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

server.use(reactRouter);

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true }, (err) => {
  if (err) return console.log("ERR", err);

  console.log("DB Connection Successful");
  server.listen(process.env.PORT, () =>
    console.log("server start http://127.0.0.1:4000/")
  );
});

//views 폴더 인식과 ejs 사용 처리
server.set("views", __dirname + "/views");

server.use(cors());
//static 파일 보관을 위해 해당 폴더 사용 선언
//server.use(express.static(path.join(__dirname, 'react-build')))
server.use("/public", express.static("public"));

server.use(methodOverride("_method"));
