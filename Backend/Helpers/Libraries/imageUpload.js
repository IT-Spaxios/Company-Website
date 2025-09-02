import CustomError from "../Error/CustomError.js";
import multer from "multer";
import { dirname } from "path";
import { fileURLToPath } from "url";


// Convert import.meta.url to __dirname
const __filename = fileURLToPath(import.meta.url);


const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "images/webp"];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"));
  }
};

const imageUpload = multer({ storage, fileFilter });


export default imageUpload;
