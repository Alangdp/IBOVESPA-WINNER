import { ModelStatic } from 'sequelize';
import Token from '../model/Token.js';
import { generateToken } from '../utils/Utilities.js';

export class TokenService {
  private model: ModelStatic<Token>;

  constructor() {
    this.model = Token;
    return this;
  }

  async generateToken(userId: number) {
    const user = await this.model.findOne({ where: { user_id: userId } });
    if (user) this.deleteToken(user.token);

    const tokenData = generateToken(16);
    const token = await this.model.create({
      token: tokenData,
      user_id: userId,
    });

    return token
  }

  async getToken(token: string) {
    const tokenData = await this.model.findOne({ where: { token } });
    if (!tokenData) throw new Error("Token not found");
    return tokenData;
  }

  async deleteToken(token: string): Promise<void> {
    await this.model.destroy({ where: { token } });
  }
}
