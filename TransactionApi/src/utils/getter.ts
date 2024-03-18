import axios from 'axios';
import { resp } from './resp';
import dotenv from 'dotenv';
import { UserResponse } from '../types/user.type';

dotenv.config();

const TOKEN_URL = process.env.TOKEN_URL as string;
const SECRET_TOKEN = process.env.SECRET_TOKEN as string;

export async function getUserIdByToken(token: string) {
  try {
    const response = await axios.post(`${TOKEN_URL}/token/user`, {
      authorization: SECRET_TOKEN,
      token,
    });

    const data: UserResponse = response.data;
    return data.userData.id
  } catch (error: any) {
    return null;
  }
}
