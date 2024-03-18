export interface UserResponse {
  userData: UserData
  msg: string
  tokenMessage: string
}

export interface UserData {
  id: number
  name: string
  password: string
  cpf: string
  email: string
  phone: string
  active: boolean
  admin: boolean
  createdAt: string
  updatedAt: string
}

