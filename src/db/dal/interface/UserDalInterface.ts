import { UserInputAttributes, UserOutputAttributes } from '../../../models/user/UserAttributes'
import UserFilter from '../../../models/user/UserFilter'

interface UserDalInterface {
  getAll(filters?: UserFilter): Promise<UserOutputAttributes[]>;
  create(payload: UserInputAttributes): Promise<UserOutputAttributes>;
  update(user_id: number, payload: UserInputAttributes): Promise<UserOutputAttributes | null>;
  deleteById(user_id: number): Promise<boolean>;
}

export default UserDalInterface;