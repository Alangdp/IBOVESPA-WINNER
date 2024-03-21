import { NextFunction, Request, Response } from 'express';
import { TokenService } from '../services/token.service.js';
import User from '../model/User.js';
import { UserService } from '../services/user.service.js';

class TokenController {
  async store(req: Request, res: Response, next: NextFunction) {
    try {
      const tokenService = new TokenService();
      const { userId } = req.body;

      const { data, message, status } =
        await tokenService.generateToken(userId);
      return res.status(status).json({ message, data });
    } catch (error) {
      next(error);
    }
  }

  async getUserByToken(req: Request, res: Response, next: NextFunction) {
    try {
      const tokenService = new TokenService();
      const userService = new UserService();

      const { token } = req.body;
      const {
        data: Tokendata,
        message: TokenMessage,
        status: tokenStatus,
      } = await tokenService.getToken(token);
      if (tokenStatus !== 200)
        return res.status(tokenStatus).json({ msg: TokenMessage });

      const {
        data: userData,
        message: userMessage,
        status: userStatus,
      } = await userService.getById(Tokendata.user_id);
      if (userStatus !== 200) return res.status(userStatus).json({ data: userData });
      return res.status(userStatus).json({ data: userData, msg: userMessage});
    } catch (error) {
      console.log(error)
      next(error);
    }
  }
}

export default new TokenController();
