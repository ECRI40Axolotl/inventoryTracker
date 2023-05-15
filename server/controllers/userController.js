const db = require('../models/inventoryModels');
const format = require('pg-format');
const bcrypt = require('bcrypt'); // lets us hash our passwords

const userController = {};

userController.getUser = async (req, res, next) => {
  console.log('In getUser middleware');
  const sqlQuery = 'SELECT * FROM users';
  const obj = await db.query(sqlQuery);
  res.locals.users = obj.rows;
  return next();
}

userController.checkUser = async (req, res, next) => {
  try { 
    console.log('In checkUser middleware');
    const { username } = req.body;
    console.log('username: ', username);
    const sqlQuery = 'SELECT username FROM users WHERE username=$1'
    const foundUser = await db.query(sqlQuery, [username]);
    console.log('foundUser: ', foundUser.rows);
    if (foundUser.rows[0]) {
      res.redirect('/login')
    } else {
      return next();
    }
  } catch (err) {
    return next({
      log: 'Error in checkUser controller method',
      status: 400,
      message: 'Error while checking user',
    });
  }
}

userController.createUser = async (req, res, next) => {
    try {
        console.log('In createUser middleware');
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        console.log('pw :', hashedPassword);
        const user = [req.body.username, hashedPassword];
        // setup a query
        console.log('user: ', user);
        const addQuery = 'INSERT INTO users (username, password) VALUES ($1, $2)';
        await db.query(addQuery, user);
        return next();
      } catch (err) {
        return next({
          log: 'Error in userController.createUser method',
          status: 400,
          message: 'Error while creating user',
        });
      }
}

userController.checkLogin = async (req, res, next) => {
  // query to get the req.body.username
  // query to get the user password
  try {
    console.log('In checkLogin');
    const { username, password } = req.body;
    const loginQuery = 'SELECT username, password FROM users WHERE username=$1';
    const dbPW = await db.query(loginQuery, [username]);
    console.log('dbPW: ', dbPW.rows);
    if (!dbPW.rows[0].username && await bcrypt.compare(password, dbPW.rows[0].password)) {
      res.locals.isLoggedIn = true;
      return next();
    } else {
      // redirect to login page
      res.locals.isLoggedIn = false;
    };
    return next();
  } catch (err) {
    return next({
      log: 'Error in userController.checkLogin method',
      status: 400,
      message: 'Username or Password is incorrect',
    });
  }
}

module.exports = userController;