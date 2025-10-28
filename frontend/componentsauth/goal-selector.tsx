import { useState } from 'react';
import { Briefcase, GraduationCap, Code, Rocket, TrendingUp, Users } from 'lucide-react';

interface GoalSelectorProps {
  selectedGoals: string[];
  onChange: (goals: string[]) => void;
}

const goals = [
  {
    id: 'career-change',
    label: 'Career Change',
    description: 'Transition to a new career path',
    icon: Rocket,
    color: 'bg-purple-100 text-purple-600 border-purple-200',
  },
  {
    id: 'upskill',
    label: 'Upskill',
    description: 'Enhance current skillset',
    icon: TrendingUp,
    color: 'bg-blue-100 text-blue-600 border-blue-200',
  },
  {
    id: 'get-job',
    label: 'Get a Job',
    description: 'Land my first or next role',
    icon: Briefcase,
    color: 'bg-green-100 text-green-600 border-green-200',
  },
  {
    id: 'learn-new-skill',
    label: 'Learn New Skill',
    description: 'Explore something new',
    icon: GraduationCap,
    color: 'bg-yellow-100 text-yellow-600 border-yellow-200',
  },
  {
    id: 'build-project',
    label: 'Build Projects',
    description: 'Create real-world applications',
    icon: Code,
    color: 'bg-pink-100 text-pink-600 border-pink-200',
  },
  {
    id: 'networking',
    label: 'Network',
    description: 'Connect with professionals',
    icon: Users,
    color: 'bg-indigo-100 text-indigo-600 border-indigo-200',
  },
];

export function GoalSelector({ selectedGoals, onChange }: GoalSelectorProps) {
  const toggleGoal = (goalId: string) => {
    if (selectedGoals.includes(goalId)) {
      onChange(selectedGoals.filter((g) => g !== goalId));
    } else {
      onChange([...selectedGoals, goalId]);
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">Select one or more goals (you can change these later)</p>
      <div className="grid grid-cols-2 gap-3">
        {goals.map((goal) => {
          const Icon = goal.icon;
          const isSelected = selectedGoals.includes(goal.id);

          return (
            <button
              key={goal.id}
              type="button"
              onClick={() => toggleGoal(goal.id)}
              className={`relative p-4 rounded-xl border-2 text-left transition-all duration-300 hover:scale-[1.02] ${
                isSelected
                  ? 'border-primary bg-primary/5 shadow-md'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex flex-col gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${goal.color} border`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">{goal.label}</h3>
                  <p className="text-xs text-slate-600">{goal.description}</p>
                </div>
              </div>
              {isSelected && (
                <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
