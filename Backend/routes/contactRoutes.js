// routes/contactRoutes.js
import express from "express";
import { sendContactMessage, getAllContacts } from "../controllers/contactController.js";

const router = express.Router();

// POST /api/contact
router.post("/addcontact", sendContactMessage);
router.get("/", getAllContacts);        // GET /api/contact

export default router;
