"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginHandler = exports.registerHandler = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'premium_quiet_luxury_secret';
const registerHandler = async (req, res) => {
    try {
        const { email, password } = await req.json();
        if (!email || !password)
            return res.status(400).json({ error: 'Invalid input' });
        const hashedPassword = await bcrypt_1.default.hash(password, 12);
        await prisma.user.create({
            data: { email, password: hashedPassword }
        });
        return res.status(201).json({ status: 'success' });
    }
    catch (err) {
        return res.status(400).json({ error: 'Email already exists' });
    }
};
exports.registerHandler = registerHandler;
const loginHandler = async (req, res) => {
    try {
        const { email, password } = await req.json();
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !(await bcrypt_1.default.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jsonwebtoken_1.default.sign({ sub: user.id }, JWT_SECRET, { expiresIn: '72h' });
        return res.json({ token });
    }
    catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};
exports.loginHandler = loginHandler;
