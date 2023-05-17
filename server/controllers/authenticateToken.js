const jwt = require('jsonwebtoken'); // Import JSON Web Token library

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']; // Get 'Authorization' header from request

  // If 'Authorization' header exists, split it on space character and take the second part (the token itself)
  const token = authHeader && authHeader.split(' ')[1];

  // If no token is provided, send 400  status and end the function
  if (token == null) return res.sendStatus(400);

  // Verify the provided token with the secret key
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    // If an error occurred (indicating invalid token), send 400 status and end the function
    if (err) return res.sendStatus(400);

    // If token is valid, attach decoded (user) to the request object
    req.user = user;

    // Pass control to the next middleware function in the stack
    next();
  });
}

module.exports = authenticateToken; // Export the function for use in other files
