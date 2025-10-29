// Leaderboard page
import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { supabase } from '@/lib/supabase';
import { Profile } from '@/types';
import { Trophy, Medal, Award } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export const Leaderboard: React.FC = () => {
  const { profile: currentUserProfile } = useAuth();
  const [leaderboard, setLeaderboard] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('total_points', { ascending: false })
      .limit(50);

    if (!error && data) {
      setLeaderboard(data);
    }
    setLoading(false);
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="text-yellow-500" size={24} />;
      case 2:
        return <Medal className="text-gray-400" size={24} />;
      case 3:
        return <Medal className="text-orange-600" size={24} />;
      default:
        return <Award className="text-gray-400" size={20} />;
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Loading leaderboard...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Leaderboard</h1>
        <p className="text-gray-600">Top learners by total points earned</p>
      </div>

      <Card>
        <div className="space-y-3">
          {leaderboard.map((profile, index) => {
            const rank = index + 1;
            const isCurrentUser = profile.id === currentUserProfile?.id;

            return (
              <div
                key={profile.id}
                className={`flex items-center justify-between p-4 rounded-lg ${
                  isCurrentUser ? 'bg-primary-50 border-2 border-primary-300' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-4 flex-1">
                  <div className="w-12 text-center">{getRankIcon(rank)}</div>
                  <div className="text-xl font-bold text-gray-700 w-12">#{rank}</div>
                  <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                    {profile.full_name?.[0] || profile.username[0].toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">
                      {profile.full_name || profile.username}
                      {isCurrentUser && (
                        <span className="ml-2 text-sm text-primary-600">(You)</span>
                      )}
                    </div>
                    <div className="text-sm text-gray-600">@{profile.username}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary-600">
                    {profile.total_points}
                  </div>
                  <div className="text-sm text-gray-600">points</div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};