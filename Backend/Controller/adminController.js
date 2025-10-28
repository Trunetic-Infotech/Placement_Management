import admin from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// ✅ Create new admin
export const createAdmin = async (req, res) => {
  try {
    const { name, email, password, phone_number } = req.body;

    // 1️⃣ Validate required fields
    if (!name || !email || !password || !phone_number) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }

    // 2️⃣ Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send({
        success: false,
        message: "Inavlid Email -  please enter correct Email",
      });
    }

    // 3️⃣ Validate phone number
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone_number)) {
      return res.status(400).send({
        success: false,
        message: "Invalid phone number (must be 10 digits)",
      });
    }

    // Check if admin already exists
    const [check] = await admin.query("SELECT * FROM admin WHERE email = ?", [
      email,
    ]);
    if (check.length > 0)
      return res.status(400).json({ message: "Admin already exists" });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert admin
    const [result] = await admin.query(
      "INSERT INTO admin (name, email, password, phone_number, role) VALUES (?, ?, ?, ?, 'Admin')",
      [name, email, hashedPassword, phone_number]
    );

    res.status(201).json({
      message: "Admin created successfully",
      admin_id: result.insertId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get all admins
export const getAllAdmins = async (req, res) => {
  try {
    const [rows] = await admin.query("SELECT * FROM admin");
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get admin by ID
export const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await admin.query("SELECT * FROM admin WHERE admin_id = ?", [
      id,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ message: "Admin not found" });

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Update admin details
export const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone_number } = req.body;
    await admin.query(
      "UPDATE admin SET name = ?, phone_number = ? WHERE admin_id = ?",
      [name, phone_number, id]
    );

    res.status(200).json({ message: "Admin updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Delete admin
export const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    await admin.query("DELETE FROM admin WHERE admin_id = ?", [id]);
    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Admin Login with JWT Token
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Fetch admin from DB
    const [rows] = await admin.query("SELECT * FROM admin WHERE email = ?", [
      email,
    ]);
    if (rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid email or password" });
    }

    const foundAdmin = rows[0];

    // ✅ Check password
    const isMatch = await bcrypt.compare(password, foundAdmin.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    // ✅ Generate JWT Token
    const token = jwt.sign(
      {
        admin_id: foundAdmin.admin_id,
        email: foundAdmin.email,
        role: foundAdmin.role,
      },
      process.env.JWT_SECRET || "your_secret_key",
      { expiresIn: "7d" }
    );

    // ✅ Response
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      admin: {
        admin_id: foundAdmin.admin_id,
        name: foundAdmin.name,
        email: foundAdmin.email,
        phone_number: foundAdmin.phone_number,
        role: foundAdmin.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Reset Admin Password (after verifying email)
export const resetAdminPassword = async (req, res) => {
  try {
    const { email, new_password } = req.body;

    // Step 1: Check if admin exists
    const [rows] = await admin.query("SELECT * FROM admin WHERE email = ?", [
      email,
    ]);
    if (rows.length === 0)
      return res
        .status(404)
        .json({ message: "Admin not found with this email" });

    // Step 2: Hash new password
    const hashedPassword = await bcrypt.hash(new_password, 10);

    // Step 3: Update (replace old password)
    await admin.query("UPDATE admin SET password = ? WHERE email = ?", [
      hashedPassword,
      email,
    ]);

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
