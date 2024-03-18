import express from 'express';
import { userController } from '../dependencies/userDependencies';

const router = express.Router();

router.get('/', userController.getAllUsers);
router.post('/login', userController.postLogin);
router.post('/singup', userController.postSingup);
router.get('/verifyExistEmail', userController.verifyExistEmail);
router.patch('/updatePassword', userController.updatePassword);
router.post(
  '/verifyCodeUpdatePassword',
  userController.verifyCodeUpdatePassword,
);
router.put('/updateUser', userController.updateUser);

export default router;
