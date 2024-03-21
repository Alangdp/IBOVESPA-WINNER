import axios from "axios";

import dotenv from "dotenv";

dotenv.config();

const TOKEN_URL = process.env.TOKEN_URL as string;
const SECRET_TOKEN = process.env.SECRET_TOKEN as string;

export class Token {
  static async getUserId(token: string) {
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
}