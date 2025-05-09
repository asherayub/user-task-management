import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

type UserType = "admin" | "user";

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  userType: UserType | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [userType, setUserType] = useState<UserType | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserType = localStorage.getItem("userType") as UserType | null;
    if (storedToken && storedUserType) {
      setToken(storedToken);
      setUserType(storedUserType);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (username: string, password: string) => {
    //hardcoded credentials
    if (username === "admin" && password === "123") {
      const fakeToken = "fake-jwt-token";
      const userType: UserType = "admin";
      localStorage.setItem("token", fakeToken);
      localStorage.setItem("userType", userType);
      setToken(fakeToken);
      setUserType(userType);
      setIsAuthenticated(true);
    } else if (username === "user" && password === "123") {
      const fakeToken = "fake-jwt-token";
      const userType: UserType = "user";
      localStorage.setItem("token", fakeToken);
      localStorage.setItem("userType", userType);
      setToken(fakeToken);
      setUserType(userType);
      setIsAuthenticated(true);
    } else {
      throw new Error("Invalid credentials");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    setToken(null);
    setUserType(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, token, userType, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
