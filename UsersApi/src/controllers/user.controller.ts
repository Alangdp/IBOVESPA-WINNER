import User from '../models/User.js';
import UserService from '../services/user.service.js';
import { NextFunction, Request, Response } from 'express';

class userController {
  async index(req: Request, res: Response, next: NextFunction) {
    const service = new UserService();

    try {
      const { status, message, data } = await service.index();
      res.status(status).json({ message, data });
    } catch (error: any) {
      next(error);
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

      user.admin = true;
      await user.save();

      const status = 200;
      const message = 'Usuário promovido a administrador com sucesso';
      const data = { user };

      res.status(status).json({ message, data });
    } catch (error: any) {
      next(error);
    }
  }

  async store(req: Request, res: Response, next: NextFunction) {
    const service = new UserService();

    try {
      const { status, message, data } = await service.store(req.body);
      res.status(status).json({ message, data });
    } catch (error: any) {
      next(error);
    }
  }
  async update(req: Request, res: Response) {}

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.body 
      const service = new UserService();
      const { status, message, data } = await service.delete(id);
      res.status(status).json({ message, data });
    } catch (error: any) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const service = new UserService();
      const { status, message, data } = await service.login(req.body);
      res.status(status).json({ message, data });
    } catch (error: any) {
      console.log(error, 1321312);
      next(error);
    }
  }
}

export default new userController();
