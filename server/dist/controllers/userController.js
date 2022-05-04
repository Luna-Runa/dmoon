var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from "../models/userModel.js";
import Diary from "../models/diaryModel.js";
import crypto from "crypto";
export const userRegisterController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id, name, password, confirmPassword } = req.body;
    if (id.length == 0 && name.length == 0 && !(password === confirmPassword))
        return res.send(false);
    const { hashedPassword, salt } = yield createHashedPassword(password);
    const user = new User({
        id,
        name,
        password: hashedPassword,
        salt,
    });
    user.save((err) => {
        if (err)
            return res.send(false);
        res.send(true);
    });
});
const createSalt = () => new Promise((res, rej) => {
    crypto.randomBytes(64, (err, buf) => {
        if (err)
            rej(err);
        res(buf.toString("base64"));
    });
});
const createHashedPassword = (password) => new Promise((res, rej) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield createSalt();
    crypto.pbkdf2(password, salt, 9797, 64, "sha512", (err, key) => {
        if (err)
            rej(err);
        res({ hashedPassword: key.toString("base64"), salt });
    });
}));
export const userSearchController = (req, res) => {
    console.log(`유저검색컨트롤러 : ${req.body.searchText}`);
    let query = [
        {
            $search: {
                index: "idSearch",
                text: {
                    query: req.body.searchText,
                    path: ["id", "name"],
                },
            },
        },
        { $project: { id: 1, name: 1 } },
    ];
    User.aggregate(query, function (err, users) {
        if (err)
            return res.status(500).send({ error: "database failure" });
        res.send(users);
    });
};
export const userInfoController = (req, res) => {
    //req.user; //deserializeUser에서 보낸 user
    res.send({ id: req.user.id, name: req.user.name, friends: req.user.friends });
};
export const userFriendsAddController = (req, res) => {
    //console.log(req.body); // { user: '~~~~', friends: '~~~~' }
    ///// 앞으로 하고싶은것 : 이미 친구일 경우 친구삭제 버튼으로 대체? or 이미 친구입니다 메시지 전송
    ///// 프론트 상태 : 그저 무지성 친구추가 활성화
    ///// 백엔드 상태 : addToSet으로 중복일 경우 처리안함
    User.updateOne({ id: req.body.user }, {
        $addToSet: {
            friends: req.body.friends,
        },
    }, (err) => {
        if (err)
            return res.status(400).send({ error: "database update failure" });
        res.send(true);
    });
};
export const userFriendsDeleteController = (req, res) => {
    console.log(req.body);
    User.updateOne({ id: req.body.user }, { $pull: { friends: req.body.friends } }, (err, res2) => {
        if (err)
            return res.status(400).send({ error: "database delete failure" });
        console.log(`${req.body.user}의 친구 ${req.body.friends} 삭제완료`);
        res.send({ message: "성공했습니다." });
    });
};
export const userFriendsListController = (req, res) => {
    console.log(req.body.friends);
    User.find({ id: { $in: req.body.friends } }, { _id: 0, id: 1, name: 1 }, (err, users) => {
        if (err)
            return res.status(400).send({ error: "database delete failure" });
        res.send(users);
    });
};
export const userTimelineGetController = (req, res) => {
    console.log(`userTimelineGetController ${req.body.friends}`);
    if (req.body.friends.length == 0) {
        console.log("친구가 없습니다.");
        return res.send({ id: undefined });
    }
    //친구의 아이디 닉네임 불러오기, 다이어리 불러오기
    User.find({ id: { $in: req.body.friends } }, { _id: 0, id: 1, name: 1 }, (err, users) => {
        if (err)
            return res.status(400).send({ error: "database delete failure" });
        console.log(users);
        Diary.find({ id: { $in: req.body.friends } }, (err, diaries) => {
            if (err) {
                console.log(err);
                return res.status(500).send({ error: "database failure" });
            }
            //diaries에서 풀어서 users의 id와 비교해서 name을 부여한 새로운 객체배열 반환
            const timeline = diaries.map(function (data) {
                let { _id, id, mood, todoBool, todoText, date, likes } = data;
                const temp = new Object({
                    _id,
                    id,
                    name: "",
                    mood,
                    todoBool,
                    todoText,
                    date,
                    likes,
                });
                users.map(function (data2) {
                    if (data.id === data2.id) {
                        temp.name = data2.name;
                    }
                });
                return temp;
            });
            //시간정렬
            res.send(timeline.reverse());
        });
    });
};
