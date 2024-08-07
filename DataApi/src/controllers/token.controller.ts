import { RequestHandler } from 'express';
import { TokenService } from '../services/token.service.js';
import UserService from '../services/user.service.js';
import { errorResponse, response } from '../utils/Responses.js';

const store: RequestHandler = async (req, res, next) => {
  const tokenService = new TokenService();
  try {
    const { userId } = req.body;
    const token = await tokenService.generateToken(userId);
    return response(res, { status: 200, data: token });
  } catch (error) {
    errorResponse(res, error);
  }
};

const getUserByToken: RequestHandler = async (req, res, next) => {
  const tokenService = new TokenService();
  const userService = new UserService();
  try {
    const { token } = req.body;
    const tokenInstance = await tokenService.getToken(token);
    const user = await userService.findById(tokenInstance.user_id);
    return response(res, { status: 200, data: user });
  } catch (error) {
    console.log(error);
    errorResponse(res, error);
  }
};

export { store, getUserByToken };
