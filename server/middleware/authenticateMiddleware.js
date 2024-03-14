require("dotenv").config();

const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY

const authenticateMiddleware = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  try {
    const decoded = jwt.verify(token, secretKey);

    req.decodedToken = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authenticateMiddleware;
