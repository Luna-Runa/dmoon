import passport from "passport";
import User from "../models/userModel.js";
import passportLocal from "passport-local";

const LocalStrategy = passportLocal.Strategy;

export const userRegisterController = (req, res) => {
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

    res.send(true);
  });
};

//실행순서 : authenticate() -> LocalStrategy 생성자 -> serializeUser()
export const userLogInController = (req, res) => {
  console.log(`유저로그인컨트롤러 : ${req.body.id} ${req.body.password}`);
  passport.authenticate("local", function (err, user, info) {
    //여기서의 err, user, info가 done으로 받은 인자들
    if (err) return next(err);
    if (!user) return res.send(false);

    req.login(user, function (err) {
      if (err) return next(err);
      return res.send({ id: user.id, name: user.name });
    });
  })(req, res);
};

export const userLogOutController = (req, res) => {
  // 세션 부수고 쿠키도 강제삭제
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.send(true);
  });
};

//////////////////////////세션관리부분//////////////////////////
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

        if (!res) return done(null, false, { message: "not found id" });
        if (inputPassword == res.password) {
          return done(null, res);
        } else {
          return done(null, false, { message: "not equal password" });
        }
      });
    }
  )
);

//최초 로그인시 초기화
passport.serializeUser(function (user, done) {
  console.log("serial : " + user.id);
  done(null, user.id);
});

//이후 사용자가 세션 정보를 요구할 때마다 호출
passport.deserializeUser(function (id, done) {
  console.log("deserial : " + id);
  User.findOne({ id: id }, function (err, user) {
    done(null, user);
  });
});

////////////////////////////////////////////////////////////////

export const userFindController = (req, res) => {
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
