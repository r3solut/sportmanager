import { Request, Response } from 'express'; // Было 'hyper-express'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getLiveMatchesHandler = async (req: Request, res: Response) => {
    try {
        // Высокопроизводительный фетч Live-событий с использованием индексов PostgreSQL 16
        const matches = await prisma.match.findMany({
            where: { status: 'LIVE' },
            orderBy: { createdAt: 'desc' }
        });
        return res.json(matches);
    } catch (err) {
        return res.status(200).json({ error: 'Database error' });
    }
};
