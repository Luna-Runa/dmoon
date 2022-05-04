import express from "express";
import mongoose from "mongoose";
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
const __dirname = path.resolve();
class Server {
    constructor() {
        const server = express();
        this.server = server;
    }
    setRoute() {
        this.server.use(userRouter);
        this.server.use(diaryRouter);
        this.server.use(authRouter);
    }
    setMiddleware() {
        this.server.use(express.urlencoded({ extended: true }));
        this.server.use(express.json());
        this.server.use(cors({ origin: true, credentials: true }));
        this.server.use(expressSession({
            secret: "secretCode",
            resave: true,
            saveUninitialized: true,
        }));
        this.server.use(passport.initialize());
        this.server.use(passport.session());
        this.server.use(connectFlash());
        this.setRoute();
    }
    listen() {
        this.setMiddleware();
        typeof process.env.MONGODB_URL === "string"
            ? mongoose.connect(process.env.MONGODB_URL, (err) => {
                if (err)
                    return console.log(err);
                console.log("DB Connection Successful");
                this.server.listen(process.env.PORT, () => console.log("server start http://127.0.0.1:4000/"));
            })
            : console.log("ERR", "MONGODB_URL is not string");
    }
}
function init() {
    const server = new Server();
    server.listen();
}
init();
