import apiClient from './api';
import type { LoginCredentials, SignupCredentials, AuthResponse } from '../types';

/**
 * Authentication service for user login and signup
 */
const authService = {
    /**
     * Login user with email and password
     * @param credentials - User login credentials
     * @returns Promise with authentication response containing user, accessToken, and refreshToken
     */
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const response = await apiClient.post<{ data: AuthResponse }>('/api/auth/login', credentials);
        console.log('Login response:', response.data);
        return response.data.data;
    },

    /**
     * Register new user with username, email, and password
     * @param credentials - User signup credentials
     * @returns Promise with authentication response containing user, accessToken, and refreshToken
     */
    async signup(credentials: SignupCredentials): Promise<AuthResponse> {
        const response = await apiClient.post<{ data: AuthResponse }>('/api/auth/signup', credentials);
        return response.data.data;
    },
};

export default authService;
