const express = require('express');
const userController = require('../controllers/userController.js');

const router = express.Router();

// Route for user registration
router.post('/register', userController.registerUser, (req, res) => {
  res.status(201).json(res.locals.user);
});

// Route for user login
router.post('/login', userController.loginUser, (req, res) => {
  res.status(200).json(res.locals.user);
});

module.exports = router;
