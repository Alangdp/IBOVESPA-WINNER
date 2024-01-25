import { ModelStatic, Optional } from 'sequelize';
import User from '../models/User.js';
import { resp } from '../utils/resp.js';
import axios from 'axios';

import dotenv from 'dotenv';
import { TokenResponse } from '../types/token.js';

dotenv.config();

class UserService {
  private model: ModelStatic<User>;

  constructor() {
    this.model = User;
    return this;
  }

  async findById(id: number): Promise<User | Resp> {
    try {
      const user = await this.model.findByPk(id);
      if (!user) return resp(404, 'User not found', null);
      return user;
    } catch (error: any) {
      return resp(500, error.message, null, error);
    }
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

  validUserIsActive(user: User) {
    if (user.active) return true;
    return false;
  }

  async login(data: any) {
    try {
      const user = await this.model.findOne({ where: { email: data.email } });
      if (!user) return resp(404, 'User not found', null);
      if (!this.validUserIsActive(user))
        return resp(403, 'User not active', null);
      if (!(await user.login(data.password)))
        return resp(400, 'Invalid password', null);

      const response = await axios.post(process.env.TOKEN_URL as string, {
        secretToken: process.env.SECRET_TOKEN as string,
        userId: user.id,
      });

      const tokenResponse: TokenResponse = response.data;
      return resp(200, 'User logged in', { user, token: tokenResponse });
    } catch (error: any) {
      console.log(error);
      return resp(500, error.message, null, error);
    }
  }
}

export default UserService;
