// src/lib/db/config.ts
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

export const databaseUrl = process.env.DATABASE_URL;