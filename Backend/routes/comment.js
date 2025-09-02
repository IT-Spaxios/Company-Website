import { Router } from "express";

import { getAccessToRoute } from "../Middlewares/Authorization/auth.js";

import {
  addNewCommentToStory,
  getAllCommentByStory,
  commentLike,
  getCommentLikeStatus,
} from "../controllers/comment.js";

import { checkStoryExist } from "../Middlewares/database/databaseErrorhandler.js";

const router = Router();

router.post(
  "/:slug/addComment",
  [getAccessToRoute, checkStoryExist],
  addNewCommentToStory
);

router.get("/:slug/getAllComment", getAllCommentByStory);

router.post("/:comment_id/like", commentLike);

router.post("/:comment_id/getCommentLikeStatus", getCommentLikeStatus);

export default router;
