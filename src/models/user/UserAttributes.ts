import { Optional } from "sequelize";

interface UserAttributes {
  user_id: number;
  name: string;
  email: string;
  password: string;
}

interface UserInputAttributes extends Optional<UserAttributes, 'user_id'> {}
interface UserOutputAttributes extends Required<UserAttributes> {}

export { UserAttributes, UserInputAttributes, UserOutputAttributes };