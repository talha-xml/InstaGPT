
const crypto = require('crypto');

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12;
const AUTH_TAG_LENGTH = 16;

// Get the encryption key from .env
const getEncryptionKey = () => {
  const key = process.env.INSTAGRAM_TOKEN_ENCRYPTION_KEY;

  if (!key) {
    throw new Error('Instagram token encryption key is not configured.');
  }

  const decodedKey = Buffer.from(key, 'base64');

  if (decodedKey.length !== 32) {
    throw new Error('Encryption key must be 32 bytes.');
  }

  return decodedKey;
};

// Encrypt an Instagram access token
const encryptToken = (plainTextToken) => {
  if (typeof plainTextToken !== 'string' || !plainTextToken) {
    throw new Error('A valid Instagram access token is required.');
  }

  const iv = crypto.randomBytes(IV_LENGTH);

  const cipher = crypto.createCipheriv(
    ALGORITHM,
    getEncryptionKey(),
    iv
  );

  const encrypted = Buffer.concat([
    cipher.update(plainTextToken, 'utf8'),
    cipher.final()
  ]);

  const authTag = cipher.getAuthTag();

  return [
    iv.toString('base64'),
    authTag.toString('base64'),
    encrypted.toString('base64')
  ].join(':');
};

// Decrypt an encrypted Instagram access token
const decryptToken = (encryptedToken) => {
  if (typeof encryptedToken !== 'string' || !encryptedToken) {
    throw new Error('A valid encrypted token is required.');
  }

  const parts = encryptedToken.split(':');

  if (parts.length !== 3) {
    throw new Error('Encrypted token has an invalid format.');
  }

  const [ivBase64, authTagBase64, encryptedBase64] = parts;

  const iv = Buffer.from(ivBase64, 'base64');
  const authTag = Buffer.from(authTagBase64, 'base64');
  const encrypted = Buffer.from(encryptedBase64, 'base64');

  if (
    iv.length !== IV_LENGTH ||
    authTag.length !== AUTH_TAG_LENGTH
  ) {
    throw new Error('Encrypted token data is invalid.');
  }

  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    getEncryptionKey(),
    iv
  );

  decipher.setAuthTag(authTag);

  const decrypted = Buffer.concat([
    decipher.update(encrypted),
    decipher.final()
  ]);

  return decrypted.toString('utf8');
};

module.exports = {
  encryptToken,
  decryptToken
};
