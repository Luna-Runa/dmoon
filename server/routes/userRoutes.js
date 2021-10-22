import { Router } from "express";
import {
    userRegisterController,
    userLogInController
} from "../controllers/userControllers.js";

const router = Router();

router.post("/register", userRegisterController);
router.post("/login", userLogInController);

export default router;