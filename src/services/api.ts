import axios, { AxiosError } from 'axios';
import type { InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { getAccessToken, clearAuth } from '../utils/storage';

// Type for API error responses
interface ApiErrorResponse {
    message?: string;
}

// Store toast function reference to avoid circular dependency
let toastErrorFn: ((message: string) => void) | null = null;

export const setToastError = (fn: (message: string) => void) => {
    toastErrorFn = fn;
};

/**
 * Axios instance configured with base URL and default headers
 * Base URL defaults to http://localhost:3000 or uses VITE_API_URL environment variable
 */
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://task-management-app-backend-sajn.onrender.com',
    headers: { 'Content-Type': 'application/json' },
     withCredentials: true,
});


/**
 * Request interceptor to automatically attach access token to Authorization header
 */
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

/**
 * Response interceptor for global error handling
 * Handles various error scenarios with appropriate user feedback
 */
apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError<ApiErrorResponse>) => {
        // Network error (no response from server)
        if (!error.response) {
            const networkMessage = error.message === 'Network Error'
                ? 'Network error. Please check your internet connection.'
                : 'Unable to connect to the server. Please try again.';

            if (toastErrorFn) {
                toastErrorFn(networkMessage);
            }
            return Promise.reject(error);
        }

        const { status, data } = error.response;

        // Handle different HTTP status codes
        switch (status) {
            case 401:
                // Unauthorized - clear auth and redirect to login
                clearAuth();
                window.location.href = '/login';
                if (toastErrorFn) {
                    toastErrorFn('Session expired. Please log in again.');
                }
                break;

            case 403:
                // Forbidden
                if (toastErrorFn) {
                    toastErrorFn(data?.message || 'Access denied. You do not have permission to perform this action.');
                }
                break;

            case 404:
                // Not found
                if (toastErrorFn) {
                    toastErrorFn(data?.message || 'Resource not found.');
                }
                break;

            case 400:
                // Bad request - validation errors
                if (toastErrorFn) {
                    toastErrorFn(data?.message || 'Invalid request. Please check your input.');
                }
                break;

            case 500:
            case 502:
            case 503:
            case 504:
                // Server errors
                if (toastErrorFn) {
                    toastErrorFn(data?.message || 'Server error. Please try again later.');
                }
                break;

            default:
                // Other errors
                if (toastErrorFn) {
                    toastErrorFn(data?.message || 'An unexpected error occurred. Please try again.');
                }
        }

        return Promise.reject(error);
    }
);

export default apiClient;
