const pool = require('../db');
const router = require('express').Router();
const userController = require('../controller/user.controller');

// PATCH modify user fields, change password & email- /

// DELETE specified user - /
router.delete('/', userController.deleteUser);

// POST log out everywhere - /

// GET get username
router.get('/username', userController.getUsername);

module.exports = router;
