const router = require('express').Router();
const authController = require('../controller/auth.controller');

// Sign up
router.post('/signup', authController.signUp);

// Sign in
router.post('/login', authController.logIn);

// Test get secret resource
router.get('/secret', authController.secret);

module.exports = router;
