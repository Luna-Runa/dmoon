import Diary from "../models/diaryModel.js";

export const diaryGetController = (req, res) => {
  Diary.find((err, diaries) => {
    if (err) return res.status(500).send({ error: "database failure" });

    res.send(diaries);
  });
};

export const diaryAddController = (req, res) => {
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
};

export const diaryEditController = (req, res) => {
  console.log(req.body);
  const moods = ["행복함", "즐거움", "보통", "그저그럼", "기분나쁨"];
  const mood = moods[req.body.mood - 1];

  Diary.updateOne(
    { _id: req.body._id },
    {
      $set: {
        mood: mood,
        todoBool: req.body.todoBool,
        todoText: req.body.todoText,
      },
    },
    (err) => {
      if (err)
        return res.status(400).send({ error: "database delete failure" });
      console.log("수정완료");
      res.send({ message: true });
    }
  );
};

export const diaryDeleteController = (req, res) => {
  console.log("delete요청:");
  console.log(req.body);
  Diary.deleteOne({ _id: req.body }, (err, res2) => {
    if (err) return res.status(400).send({ error: "database delete failure" });
    console.log("삭제완료");
    res.status(200).send({ message: "성공했습니다." });
  });
};
