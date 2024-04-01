import axios from 'axios';
import dotenv from 'dotenv';
import { ResponseProps } from '../types/responses.type';
import { UserProps } from '../types/user.type';

dotenv.config();

const TOKEN_URL = process.env.TOKEN_URL as string;
const SECRET_TOKEN = process.env.SECRET_TOKEN as string;

export async function getUserIdByToken(token: string) {
  const response = await axios.post(`${TOKEN_URL}/token/user`, {
    authorization: SECRET_TOKEN,
    token,
  });

  const data: ResponseProps<UserProps> = response.data;
  return data.data?.id
}
