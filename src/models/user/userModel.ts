import { DataTypes, Model } from 'sequelize';
import { UserAttributes, UserInputAttributes } from './UserAttributes';
import sequelizeDatabase from '../../../config/database';

class User extends Model<UserAttributes, UserInputAttributes> implements UserAttributes {
  public user_id!: number;
  public name!: string;
  public email!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  static initUserModel() {
    return User.init(
      {
        user_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        name: {
          allowNull: false,
          type: DataTypes.STRING
        },
        email: {
          allowNull: false,
          type: DataTypes.STRING
        },
        password: {
          allowNull: false,
          type: DataTypes.STRING
        }
      },
      {
        sequelize: sequelizeDatabase,
        modelName: 'User',
        tableName: 'users',
        timestamps: true,
        paranoid: true
      }
    );
  }
}

export default User;
