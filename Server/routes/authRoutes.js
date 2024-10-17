const express = require('express');
const { signUp, postLogin } = require('../controllers/authController');
const router = express.Router();
const { check } = require('express-validator');

const signUpValidationRules = [
  check('firstName').notEmpty().withMessage('First name is required'),
  check('lastName').notEmpty().withMessage('Last name is required'),
  check('email').isEmail().withMessage('Email is invalid'),
  check('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),
  check('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  }),
];
const loginValidationRules = [
  check('email').isEmail().withMessage('Email is invalid'),
  check('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),
];
// SignUp route
router.post('/register', signUpValidationRules, signUp);

// Login route
router.post('/login', loginValidationRules, postLogin);

module.exports = router;
