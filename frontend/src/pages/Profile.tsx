// User profile / Skill Passport page
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { Profile, UserBadge, Enrollment, Referral } from '@/types';
import { Award, BookOpen, Users, Share2 } from 'lucide-react';
import toast from 'react-hot-toast';

export const ProfilePage: React.FC = () => {
  const { username } = useParams<{ username?: string }>();
  const { user, profile: currentUserProfile } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [badges, setBadges] = useState<UserBadge[]>([]);
  const [completedCourses, setCompletedCourses] = useState<Enrollment[]>([]);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);

  const isOwnProfile = !username || profile?.username === currentUserProfile?.username;

  useEffect(() => {
    fetchProfileData();
  }, [username, user]);

  const fetchProfileData = async () => {
    let profileData: Profile | null = null;

    if (username) {
      // Fetch by username
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', username)
        .single();
      profileData = data;
    } else if (user) {
      // Fetch own profile
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      profileData = data;
    }

    if (!profileData) {
      toast.error('Profile not found');
      setLoading(false);
      return;
    }

    setProfile(profileData);

    // Fetch badges
    const { data: badgesData } = await supabase
      .from('user_badges')
      .select('*, badge:badges(*)')
      .eq('user_id', profileData.id);

    setBadges(badgesData || []);

    // Fetch completed courses
    const { data: coursesData } = await supabase
      .from('enrollments')
      .select('*, course:courses(*)')
      .eq('user_id', profileData.id)
      .eq('status', 'completed');

    setCompletedCourses(coursesData || []);

    // Fetch referrals (only if own profile)
    if (isOwnProfile) {
      const { data: referralsData } = await supabase
        .from('referrals')
        .select('*')
        .eq('referrer_id', profileData.id)
        .order('created_at', { ascending: false });

      setReferrals(referralsData || []);
    }

    setLoading(false);
  };

  const handleShare = () => {
    const url = `${window.location.origin}/u/${profile?.username}`;
    navigator.clipboard.writeText(url);
    toast.success('Profile link copied to clipboard!');
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Loading profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Profile not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Profile Header */}
      <Card className="mb-8">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-24 h-24 bg-primary-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {profile.full_name?.[0] || profile.username[0].toUpperCase()}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{profile.full_name}</h1>
              <p className="text-gray-600">@{profile.username}</p>
              {profile.bio && <p className="text-gray-700 mt-2">{profile.bio}</p>}
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-primary-600">
              {profile.total_points}
            </div>
            <div className="text-sm text-gray-600">Total Points</div>
            <button
              onClick={handleShare}
              className="mt-4 flex items-center text-sm text-primary-600 hover:text-primary-700"
            >
              <Share2 size={16} className="mr-1" />
              Share Profile
            </button>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <BookOpen className="text-primary-600" size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {completedCourses.length}
              </div>
              <div className="text-sm text-gray-600">Courses Completed</div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <Award className="text-primary-600" size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{badges.length}</div>
              <div className="text-sm text-gray-600">Badges Earned</div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <Users className="text-primary-600" size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{referrals.length}</div>
              <div className="text-sm text-gray-600">Referrals Made</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Badges */}
      {badges.length > 0 && (
        <Card className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Badges</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {badges.map((userBadge) => (
              <div
                key={userBadge.id}
                className="text-center p-4 border rounded-lg hover:border-primary-300 transition-colors"
              >
                <div className="text-4xl mb-2">{userBadge.badge?.icon_url}</div>
                <div className="font-medium text-gray-900">{userBadge.badge?.name}</div>
                <div className="text-xs text-gray-600 mt-1">
                  {userBadge.badge?.description}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Completed Courses */}
      {completedCourses.length > 0 && (
        <Card>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Completed Courses</h2>
          <div className="space-y-3">
            {completedCourses.map((enrollment: any) => (
              <div
                key={enrollment.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div>
                  <div className="font-medium text-gray-900">
                    {enrollment.course?.title}
                  </div>
                  <div className="text-sm text-gray-600">
                    Completed {new Date(enrollment.completed_at).toLocaleDateString()}
                  </div>
                </div>
                <div className="text-primary-600 font-medium">
                  +{enrollment.course?.points_reward} pts
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};