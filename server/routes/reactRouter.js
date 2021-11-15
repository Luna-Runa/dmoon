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
} from "../controllers/userControllers.js";
/* import path from "path"; */

const reactRouter = express.Router();

/* const __dirname = path.resolve();
const index = path.resolve(__dirname, "../../dmoon/client/public/index.html");
reactRouter.get("/css/bootstrap.min.css", (req, res) => {
  res.sendFile(__dirname + "/css/bootstrap.min.css");
}); */

reactRouter.post("/register", userRegisterController);
reactRouter.post("/login", passport.authenticate("local"), userLogInController);

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
  if (req.user) next();
  else res.send("로그인 해주세요!");
}

export default reactRouter;
