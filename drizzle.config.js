import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './lib/db/schema.js',
  out: './drizzle',
  dialect: 'mysql',
  dbCredentials: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'cafe_db',
    port: parseInt(process.env.DB_PORT || '3306'),
  },
});
