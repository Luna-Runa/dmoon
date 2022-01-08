import express from "express";
import passport from "passport";
import {
  diaryGetController,
  diaryAddController,
  diaryEditController,
  diaryDeleteController,
} from "../controllers/diaryControllers.js";
import {
  userRegisterController,
  userLogInController,
  userFindController,
  userInfoController,
  userLogOutController,
} from "../controllers/userControllers.js";
/* import path from "path"; */

const reactRouter = express.Router();

/* const __dirname = path.resolve();
const index = path.resolve(__dirname, "../../dmoon/client/public/index.html");
reactRouter.get("/css/bootstrap.min.css", (req, res) => {
  res.sendFile(__dirname + "/css/bootstrap.min.css");
}); */

reactRouter.post("/register", userRegisterController);

/* reactRouter.post("/login", function(req, res) {
  passport.authenticate('local', function(err, user, info) {
    if(err) return next(err);
    if(!user) return res.send(false);
    
    req.login(user, function(err) {
      if(err) return next(err);
      return res.send(user);
    });
  })(req, res);
}); */

reactRouter.post("/login", userLogInController);
reactRouter.get("/logout", userLogOutController);

reactRouter.get("/info", isLogin, userInfoController);

reactRouter.get("/diary/list", diaryGetController);
reactRouter.post("/diary/add", diaryAddController);
reactRouter.put("/diary/edit/:id", diaryEditController);
reactRouter.delete("/delete", diaryDeleteController);

reactRouter.post("/friends/search", userFindController);

/* reactRouter.get("*", (req, res) => {
  res.sendFile(index);
}); */

function isLogin(req, res, next) {
  //로그인 한 상태라면 req.user가 존재 (deserializeUser에 의해)
  if (req.user) next();
  else res.send("로그인이 필요합니다.");
}

export default reactRouter;
