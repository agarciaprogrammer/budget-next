// src/lib/db/models/Income.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../index';

export class Income extends Model {
  declare id: string;
  declare amount: number;
  declare description: string;
  declare source: string;
  declare date: Date;
  declare userId: string;
}

Income.init({
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
  source: {
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
  modelName: 'Income',
  tableName: 'incomes',
  timestamps: true,
});