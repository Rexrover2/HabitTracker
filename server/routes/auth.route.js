const router = require('express').Router();
const authController = require('../controller/auth.controller');

// Sign up
router.post('/signup', authController.signUp);

module.exports = router;
