import { Request, Response } from 'express';
import UserService from '../../services/userService';
import { UserOutputAttributes } from '../../models/user/UserAttributes';

interface UserControllerInterface {
  getAllUsers(req: Request, res: Response): Promise<void>;
}

export default UserControllerInterface;