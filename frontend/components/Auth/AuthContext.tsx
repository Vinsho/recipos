import { AxiosInstance } from 'axios';
import { createContext } from 'react';

export interface AuthContextType {
    token: string|null;
    onLogin: (token: string) => void;
    onLogout: () => void;
    axiosInstance: AxiosInstance,
}

const AuthContext = createContext<AuthContextType|null>(null);

export default AuthContext;