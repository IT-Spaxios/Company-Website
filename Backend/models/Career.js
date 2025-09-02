import mongoose from "mongoose";

const careerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // e.g. "Software Engineer"
    description: { type: String, required: true }, // job description
    location: { type: String, required: true }, // e.g. "Bangalore, India"
    type: { 
      type: String, 
      enum: ["Full-time", "Part-time", "Internship"], 
      default: "Full-time" 
    },
    experience: { type: String, required: true }, // e.g. "2–4 years"
    requirements: { type: [String], default: [] }, // e.g. ["JavaScript", "React", "Node.js"]
    salaryRange: { type: String }, // e.g. "₹6 – ₹10 LPA"
    deadline: { type: Date }, // e.g. "2025-09-30"
    status: { type: Boolean, default: true } // active/inactive job
  },
  { timestamps: true }
);

export default mongoose.model("Career", careerSchema);
