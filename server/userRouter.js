const express = require('express'); 
const bcrypt = require('bcrypt'); // lets us hash our passwords

const userController = require('./controllers/userController.js');
// 2 steps: create a salt, use salt and pw to create hashed password
// salt is different for every user

const router = express.Router();

router.use(express.json()) // allows router to accept json

// use async bc bcrypt is async
router.post('/', userController.checkUser, userController.createUser, async (req, res) => {
  return res.redirect('/index');
});

router.get('/login', userController.checkLogin, async (req, res) => {
  // redirect to login page if information is incorrect
  if (!res.locals.isLoggedIn) {
    return res.status(200).redirect('/login')
  } else {
    return res.redirect('/index');
  }
});

module.exports = router;