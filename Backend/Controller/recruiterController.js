import recruiter from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../middleware/cloudinary.js";
// import jwt from "jsonwebtoken";

// 🟩 REGISTER RECRUITER CONTROLLER LOGIC CODE
export const registerRecruiter = async (req, res) => {
  try {
    const {
      company_name,
      company_email,
      password,
      hr_name,
      job_posting,
      industry_type,
      website_url,
    } = req.body;
    console.log(req.body);

    // 1️⃣ Validate required fields
    if (
      !company_name ||
      !company_email ||
      !password ||
      !hr_name ||
      !job_posting ||
      !industry_type ||
      !website_url
    ) {
      res.status(404).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 2️⃣ Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(company_email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // 2️⃣ Check if recruiter already exists
    const [check] = await recruiter.query(
      "SELECT * FROM recruiter WHERE company_email = ?",
      [company_email]
    );
    if (check.length > 0)
      return res
        .status(400)
        .json({ message: "Recruiter already registered with this email" });

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Handle uploaded files
    const company_logo = req.files?.company_logo?.[0]?.path || null;
    const hr_photo = req.files?.hr_photo?.[0]?.path || null;

    // 5️⃣ Insert into database
    const [result] = await recruiter.query(
      `INSERT INTO recruiter 
      (company_name, company_email, password, hr_name, job_posting, company_logo, hr_photo, industry_type, website_url)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        company_name,
        company_email,
        hashedPassword,
        hr_name,
        job_posting,
        company_logo,
        hr_photo,
        industry_type,
        website_url,
      ]
    );

    res.status(201).json({
      message: "Recruiter registered successfully",
      recruiter_id: result.insertId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// 🟩 RECRUITER LOGIN CONTROLLER LOGIC CODE
export const recruiterLogin = async (req, res) => {
  try {
    const { company_email, password } = req.body;

    const [rows] = await recruiter.query(
      "SELECT * FROM recruiter WHERE company_email = ?",
      [company_email]
    );

    if (rows.length === 0)
      return res.status(404).json({ message: "Recruiter not found" });

    const foundRecruiter = rows[0];

    const isMatch = await bcrypt.compare(password, foundRecruiter.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });
    const token = jwt.sign(
      {
        recruiter_id: foundRecruiter.recruiter_id,
        company_email: foundRecruiter.company_email,
        role: "recruiter",
      },
      process.env.JWT_SECRET || "your_secret_key",
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      recruiter: {
        recruiter_id: foundRecruiter.recruiter_id,
        company_name: foundRecruiter.company_name,
        company_email: foundRecruiter.company_email,
        hr_name: foundRecruiter.hr_name,
        job_posting: foundRecruiter.job_posting,
        industry_type: foundRecruiter.industry_type,
        website_url: foundRecruiter.website_url,
        company_logo: foundRecruiter.company_logo,
        hr_photo: foundRecruiter.hr_photo,
      },
    });
  } catch (error) {
    console.error("Error in recruiterLogin:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 🟩 GET ALL RECRUITERS CONTROLLER LOGIC CODE
export const getAllRecruiters = async (req, res) => {
  try {
    const [rows] = await recruiter.query("SELECT * FROM recruiter");
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error in getAllRecruiters:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 🟩 GET RECRUITER BY ID
export const getRecruiterById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await recruiter.query(
      "SELECT * FROM recruiter WHERE recruiter_id = ?",
      [id]
    );

    if (rows.length === 0)
      return res.status(404).json({ message: "Recruiter not found" });

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error in getRecruiterById:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 🟩 UPDATE RECRUITER DETAILS CONTROLLER LOGIC CODE
export const updateRecruiterDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      company_name,
      company_email,
      hr_name,
      job_posting,
      industry_type,
      website_url,
    } = req.body;

    await recruiter.query(
      `UPDATE recruiter SET 
      company_name=?, company_email=?, hr_name=?, job_posting=?, industry_type=?, website_url=? 
      WHERE recruiter_id=?`,
      [
        company_name,
        company_email,
        hr_name,
        job_posting,
        industry_type,
        website_url,
        id,
      ]
    );

    res.status(200).json({ message: "Recruiter details updated successfully" });
  } catch (error) {
    console.error("Error in updateRecruiterDetails:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 🟩 UPDATE HR PHOTO CONTROLLER LOGIC CODE
export const updateHrPhoto = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Check if file uploaded
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No HR photo uploaded" });
    }

    const newPhoto = req.file.path;

    // ✅ Get old HR photo for deletion
    const [rows] = await recruiter.query(
      "SELECT hr_photo FROM recruiter WHERE recruiter_id = ?",
      [id]
    );
    const oldPhotoUrl = rows[0]?.hr_photo;

    // ✅ Delete old HR photo from Cloudinary if exists
    if (oldPhotoUrl) {
      const publicId = oldPhotoUrl.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`HR_Photos/${publicId}`);
    }

    // ✅ Update new HR photo in DB
    await recruiter.query(
      "UPDATE recruiter SET hr_photo = ? WHERE recruiter_id = ?",
      [newPhoto, id]
    );

    res.status(200).json({
      success: true,
      message: "HR photo updated successfully",
      hr_photo: newPhoto,
    });
  } catch (error) {
    console.error("Error updating HR photo:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 🟩 UPDATE COMPANY LOGO CONTROLLER LOGIC CODE
export const updateCompanyLogo = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Check if file uploaded
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No company logo uploaded" });
    }

    const newLogo = req.file.path;

    // ✅ Get old logo for deletion
    const [rows] = await recruiter.query(
      "SELECT company_logo FROM recruiter WHERE recruiter_id = ?",
      [id]
    );
    const oldLogoUrl = rows[0]?.company_logo;

    // ✅ Delete old file from Cloudinary if exists
    if (oldLogoUrl) {
      const publicId = oldLogoUrl.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`Company_Logos/${publicId}`);
    }

    // ✅ Update new logo in DB
    await recruiter.query(
      "UPDATE recruiter SET company_logo = ? WHERE recruiter_id = ?",
      [newLogo, id]
    );

    res.status(200).json({
      success: true,
      message: "Company logo updated successfully",
      company_logo: newLogo,
    });
  } catch (error) {
    console.error("Error updating company logo:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 🟩 DELETE RECRUITER CONTROLLER LOGIC CODE
export const deleteRecruiter = async (req, res) => {
  try {
    const { id } = req.params;

    await recruiter.query("DELETE FROM recruiter WHERE recruiter_id = ?", [id]);
    res.status(200).json({ message: "Recruiter deleted successfully" });
  } catch (error) {
    console.error("Error in deleteRecruiter:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 🟩 RESET PASSWORD CONTROLLER LOGIC CODE
export const resetRecruiterPassword = async (req, res) => {
  try {
    const { company_email, newPassword } = req.body;

    if (!company_email || !newPassword)
      return res
        .status(400)
        .json({ message: "Email and new password required" });

    const [existingRecruiter] = await recruiter.query(
      "SELECT * FROM recruiter WHERE company_email = ?",
      [company_email]
    );

    if (existingRecruiter.length === 0)
      return res
        .status(404)
        .json({ message: "No recruiter found with this email" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await recruiter.query(
      "UPDATE recruiter SET password = ? WHERE company_email = ?",
      [hashedPassword, company_email]
    );

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Error in resetRecruiterPassword:", error);
    res.status(500).json({ message: "Server error" });
  }
};
