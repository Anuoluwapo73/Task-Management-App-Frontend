import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import {
    setAccessToken,
    setRefreshToken,
    setUser as setStorageUser,
    getAccessToken,
    getUser as getStorageUser,
    clearAuth,
} from '../utils/storage';
import type { User, LoginCredentials, SignupCredentials } from '../types';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    signup: (credentials: SignupCredentials) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const isAuthenticated = user !== null;

    // Initialize authentication state on mount
    useEffect(() => {
        const token = getAccessToken();
        const storedUser = getStorageUser();

        if (token && storedUser) {
            setUser(storedUser);
        }

        setIsLoading(false);
    }, []);

    const login = async (credentials: LoginCredentials): Promise<void> => {
        const response = await authService.login(credentials);
        

        console.log(response)
        // Store tokens and user
        setAccessToken(response.accessToken);
        setRefreshToken(response.refreshToken);
        setStorageUser(response.user);
        
        // Update state
        setUser(response.user);
        
        // Redirect to dashboard
        navigate('/dashboard');
    };

    const signup = async (credentials: SignupCredentials): Promise<void> => {
        const response = await authService.signup(credentials);
        
        // Store tokens and user
        setAccessToken(response.accessToken);
        setRefreshToken(response.refreshToken);
        setStorageUser(response.user);
        
        // Update state
        setUser(response.user);
        
        // Redirect to dashboard
        navigate('/dashboard');
    };

    const logout = (): void => {
        // Clear tokens from storage
        clearAuth();
        
        // Reset state
        setUser(null);
    };

    const value: AuthContextType = {
        user,
        isAuthenticated,
        isLoading,
        login,
        signup,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
