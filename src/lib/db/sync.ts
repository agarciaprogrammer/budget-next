// src/lib/db/sync.ts
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { sequelize, User, Expense, Income } from './models';

async function syncDatabase() {
  try {
    console.log(' Sincronizando base de datos...');
    
    // Sincronizar todas las tablas
    await sequelize.sync({ force: true });
    console.log('✅ Tablas creadas correctamente');
    
    // Crear usuario por defecto
    const defaultUser = await User.create({
      email: 'temp@user.com',
      name: 'Usuario Temporal',
    });
    console.log('✅ Usuario por defecto creado');
    
    // Crear algunos datos de ejemplo
    await Expense.bulkCreate([
      {
        amount: 1500,
        description: 'Alquiler',
        category: 'Vivienda',
        date: new Date(),
        userId: defaultUser.id,
      },
      {
        amount: 300,
        description: 'Supermercado',
        category: 'Alimentación',
        date: new Date(),
        userId: defaultUser.id,
      },
      {
        amount: 200,
        description: 'Gasolina',
        category: 'Transporte',
        date: new Date(),
        userId: defaultUser.id,
      },
    ]);
    
    await Income.bulkCreate([
      {
        amount: 5000,
        description: 'Salario',
        source: 'Trabajo',
        date: new Date(),
        userId: defaultUser.id,
      },
      {
        amount: 500,
        description: 'Freelance',
        source: 'Proyectos',
        date: new Date(),
        userId: defaultUser.id,
      },
    ]);
    
    console.log('✅ Datos de ejemplo creados');
    console.log('🎉 Base de datos configurada completamente');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error sincronizando:', error);
    process.exit(1);
  }
}

syncDatabase();