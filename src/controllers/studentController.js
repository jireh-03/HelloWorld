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

module.exports = { getStudents, addStudent };