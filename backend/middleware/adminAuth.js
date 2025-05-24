import jwt from 'jsonwebtoken';

const adminAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization token missing or malformed' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }

    // Replace 'your_jwt_secret' with your actual secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');

    // You can attach decoded user info to request here
    req.user = decoded;

    next();
  } catch (err) {
    console.error('JWT error:', err);
    res.status(401).json({ message: 'Invalid token' });
  }
};

export default adminAuth;
