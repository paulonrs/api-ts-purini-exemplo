import UserController from '../controllers/user/userController';
import UserService from '../services/userService';
import UserDal from '../db/dal/usersDal';

const userDal = new UserDal();
const userService = new UserService(userDal);
const userController = new UserController(userService);

export { userController };