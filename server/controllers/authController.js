import passport from "passport";
import User from "../models/userModel.js";
import { Strategy as LocalStrategy } from "passport-local";
import crypto from "crypto";

//실행순서 : authenticate() -> LocalStrategy 생성자 -> serializeUser()
export const userLogInController = (req, res) => {
  console.log(userLogInController);
  passport.authenticate("local", function (err, user, info) {
    //여기서의 err, user, info가 done으로 받은 인자들
    if (err) return next(err);
    if (!user) return res.send(false);

    req.login(user, function (err) {
      if (err) return next(err);
      return res.send({ id: user.id, name: user.name, friends: user.friends });
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

//////////////////////////암호화//////////////////////////
const createSalt = () =>
  new Promise((res, rej) => {
    crypto.randomBytes(64, (err, buf) => {
      if (err) rej(err);
      res(buf.toString("base64"));
    });
  });

const createHashedPassword = (password) =>
  new Promise(async (res, rej) => {
    const salt = await createSalt();
    crypto.pbkdf2(password, salt, 9797, 64, "sha512", (err, key) => {
      if (err) rej(err);
      res({ hashedPassword: key.toString("base64"), salt });
    });
  });

const makePasswordHashed = (id, password) =>
  new Promise(async (res, rej) => {
    console.log(makePasswordHashed);
    const salt = await User.findOne({ id })
      .select("salt")
      .then((result) => {
        if (result === null) return rej("아이디가 존재하지 않습니다.");
        return result.salt;
      });
    crypto.pbkdf2(password, salt, 9797, 64, "sha512", (err, key) => {
      if (err) rej(err);
      res(key.toString("base64"));
    });
  });
/////////////////////////////////////////////////////////

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
      User.findOne({ id: inputId }, async function (err, res) {
        if (err) return done(err);

        if (!res) return done(null, false, { message: "not found id" });

        const hashedPassword = await makePasswordHashed(inputId, inputPassword);

        if (hashedPassword == res.password) {
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
