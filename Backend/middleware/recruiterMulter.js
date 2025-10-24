import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

// 🟩 Define Cloudinary Storage
const recruiterStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let folder = "Recruiter_Uploads";
    if (file.fieldname === "company_logo") folder = "Company_Logos";
    if (file.fieldname === "hr_photo") folder = "HR_Photos";
    // console.log("hello");
    // console.log(file);
    return {
      folder,
      format: file.mimetype.split("/")[1] || "jpg",
      public_id: `${file.fieldname}_${Date.now()}`,
    };
  },
});

// 🟦 Single file uploaders (recommended for clarity)
export const uploadCompanyLogo = multer({
  storage: recruiterStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
}).single("company_logo");

export const uploadHrPhoto = multer({
  storage: recruiterStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
}).single("hr_photo");

// 🟧 Multi-file uploader (optional for registration form)
export const uploadRecruiterFiles = multer({
  storage: recruiterStorage,
  limits: { fileSize: 10 * 1024 * 1024 },
}).fields([
  { name: "company_logo", maxCount: 1 },
  { name: "hr_photo", maxCount: 1 },
]);
