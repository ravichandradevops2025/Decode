import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { signIn } from 'next-auth/react';
import { AuthCard } from '@/components/auth/auth-card';
import { InputField } from '@/components/auth/input-field';
import { OAuthButton } from '@/components/auth/oauth-button';
import { Button } from '@/components/ui/button';
import { setUser, setError } from '@/store/authSlice';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const error = searchParams.get('error');
    if (error) {
      dispatch(setError('Authentication failed. Please try again.'));
    }
  }, [searchParams, dispatch]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        dispatch(setError('Invalid credentials'));
      } else if (result?.ok) {
        router.push('/onboarding');
      }
    } catch (error) {
      dispatch(setError('An unexpected error occurred'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="min-h-screen flex items-center justify-center px-4"
    >
      <AuthCard
        title="Welcome back"
        subtitle="Log in to continue your learning journey"
      >
        <form onSubmit={handleLogin} className="space-y-6">
          <InputField
            label="Email address"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="Enter your email"
          />

          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="Enter your password"
          />

          <Button
            type="submit"
            className="w-full bg-electric-indigo hover:bg-electric-indigo/90"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Log in'}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <OAuthButton
              provider="google"
              onClick={() => signIn('google')}
              isLoading={isLoading}
            />
            <OAuthButton
              provider="linkedin"
              onClick={() => signIn('linkedin')}
              isLoading={isLoading}
            />
          </div>

          <div className="text-center">
            <Button
              variant="link"
              onClick={() => router.push('/signup')}
              className="text-electric-indigo hover:text-electric-indigo/90"
            >
              Don't have an account? Sign up
            </Button>
          </div>
        </form>
      </AuthCard>
    </motion.div>
  );
}