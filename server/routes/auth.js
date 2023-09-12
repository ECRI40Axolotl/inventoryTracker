const express = require('express');
const userController = require('../controllers/userController.js');

const authRouter = express.Router();

// Route for user registration
authRouter.post('/register', userController.registerUser, (req, res) => {
  res.status(201).json(res.locals.user);
});

// Route for user login
authRouter.post('/login', userController.loginUser, (req, res) => {
  res.status(200).json(res.locals.user);
});

module.exports = authRouter;
