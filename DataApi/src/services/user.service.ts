import { ModelStatic, Optional } from 'sequelize';
import User from '../models/User.js';
import axios from 'axios';

import dotenv from 'dotenv';
import { TokenResponse } from '../types/token';
import { ResponseProps } from '../types/responses.type.js';
import { TokenService } from './token.service.js';

dotenv.config();

class UserService {
  private model: ModelStatic<User>;

  constructor() {
    this.model = User;
    return this;
  }

  async findById(id: number): Promise<User> {
    const user = await this.model.findByPk(id);
    if (!user) throw new Error('User not found');
    return user;
  }

  async index(): Promise<User[]> {
    const users = await this.model.findAll({});
    return users;
  }

  async store(data: Optional<User, 'id'>): Promise<User> {
    const user = await this.model.create(data);
    return user;
  }

  async delete(id: number) {
    const user = await this.model.destroy({ where: { id } });
    if (user === 0) throw new Error('Invalid or non-existent id');
    return user;
  }

  validUserIsActive(user: User) {
    if (user.active) return true;
    return false;
  }

  async loginWithToken(token: string): Promise<User> {
    const response = await axios.post(`${process.env.TOKEN_URL!}user`, {
      authorization: process.env.SECRET_TOKEN as string,
      token,
    });

    const user: { data?: User; msg: string } = response.data;
    if (!user.data) throw new Error('Invalid token');

    return user.data;
  }

  async login(data: User) {
    const tokenService = new TokenService();
    const user = await this.model.findOne({ where: { email: data.email } });
    if (!user) throw new Error('Invalid Email');
    if (!this.validUserIsActive(user)) throw new Error('User not active');
    if (!(await user.login(data.password)))
      throw new Error('Invalid email or password');

    const token = await tokenService.generateToken(user.id);
    return token;
  }
}

export default UserService;
