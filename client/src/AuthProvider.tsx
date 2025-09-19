import { createContext, useContext, useEffect, useLayoutEffect, useState, ReactNode } from 'react';
import axios from 'axios';

interface AuthContextType {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return authContext;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Initially loading to check token
  /**
   * Attach the access token to all Axios requests via an interceptor.
   */
  useLayoutEffect(() => {
    const authInterceptor = axios.interceptors.request.use((config) => {
      if (!config.headers) {
        config.headers = new axios.AxiosHeaders();
      }
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      config.withCredentials = true; // Ensure cookies are sent with requests
      return config;
    });

    return () => {
      axios.interceptors.request.eject(authInterceptor);
    };
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};