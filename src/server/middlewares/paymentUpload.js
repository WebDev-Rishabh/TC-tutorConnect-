import multer from "multer";
import path from "path";
import fs from "fs";

// ✅ Define upload path
const uploadPath = path.join(process.cwd(), "uploads/payment");

// Ensure the directory exists
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// ✅ Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

// ✅ File filter (optional)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|pdf/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  if (extname) return cb(null, true);
  cb(new Error("Only images or PDF files are allowed"));
};

export const uploadPaymentProof = multer({ storage, fileFilter });
