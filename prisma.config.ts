import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  datasource: {
    // Система автоматически прочитает DATABASE_URL из вашего локального файла .env
    url: process.env.DATABASE_URL!,
  },
});
