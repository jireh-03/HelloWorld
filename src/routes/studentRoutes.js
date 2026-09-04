const express = require("express");
const router = express.Router();

const { students, getNextId } = require("../models/studentModel");


router.post("/", (req, res) => {
    const newName = req.body.name;
    const newCourse = req.body.course;

    const newStudent = {
        id: getNextId(),
        name: newName,
        course: newCourse
    };

    students.push(newStudent);

    res.status(201).send(newStudent);
});


router.get("/", (req, res) => {
    res.send(students);
});


router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const student = students.find(student => student.id === id);

    if (!student) {
        return res.status(404).send({
            message: "Student not found"
        });
    }

    res.send(student);
});


router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const student = students.find(student => student.id === id);

    if (!student) {
        return res.status(404).send({
            message: "Student not found"
        });
    }

    student.name = req.body.name || student.name;
    student.course = req.body.course || student.course;

    res.send(student);
});


router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const index = students.findIndex(student => student.id === id);

    if (index === -1) {
        return res.status(404).send({
            message: "Student not found"
        });
    }

    const deletedStudent = students.splice(index, 1);

    res.send(deletedStudent);
});

module.exports = router;