const studentModel = require("../models/studentModel");

// GET ALL STUDENTS
const getStudents = async (req, res) => {
  try {
    const students = await studentModel.getStudents();

    res.json(students);
  } catch (error) {
    console.error("Get students error:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// ADD STUDENT
const addStudent = async (req, res) => {
  try {
    const { name, course } = req.body;

    // Required fields
    if (name === undefined || course === undefined) {
      return res.status(400).json({
        message: "Name and course are required",
      });
    }

    // Must be strings
    if (typeof name !== "string" || typeof course !== "string") {
      return res.status(400).json({
        message: "Name and course must be strings",
      });
    }

    // Cannot be empty
    if (!name.trim() || !course.trim()) {
      return res.status(400).json({
        message: "Name and course cannot be empty",
      });
    }

    const student = await studentModel.createStudent(
      name.trim(),
      course.trim()
    );

    res.status(201).json(student);
  } catch (error) {
    console.error("Add student error:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// GET ONE STUDENT
const getStudent = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        message: "Student ID must be a positive number",
      });
    }

    const student = await studentModel.getStudentById(id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.json(student);
  } catch (error) {
    console.error("Get student error:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// UPDATE STUDENT
const updateStudent = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, course } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        message: "Student ID must be a positive number",
      });
    }

    // At least one field must be provided
    if (name === undefined && course === undefined) {
      return res.status(400).json({
        message: "At least name or course is required",
      });
    }

    // Validate name
    if (name !== undefined) {
      if (typeof name !== "string") {
        return res.status(400).json({
          message: "Name must be a string",
        });
      }

      if (!name.trim()) {
        return res.status(400).json({
          message: "Name cannot be empty",
        });
      }
    }

    // Validate course
    if (course !== undefined) {
      if (typeof course !== "string") {
        return res.status(400).json({
          message: "Course must be a string",
        });
      }

      if (!course.trim()) {
        return res.status(400).json({
          message: "Course cannot be empty",
        });
      }
    }

    const student = await studentModel.updateStudent(
      id,
      name !== undefined ? name.trim() : undefined,
      course !== undefined ? course.trim() : undefined
    );

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.json(student);
  } catch (error) {
    console.error("Update student error:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// DELETE STUDENT
const deleteStudent = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        message: "Student ID must be a positive number",
      });
    }

    const student = await studentModel.deleteStudent(id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.json(student);
  } catch (error) {
    console.error("Delete student error:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  getStudents,
  addStudent,
  getStudent,
  updateStudent,
  deleteStudent,
};