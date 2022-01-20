import express from "express";
import {
  diaryListController,
  diaryAddController,
  diaryEditController,
  diaryDeleteController,
} from "../controllers/diaryControllers.js";
import {
  userRegisterController,
  userLogInController,
  userSearchController,
  userInfoController,
  userLogOutController,
  userFriendsAddController,
  userFriendsDeleteController,
  userFriendsListController,
} from "../controllers/userControllers.js";
/* import path from "path"; */

const reactRouter = express.Router();

/* const __dirname = path.resolve();
const index = path.resolve(__dirname, "../../dmoon/client/public/index.html");
reactRouter.get("/css/bootstrap.min.css", (req, res) => {
  res.sendFile(__dirname + "/css/bootstrap.min.css");
}); */

reactRouter.post("/register", userRegisterController);
reactRouter.post("/login", userLogInController);
reactRouter.get("/logout", userLogOutController);

reactRouter.get("/info", isLogin, userInfoController);
reactRouter.post("/friends/add", userFriendsAddController);
reactRouter.delete("/friends/delete", userFriendsDeleteController);
reactRouter.post("/friends/list", userFriendsListController);

reactRouter.post("/diary/list", diaryListController);
reactRouter.post("/diary/add", diaryAddController);
reactRouter.put("/diary/edit/:id", diaryEditController);
reactRouter.delete("/diary/delete", diaryDeleteController);

reactRouter.post("/search", userSearchController);

/* reactRouter.get("*", (req, res) => {
  res.sendFile(index);
}); */

function isLogin(req, res, next) {
  //로그인 한 상태라면 req.user가 존재 (deserializeUser에 의해)
  if (req.user) next();
  else res.send("로그인이 필요합니다.");
}

export default reactRouter;
