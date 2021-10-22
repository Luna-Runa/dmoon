import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import http from 'http';
import path from 'path';
//import userRoutes from "./routes/userRoutes.js";
//import main from "./routes/main.js";
dotenv.config();

const __dirname = path.resolve();

const server = express();

server.use(express.json())
//server.use("/api/user", userRoutes);
server.use(express.static(path.join(__dirname, 'react-build')))


mongoose.connect(
    process.env.MONGODB_URL,
    (err) => {
        if (err) {
            console.log("ERR", err);
        } else {
            console.log("Connection Successful");
            server.listen(4000, () => console.log("server start http://127.0.0.1:4000/"));
        }
    }
);

server.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'react-build/index.html'))
})