const express = require('express');
const path = require('path');
const app = express();
const authenticateToken = require('./controllers/authenticateToken');
const fridgeRouter = require('./routes/fridgeRouter');
const userRouter = require('./routes/auth');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const PORT = 3000;

// we need something to parse request body
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//request to router
app.use('/user', userRouter);
app.use('/fridge', authenticateToken, fridgeRouter);

//catch-all route handler for any requests

app.use((req, res) => res.status(404).send('This page does not exist'));

//express error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// start server

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = server;
