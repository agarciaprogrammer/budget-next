// src/lib/db/index.ts
import { Sequelize } from 'sequelize';
import pg from 'pg';
import { databaseUrl } from './config';

if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  logging: false,
  dialectModule: pg,
});

export default sequelize;