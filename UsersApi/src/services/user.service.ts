import { ModelStatic, Optional } from 'sequelize';
import User from '../models/User.js';
import axios from 'axios';

import dotenv from 'dotenv';
import { TokenResponse } from '../types/token.js';
import { ResponseProps } from '../types/response.types.js';

dotenv.config();

class UserService {
  private model: ModelStatic<User>;

  constructor() {
    this.model = User;
    return this;
  }

  async findById(id: number): Promise<User> {
    const user = await this.model.findByPk(id);
    if (!user) throw new Error("User not found");
    return user;
  }

  async index(): Promise<User[]>{
    const users = await this.model.findAll({});
    return users
  }

  async store(data: Optional<User, 'id'>): Promise<User>{
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
      const user = await this.model.findOne({ where: { email: data.email } });
      if (!user) throw new Error("Invalid Email");
      if (!this.validUserIsActive(user)) throw new Error("User not active")
      if (!(await user.login(data.password))) throw new Error("Invalid email or password");

      const response = await axios.post(process.env.TOKEN_URL as string, {
        authorization: process.env.SECRET_TOKEN as string,
        userId: user.id,
      });

      const tokenResponse: ResponseProps<User> = response.data;
      if(!tokenResponse.data) throw new Error("Invalid Login");
      return tokenResponse.data;
  }
}

export default UserService;
