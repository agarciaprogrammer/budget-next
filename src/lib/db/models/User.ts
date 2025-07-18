// src/lib/db/models/User.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../index';

export class User extends Model {
  declare id: string;
  declare email: string;
  declare name: string;
}

User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  timestamps: true,
});