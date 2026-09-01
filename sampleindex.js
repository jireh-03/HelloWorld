const express = require("express");
const port = 3000;

let nextId = 1;
const students = [
    { id: nextId++, name: "Jonna", course: "BSCS"},
    { id: nextId++, name: "Jaira", course: "BSCS"},
    { id: nextId++, name: "Fatima", course: "BSCS"},
];

const app = express();

app.use(express.json());

app.post("/students", (req, res) => {
    const newName = req.body.name;
    const newCourse = req.body.course;

    const newStudent = { id: nextId++, name: newName, course: newCourse };

    students.push(newStudent);

    res.send(newStudent);
});

app.listen(3000, () => {
    console.log("App listening to port 3000");
});
