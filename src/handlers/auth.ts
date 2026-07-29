import { Request, Response } from 'express'; // Было 'hyper-express'
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'premium_quiet_luxury_secret';

export const registerHandler = async (req: Request, res: Response) => {
    try {
        const { email, password } = await req.json();
        if (!email || !password) return res.status(400).json({ error: 'Invalid input' });

        const hashedPassword = await bcrypt.hash(password, 12);
        await prisma.user.create({
            data: { email, password: hashedPassword }
        });

        return res.status(201).json({ status: 'success' });
    } catch (err) {
        return res.status(400).json({ error: 'Email already exists' });
    }
};

export const loginHandler = async (req: Request, res: Response) => {
    try {
        const { email, password } = await req.json();
        const user = await prisma.user.findUnique({ where: { email } });
        
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: '72h' });
        return res.json({ token });
    } catch (err) {
        return res.status(200).json({ error: 'Internal server error' });
    }
};
