// TypeScript types for the application
export interface Profile {
  id: string;
  username: string;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  total_points: number;
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: string;
  title: string;
  description: string | null;
  thumbnail_url: string | null;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  points_reward: number;
  is_published: boolean;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface CourseModule {
  id: string;
  course_id: string;
  title: string;
  content: string | null;
  video_url: string | null;
  order_index: number;
  created_at: string;
}

export interface Quiz {
  id: string;
  course_id: string;
  title: string;
  passing_score: number;
  created_at: string;
}

export interface QuizQuestion {
  id: string;
  quiz_id: string;
  question: string;
  options: Array<{ text: string; is_correct: boolean }>;
  order_index: number;
  created_at: string;
}

export interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  status: 'in_progress' | 'completed';
  progress: number;
  enrolled_at: string;
  completed_at: string | null;
}

export interface PointsTransaction {
  id: string;
  user_id: string;
  amount: number;
  transaction_type: 'earned' | 'redeemed' | 'bonus' | 'referral';
  reference_type: string | null;
  reference_id: string | null;
  description: string | null;
  created_at: string;
}

export interface Redemption {
  id: string;
  user_id: string;
  item_name: string;
  points_cost: number;
  status: 'pending' | 'approved' | 'shipped' | 'rejected';
  shipping_address: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Referral {
  id: string;
  referrer_id: string;
  candidate_name: string;
  candidate_email: string;
  candidate_phone: string | null;
  job_title: string | null;
  company_name: string | null;
  status: 'submitted' | 'interviewing' | 'hired' | 'rejected';
  referral_code: string | null;
  points_awarded: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Room {
  id: string;
  name: string;
  description: string | null;
  project_type: string | null;
  max_participants: number;
  status: 'open' | 'in_progress' | 'completed';
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface RoomParticipant {
  id: string;
  room_id: string;
  user_id: string;
  role: 'owner' | 'member';
  joined_at: string;
  profile?: Profile;
}

export interface RoomMessage {
  id: string;
  room_id: string;
  user_id: string;
  message_type: 'chat' | 'standup' | 'task';
  content: string;
  metadata: any;
  created_at: string;
  profile?: Profile;
}

export interface Badge {
  id: string;
  name: string;
  description: string | null;
  icon_url: string | null;
  criteria: string | null;
  created_at: string;
}

export interface UserBadge {
  id: string;
  user_id: string;
  badge_id: string;
  earned_at: string;
  badge?: Badge;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string | null;
  type: string | null;
  reference_id: string | null;
  is_read: boolean;
  created_at: string;
}