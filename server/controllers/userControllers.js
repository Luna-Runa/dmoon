import passport from "passport";
import User from "../models/userModel.js";
import passportLocal from "passport-local";

const LocalStrategy = passportLocal.Strategy;

export const userRegisterController = (req, res) => {
  console.log(req.body);
  let { id, name, password, confirmPassword } = req.body;

  if (id.length == 0 && name.length == 0 && !(password === confirmPassword))
    return res.send(false);

  const user = new User({
    id,
    name,
    password,
  });

  user.save((err) => {
    if (err) return res.send(false);

    console.log("등록 완료");
    res.send(true);
  });
};

export const userLogInController = (req, res) => {
  console.log(req.body);

  res.send(true);
};

passport.use(
  new LocalStrategy(
    {
      usernameField: "id",
      passwordField: "password",
      session: true,
      passReqToCallback: false,
    },
    function (inputId, inputPassword, done) {
      /* console.log(inputId, inputPassword); */
      User.findOne({ id: inputId }, function (err, res) {
        if (err) return done(err);

        if (!res)
          return done(null, false, {
            message: "아이디와 비밀번호를 확인해주세요.",
          });
        if (inputPassword == res.password) {
          return done(null, res, { message: "s" });
        } else {
          return done(null, false, {
            message: "아이디와 비밀번호를 확인해주세요.",
          });
        }
      });
    }
  )
);

//최초 로그인시 초기화
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

//사용자가 요구할 때마다 호출
passport.deserializeUser(function (id, done) {
  User.findOne({ id: id }, function (err, user) {
    console.log("여기서 쿠키랑 비교?? 로그아웃 만들어주세요" + id);
    console.log("내정보도 만들어주세요");
    console.log("심심하시면 일기장 로그인 여부도 확인해주세요");
    console.log("친구추가도 저랑 친구추가해놔주세요");
    done(null, user);
  });
});

export const userFindController = (req, res) => {
  console.log(req.body);
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
    console.log(users);
    res.send(users);
  });
};

export const userInfoController = (req, res, next) => {
  res.send("세션");
};
