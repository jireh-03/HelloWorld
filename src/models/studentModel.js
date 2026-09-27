const pool = require("../config/database");

const initializeTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS students (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      course VARCHAR(100) NOT NULL
    )
  `);

  console.log("Students table ready");
};

const getStudents = async () => {
  const result = await pool.query(
    `SELECT id, name, course
     FROM students
     ORDER BY id`
  );

  return result.rows;
};

const getStudentById = async (id) => {
  const result = await pool.query(
    `SELECT id, name, course
     FROM students
     WHERE id = $1`,
    [id]
  );

  return result.rows[0];
};

const createStudent = async (name, course) => {
  const result = await pool.query(
    `INSERT INTO students (name, course)
     VALUES ($1, $2)
     RETURNING id, name, course`,
    [name, course]
  );

  return result.rows[0];
};

const updateStudent = async (id, name, course) => {
  const result = await pool.query(
    `UPDATE students
     SET name = COALESCE($2, name),
         course = COALESCE($3, course)
     WHERE id = $1
     RETURNING id, name, course`,
    [id, name, course]
  );

  return result.rows[0];
};

const deleteStudent = async (id) => {
  const result = await pool.query(
    `DELETE FROM students
     WHERE id = $1
     RETURNING id, name, course`,
    [id]
  );

  return result.rows[0];
};

module.exports = {
  initializeTable,
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};