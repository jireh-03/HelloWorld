const pool = require("../config/database");

// CREATE USER
const createUser = async (username, email, password) => {
  const result = await pool.query(
    `INSERT INTO users (username, email, password)
     VALUES ($1, $2, $3)
     RETURNING id, username, email, created_at`,
    [username, email, password]
  );

  return result.rows[0];
};


// FIND USER BY EMAIL
const findUserByEmail = async (email) => {
  const result = await pool.query(
    `SELECT * FROM users
     WHERE email = $1`,
    [email]
  );

  return result.rows[0];
};


// SAVE REFRESH TOKEN
const saveRefreshToken = async (userId, token, expiresAt) => {
  const result = await pool.query(
    `INSERT INTO refresh_tokens (user_id, token, expires_at)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [userId, token, expiresAt]
  );

  return result.rows[0];
};


// FIND REFRESH TOKEN
const findRefreshToken = async (token) => {
  const result = await pool.query(
    `SELECT * FROM refresh_tokens
     WHERE token = $1`,
    [token]
  );

  return result.rows[0];
};


// DELETE REFRESH TOKEN
const deleteRefreshToken = async (token) => {
  await pool.query(
    `DELETE FROM refresh_tokens
     WHERE token = $1`,
    [token]
  );
};


module.exports = {
  createUser,
  findUserByEmail,
  saveRefreshToken,
  findRefreshToken,
  deleteRefreshToken,
};