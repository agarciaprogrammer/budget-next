// src/lib/db/models/index.ts
import sequelize from '../index';
import { User } from './User';
import { Expense } from './Expense';
import { Income } from './Income';

// Relaciones
User.hasMany(Expense, { foreignKey: 'userId' });
User.hasMany(Income, { foreignKey: 'userId' });
Expense.belongsTo(User, { foreignKey: 'userId' });
Income.belongsTo(User, { foreignKey: 'userId' });

export { sequelize, User, Expense, Income };