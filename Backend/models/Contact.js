// models/Contact.js
import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 120 },
  email: { type: String, required: true, trim: true, lowercase: true },
  message: { type: String, required: true, trim: true, maxlength: 5000 },
  phone: { type: String, default: null }, // optional
  ip: { type: String, default: null }, // optional: store submitter IP
  userAgent: { type: String, default: null },
}, { timestamps: true });

export default mongoose.model("Contact", contactSchema);
