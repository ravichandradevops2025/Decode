export enum UserRole {
  LEARNER = 'learner',
  REFERRER = 'referrer',
  SME = 'sme',
  ADMIN = 'admin'
}

export enum AuthProvider {
  EMAIL = 'email',
  GOOGLE = 'google',
  LINKEDIN = 'linkedin'
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  provider: AuthProvider;
  goals: UserGoal[];
  skills: Skill[];
  points: number;
  enrolledCourses: string[];
  completedCourses: string[];
  badges: string[];
  isOnboarded: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile extends Omit<User, 'id'> {
  bio?: string;
  linkedin?: string;
  github?: string;
  projectCount: number;
  referralCount: number;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface RegisterDTO extends LoginDTO {
  name: string;
}

export interface OnboardingDTO {
  role: UserRole;
  goals: UserGoal[];
  skills: string[];
}