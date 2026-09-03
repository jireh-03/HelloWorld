const express = require("express");

const port = 3000;

let nextId = 1;

const students = [
    { id: nextId++, name: "Jonna", course: "BSCS" },
    { id: nextId++, name: "Jaira", course: "BSCS" },
    { id: nextId++, name: "Fatima", course: "BSCS" },
];

const app = express();

app.use(express.json());


app.post("/students", (req, res) => {
    const newName = req.body.name;
    const newCourse = req.body.course;

    const newStudent = {
        id: nextId++,
        name: newName,
        course: newCourse
    };

    students.push(newStudent);

    res.status(201).send(newStudent);
});


app.get("/students", (req, res) => {
    res.send(students);
});


app.get("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const student = students.find(student => student.id === id);

    if (!student) {
        return res.status(404).send({
            message: "Student not found"
        });
    }

    res.send(student);
});


app.put("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const student = students.find(student => student.id === id);

    if (!student) {
        return res.status(404).send({
            message: "Student not found"
        });
    }

    student.name = req.body.name;
    student.course = req.body.course;

    res.send(student);
});


app.delete("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const studentIndex = students.findIndex(student => student.id === id);

    if (studentIndex === -1) {
        return res.status(404).send({
            message: "Student not found"
        });
    }

    const deletedStudent = students.splice(studentIndex, 1);

    res.send({
        message: "Student deleted successfully",
        student: deletedStudent[0]
    });
});


app.listen(port, () => {
    console.log('App listening to port ${port}');
});