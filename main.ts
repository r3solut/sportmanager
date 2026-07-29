import express from 'express';
import { registerHandler, loginHandler } from './handlers/auth';
import { getLiveMatchesHandler } from './handlers/match';

const app = express();
const PORT = parseInt(process.env.PORT || '8080');

// Включаем чтение JSON в теле запросов
app.use(express.json());

// Настройка CORS заголовков для связи с iOS-приложением
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    next();
});

// Маршруты API (приведение типов к any временно уберет строгие конфликты Express)
app.post('/api/v1/auth/register', registerHandler as any);
app.post('/api/v1/auth/login', loginHandler as any);
app.get('/api/v1/matches/live', getLiveMatchesHandler as any);

app.listen(PORT, () => {
    console.log(`SportManager API running on port ${PORT}`);
});
