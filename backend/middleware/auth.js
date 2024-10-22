const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to authenticate the user based on the JWT token in the header
const auth = async (req, res, next) => {
  // Retrieve the token from the 'Authorization' header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user from the database using the ID from the decoded token
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ msg: 'User not found' });
    }

    // Attach user data to the request object
    req.user = user;
    next();
  } catch (err) {
    console.error('Token verification failed:', err.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// Middleware to ensure the user is authenticated and retrieve user information
const requireAuth = async (req, res, next) => {
  // Simplified to ensure it's consistent with token-based verification
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ msg: 'Authorization required' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.userId);
    if (!user) {
      return res.status(401).json({ msg: 'User not found' });
    }
    req.user = user;
    next();
  } catch (err) {
    console.error('Authorization check failed:', err.message);
    res.status(401).json({ msg: 'Please log in' });
  }
};

// Middleware to check the current user and attach user details to response locals
const checkUser = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decodedToken.userId);
      res.locals.user = user || null;
    } catch (err) {
      res.locals.user = null;
    }
  } else {
    res.locals.user = null;
  }
  next();
};

module.exports = { auth, requireAuth, checkUser };
