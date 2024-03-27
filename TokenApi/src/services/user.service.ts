import { ModelStatic } from 'sequelize';
import User from '../model/User.js';

export class UserService {
  private model: ModelStatic<User>;

  constructor() {
    this.model = User;
    return this;
  }

  async getById(id: number) {
    const user = await this.model.findByPk(id);
    if(!user) throw new Error("User not found");
    return user;
  }
}
