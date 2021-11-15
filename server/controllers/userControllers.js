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

  let { id, password } = req.body;

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
          return done(null, res);
        } else {
          return done(null, false, {
            message: "아이디와 비밀번호를 확인해주세요.",
          });
        }
      });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

//세션 해석
passport.deserializeUser(function (id, done) {
  done(null, {});
});

export const userFindController = (req, res) => {
  var 검색조건 = [
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

  User.aggregate(검색조건, function (err, users) {
    if (err) return res.status(500).send({ error: "database failure" });
    console.log(users);
    res.send(users);
  });
};

export const userInfoController = (req, res, next) => {
  res.send("세션");
};
