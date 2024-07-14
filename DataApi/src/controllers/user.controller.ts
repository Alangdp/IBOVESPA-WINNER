import User from '../models/User.js';
import UserService from '../services/user.service.js';
import { NextFunction, Request, Response } from 'express';

import { ValidationErrorItem } from 'sequelize';
import { errorResponse, response } from '../utils/Responses.js';

class userController {
  async index(req: Request, res: Response, next: NextFunction) {
    const service = new UserService();

    try {
      const users: User[] = await service.index();
      return response<User[]>(res, { data: users, status: 200 });
    } catch (error: any) {
      console.log(error);
      return errorResponse(res, error);
    }
  }

  async turnToAdmin(req: Request, res: Response, next: NextFunction) {
    const service = new UserService();

    try {
      const userId = Number(req.params.userId);
      const user = await service.findById(userId);

      if (!user || !(user instanceof User)) {
        const status = 404;
        const message = 'Usuário não encontrado';
        return res.status(status).json({ message });
      }

      if (user.admin) {
        return response(res, { data: user, status: 200 });
      }

      user.admin = true;
      await user.save();

      return response(res, { data: user, status: 200 });
    } catch (error: any) {
      return errorResponse(res, error);
    }
  }

  async store(req: Request, res: Response, next: NextFunction) {
    const service = new UserService();

    try {
      const user: User = await service.store(req.body);
      return response(res, { data: user, status: 200 });
    } catch (error: any) {
      return errorResponse(res, error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const service = new UserService();

    try {
      const { token } = req.body;
      if (!token) throw new Error('Invalid Token');
      const userMock = await service.loginWithToken(String(token));
      const user = await service.findById(userMock.id);

      user.active = false;
      user.save();

      return response(res, { status: 200, data: user });
    } catch (error: any) {
      return errorResponse(res, error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const service = new UserService();
      const user = await service.login(req.body);
      return response(res, { status: 200, data: user });
    } catch (error: any) {
      return errorResponse(res, error);
    }
  }
}

export default new userController();
