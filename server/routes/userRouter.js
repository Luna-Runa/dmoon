import { Router } from "express";
import {
    userRegisterController,
    userLogInController
} from "../controllers/userControllers.js";

const userRouter = Router();

userRouter.post("/register", userRegisterController);
userRouter.post("/login", userLogInController);

export default userRouter;