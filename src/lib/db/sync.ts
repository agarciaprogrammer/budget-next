// src/lib/db/sync.ts
import { sequelize } from './models';

async function syncDatabase() {
  try {
    await sequelize.sync({ force: true });
    console.log('✅ Base de datos sincronizada');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error sincronizando:', error);
    process.exit(1);
  }
}

syncDatabase();