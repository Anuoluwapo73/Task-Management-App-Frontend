import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import authService from '../services/authService';
import * as storage from '../utils/storage';

// Mock dependencies
vi.mock('../services/authService');
vi.mock('../utils/storage');
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => vi.fn(),
    };
});

describe('AuthContext', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        // Mock localStorage
        vi.mocked(storage.getAccessToken).mockReturnValue(null);
        vi.mocked(storage.getUser).mockReturnValue(null);
    });

    it('should initialize with no user when storage is empty', async () => {
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <BrowserRouter>
                <AuthProvider>{children}</AuthProvider>
            </BrowserRouter>
        );

        const { result } = renderHook(() => useAuth(), { wrapper });

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.user).toBeNull();
        expect(result.current.isAuthenticated).toBe(false);
    });

    it('should initialize with user when storage has valid token and user', async () => {
        const mockUser = {
            _id: '123',
            username: 'testuser',
            email: 'test@example.com',
        };

        vi.mocked(storage.getAccessToken).mockReturnValue('mock-token');
        vi.mocked(storage.getUser).mockReturnValue(mockUser);

        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <BrowserRouter>
                <AuthProvider>{children}</AuthProvider>
            </BrowserRouter>
        );

        const { result } = renderHook(() => useAuth(), { wrapper });

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.user).toEqual(mockUser);
        expect(result.current.isAuthenticated).toBe(true);
    });

    it('should handle login successfully', async () => {
        const mockUser = {
            _id: '123',
            username: 'testuser',
            email: 'test@example.com',
        };

        const mockAuthResponse = {
            message: 'Login successful',
            user: mockUser,
            accessToken: 'access-token',
            refreshToken: 'refresh-token',
        };

        vi.mocked(authService.login).mockResolvedValue(mockAuthResponse);

        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <BrowserRouter>
                <AuthProvider>{children}</AuthProvider>
            </BrowserRouter>
        );

        const { result } = renderHook(() => useAuth(), { wrapper });

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        await act(async () => {
            await result.current.login({ email: 'test@example.com', password: 'password' });
        });

        expect(authService.login).toHaveBeenCalledWith({
            email: 'test@example.com',
            password: 'password',
        });
        expect(storage.setAccessToken).toHaveBeenCalledWith('access-token');
        expect(storage.setRefreshToken).toHaveBeenCalledWith('refresh-token');
        expect(storage.setUser).toHaveBeenCalledWith(mockUser);
        expect(result.current.user).toEqual(mockUser);
        expect(result.current.isAuthenticated).toBe(true);
    });

    it('should handle signup successfully', async () => {
        const mockUser = {
            _id: '123',
            username: 'newuser',
            email: 'new@example.com',
        };

        const mockAuthResponse = {
            message: 'Signup successful',
            user: mockUser,
            accessToken: 'access-token',
            refreshToken: 'refresh-token',
        };

        vi.mocked(authService.signup).mockResolvedValue(mockAuthResponse);

        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <BrowserRouter>
                <AuthProvider>{children}</AuthProvider>
            </BrowserRouter>
        );

        const { result } = renderHook(() => useAuth(), { wrapper });

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        await act(async () => {
            await result.current.signup({
                username: 'newuser',
                email: 'new@example.com',
                password: 'password',
            });
        });

        expect(authService.signup).toHaveBeenCalledWith({
            username: 'newuser',
            email: 'new@example.com',
            password: 'password',
        });
        expect(storage.setAccessToken).toHaveBeenCalledWith('access-token');
        expect(storage.setRefreshToken).toHaveBeenCalledWith('refresh-token');
        expect(storage.setUser).toHaveBeenCalledWith(mockUser);
        expect(result.current.user).toEqual(mockUser);
        expect(result.current.isAuthenticated).toBe(true);
    });

    it('should handle logout successfully', async () => {
        const mockUser = {
            _id: '123',
            username: 'testuser',
            email: 'test@example.com',
        };

        vi.mocked(storage.getAccessToken).mockReturnValue('mock-token');
        vi.mocked(storage.getUser).mockReturnValue(mockUser);

        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <BrowserRouter>
                <AuthProvider>{children}</AuthProvider>
            </BrowserRouter>
        );

        const { result } = renderHook(() => useAuth(), { wrapper });

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.isAuthenticated).toBe(true);

        act(() => {
            result.current.logout();
        });

        expect(storage.clearAuth).toHaveBeenCalled();
        expect(result.current.user).toBeNull();
        expect(result.current.isAuthenticated).toBe(false);
    });
});
