import jwt from 'jsonwebtoken';
import axios from 'axios';
import User from '../models/User';

class TokenPersistence {
  private token: string | null = null;

  private static tokenCreate(user: User) {
    const token = process.env.SECRET_TOKEN as string;
    return jwt.sign({ id: user.id }, token, { expiresIn: '1d' });
  }

  static async genToken(user: User) {
    const token = TokenPersistence.tokenCreate(user);
  }

  public async getToken(): Promise<string | null> {
    if (this.token) {
      return this.token;
    }

    const response = await axios.post('/token');
    this.token = response.data.token;
    return this.token;
  }

  public async deleteToken(): Promise<void> {
    this.token = null;
  }
}
