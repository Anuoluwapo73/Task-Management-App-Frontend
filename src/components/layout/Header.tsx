import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../common/Button';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-lg border-b border-gray-200" role="banner">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end items-center h-16">
          {/* User Info and Logout */}
          <nav className="flex items-center gap-3 sm:gap-4" aria-label="User navigation">
            {user && (
              <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg shadow-sm" aria-live="polite">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {user.username}
                </span>
              </div>
            )}
            <Button
              variant="secondary"
              onClick={logout}
              className="text-sm shadow-md"
              aria-label="Logout from your account"
            >
              Logout
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};
