const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models/inventoryModels');

const userController = {};

// Define  function to register a new user
userController.registerUser = async (req, res, next) => {
  try {
    // Hash the password using bcrypt. The '10' is the saltRounds, or the cost factor for the hashing function
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Insert the new user into the database. RETURNING * will return the data of the inserted row
    const text =
      'INSERT INTO users(username, password) VALUES($1, $2) RETURNING *';
    const values = [req.body.username, hashedPassword];
    const newUser = await db.query(text, values);

    // Save the new user to res.locals for further middleware to use
    res.locals.user = newUser.rows[0];
    return next();
  } catch (err) {
    // If an error occurs, pass it to the error handling middleware
    return next({
      log: 'Error in registerUser controller method',
      status: 400,
      message: 'Error while registering new user',
    });
  }
};

//  function to log a user in
userController.loginUser = async (req, res, next) => {
  try {
    // Get user with the given username
    const text = 'SELECT * FROM users WHERE username = $1';
    const values = [req.body.username];
    const user = await db.query(text, values);

    // If no user is found with this username, throw an error
    if (!user.rows.length) {
      throw new Error('No user found with this username');
    }

    // Check if the password is correct. bcrypt.compare will hash the provided password and compare it to the stored hash.
    const isMatch = await bcrypt.compare(
      req.body.password,
      user.rows[0].password
    );

    // If the passwords do not match, throw an error
    if (!isMatch) {
      throw new Error('Incorrect password');
    }

    // Create a JWT. The payload is the user's id, the secret key is stored in env, and it will expire in 1 hour
    const token = jwt.sign(
      { userId: user.rows[0]._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Save the token and the username to res.locals for further middleware to use
    res.locals.user = {
      token,
      user: user.rows[0].username,
    };

    return next();
  } catch (err) {
    // If an error occurs, pass it to the error handling middleware
    return next({
      log: 'Error in loginUser controller method',
      status: 400,
      message: { err: err.message },
    });
  }
};

module.exports = userController;
