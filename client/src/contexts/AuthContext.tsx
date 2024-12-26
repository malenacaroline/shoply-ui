import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { loginApi } from "../api/login";
import { AxiosError } from "axios";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loginError: string | null;
  setLoginError: (error: string | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: async () => {},
  logout: () => {},
  loginError: null,
  setLoginError: () => null,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    console.log("hello");
    setLoginError(null);
    console.log("loginError", loginError);
    try {
      const response = await loginApi(email, password);
      console.log(response, response)
      if (response.user) {
        localStorage.setItem("user", JSON.stringify(response.user));
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log("error", error);
      if (error instanceof AxiosError) {
        console.log("error.response", error.response);
        setLoginError(error.response?.data.message);
      } else {
        setLoginError("An unexpected error occurred");
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  const value = useMemo(
    () => ({
      isAuthenticated,
      login,
      logout,
      loginError,
      setLoginError
    }),
    [isAuthenticated, loginError]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
