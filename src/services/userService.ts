import UserFilter from '../models/user/UserFilter';
import UserDal from '../db/dal/usersDal';
import { generateToken, verifyToken } from '../authentication/jwt';
import {
  comparePassword,
  generateHash,
} from '../authentication/passwordCripto';
import { UserAttributes } from '../models/user/UserAttributes';

class UserService {
  private userDal: UserDal;
  constructor(userDal: UserDal) {
    this.userDal = userDal;
  }

  getAllUsers = async (filters: UserFilter) => {
    return await this.userDal.getAll(filters);
  };

  login = async (email: string, password: string) => {
    try {
      let user = await this.userDal.getByModel({ email });
      if (!user) {
        throw new Error('Não existe nenhuma conta com esse email.');
      }

      const passwordCompative: boolean = await comparePassword(
        password,
        user.password,
      );

      if (!passwordCompative) {
        throw new Error('Senha incorreta.');
      }

      return {
        accessToken: generateToken(user),
      };
    } catch (error: any) {
      throw new Error(error);
    }
  };

  singup = async (email: string, password: string, name: string) => {
    try {
      let userEmail = await this.userDal.getByModel({ email });

      if (userEmail) {
        throw new Error('Esse e-mail já está em uso.');
      }

      let user = await this.userDal.create({
        email,
        password: await generateHash(password),
        name,
      });
      return {
        accessToken: generateToken(user),
      };
    } catch (error: any) {
      throw new Error(error);
    }
  };

  getUser = async (email: string) => {
    const user = await this.userDal.getByModel({ email });
    if (!user) {
      throw new Error('E-mail não encontrado.');
    }
    return user;
  };

  updatePassword = async (email: string, password: string) => {
    try {
      let user = await this.userDal.getByModel({ email });

      if (!user) {
        throw new Error('E-mail não encontrado.');
      }

      let userPassordNew: Partial<UserAttributes> = {
        password: await generateHash(password),
      };

      let updatedUser = await this.userDal.update(user.user_id, userPassordNew);
      return {
        accessToken: generateToken(updatedUser),
      };
    } catch (error: any) {
      throw new Error(error);
    }
  };

  async verifyToken(authorization: string, user: UserFilter | null = null) {
    const decoded = verifyToken(authorization);
    if (!decoded) {
      throw new Error('Token inválido');
    }
    const userReturn = decoded as UserAttributes;

    if (user) {
      if (userReturn.email !== user.email) {
        throw new Error('Token inválido');
      }
    }

    const userDb = await this.userDal.getByModel({ email: userReturn.email });

    if (!userDb || userDb.user_id !== userReturn.user_id) {
      throw new Error('Token inválido');
    }
  }

  async verifyCodeUpdatePassword(email: string, code: string) {
    let user = await this.userDal.getByModel({ email });
    return generateToken(user);
  }
  async updateUser(userUpdate: UserFilter, email: string) {
    let user = await this.userDal.getByModel({ email });

    if (!user) {
      throw new Error('E-mail não encontrado.');
    }

    let updatedUser = await this.userDal.update(user.user_id, userUpdate);
    return {
      accessToken: generateToken(updatedUser),
    };
  }
}

export default UserService;
