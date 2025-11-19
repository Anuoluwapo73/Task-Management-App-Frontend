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
        const response = await apiClient.post<AuthResponse>('/api/auth/login', credentials);
        return response.data;
    },

    /**
     * Register new user with username, email, and password
     * @param credentials - User signup credentials
     * @returns Promise with authentication response containing user, accessToken, and refreshToken
     */
    async signup(credentials: SignupCredentials): Promise<AuthResponse> {
        const response = await apiClient.post<AuthResponse>('/api/auth/signup', credentials);
        return response.data;
    },
};

export default authService;
