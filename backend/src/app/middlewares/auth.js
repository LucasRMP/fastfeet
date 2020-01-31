import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  const [bearer, token] = authHeader.split(' ');

  if (bearer !== 'Bearer') {
    return res.status(401).json({ error: 'Malformed token' });
  }

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    req.userId = decoded.id;
    req.isAdmin = decoded.admin;

    return next();
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      return res.status(401).json({ error: 'Invalid token', err });
    }
  }
};
