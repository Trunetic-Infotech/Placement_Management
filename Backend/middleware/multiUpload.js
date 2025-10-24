import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../middleware/cloudinary.js"; // adjust path if needed

// 🔹 Configure Cloudinary storage dynamically based on file type
const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    let folder = "uploads";
    if (file.fieldname === "photo") folder = "Profile_Images";
    if (file.fieldname === "resume") folder = "Resumes";
    if (file.fieldname === "certificate") folder = "Certificates";

    return {
      folder,
      format: file.mimetype.split("/")[1] || "jpg",
      public_id: `${file.fieldname}_${Date.now()}`,
    };
  },
});

// 🔹 Create multer instance for multiple file fields
export const multiUpload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB per file
}).fields([
  { name: "photo", maxCount: 1 },
  { name: "resume", maxCount: 1 },
  { name: "certificate", maxCount: 1 },
]);
