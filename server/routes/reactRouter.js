import express from "express";
import path from "path";
import Diary from "../models/diaryModel.js";

import {
  userRegisterController,
  userLogInController,
} from "../controllers/userControllers.js";

const __dirname = path.resolve();

const reactRouter = express.Router();

const index = path.resolve(__dirname, "../../client/public/index.html");

reactRouter.get("/diary/list", (req, res) => {
  Diary.find((err, diaries) => {
    if (err) return res.status(500).send({ error: "database failure" });

    res.send(diaries);
  });
});

/* reactRouter.get("/css/bootstrap.min.css", (req, res) => {
  res.sendFile(__dirname + "/css/bootstrap.min.css");
}); */

reactRouter.get("/users", (req, res) => {
  res.send({ test: "hi" });
});

reactRouter.post("/register", userRegisterController);
reactRouter.post("/login", userLogInController);

reactRouter.post("/diary/add", (req, res) => {
  const moods = ["행복함", "즐거움", "보통", "그저그럼", "기분나쁨"];
  console.log(req.body);
  let { mood, todoBool, todoText } = req.body;

  let time = new Date();
  time = time.toLocaleDateString();

  mood = moods[req.body.mood - 1];

  let diary = new Diary({
    mood,
    todoBool,
    todoText,
    date: time,
  });

  console.log(diary);
  //diary에 push
  diary.save();
});

reactRouter.delete("/delete", (req, res) => {
  console.log(req.body);
  Diary.deleteOne({ _id: req.body }, (err, res2) => {
    if (err) return res.status(400).send({ error: "database delete failure" });
    console.log("삭제완료");
    res.status(200).send({ message: "성공했습니다." });
  });
});

reactRouter.put("/edit", (req, res) => {
  console.log(req.body.id);
  Diary.updateOne(
    { _id: req.body.id },
    {
      $set: {
        mood: req.body.mood,
        todoBool: req.body.todoBool,
        todoText: req.body.todoText,
      },
    },
    (err, res2) => {
      if (err)
        return res.status(400).send({ error: "database delete failure" });
      console.log("수정완료");
      res.redirect("/list");
    }
  );
});

reactRouter.get("*", (req, res) => {
  res.sendFile(index);
});

export default reactRouter;
