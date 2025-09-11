// controllers/contactController.js
import Contact from "../models/Contact.js";
import transporter from "../config/mailer.js";

export const sendContactMessage = async (req, res) => {
  try {
     console.log("Incoming body:", req.body);
    const { name, email, message,phone} = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "Name, email and message are required." });
    }

    // Save to DB
    const saved = await Contact.create({
      name,
      email,
      message,
      phone: phone || null,
      ip: req.ip || req.headers["x-forwarded-for"] || null,
      userAgent: req.get("User-Agent") || null,
    });
    console.log(saved);

    // Send email notification
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: process.env.RECEIVER_EMAIL || process.env.EMAIL_USERNAME,
      subject: `New Contact Message from ${name}`,
      text:
        `You have a new contact message:\n\n` +
        `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}\n\nMessage:\n${message}\n\n` +
        `Received at: ${new Date().toISOString()}\nIP: ${saved.ip || "N/A"}`,
      // html: can be added if preferred
    };

    // Send (fire-and-forget but await to report errors)
    await transporter.sendMail(mailOptions);

    return res.status(201).json({ success: true, message: "Message received and emailed." });
  } catch (err) {
    console.error("ContactController Error:", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};
// ✅ New API: Get all footer contact submissions
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: contacts });
  } catch (err) {
    console.error("GetContacts Error:", err);
    return res.status(500).json({ success: false, message: "Failed to fetch contacts." });
  }
};