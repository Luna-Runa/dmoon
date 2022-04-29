import express from "express";
import * as auth from "../controllers/authController.js";

const router = express.Router();

router.post("/login", auth.userLogInController);
router.get("/logout", auth.userLogOutController);

// function isLogin(req, res, next) {
//   //로그인 한 상태라면 req.user가 존재 (deserializeUser에 의해)
//   if (req.user) next();
//   else res.send("로그인이 필요합니다.");
// }

export default router;
