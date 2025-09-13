import express from 'express';
import { validateUser } from '../middlewares';
import jwt from 'jsonwebtoken';
import prisma from '../prisma';
import { passKey } from '../config';

const router = express.Router();

router.post('/login', validateUser, async (req: any, res: any) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.users.findFirst({
      where: { email, password },
      select: { id: true, name: true, email: true },
    });

    if (!user) return res.status(410).json({ msg: 'Incorrect Username or Password' });

    // keep the same JWT behavior as before (signing the email string)
    const token = jwt.sign(email, passKey);
    return res.status(200).json({ token, name: user.name });
  } catch (err: any) {
    console.error('POST /login error', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/signup', validateUser, async (req: any, res: any) => {
  try {
    const { email, name, password } = req.body;

    const existing = await prisma.users.findUnique({
      where: { email },
      select: { id: true },
    });

    if (existing) return res.status(410).json({ msg: 'User with same email address already present.' });

    await prisma.users.create({
      data: {
        email,
        name,
        password,
      },
    });

    const token = jwt.sign(email, passKey);
    return res.status(200).json({ token, name });
  } catch (err: any) {
    console.error('POST /signup error', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
