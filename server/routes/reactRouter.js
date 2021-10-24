import express from 'express';
import path from 'path';
import Diary from "../models/diaryModel.js";

import {
    userRegisterController,
    userLogInController
} from "../controllers/userControllers.js";

const __dirname = path.resolve();

const reactRouter = express.Router();


reactRouter.get('/', (req, res) => {
    res.render('index.ejs');
})

reactRouter.get('/diary', (req, res) => {
    res.render('diary.ejs')
});

reactRouter.get('/list', (req, res) => {
    Diary.find((err, diaries) => {
        if (err) return res.status(500).send({ error: 'database failure' });

        res.send(diaries);
    })
});

reactRouter.get('/edit/:id', (req, res) => {
    Diary.findOne({ _id: req.params.id }, (err, res2) => {
        if (err) return res.status(500).send({ error: 'database failure' });

        res.render('edit.ejs', { data: res2 });
    })
});

reactRouter.get('/test', (req, res) => {
    res.sendFile(__dirname + '/test.html');
});

reactRouter.get('/css/bootstrap.min.css', (req, res) => {
    res.sendFile(__dirname + '/css/bootstrap.min.css');
});

reactRouter.get("/users", (req, res) => {
    res.send({ test: "hi" });
});

reactRouter.post("/register", userRegisterController);
reactRouter.post("/login", userLogInController);

reactRouter.post('/add', (req, res) => {
    let { mood, todoBool, todoText } = req.body;
    if (todoBool === "on")
        todoBool = true
    else
        todoBool = false

    let time = new Date();
    time = time.toLocaleDateString();

    let diary = new Diary({
        mood,
        todoBool,
        todoText,
        date: time
    });

    console.log(diary);
    //diary에 push
    diary.save();
    res.send('성공!');
});

reactRouter.delete('/delete', (req, res) => {
    console.log(req.body);
    Diary.deleteOne({ _id: req.body }, (err, res2) => {
        if (err) return res.status(400).send({ error: 'database delete failure' });
        console.log('삭제완료');
        res.status(200).send({ message: '성공했습니다.' });
    });

});

reactRouter.put('/edit', (req, res) => {
    console.log(req.body.id);
    Diary.updateOne({ _id: req.body.id }, { $set: { mood: req.body.mood, todoBool: req.body.todoBool, todoText: req.body.todoText } }, (err, res2) => {
        if (err) return res.status(400).send({ error: 'database delete failure' });
        console.log('수정완료');
        res.redirect('/list');
    });

});

export default reactRouter;