import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded; 

    
    const targetUserId = req.params.id || req.body.userId;
    if (targetUserId && decoded.userId !== targetUserId) {
      return res.status(403).json({ message: 'Unauthorized: You can only modify your own data.' });
    }

    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
};