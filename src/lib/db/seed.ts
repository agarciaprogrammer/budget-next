// src/lib/db/seed.ts
import { User, Expense, Income } from './models';

async function seedData() {
  try {
    // Crear usuario de prueba
    const user = await User.create({
      email: 'test@example.com',
      name: 'Test User',
    });

    // Crear expenses de prueba
    await Expense.create({
      amount: 50.00,
      description: 'Comida',
      category: 'Food',
      date: new Date('2024-07-01'),
      userId: user.id,
    });

    await Expense.create({
      amount: 100.00,
      description: 'Transporte',
      category: 'Transport',
      date: new Date('2024-07-02'),
      userId: user.id,
    });

    // Crear incomes de prueba
    await Income.create({
      amount: 2000.00,
      description: 'Salario',
      source: 'Job',
      date: new Date('2024-07-01'),
      userId: user.id,
    });

    console.log('✅ Datos de prueba creados');
  } catch (error) {
    console.error('❌ Error creando datos:', error);
  }
}

seedData();