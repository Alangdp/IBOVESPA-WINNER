export interface TokenResponse {
  message: string;
  data: Data;
}

export interface Data {
  token: Token;
}

export interface Token {
  id: number;
  token: string;
  user_id: number;
  updatedAt: string;
  createdAt: string;
}
