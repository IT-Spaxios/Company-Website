// controllers/chatSubmission.js
import Chat from "../models/Chat.js";

export const createSubmission = async (req, res) => {
  try {
    const { serviceCategory, subCategory, name, contact, email, message } = req.body;

    if (!serviceCategory || !name || !contact || !email) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    const submission = new Chat({
      serviceCategory,
      subCategory,
      name,
      contact,
      email,
      message
    });

    await submission.save();
    return res.status(201).json({ success: true, data: submission });
  } catch (err) {
    console.error("createSubmission error:", err);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};

export const getAllSubmissions = async (req, res) => {
  try {
    const submissions = await Chat.find().sort({ createdAt: -1 });
    return res.json({ success: true, data: submissions });
  } catch (err) {
    console.error("getAllSubmissions error:", err);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};
