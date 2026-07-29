// Файл: backend/prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Начало заполнения базы данных матчами...');

  // Очищаем старые матчи, чтобы не было дубликатов при повторном запуске
  await prisma.match.deleteMany({});

  // Добавляем матч 1
  await prisma.match.create({
    data: {
      homeTeam: 'Real Madrid',
      awayTeam: 'Manchester City',
      homeScore: 2,
      awayScore: 1,
      status: 'LIVE',
      minute: 64,
      winPredProb: 74.50, // Шанс победы Реала по мнению ИИ
      oddHome: 1.85,
      oddDraw: 3.60,
      oddAway: 4.20,
    },
  });

  // Добавляем матч 2
  await prisma.match.create({
    data: {
      homeTeam: 'PSG',
      awayTeam: 'Bayern Munich',
      homeScore: 0,
      awayScore: 0,
      status: 'LIVE',
      minute: 12,
      winPredProb: 48.20,
      oddHome: 2.30,
      oddDraw: 3.40,
      oddAway: 2.90,
    },
  });

  console.log('✅ База данных успешно наполнена LIVE-матчами!');
}

main()
  .catch((e) => {
    console.error('Ошибка заполнения базы:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
