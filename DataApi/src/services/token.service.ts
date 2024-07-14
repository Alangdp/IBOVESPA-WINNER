import { ModelStatic } from 'sequelize';
import Token from '../models/Token.js';
import Utilities from '../utils/Utilities.js';
import UserService from './user.service.js';

export class TokenService {
  private model: ModelStatic<Token>;
  private userService: UserService;

  constructor() {
    this.model = Token;
    this.userService = new UserService();
    return this;
  }

  async generateToken(userId: number): Promise<Token> {
    const user = await this.model.findOne({ where: { user_id: userId } });
    if (user) this.deleteToken(user.token);

    const tokenData = Utilities.generateToken(16);
    const token = await this.model.create({
      token: tokenData,
      user_id: userId,
    });

    return token;
  }

  async getToken(token: string): Promise<Token> {
    const tokenData = await this.model.findOne({ where: { token } });
    if (!tokenData) throw new Error('Token not found');
    return tokenData;
  }

  async getUserByToken(token: string) {
    const tokenInstance = await this.model.findOne({ where: { token } });
    if (!tokenInstance) throw new Error('Invalid Token');
    return this.userService.findById(tokenInstance.user_id);
  }

  async getUserIdByToken(token: string) {
    const tokenInstance = await this.model.findOne({ where: { token } });
    if (!tokenInstance) throw new Error('Invalid Token');
    return tokenInstance.user_id;
  }

  async deleteToken(token: string): Promise<void> {
    await this.model.destroy({ where: { token } });
  }
}
