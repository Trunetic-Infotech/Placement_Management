import company_details from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../middleware/cloudinary.js";

// ✅ REGISTER COMPANY CONTROLLER LOGIC CODE
export const registerCompany = async (req, res) => {
  try {
    const {
      company_name,
      company_email,
      password,
      hr_name,
      industry_type,
      website_url,
      address,
      postal_code,
      contact_number,
      about_company,
      no_of_employees,
      linkedin_url,
      registered_by,
    } = req.body;

    // ✅ Get uploaded company logo from multer (Cloudinary)
    const company_logo = req.file ? req.file.path : null;

    // 1️⃣ Validate required fields
    if (
      !company_name ||
      !company_email ||
      !password ||
      !hr_name ||
      !industry_type ||
      !website_url ||
      !address ||
      !postal_code ||
      !contact_number ||
      !about_company ||
      !no_of_employees ||
      !linkedin_url ||
      !registered_by
    ) {
      return res.status(400).json({
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

    // 3️⃣ Check if email already exists
    const [existing] = await company_details.execute(
      "SELECT * FROM company_details WHERE company_email = ?",
      [company_email]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // 4️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5️⃣ Insert company into database
    await company_details.execute(
      `INSERT INTO company_details 
      (company_name, company_email, password, hr_name, company_logo, industry_type, website_url, address, postal_code, contact_number, about_company, no_of_employees, linkedin_url, registered_by)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        company_name,
        company_email,
        hashedPassword,
        hr_name,
        company_logo,
        industry_type,
        website_url,
        address,
        postal_code,
        contact_number,
        about_company,
        no_of_employees,
        linkedin_url,
        registered_by || "owner",
      ]
    );

    res.status(201).json({
      success: true,
      message: "Company registered successfully",
      logo_url: company_logo || "No logo uploaded",
    });
  } catch (err) {
    console.error("❌ registerCompany Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ LOGIN COMPANY CONTROLLER LOGIC CODE
export const loginCompany = async (req, res) => {
  try {
    const { company_email, password } = req.body;

    const [rows] = await company_details.execute(
      "SELECT * FROM company_details WHERE company_email = ?",
      [company_email]
    );

    if (rows.length === 0)
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });

    const company = rows[0];
    const valid = await bcrypt.compare(password, company.password);
    if (!valid)
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });

    const token = jwt.sign({ id: company.company_id }, "secretKey", {
      expiresIn: "7d",
    });

    res.json({ success: true, message: "Login successful", token, company });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ GET ALL COMPANIES CONTROLLER LOGIC CODE
export const getAllCompanies = async (req, res) => {
  try {
    const [companies] = await company_details.execute(
      "SELECT * FROM company_details"
    );
    
    res.json({ success: true, data: companies });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ GET COMPANY BY ID CONTROLLER LOGIC CODE
export const getCompanyById = async (req, res) => {
  try {
    const [rows] = await company_details.execute(
      "SELECT * FROM company_details WHERE company_id = ?",
      [req.params.id]
    );

    if (rows.length === 0)
      return res
        .status(404)
        .json({ success: false, message: "Company not found" });

    res.json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🟨 UPDATE COMPANY LOGO CONTROLLER LOGIC CODE
export const updateCompanyDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      company_name,
      company_email,
      hr_name,
      industry_type,
      website_url,
      address,
      postal_code,
      contact_number,
      about_company,
      no_of_employees,
      linkedin_url,
    } = req.body;

    await company_details.execute(
      `UPDATE company_details SET 
      company_name=?, company_email=?, hr_name=?, industry_type=?, website_url=?, address=?, postal_code=?, contact_number=?, about_company=?, no_of_employees=?, linkedin_url=?
      WHERE company_id=?`,
      [
        company_name,
        company_email,
        hr_name,
        industry_type,
        website_url,
        address,
        postal_code,
        contact_number,
        about_company,
        no_of_employees,
        linkedin_url,
        id,
      ]
    );

    res
      .status(200)
      .json({ success: true, message: "Company details updated successfully" });
  } catch (error) {
    console.error("❌ updateCompanyDetails Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 🟨 UPDATE COMPANY LOGO CONTROLLER LOGIC CODE
export const updateCompanyLogo = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.file)
      return res
        .status(400)
        .json({ success: false, message: "No company logo uploaded" });

    const newLogo = req.file.path;

    // Get old logo URL
    const [rows] = await company_details.execute(
      "SELECT company_logo FROM company_details WHERE company_id = ?",
      [id]
    );
    const oldLogoUrl = rows[0]?.company_logo;

    // Delete old logo from Cloudinary if exists
    if (oldLogoUrl) {
      const publicId = oldLogoUrl.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`Company_Logos/${publicId}`);
    }

    // Update DB
    await company_details.execute(
      "UPDATE company_details SET company_logo = ? WHERE company_id = ?",
      [newLogo, id]
    );

    res.status(200).json({
      success: true,
      message: "Company logo updated successfully",
      logo_url: newLogo,
    });
  } catch (error) {
    console.error("❌ updateCompanyLogo Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ DELETE COMPANU CONTROLLER LOGIC CODE
export const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    await company_details.execute(
      "DELETE FROM company_details WHERE company_id = ?",
      [id]
    );
    res.json({ success: true, message: "Company deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ RESET PASSWORD CONTROLLER LOGIC CODE
export const resetCompanyPassword = async (req, res) => {
  try {
    const { company_email, new_password } = req.body;
    const hashed = await bcrypt.hash(new_password, 10);

    const [result] = await db.execute(
      "UPDATE company_details SET password = ? WHERE company_email = ?",
      [hashed, company_email]
    );

    if (result.affectedRows === 0)
      return res
        .status(404)
        .json({ success: false, message: "Company not found" });

    res.json({ success: true, message: "Password reset successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
