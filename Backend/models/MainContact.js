// models/MainContact.js
import mongoose from 'mongoose';

const mainContactSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  mobile: { type: String, required: true, trim: true },
  purpose: { type: [String], default: [] },
  source: { type: [String], default: [] },
  message: { type: String, required: true, trim: true },
}, { timestamps: true });

export default mongoose.model('MainContact', mainContactSchema);
