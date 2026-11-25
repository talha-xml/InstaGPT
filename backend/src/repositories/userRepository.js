const pool = require('../config/database');

// Create a new application user
const createUser = async (email, passwordHash) => {
  const query = `
    INSERT INTO users (email, password_hash)
    VALUES ($1, $2)
    RETURNING id, email, created_at
  `;

  const result = await pool.query(query, [email, passwordHash]);

  return result.rows[0];
};

// Find a user by email
const findUserByEmail = async (email) => {
  const query = `
    SELECT id, email, password_hash, created_at
    FROM users
    WHERE LOWER(email) = LOWER($1)
  `;

  const result = await pool.query(query, [email]);

  return result.rows[0] || null;
};

// Find a user by ID
const findUserById = async (userId) => {
  const query = `
    SELECT id, email, created_at
    FROM users
    WHERE id = $1
  `;

  const result = await pool.query(query, [userId]);

  return result.rows[0] || null;
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById
};
