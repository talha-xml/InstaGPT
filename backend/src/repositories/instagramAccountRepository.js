const pool = require('../config/database');

// Save a connected Instagram account or update its credentials on reconnection
const createInstagramAccount = async ({
  userId,
  instagramUserId,
  username,
  accountType,
  encryptedAccessToken,
  tokenExpiresAt
}) => {
  const query = `
    INSERT INTO instagram_accounts (
      user_id,
      instagram_user_id,
      username,
      account_type,
      connection_status,
      access_token_encrypted,
      token_expires_at
    )
    VALUES ($1, $2, $3, $4, 'connected', $5, $6)
    ON CONFLICT (instagram_user_id)
    DO UPDATE SET
      username = EXCLUDED.username,
      account_type = EXCLUDED.account_type,
      connection_status = 'connected',
      access_token_encrypted = EXCLUDED.access_token_encrypted,
      token_expires_at = EXCLUDED.token_expires_at,
      updated_at = CURRENT_TIMESTAMP
    WHERE instagram_accounts.user_id = EXCLUDED.user_id
    RETURNING id, user_id, instagram_user_id, username,
              account_type, connection_status, created_at
  `;

  const result = await pool.query(query, [
    userId,
    instagramUserId,
    username,
    accountType,
    encryptedAccessToken,
    tokenExpiresAt
  ]);

  if (result.rowCount === 0) {
    throw new Error('This Instagram account is already connected to another InstaGPT user.');
  }

  return result.rows[0];
};

// Find Instagram accounts belonging to an application user
const findAccountsByUserId = async (userId) => {
  const query = `
    SELECT id, user_id, instagram_user_id, username,
           account_type, connection_status, token_expires_at,
           created_at
    FROM instagram_accounts
    WHERE user_id = $1
    ORDER BY created_at DESC
  `;

  const result = await pool.query(query, [userId]);

  return result.rows;
};

// Find an Instagram account by its database ID
const findAccountById = async (accountId) => {
  const query = `
    SELECT id, user_id, instagram_user_id, username,
           account_type, connection_status, token_expires_at
    FROM instagram_accounts
    WHERE id = $1
  `;

  const result = await pool.query(query, [accountId]);

  return result.rows[0] || null;
};

// Find an Instagram account owned by a specific application user
const findAccountByUserIdAndAccountId = async (userId, accountId) => {
  const query = `
    SELECT id, user_id, instagram_user_id, username,
           account_type, connection_status, token_expires_at,
           access_token_encrypted
    FROM instagram_accounts
    WHERE user_id = $1 AND id = $2
  `;

  const result = await pool.query(query, [userId, accountId]);

  return result.rows[0] || null;
};

module.exports = {
  createInstagramAccount,
  findAccountsByUserId,
  findAccountById,
  findAccountByUserIdAndAccountId
};
