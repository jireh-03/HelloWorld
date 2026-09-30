const studentModel = require("../models/studentModel");

const {
  validateStudentId,
  validateCreateStudent,
  validateUpdateStudent,
} = require("../validation/studentValidation");

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
    const validation = validateCreateStudent(req.body);

    if (!validation.valid) {
      return res.status(400).json({
        message: validation.message,
      });
    }

    const student = await studentModel.createStudent(
      validation.name,
      validation.course
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
    const validation = validateStudentId(req.params.id);

    if (!validation.valid) {
      return res.status(400).json({
        message: validation.message,
      });
    }

    const student = await studentModel.getStudentById(validation.value);

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
    const idValidation = validateStudentId(req.params.id);

    if (!idValidation.valid) {
      return res.status(400).json({
        message: idValidation.message,
      });
    }

    const validation = validateUpdateStudent(req.body);

    if (!validation.valid) {
      return res.status(400).json({
        message: validation.message,
      });
    }

    const student = await studentModel.updateStudent(
      idValidation.value,
      validation.name,
      validation.course
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
    const validation = validateStudentId(req.params.id);

    if (!validation.valid) {
      return res.status(400).json({
        message: validation.message,
      });
    }

    const student = await studentModel.deleteStudent(validation.value);

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