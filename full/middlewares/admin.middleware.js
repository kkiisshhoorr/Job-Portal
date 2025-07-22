// middlewares/admin.middleware.js
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const authenticateAdmin = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.secret_key);
    const user = await User.findById(decoded.userId);

    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    req.user = user; // attach user to request
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token', error: err.message });
  }
};