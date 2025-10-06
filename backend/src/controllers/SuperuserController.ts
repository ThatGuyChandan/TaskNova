import { Request, Response } from 'express';
import { toggleSuperuserView, superuserView } from '../config/superuser.js';

export const toggle = (req: Request, res: Response) => {
  const { password } = req.body;

  if (password === process.env.SUPERUSER_PASSWORD) {
    toggleSuperuserView();
    res.status(200).json({ superuserView });
  } else {
    res.status(401).json({ message: 'Invalid password' });
  }
};
