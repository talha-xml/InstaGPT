const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../services/authService');
const authMiddleware = require('../middleware/authMiddleware');
const { findUserById } = require('../repositories/userRepository');

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Email and password are required.'
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide a valid email.'
      });
    }

    if (typeof password !== 'string' || password.length < 8) {
      return res.status(400).json({
        status: 'error',
        message: 'Password must contain at least 8 characters.'
      });
    }

    const user = await registerUser(email, password);

    res.status(201).json({
      status: 'success',
      message: 'Registration successful.',
      user
    });
  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json({
        status: 'error',
        message: 'Email is already registered.'
      });
    }

    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Email and password are required.'
      });
    }

    const result = await loginUser(email, password);

    res.json({
      status: 'success',
      message: 'Login successful.',
      ...result
    });
  } catch (error) {
    res.status(401).json({
      status: 'error',
      message: error.message
    });
  }
});

// Get authenticated user
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await findUserById(req.user.id);

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found.'
      });
    }

    res.json({
      status: 'success',
      user
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Unable to retrieve user.'
    });
  }
});

module.exports = router;
