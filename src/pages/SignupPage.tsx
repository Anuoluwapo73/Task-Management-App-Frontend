import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { Input, Button } from '../components/common';
import { signupSchema, type SignupFormData } from '../utils/validation';

export const SignupPage: React.FC = () => {
  const { signup } = useAuth();
  const { showError } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    setIsSubmitting(true);
    try {
      await signup(data);
      // Navigation is handled by AuthContext
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Signup failed. Please try again.';
      showError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <main id="main-content" className="max-w-md w-full space-y-8" role="main">
        <header>
          <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
            >
              sign in to existing account
            </Link>
          </p>
        </header>

        <form 
          className="mt-8 space-y-6" 
          onSubmit={handleSubmit(onSubmit)}
          aria-label="Signup form"
          noValidate
        >
          <div className="space-y-4">
            <Input
              id="username"
              label="Username"
              type="text"
              autoComplete="username"
              placeholder="Enter your username"
              error={errors.username?.message}
              required
              aria-required="true"
              {...register('username')}
            />

            <Input
              id="email"
              label="Email address"
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              error={errors.email?.message}
              required
              aria-required="true"
              {...register('email')}
            />

            <Input
              id="password"
              label="Password"
              type="password"
              autoComplete="new-password"
              placeholder="Enter your password"
              error={errors.password?.message}
              required
              aria-required="true"
              {...register('password')}
            />
          </div>

          <div>
            <Button
              type="submit"
              variant="primary"
              className="w-full"
              isLoading={isSubmitting}
              disabled={isSubmitting}
              aria-label={isSubmitting ? 'Creating account...' : 'Create your account'}
            >
              Sign up
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};
