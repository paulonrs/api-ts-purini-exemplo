import { Op } from 'sequelize';
import { UserInputAttributes, UserOutputAttributes } from '../../models/user/UserAttributes'
import UserFilter from '../../models/user/UserFilter'
import User from '../../models/user/userModel'
import UserDalInterface from  './interface/UserDalInterface';

class UserDal implements UserDalInterface {
	create = async (payload: UserInputAttributes): Promise<UserOutputAttributes> => {
		const user = await User.create(payload);
		return user;
	}
	
	update = async (id: number, payload: Partial<UserInputAttributes>): Promise<UserOutputAttributes> => {
		const user = await User.findByPk(id);
		if (!user) {
				throw new Error('Usuário não encontrado');
		}
		const updatedUser = await (user as User).update(payload);
		return updatedUser;
	}
	
	getById = async (id: number): Promise<UserOutputAttributes> => {
		const user = await User.findByPk(id);
		if (!user) {
				throw new Error('Usuário não encontrado')
		}
		return user;
	}
    
	deleteById = async (user_id: number): Promise<boolean> => {
		const deletedUserCount = await User.destroy({
				where: {
					user_id: user_id
				}
		});
		return !!deletedUserCount;
	}
	
	getAll = async (filters?: UserFilter): Promise<UserOutputAttributes[]> => {
		let queryOptions: any = {};
		queryOptions.attributes = ['name', 'email']

		if (filters) {
			queryOptions.where = {};

			if (filters.name) {
				queryOptions.where.name = { [Op.iLike]: `%${filters.name}%` };
			}

			if (filters.email) {
				queryOptions.where.email = { [Op.iLike]: `%${filters.email}%` };
			}
		}

		return User.findAll(queryOptions);
	}

	getByModel = async (UserFilter: UserFilter): Promise<UserOutputAttributes | null> => {
		let user = await User.findOne({
			where: {
				...UserFilter
			},
		});
		return user;
	}
}

export default UserDal;