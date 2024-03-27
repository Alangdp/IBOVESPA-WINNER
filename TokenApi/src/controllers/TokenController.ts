import { NextFunction, Request, Response } from 'express';
import { TokenService } from '../services/token.service.js';
import User from '../model/User.js';
import { UserService } from '../services/user.service.js';
import { errorResponse, response } from '../utils/Responses.js';

class TokenController {
  async store(req: Request, res: Response, next: NextFunction) {
    const tokenService = new TokenService();

    try {
      const { userId } = req.body;

      const token = await tokenService.generateToken(userId);
      return response(res, {status: 200, data: token});
    } catch (error) {
      errorResponse(res, error);
    }
  }

  async getUserByToken(req: Request, res: Response, next: NextFunction) {
    const tokenService = new TokenService();
    const userService = new UserService();

    try {

      const { token } = req.body;
      const tokenInstance = await tokenService.getToken(token);
      const user = await userService.getById(tokenInstance.user_id);
      return response(res, {status: 200, data: user});
    } catch (error) {
      errorResponse(res, error);
    }
  }
}

export default new TokenController();
