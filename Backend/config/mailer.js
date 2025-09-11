import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // ✅ make sure env is loaded

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASS,
  },
});

console.log("Email:", process.env.EMAIL_USERNAME);
console.log("Pass:", process.env.EMAIL_PASS ? "Exists ✅" : "Missing ❌");

export default transporter;
