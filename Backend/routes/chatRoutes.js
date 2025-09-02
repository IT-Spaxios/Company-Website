import express from "express";
import { createSubmission, getAllSubmissions } from "../controllers/chatSubmission.js";

const router = express.Router();



// real routes
router.post("/submit", createSubmission);
router.get("/", getAllSubmissions);

export default router;
