import { Request, Response } from 'express';
import { superuserState, setSuperuserView } from '../config/superuser.js';

export const toggle = (req: Request, res: Response) => {
  const { password } = req.body;

  // If a password is provided, it's an attempt to turn ON
  if (password) {
    if (password === process.env.SUPERUSER_PASSWORD) {
      setSuperuserView(true);
      return res.status(200).json({ superuserView: true });
    } else {
      return res.status(403).json({ message: 'Invalid password' });
    }
  }

  // If no password is provided, it's a request to turn OFF
  setSuperuserView(false);
  return res.status(200).json({ superuserView: false });
};
