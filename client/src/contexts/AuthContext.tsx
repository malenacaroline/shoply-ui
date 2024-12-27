import { createContext, useContext, useState, useMemo } from "react";
import { loginApi } from "../api/login";
import { AxiosError } from "axios";
import { User } from "../types";

interface AuthContextType {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loginError: string | null;
  setLoginError: (error: string | null) => void;
  user: User | null;
}

const AuthContext = createContext<AuthContextType>({
  login: async () => {},
  logout: () => {},
  loginError: null,
  setLoginError: () => null,
  user: null,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loginError, setLoginError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(
    JSON.parse(localStorage.getItem("user") ?? "null")
  );

  const login = async (email: string, password: string) => {
    setLoginError(null);
    try {
      const response = await loginApi(email, password);
      if (response.user) {
        setUser(response.user);
        localStorage.setItem("user", JSON.stringify(response.user));
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setLoginError(error.response?.data.message);
      } else {
        setLoginError("An unexpected error occurred");
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setLoginError(null);
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      loginError,
      setLoginError,
    }),
    [user, loginError]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
