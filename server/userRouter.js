const express = require('express'); 
const bcrypt = require('bcrypt'); // lets us hash our passwords

const userController = require('./controllers/userController.js');
// 2 steps: create a salt, use salt and pw to create hashed password
// salt is different for every user

const router = express.Router();

router.use(express.json()) // allows router to accept json

router.get('/', userController.getUser, (req, res) => {
  return res.status(200).json(res.locals.users);
}) // creating a route to get all users

// use async bc bcrypt is async
router.post('/', userController.checkUser, userController.createUser, async (req, res) => {
  return res.status(200).send('User doesnt exist');
})

router.get('/login', async (req, res) => {
  const user = users.find(user => user.name === req.body.name); 
  if (user === null) {
    return res.status(400).send('User or password is incorrect');
  }

  try {
    // compare both passwords using bcrypt.compare to prevent timing attacks
    // bcrypt.compare returns true or false
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send('Success');
    } else {
      res.send('Not allowed');
    };
  } catch {
    res.status(500).send();
  }
})

module.exports = router;