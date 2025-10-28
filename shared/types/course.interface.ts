export enum CourseStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived'
}

export enum CourseLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced'
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  level: CourseLevel;
  duration: number; // in minutes
  points: number;
  status: CourseStatus;
  thumbnail: string;
  sections: CourseSection[];
  prerequisites: string[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseSection {
  id: string;
  title: string;
  order: number;
  lessons: CourseLesson[];
}

export interface CourseLesson {
  id: string;
  title: string;
  type: 'video' | 'quiz' | 'assignment';
  content: string;
  duration: number;
  order: number;
  points: number;
}