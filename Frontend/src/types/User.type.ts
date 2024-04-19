export interface UserProps {
  id: number;
  name: string;
  email: string;
  password: string;
  cpf?: string;
  phone: string;
  active: boolean;
  admin: boolean;
  createdAt: Date;
  updatedAt: Date;
}