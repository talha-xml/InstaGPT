const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { createUser, findUserByEmail } = require('../repositories/userRepository');

// Register a new application user
const registerUser = async (email, password) => {
  const normalizedEmail = email.trim().toLowerCase();

  const existingUser = await findUserByEmail(normalizedEmail);

  if (existingUser) {
    throw new Error('Email is already registered.');
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await createUser(normalizedEmail, passwordHash);

  return user;
};

// Authenticate an existing user
const loginUser = async (email, password) => {
  const normalizedEmail = email.trim().toLowerCase();

  const user = await findUserByEmail(normalizedEmail);

  if (!user) {
    throw new Error('Invalid email or password.');
  }

  const passwordMatches = await bcrypt.compare(password, user.password_hash);

  if (!passwordMatches) {
    throw new Error('Invalid email or password.');
  }

  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not configured.');
  }

  const token = jwt.sign({ sub: user.id.toString() }, process.env.JWT_SECRET, { expiresIn: '7d' });

  return {
    user: {
      id: user.id,
      email: user.email
    },
    token
  };
};

module.exports = {
  registerUser,
  loginUser
};
