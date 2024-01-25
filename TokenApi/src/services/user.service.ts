import { ModelStatic } from 'sequelize';
import User from '../model/User.js';
import { Response, resp } from '../utils/resp.js';

export class UserService {
  private model: ModelStatic<User>;

  constructor() {
    this.model = User;
    return this;
  }

  async getById(id: number) {
    const user = await this.model.findByPk(id);
    if (!user) return resp(400, 'User not found', null);
    return resp(200, 'User found', user);
  }
}
