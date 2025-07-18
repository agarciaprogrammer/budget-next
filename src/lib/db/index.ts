// src/lib/db/index.ts
import { Sequelize } from 'sequelize';
import pg from 'pg';
import { databaseUrl } from './config';

const sequelize = new Sequelize(databaseUrl!, {
  dialect: 'postgres',
  logging: false,
  dialectModule: pg,
});

export default sequelize;