const { students, getNextId } = require("../models/studentModel");

const getStudents = (req, res) => {
  res.json(students);
};

const addStudent = (req, res) => {
  const student = {
    id: getNextId(),
    name: req.body.name,
    course: req.body.course
  };

  students.push(student);
  res.status(201).json(student);
};

const getStudent = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const student = students.find((studentRecord) => studentRecord.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.json(student);
};

const updateStudent = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const student = students.find((studentRecord) => studentRecord.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  student.name = req.body.name || student.name;
  student.course = req.body.course || student.course;

  res.json(student);
};

const deleteStudent = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = students.findIndex((studentRecord) => studentRecord.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.json(students.splice(index, 1));
};

module.exports = {
  getStudents,
  addStudent,
  getStudent,
  updateStudent,
  deleteStudent,
};