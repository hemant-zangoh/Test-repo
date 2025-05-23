const express = require('express');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendVerificationEmail, sendPasswordResetEmail } = require('../utils/email');
const { authenticate } = require('../middleware/auth');
const { pool } = require('../utils/database');

const router = express.Router();

// Validation middleware
const validateRegistration = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  body('role').optional().isIn(['user', 'admin'])
];

const validateLogin = [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty()
];

// Register endpoint
router.post('/register', validateRegistration, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Create new user
    const user = await User.create({ email, password, role });

    // Send verification email
    await sendVerificationEmail(user.email, user.verificationToken);

    res.status(201).json({
      message: 'User registered successfully. Please check your email to verify your account.',
      user: user.toJSON()
    });
  } catch (error) {
    next(error);
  }
});

// Login endpoint
router.post('/login', validateLogin, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find user
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Verify password
    const isValidPassword = await user.verifyPassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if user is verified
    if (!user.isVerified) {
      return res.status(401).json({ message: 'Please verify your email before logging in' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY || '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: user.toJSON()
    });
  } catch (error) {
    next(error);
  }
});

// Verify email endpoint
router.get('/verify/:token', async (req, res, next) => {
  try {
    const { token } = req.params;

    // Find user by verification token
    const query = 'SELECT * FROM users WHERE verification_token = $1';
    const result = await pool.query(query, [token]);

    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid or expired verification token' });
    }

    const user = new User(result.rows[0]);
    await user.verify();

    res.json({ message: 'Email verified successfully' });
  } catch (error) {
    next(error);
  }
});

// Request password reset endpoint
router.post('/forgot-password', body('email').isEmail().normalizeEmail(), async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;
    const user = await User.findByEmail(email);

    if (!user) {
      // Don't reveal if user exists or not
      return res.json({ message: 'If your email is registered, you will receive a password reset link' });
    }

    // Generate reset token
    const resetToken = Math.random().toString(36).substring(2) + Date.now().toString(36);
    const expiry = new Date(Date.now() + 3600000); // 1 hour

    await user.setResetToken(resetToken, expiry);
    await sendPasswordResetEmail(user.email, resetToken);

    res.json({ message: 'If your email is registered, you will receive a password reset link' });
  } catch (error) {
    next(error);
  }
});

// Reset password endpoint
router.post('/reset-password', [
  body('token').notEmpty(),
  body('password').isLength({ min: 8 })
], async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { token, password } = req.body;

    // Find user by reset token
    const query = 'SELECT * FROM users WHERE reset_token = $1 AND reset_token_expiry > NOW()';
    const result = await pool.query(query, [token]);

    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    const user = new User(result.rows[0]);
    await user.updatePassword(password);

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    next(error);
  }
});

// Logout endpoint (mainly for token blacklisting if implemented)
router.post('/logout', authenticate, (req, res) => {
  // In a production app, you might want to blacklist the token here
  res.json({ message: 'Logout successful' });
});

// Get current user endpoint
router.get('/me', authenticate, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user: user.toJSON() });
  } catch (error) {
    next(error);
  }
});

module.exports = router;