'use client';

import { useState } from 'react';
import { AuthCard } from '@/components/auth/auth-card';
import { InputField } from '@/components/auth/input-field';
import { OAuthButton } from '@/components/auth/oauth-button';
import { Mail, Lock } from 'lucide-react';
import Link from 'next/link';

export default function SignInPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Signin data:', formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-slate-50 via-white to-primary/5">
      <AuthCard
        title="Welcome Back"
        subtitle="Sign in to continue your learning journey"
      >
        <div className="space-y-6">
          <div className="space-y-3">
            <OAuthButton provider="google" onClick={() => console.log('Google OAuth')}>
              Continue with Google
            </OAuthButton>
            <OAuthButton provider="linkedin" onClick={() => console.log('LinkedIn OAuth')}>
              Continue with LinkedIn
            </OAuthButton>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-slate-500">Or sign in with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              icon={Mail}
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e: any) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <InputField
              icon={Lock}
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e: any) => setFormData({ ...formData, password: e.target.value })}
              required
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-slate-300" />
                <span className="text-slate-600">Remember me</span>
              </label>
              <Link href="/auth/forgot-password" className="text-primary hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3.5 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-sm text-slate-600">
            Don't have an account?{' '}
            <Link href="/auth/signup" className="text-primary font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </AuthCard>
    </div>
  );
}
