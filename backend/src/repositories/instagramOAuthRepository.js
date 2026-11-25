const pool = require('../config/database');

// Store a new OAuth state
const createOAuthState = async (userId, stateHash, expiresAt) => {
  const query = `
    INSERT INTO instagram_oauth_states (user_id, state_hash, expires_at)
    VALUES ($1, $2, $3)
    RETURNING id, user_id, expires_at
  `;

  const result = await pool.query(query, [userId, stateHash, expiresAt]);

  return result.rows[0];
};

// Find a valid, unused OAuth state
const findValidOAuthState = async (stateHash) => {
  const query = `
    SELECT id, user_id, state_hash, expires_at
    FROM instagram_oauth_states
    WHERE state_hash = $1
      AND expires_at > CURRENT_TIMESTAMP
      AND consumed_at IS NULL
  `;

  const result = await pool.query(query, [stateHash]);

  return result.rows[0] || null;
};

// Atomically validate and consume an OAuth state
const consumeValidOAuthState = async (stateHash) => {
  const query = `
    UPDATE instagram_oauth_states
    SET consumed_at = CURRENT_TIMESTAMP
    WHERE state_hash = $1
      AND consumed_at IS NULL
      AND expires_at > CURRENT_TIMESTAMP
    RETURNING id, user_id
  `;

  const result = await pool.query(query, [stateHash]);
  return result.rows[0] || null;
};

module.exports = {
  createOAuthState,
  findValidOAuthState,
  consumeValidOAuthState
};
