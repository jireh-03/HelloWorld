let nextId = 1;

const students = [
    { id: nextId++, name: "Jonna", course: "BSCS" },
    { id: nextId++, name: "Jaira", course: "BSCS" },
    { id: nextId++, name: "Fatima", course: "BSCS" }
];

module.exports = {
    students,
    getNextId: () => nextId++
};