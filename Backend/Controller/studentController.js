import student from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// STUDENT REGISTER CONTROLLER LOGIC CODE
export const registerStudent = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      roll_no,
      department,
      course,
      cgpa,
      skills,
      applied_jobs,
      status,
    } = req.body;
    console.log(req.body);
    const phoneNumber = phone;

    // console.log(req.files);

    // 1️⃣ Check if all fields are present
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !password ||
      !roll_no ||
      !department ||
      !course ||
      !cgpa ||
      !skills
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    //  Checkn Student Already Exists
    const [check] = await student.query(
      "SELECT * FROM student WHERE email = ?",
      [email]
    );
    if (check.length > 0)
      return res.status(400).json({ message: "Student already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    // Add Photo, Resume, Certificate
    const photo_url = req.files?.photo?.[0]?.path || null;
    const resume_url = req.files?.resume?.[0]?.path || null;
    const certificate_url = req.files?.certificate?.[0]?.path || null;

    // Insert Data In Table
    const [result] = await student.query(
      `INSERT INTO student 
      (firstName, lastName, email, phoneNumber, password, roll_no, department, course, cgpa, skills, resume_url, photo_url, certificate_url, applied_jobs, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        firstName,
        lastName,
        email,
        phoneNumber,
        hashedPassword,
        roll_no,
        department,
        course,
        cgpa,
        skills,
        resume_url,
        photo_url,
        certificate_url,
        applied_jobs,
        status || "pending",
      ]
    );

    res.status(201).json({
      success: true,
      message: "Student registered successfully",
      student_id: result.insertId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ STUDENT LOGIN CONTROLLER LOGIC CODE
export const studentLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows] = await student.query(
      "SELECT * FROM student WHERE email = ?",
      [email]
    );
    console.log(rows);

    if (rows.length === 0)
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });

    const foundStudent = rows[0];
    console.log(foundStudent);

    const isMatch = await bcrypt.compare(password, foundStudent.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });

    const token = jwt.sign(
      {
        student_id: foundStudent.student_id,
        email: foundStudent.email,
        role: "student",
      },
      process.env.JWT_SECRET || "your_secret_key",
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      student: {
        student_id: foundStudent.student_id,
        firstName: foundStudent.firstName,
        lastName: foundStudent.lastName,
        email: foundStudent.email,
        phoneNumber: foundStudent.phoneNumber,
        department: foundStudent.department,
        course: foundStudent.course,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ GET ALL STUDENT CONTROLLER LOGIC CODE
export const getAllStudents = async (req, res) => {
  try {
    const [rows] = await student.query("SELECT * FROM student");
    res.status(200).json({
      success: true,
      message: "Students data retrieved!",
      data: rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ GET STUDENT BY ID CONTROLLER LOGIC CODE
export const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await student.query(
      "SELECT * FROM student WHERE student_id = ?",
      [id]
    );
    if (rows.length === 0)
      return res.status(404).json({ message: "Student not found" });

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ STUDENT PROFILE UPDATE CONTROLLER LOGIC CODE
export const updateStudentDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      firstName,
      lastName,
      phoneNumber,
      department,
      course,
      cgpa,
      skills,
      applied_jobs,
      status,
    } = req.body;

    await student.query(
      `UPDATE student SET 
      firstName=?, lastName=?, phoneNumber=?, department=?, course=?, cgpa=?, skills=?, applied_jobs=?, status=? 
      WHERE student_id=?`,
      [
        firstName,
        lastName,
        phoneNumber,
        department,
        course,
        cgpa,
        skills,
        applied_jobs,
        status,
        id,
      ]
    );
    res.status(200).json({ message: "Student details updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ STUDENT PROFILE UPDATE PHOTO CONTROLLER LOGIC CODE
export const uploadProfilePhoto = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.file?.path)
      return res.status(400).json({ message: "No photo uploaded" });

    const photo_url = req.file.path;

    await student.query(`UPDATE student SET photo_url=? WHERE student_id=?`, [
      photo_url,
      id,
    ]);

    res.status(200).json({
      message: "Profile photo uploaded successfully",
      photo_url,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ STUDENT RESUME UPDATE CONTROLLER LOGIC CODE
export const studentUploadResume = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.file?.path)
      return res.status(400).json({ message: "No resume uploaded" });

    const resume_url = req.file.path;

    await student.query(`UPDATE student SET resume_url=? WHERE student_id=?`, [
      resume_url,
      id,
    ]);

    res.status(200).json({
      message: "Resume uploaded successfully",
      resume_url,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ STUDENT CERTIFICATE UPDATE CONTROLLER LOGIC CODE
export const studentUploadCertificate = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.file?.path)
      return res.status(400).json({ message: "No certificate uploaded" });

    const certificate_url = req.file.path;

    await student.query(
      `UPDATE student SET certificate_url=? WHERE student_id=?`,
      [certificate_url, id]
    );

    res.status(200).json({
      message: "Certificate uploaded successfully",
      certificate_url,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// DLETE STUDENT CONTROLLER LOGIC CODE
export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    await student.query("DELETE FROM student WHERE student_id = ?", [id]);
    res
      .status(200)
      .json({ success: true, message: "Student deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// STUDENT RESET PASSWORD CONTROLLER LOGIC CODE
export const resetStudentPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    // 1️⃣ Validate input
    if (!email || !newPassword) {
      return res
        .status(400)
        .json({ message: "Email and new password required" });
    }

    // 2️⃣ Check if student exists
    const [existingStudent] = await student.query(
      "SELECT * FROM student WHERE email = ?",
      [email]
    );

    if (existingStudent.length === 0) {
      return res
        .status(404)
        .json({ message: "No student found with this email" });
    }

    // 3️⃣ Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 4️⃣ Update password in DB
    await student.query("UPDATE student SET password = ? WHERE email = ?", [
      hashedPassword,
      email,
    ]);

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Error in resetStudentPassword:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getLatestStudents = async (req, res) => {
  try {
    const [rows] = await student.query(
      "SELECT * FROM student ORDER BY created_at DESC LIMIT 3"
    );

    res.status(200).json({
      success: true,
      message: "Latest students fetched successfully!",
      data: rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
