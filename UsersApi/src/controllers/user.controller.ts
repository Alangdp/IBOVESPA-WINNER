import { th } from '@faker-js/faker';
import UserService from '../services/user.service.js';
import { NextFunction, Request, Response } from 'express';

class userController {
  async index(req: Request, res: Response, next: NextFunction) {
    const service = new UserService();

    try {
      const { status, message, data } = await service.index();
      res.status(status).json({ message, data });
    } catch (error) {
      next(error);
    }
  }
  async store(req: Request, res: Response, next: NextFunction) {
    const service = new UserService();

    try {
      const { status, message, data } = await service.store(req.body);
      res.status(status).json({ message, data });
    } catch (error) {
      next(error);
    }
  }
  async update(req: Request, res: Response) {}

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const service = new UserService();
      const { status, message, data } = await service.delete(req.body.email);
      res.status(status).json({ message, data });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      // get auth header value
      console.log(req.headers.authorization?.split(' ')[1]);
      const service = new UserService();
      const { status, message, data } = await service.login(req.body);
      res.status(status).json({ message, data });
    } catch (error) {
      next(error);
    }
  }
}

export default new userController();
