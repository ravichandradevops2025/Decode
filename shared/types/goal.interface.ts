export interface Goal {
  id: string;
  name: string;
  description: string;
  category: GoalCategory;
  timeframe: GoalTimeframe;
}

export interface UserGoal {
  goalId: string;
  progress: number;
  startedAt: Date;
  completedAt?: Date;
}

export enum GoalCategory {
  CAREER = 'career',
  SKILLS = 'skills',
  CERTIFICATION = 'certification',
  PROJECT = 'project'
}

export enum GoalTimeframe {
  SHORT_TERM = 'short-term',    // 1-3 months
  MEDIUM_TERM = 'medium-term',  // 3-6 months
  LONG_TERM = 'long-term'       // 6+ months
}

// Predefined goals for selection
export const PREDEFINED_GOALS: Goal[] = [
  {
    id: 'goal-1',
    name: 'Full Stack Developer',
    description: 'Master full stack development with modern technologies',
    category: GoalCategory.CAREER,
    timeframe: GoalTimeframe.MEDIUM_TERM
  },
  {
    id: 'goal-2',
    name: 'Cloud Certification',
    description: 'Obtain AWS/Azure certification',
    category: GoalCategory.CERTIFICATION,
    timeframe: GoalTimeframe.SHORT_TERM
  },
  {
    id: 'goal-3',
    name: 'Open Source Project',
    description: 'Contribute to or lead an open source project',
    category: GoalCategory.PROJECT,
    timeframe: GoalTimeframe.LONG_TERM
  }
];