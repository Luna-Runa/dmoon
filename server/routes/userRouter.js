import express from "express";
import * as user from "../controllers/userController.js";

const router = express.Router();

router.post("/register", user.userRegisterController);

router.get("/info", user.userInfoController);
router.post("/friends/add", user.userFriendsAddController);
router.delete("/friends/delete", user.userFriendsDeleteController);
router.post("/friends/list", user.userFriendsListController);

router.post("/search", user.userSearchController);

router.post("/timeline", user.userTimelineGetController);

export default router;
