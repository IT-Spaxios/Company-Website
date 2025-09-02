// routes/maincontactRoutes.js
import { Router } from 'express';
import { createContact,getAllContacts } from '../controllers/maincontactController.js'; // note .js

const router = Router();

router.post('/maincontact', createContact);
router.get("/", getAllContacts); // ✅ new route for admin
export default router;
