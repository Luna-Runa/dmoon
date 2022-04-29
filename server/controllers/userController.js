import User from "../models/userModel.js";
import Diary from "../models/diaryModel.js";
import passportLocal from "passport-local";
import crypto from "crypto";

const LocalStrategy = passportLocal.Strategy;

export const userRegisterController = async (req, res) => {
  let { id, name, password, confirmPassword } = req.body;

  if (id.length == 0 && name.length == 0 && !(password === confirmPassword))
    return res.send(false);

  const { hashedPassword, salt } = await createHashedPassword(password);

  const user = new User({
    id,
    name,
    password: hashedPassword,
    salt,
  });

  user.save((err) => {
    if (err) return res.send(false);

    res.send(true);
  });
};

// //////////////////////////암호화//////////////////////////
// const createSalt = () =>
//   new Promise((res, rej) => {
//     crypto.randomBytes(64, (err, buf) => {
//       if (err) rej(err);
//       res(buf.toString("base64"));
//     });
//   });

// const createHashedPassword = (password) =>
//   new Promise(async (res, rej) => {
//     const salt = await createSalt();
//     crypto.pbkdf2(password, salt, 9797, 64, "sha512", (err, key) => {
//       if (err) rej(err);
//       res({ hashedPassword: key.toString("base64"), salt });
//     });
//   });

// const makePasswordHashed = (id, password) =>
//   new Promise(async (res, rej) => {
//     const salt = await User.findOne({ id })
//       .select("salt")
//       .then((result) => {
//         console.log(result);
//         if (result === null) return rej("아이디가 존재하지 않습니다.");
//         return result.salt;
//       });
//     crypto.pbkdf2(password, salt, 9797, 64, "sha512", (err, key) => {
//       if (err) rej(err);
//       res(key.toString("base64"));
//     });
//   });
// /////////////////////////////////////////////////////////

// //////////////////////////세션관리부분//////////////////////////
// passport.use(
//   new LocalStrategy(
//     {
//       usernameField: "id",
//       passwordField: "password",
//       session: true,
//       passReqToCallback: false,
//     },
//     function (inputId, inputPassword, done) {
//       /* console.log(inputId, inputPassword); */
//       User.findOne({ id: inputId }, async function (err, res) {
//         if (err) return done(err);

//         if (!res) return done(null, false, { message: "not found id" });

//         const hashedPassword = await makePasswordHashed(inputId, inputPassword);

//         if (hashedPassword == res.password) {
//           return done(null, res);
//         } else {
//           return done(null, false, { message: "not equal password" });
//         }
//       });
//     }
//   )
// );

// //최초 로그인시 초기화
// passport.serializeUser(function (user, done) {
//   console.log("serial : " + user.id);
//   done(null, user.id);
// });

// //이후 사용자가 세션 정보를 요구할 때마다 호출
// passport.deserializeUser(function (id, done) {
//   console.log("deserial : " + id);
//   User.findOne({ id: id }, function (err, user) {
//     done(null, user);
//   });
// });

// ////////////////////////////////////////////////////////////////

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
    if (err) return res.status(500).send({ error: "database failure" });
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

  User.updateOne(
    { id: req.body.user },
    {
      $addToSet: {
        friends: req.body.friends,
      },
    },
    (err) => {
      if (err)
        return res.status(400).send({ error: "database update failure" });
      res.send(true);
    }
  );
};

export const userFriendsDeleteController = (req, res) => {
  console.log(req.body);
  User.updateOne(
    { id: req.body.user },
    { $pull: { friends: req.body.friends } },
    (err, res2) => {
      if (err)
        return res.status(400).send({ error: "database delete failure" });
      console.log(`${req.body.user}의 친구 ${req.body.friends} 삭제완료`);
      res.send({ message: "성공했습니다." });
    }
  );
};

export const userFriendsListController = (req, res) => {
  console.log(req.body.friends);
  User.find(
    { id: { $in: req.body.friends } },
    { _id: 0, id: 1, name: 1 },
    (err, users) => {
      if (err)
        return res.status(400).send({ error: "database delete failure" });
      res.send(users);
    }
  );
};

export const userTimelineGetController = (req, res) => {
  console.log(`req body friends ${req.body.friends}`);
  if (req.body.friends.length == 0) {
    console.log("친구가 없습니다.");
    return res.send({ id: undefined });
  }
  //친구의 아이디 닉네임 불러오기, 다이어리 불러오기
  User.find(
    { id: { $in: req.body.friends } },
    { _id: 0, id: 1, name: 1 },
    (err, users) => {
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
    }
  );
};
