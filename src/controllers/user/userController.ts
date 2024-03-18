import { Request, Response } from 'express';
import UserService from '../../services/userService';
import UserFilter from '../../models/user/UserFilter';
import UserControllerInterface from './UserControllerInterface';
import { returnStatus } from '../../helpers/api_retorn';

class UserController implements UserControllerInterface {
  userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  getAllUsers = async (req: Request, res: Response) => {
    const filter = this.getFilterFromRequest(req);
    const users = await this.userService.getAllUsers(filter);
    res.send(users);
  };

  postLogin = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await this.userService.login(email, password);
      res.status(returnStatus.Success).send(user);
    } catch (error: any) {
      res.status(returnStatus.BadRequest).send({ error: error.message });
    }
  };

  postSingup = async (req: Request, res: Response) => {
    try {
      const { email, password, name } = req.body;
      const user = await this.userService.singup(email, password, name);
      res.status(returnStatus.Success).send(user);
    } catch (error: any) {
      res.status(returnStatus.BadRequest).send({ error: error.message });
    }
  };

  verifyExistEmail = async (req: Request, res: Response) => {
    try {
      const filter = this.getFilterFromRequest(req);

      if (!filter.email) {
        return res
          .status(returnStatus.BadRequest)
          .send('E-mail não informado.');
      }

      const user = await this.userService.getUser(filter.email);
      return res.status(returnStatus.Success).send(user);
    } catch (error: any) {
      res.status(returnStatus.BadRequest).send({ error: error.message });
    }
  };

  updatePassword = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const authorization = req.headers['authorization'];

      const userRequest = {
        email: email?.toString(),
        password: password?.toString(),
      };

      this.validatorToken(authorization, userRequest);

      const user = await this.userService.updatePassword(email, password);
      res.status(returnStatus.Success).send(user);
    } catch (error: any) {
      res.status(returnStatus.BadRequest).send({ error: error.message });
    }
  };

  verifyCodeUpdatePassword = async (req: Request, res: Response) => {
    try {
      const { email, code } = req.query;
      if (!email || !code) {
        throw new Error('E-mail ou código não informado.');
      }

      const authorization = await this.userService.verifyCodeUpdatePassword(
        email.toString(),
        code.toString(),
      );
      res.status(returnStatus.Success).send(authorization);
    } catch (error: any) {
      res.status(returnStatus.BadRequest).send({ error: error.message });
    }
  };

  updateUser = async (req: Request, res: Response) => {
    try {
      const { name, email, password, newEmail } = req.body;
      const authorization = req.headers['authorization'];

      if (!email) throw new Error('E-mail não informado.');

      const user = {
        email: email?.toString(),
      };

      this.validatorToken(authorization, user);

      const userUpdate = {
        name: name?.toString(),
        email: newEmail?.toString(),
        password: password?.toString(),
      };

      const newToken = await this.userService.updateUser(
        userUpdate,
        email.toString(),
      );
      res.status(returnStatus.Success).send(newToken);
    } catch (error: any) {
      res.status(returnStatus.BadRequest).send({ error: error.message });
    }
  };

  private getFilterFromRequest(req: Request): UserFilter {
    const { name, email } = req.query;
    let filter: UserFilter = {};

    if (name) {
      filter.name = name.toString();
    }

    if (email) {
      filter.email = email.toString();
    }

    return filter;
  }

  private async validatorToken(
    authorization: string | undefined,
    user: UserFilter,
  ) {
    try {
      if (!authorization) throw new Error('Token não informado.');
      return await this.userService.verifyToken(authorization, user);
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export default UserController;
