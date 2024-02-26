require("dotenv").config();

const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY

const authenticateMiddleware = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]; // Extract token from Authorization header

  try {
    const decoded = jwt.verify(token, secretKey); // Verify token using secret key

    // Optionally, you can attach the decoded token to the request object for further processing
    req.decodedToken = decoded;

    next(); // Move to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' }); // Return 401 if token verification fails
  }
};

module.exports = authenticateMiddleware;
