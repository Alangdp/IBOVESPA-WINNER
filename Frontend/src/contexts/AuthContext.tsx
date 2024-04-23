import React, { createContext, useContext, useEffect, useState } from "react";
import LocalStorage from "@/Utils/LocalStorage";
import { UserProps } from "@/types/User.type";

export const AuthContext = createContext<{
  token: string | undefined;
  user: UserProps | null;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  setUser: (user: UserProps | null) => void;
  updateToken: (token: string) => void; 
  setTokenIntern: (token: string | null) => void; 
  logout: () => void
}>({
  token: "",
  user: null,
  setToken: () => {},
  setUser: () => {},
  updateToken: () => {}, 
  setTokenIntern: () => {}, 
  logout: () => {}, 
});

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const localStorageToken = new LocalStorage<string>({ key: "userToken" });
  // ? const localStorageUser = new LocalStorage<UserProps>({ key: "userData" });

  const userToken = localStorageToken.get();
  // ? const userData = localStorageUser.get();

  const [token, setToken] = useState<string>(typeof userToken === 'string' ? userToken : "");
  const [user, setUser] = useState<UserProps | null>(null);

  const setTokenIntern = (token: string | null ) => {
    const localStorageToken = new LocalStorage<string>({ key: "userToken" });
    localStorageToken.set(token);
  };

  const updateToken = (token: string) => {
    setToken(token);
    setTokenIntern(token);
  };

  const logout = () => {
    setToken("");
    setTokenIntern("");
  };

  useEffect( () => {
    updateToken(token);
  }, [token])

  return (
    <AuthContext.Provider value={{ token, user, setToken, setUser, updateToken, setTokenIntern, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
