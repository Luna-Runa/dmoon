import express from "express";
import * as auth from "../controllers/authController.js";

const router = express.Router();

router.get("/test", (req, res) => {
  console.log("sdf");
  res.redirect("/");
});
router.post("/login", auth.authLogInController);
router.get("/logout", auth.authLogOutController);

export default router;
