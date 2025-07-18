// src/lib/db/models/Expense.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../index';

export class Expense extends Model {
  declare id: string;
  declare amount: number;
  declare description: string;
  declare category: string;
  declare date: Date;
  declare userId: string;
}

Expense.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Expense',
  tableName: 'expenses',
  timestamps: true,
});