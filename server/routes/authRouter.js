import express from "express";
import * as auth from "../controllers/authController.js";
import { isNotLogIn } from "../middlewares/auth.js";

const router = express.Router();

router.get("/test", (req, res) => {
  console.log("sdf");
  res.redirect("/");
});
router.get("/login", isNotLogIn, auth.authLogInController);
router.get("/logout", auth.authLogOutController);

// function isLogin(req, res, next) {
//   //로그인 한 상태라면 req.user가 존재 (deserializeUser에 의해)
//   if (req.user) next();
//   else res.send("로그인이 필요합니다.");
// }

export default router;
