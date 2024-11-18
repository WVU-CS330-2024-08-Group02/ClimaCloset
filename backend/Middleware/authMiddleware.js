/**
 * authMiddleware.js
 * 
 * This middleware function checks for a valid JWT in the request cookies. 
 * If the token is valid, it allows access to the protected route; otherwise, 
 * it blocks access and returns an error.
 */

const jwt = require('jsonwebtoken');

/**
 * Middleware to protect routes by verifying JWT in cookies.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express middleware next function.
 * @returns {void} Calls next middleware or sends an error response if unauthorized.
 */
const authMiddleware = (req, res, next) => {
  // Get JWT from cookies
  const token = req.cookies.token;
  if (!token) return res.status(403).json({ error: 'Access denied' });

  try {
    // Verify the JWT and attach user information to the request object
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = authMiddleware;