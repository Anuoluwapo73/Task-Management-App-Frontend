// User type matching backend User model
export interface User {
    _id: string;
    username: string;
    email: string;
    bio?: string;
    profilePicture?: string;
}

// Authentication request types
export interface LoginCredentials {
    email: string;
    password: string;
}

export interface SignupCredentials {
    username: string;
    email: string;
    password: string;
}

// Authentication response type matching backend auth controller responses
export interface AuthResponse {
    message: string;
    user: User;
    accessToken: string;
    refreshToken: string;
}
