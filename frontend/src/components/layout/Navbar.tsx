// Navigation bar component
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Users, Trophy, Gift, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { signOut } from '@/lib/supabase';
import toast from 'react-hot-toast';

export const Navbar: React.FC = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error('Failed to sign out');
    } else {
      toast.success('Signed out successfully');
      navigate('/');
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">D</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Decode</span>
          </Link>

          {/* Navigation Links */}
          {user && (
            <div className="hidden md:flex items-center space-x-6">
              <Link
                to="/courses"
                className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors"
              >
                <BookOpen size={20} />
                <span>Courses</span>
              </Link>
              <Link
                to="/rooms"
                className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors"
              >
                <Users size={20} />
                <span>Decode Rooms</span>
              </Link>
              <Link
                to="/leaderboard"
                className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors"
              >
                <Trophy size={20} />
                <span>Leaderboard</span>
              </Link>
              <Link
                to="/rewards"
                className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors"
              >
                <Gift size={20} />
                <span>Rewards</span>
              </Link>
            </div>
          )}

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">
                    {profile?.total_points || 0} pts
                  </span>
                </div>
                <Link to="/profile">
                  <Button variant="outline" size="sm">
                    <User size={16} className="mr-1" />
                    Profile
                  </Button>
                </Link>
                <Button variant="secondary" size="sm" onClick={handleSignOut}>
                  <LogOut size={16} className="mr-1" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};