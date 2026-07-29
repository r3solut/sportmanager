"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLiveMatchesHandler = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getLiveMatchesHandler = async (req, res) => {
    try {
        // Высокопроизводительный фетч Live-событий с использованием индексов PostgreSQL 16
        const matches = await prisma.match.findMany({
            where: { status: 'LIVE' },
            orderBy: { createdAt: 'desc' }
        });
        return res.json(matches);
    }
    catch (err) {
        return res.status(500).json({ error: 'Database error' });
    }
};
exports.getLiveMatchesHandler = getLiveMatchesHandler;
