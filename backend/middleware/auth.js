const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Retrieve token from request headers

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use the same secret used to sign the token

    // Attach the decoded user (with _id and email) to request object
    req.user = decoded;

    next(); // Move to the next middleware or route handler
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = auth;


