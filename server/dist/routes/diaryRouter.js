import express from "express";
import * as diary from "../controllers/diaryController.js";
const router = express.Router();
router.post("/diary/list", diary.diaryListController);
router.post("/diary/add", diary.diaryAddController);
router.put("/diary/edit/:id", diary.diaryEditController);
router.delete("/diary/delete", diary.diaryDeleteController);
router.post("/like", diary.diaryLikeController);
export default router;
