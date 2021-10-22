import express from 'express';
import path from 'path';
import Diary from "../models/diaryModel.js";

const __dirname = path.resolve();

const router = express.Router();

{
    router.get('/', (req, res) => {
        res.render('index.ejs');
    })

    router.get('/diary', (req, res) => {
        res.render('diary.ejs')
    });

    router.get('/list', (req, res) => {
        Diary.find((err, diaries) => {
            if (err) return res.status(500).send({ error: 'database failure' });
    
            res.render('list.ejs', { posts: diaries });
        })
    });

    router.get('/test', (req, res) => {
        res.render('index.ejs');
    });
}

    router.post('/add', (req, res) => {
        let { mood, todoBool, todoText } = req.body;
        if (todoBool === "on")
            todoBool = true
        else
            todoBool = false
    
        let diary = new Diary({
            mood,
            todoBool,
            todoText,
        });
    
        console.log(diary);
        //diary에 push
        diary.save();
        res.send('성공!');
    });
    
    router.delete('/delete', (req, res) => {
        console.log(req.body);
        Diary.deleteOne({ _id: req.body }, (err, cb) => {
            if (err) return res.status(400).send({ error: 'database delete failure' });
            console.log('삭제완료');
            res.status(200).send({ message: '성공했습니다.' });
        });
    
    });

export default router;