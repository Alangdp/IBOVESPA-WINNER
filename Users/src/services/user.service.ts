import { ModelStatic, Optional } from 'sequelize';
import User from '../models/User.js';
import { resp } from '../utils/resp.js';

class UserService {
  private model: ModelStatic<User>;

  constructor() {
    this.model = User;
    return this;
  }

  async index() {
    try {
      const users = await this.model.findAll({});
      if (users.length === 0) return resp(404, 'Users not found', null);
      return resp(200, 'Users found', users);
    } catch (error: any) {
      return resp(500, error.message, null, error);
    }
  }

  async store(data: Optional<User, 'id'>) {
    try {
      const user = await this.model.create(data);
      return resp(201, 'User created', user);
    } catch (error: any) {
      console.log(error);
      return resp(500, error.message, null, error);
    }
  }

  async delete(email: string) {
    try {
      const user = await this.model.destroy({ where: { email } });
      if (user === 0) return resp(404, 'User not found', null);
      return resp(200, 'User deleted', user);
    } catch (error: any) {
      return resp(500, error.message, null, error);
    }
  }

  async login(data: any) {
    try {
      const user = await this.model.findOne({ where: { email: data.email } });
      if (!user) return resp(404, 'User not found', null);
      if (!(await user.login(data.password)))
        return resp(400, 'Invalid password', null);
      return resp(200, 'User logged in', user);
    } catch (error: any) {
      return resp(500, error.message, null, error);
    }
  }
}

export default UserService;
