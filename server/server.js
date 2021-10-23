import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import path from 'path';
import ejs from "ejs";
import router from "./routes/mainRouter.js";
import cors from "cors";
import methodOverride from "method-override";
//import main from "./routes/main.js";
dotenv.config();

const __dirname = path.resolve();

const server = express();

server.use(express.urlencoded({ extended: true }))
server.use(express.json())

server.use('/', router);

//views 폴더 인식과 ejs 사용 처리
server.set('views', __dirname + '/views');
server.set('view engine', 'ejs');
server.engine('html', ejs.renderFile);

server.use(cors());
//static 파일 보관을 위해 해당 폴더 사용 선언
//server.use(express.static(path.join(__dirname, 'react-build')))
server.use('/public', express.static('public'));

server.use(methodOverride('_method'));

mongoose.connect(
    process.env.MONGODB_URL,
    { useNewUrlParser: true },
    (err) => {
        if (err) return console.log("ERR", err);

        console.log("DB Connection Successful");
        server.listen(4000, () => console.log("server start http://127.0.0.1:4000/"));
    }
);