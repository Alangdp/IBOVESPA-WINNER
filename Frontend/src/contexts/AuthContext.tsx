import React, { createContext, useContext, useState } from "react";
import LocalStorage from "@/Utils/LocalStorage";
import { UserProps } from "@/types/User.type";

export const AuthContext = createContext<{
  token: string | undefined;
  user: UserProps | null;
  setToken: (token: string) => void;
  setUser: (user: UserProps | null) => void;
}>({
  token: "",
  user: null,
  setToken: () => {},
  setUser: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const localStorageToken = new LocalStorage<string>({ key: "userToken" });
  // const localStorageUser = new LocalStorage<UserProps>({ key: "userData" });

  const userToken = localStorageToken.get();
  // const userData = localStorageUser.get();

  const [token, setToken] = useState<string>(typeof userToken === 'string' ? userToken : "");
  const [user, setUser] = useState<UserProps | null>(null);

  return (
    <AuthContext.Provider value={{ token, user, setToken, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export const setToken = (token: string) => {
  const localStorageToken = new LocalStorage<string>({ key: "userToken" });
  localStorageToken.addItem(token);
}

export default AuthProvider;
