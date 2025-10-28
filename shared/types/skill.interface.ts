export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: SkillLevel;
}

export enum SkillCategory {
  PROGRAMMING = 'programming',
  FRAMEWORK = 'framework',
  DATABASE = 'database',
  CLOUD = 'cloud',
  DEVOPS = 'devops',
  SOFT_SKILLS = 'soft-skills'
}

export enum SkillLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert'
}

// Predefined skills for selection
export const PREDEFINED_SKILLS: Skill[] = [
  {
    id: 'skill-1',
    name: 'JavaScript',
    category: SkillCategory.PROGRAMMING,
    level: SkillLevel.BEGINNER
  },
  {
    id: 'skill-2',
    name: 'React',
    category: SkillCategory.FRAMEWORK,
    level: SkillLevel.BEGINNER
  },
  {
    id: 'skill-3',
    name: 'Node.js',
    category: SkillCategory.FRAMEWORK,
    level: SkillLevel.BEGINNER
  }
];