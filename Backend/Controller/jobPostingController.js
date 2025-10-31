import job_postings from "../config/db.js";

// 🟩 Create (Post) Job
export const createJobPosting = async (req, res) => {
  try {
    const {
      recruiter_id,
      company_id,
      job_title,
      job_type,
      work_mode,
      job_location,
      salary_range,
      experience_required,
      skills_required,
      qualification_required,
      job_description,
      openings,
      application_deadline,
      status,
    } = req.body;
    console.log(req.body);

    const job_template_photo = req.file?.path || null;

    // ✅ Validation (all required fields)
    if (
      !recruiter_id ||
      !company_id ||
      !job_title ||
      !job_type ||
      !work_mode ||
      !job_location ||
      !salary_range ||
      !experience_required ||
      !skills_required ||
      !qualification_required ||
      !job_description ||
      !openings ||
      !application_deadline ||
      !status ||
      !job_template_photo
    ) {
      res.status(400).json({
        success: false,
        message:
          "Please fill all required fields and upload job template photo.",
      });
    }

    const [result] = await job_postings.query(
      `INSERT INTO job_postings (
        recruiter_id, company_id, job_title, job_type, work_mode, job_location,
        salary_range, experience_required, skills_required, qualification_required,
        job_description, openings, application_deadline, posted_date, status, job_template_photo
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?, ?)`,
      [
        recruiter_id,
        company_id,
        job_title,
        job_type,
        work_mode,
        job_location,
        salary_range,
        experience_required,
        skills_required,
        qualification_required,
        job_description,
        openings,
        application_deadline,
        status,
        job_template_photo,
      ]
    );

    res.status(200).json({
      success: true,
      message: "Job posted successfully",
      job_id: result.insertId,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🟦 Get All Jobs with Pagination
export const getAllJobs = async (req, res) => {
  try {
    //  Page & limit from query params
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    //  Get total count for pagination info
    const [countResult] = await job_postings.query(
      "SELECT COUNT(*) AS total FROM job_postings"
    );
    const totalJobs = countResult[0].total;
    const totalPages = Math.ceil(totalJobs / limit);

    //  Fetch paginated jobs
    const [rows] = await job_postings.query(
      "SELECT * FROM job_postings ORDER BY posted_date DESC LIMIT ? OFFSET ?",
      [limit, offset]
    );

    res.status(200).json({
      success: true,
      currentPage: page,
      totalPages,
      totalJobs,
      count: rows.length,
      data: rows,
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🟧 Get Job by ID
export const getJobById = async (req, res) => {
  const { id } = req.params;
  const [rows] = await job_postings.query(
    "SELECT * FROM job_postings WHERE job_id = ?",
    [id]
  );

  if (!rows.length)
    return res.status(404).json({ success: false, message: "Job not found" });

  res.json({ success: true, data: rows[0] });

  try {
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🟦 Update Job Details (all fields)
export const updateJobDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // ✅ Check if at least one field provided
    if (!updates || Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide at least one field to update.",
      });
    }

    // ✅ Allowed fields (security whitelist)
    const allowedFields = [
      "recruiter_id",
      "company_id",
      "job_title",
      "job_type",
      "work_mode",
      "job_location",
      "salary_range",
      "experience_required",
      "skills_required",
      "qualification_required",
      "job_description",
      "openings",
      "application_deadline",
      "status",
    ];

    // ✅ Filter only allowed fields
    const filteredUpdates = Object.keys(updates)
      .filter((key) => allowedFields.includes(key))
      .reduce((obj, key) => {
        obj[key] = updates[key];
        return obj;
      }, {});

    if (Object.keys(filteredUpdates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid fields provided for update.",
      });
    }

    // ✅ Build dynamic query
    const setClause = Object.keys(filteredUpdates)
      .map((key) => `${key} = ?`)
      .join(", ");

    const values = [...Object.values(filteredUpdates), id];

    const [result] = await job_postings.query(
      `UPDATE job_postings SET ${setClause} WHERE job_id = ?`,
      values
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Job not found or no changes made." });
    }

    res.json({
      success: true,
      message: "Job details updated successfully.",
      updated_fields: filteredUpdates,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🟪 Update Job Template Photo
export const updateJobTemplatePhoto = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.file)
      return res
        .status(400)
        .json({ success: false, message: "No photo uploaded" });

    const photoUrl = req.file.path;

    await job_postings.query(
      "UPDATE job_postings SET job_template_photo = ? WHERE job_id = ?",
      [photoUrl, id]
    );

    res.json({
      success: true,
      message: "Job template photo updated successfully",
      photo_url: photoUrl,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🟥 Delete Job Posting
export const deleteJobPosting = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await job_postings.query(
      "DELETE FROM job_postings WHERE job_id = ?",
      [id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ success: false, message: "Job not found" });

    res.json({ success: true, message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🟩 Get Latest Job Postings
export const getLatestJobPostings = async (req, res) => {
  try {
    const [rows] = await job_postings.query(
      "SELECT * FROM job_postings ORDER BY posted_date DESC LIMIT 3"
    );

    res.status(200).json({
      success: true,
      message: "Latest job postings fetched successfully!",
      data: rows,
    });
  } catch (error) {
    console.error("Error in getLatestJobPostings:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
