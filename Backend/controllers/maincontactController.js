// controllers/maincontactController.js
import MainContact from '../models/MainContact.js'; // .js

const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
const isPhone = (s) => /^\+?[\d\s\-]{7,15}$/.test(s);

export const createContact = async (req, res) => {
  try {
    const { name, email, mobile, purpose = [], source = [], message } = req.body;
    if (!name || !email || !mobile || !message) {
      return res.status(400).json({ error: 'name, email, mobile and message are required.' });
    }
    if (!isEmail(email)) return res.status(400).json({ error: 'Invalid email.' });
    if (!isPhone(mobile)) return res.status(400).json({ error: 'Invalid mobile number.' });

    const doc = new MainContact({
      name: String(name).trim(),
      email: String(email).trim(),
      mobile: String(mobile).trim(),
      purpose: Array.isArray(purpose) ? purpose : purpose ? [purpose] : [],
      source: Array.isArray(source) ? source : source ? [source] : [],
      message: String(message).trim()
    });
    console.log(doc);
    await doc.save();
    return res.status(201).json({ message: 'Contact saved successfully.' });
  } catch (err) {
    console.error('createContact error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
// ✅ New: Get all contacts (for admin panel)
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await MainContact.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: contacts });
  } catch (err) {
    console.error('getAllContacts error:', err);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
};