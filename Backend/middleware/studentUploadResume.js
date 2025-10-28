import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

const resumeStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "Resumes",
    allowed_formats: ["pdf", "doc", "docx"],
    public_id: `resume_${Date.now()}`,
  }),
});

export const StudentUploadResume = multer({
  storage: resumeStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
}).single("resume");
