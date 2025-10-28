export enum RoomType {
  DEVELOPMENT = 'development',
  QA = 'qa',
  DEVOPS = 'devops',
  DESIGN = 'design'
}

export interface Room {
  id: string;
  name: string;
  type: RoomType;
  description: string;
  members: RoomMember[];
  project: Project;
  createdAt: Date;
  updatedAt: Date;
}

export interface RoomMember {
  userId: string;
  role: 'leader' | 'member' | 'mentor';
  joinedAt: Date;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: 'planning' | 'in-progress' | 'review' | 'completed';
  tasks: ProjectTask[];
  startDate: Date;
  endDate: Date;
}

export interface ProjectTask {
  id: string;
  title: string;
  description: string;
  assigneeId?: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate: Date;
}