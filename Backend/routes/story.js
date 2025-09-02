import { Router } from "express";
import imageupload from "../Helpers/Libraries/imageUpload.js";
import cloudinary from "../Helpers/Libraries/cloudinary.js";
import Story from "../models/story.js"; // make sure your Story model is imported


import { getAccessToRoute } from "../Middlewares/Authorization/auth.js";

import {
  addStory,
  getAllStories,
  detailStory,
  likeStory,
  editStory,
  deleteStory,
  editStoryPage,
} from "../controllers/story.js";
import {
  checkStoryExist,
  checkUserAndStoryExist,
} from "../Middlewares/database/databaseErrorhandler.js";

const router = Router();
router.post("/addstory", getAccessToRoute, imageupload.single("image"), addStory);


router.post("/:slug", checkStoryExist, detailStory);

router.post("/:slug/like", [getAccessToRoute, checkStoryExist], likeStory);

router.get(
  "/editStory/:slug",
  [getAccessToRoute, checkStoryExist, checkUserAndStoryExist],
  editStoryPage
);

router.put(
  "/:slug/edit",
  [
    getAccessToRoute,
    checkStoryExist,
    checkUserAndStoryExist,
    imageupload.single("image"),
  ],
  editStory
);

router.delete(
  "/:slug/delete",
  [getAccessToRoute, checkStoryExist, checkUserAndStoryExist],
  deleteStory
);

router.get("/getAllStories", getAllStories);

export default router;
