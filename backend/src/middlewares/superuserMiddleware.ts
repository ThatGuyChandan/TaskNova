import { Response, NextFunction } from 'express';
import { AuthRequest } from './authMiddleware.js';

export const superuser = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user && req.user.isSuperUser) {
    next();
  } else {
    res.status(403).json({ message: 'Forbidden: Superuser access required' });
  }
};
