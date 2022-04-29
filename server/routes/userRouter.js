import express from "express";
import * as user from "../controllers/userController.js";
import * as auth from "../controllers/authController.js";

const router = express.Router();

router.post("/register", user.userRegisterController);

router.get("/info", isLogin, user.userInfoController);
router.post("/friends/add", user.userFriendsAddController);
router.delete("/friends/delete", user.userFriendsDeleteController);
router.post("/friends/list", user.userFriendsListController);

router.post("/search", user.userSearchController);

router.post("/timeline", user.userTimelineGetController);

function isLogin(req, res, next) {
  //로그인 한 상태라면 req.user가 존재 (deserializeUser에 의해)
  if (req.user) next();
  else res.redirect("로그인이 필요합니다.");
}

export default router;
