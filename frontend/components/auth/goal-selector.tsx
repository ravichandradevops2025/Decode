import { Goal, GoalCategory } from '../../../../shared/types/goal.interface';
import { motion } from 'framer-motion';
import { Card } from '../ui/card';

interface GoalSelectorProps {
  selectedGoals: string[];
  onSelect: (goalId: string) => void;
  goals: Goal[];
}

const categoryColors = {
  [GoalCategory.CAREER]: 'bg-blue-100 border-blue-500 text-blue-700',
  [GoalCategory.SKILLS]: 'bg-purple-100 border-purple-500 text-purple-700',
  [GoalCategory.CERTIFICATION]: 'bg-green-100 border-green-500 text-green-700',
  [GoalCategory.PROJECT]: 'bg-orange-100 border-orange-500 text-orange-700',
};

export function GoalSelector({ selectedGoals, onSelect, goals }: GoalSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {goals.map((goal) => (
        <motion.div
          key={goal.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Card
            onClick={() => onSelect(goal.id)}
            className={`cursor-pointer p-4 border-2 transition-colors ${
              selectedGoals.includes(goal.id)
                ? 'border-electric-indigo bg-electric-indigo/5'
                : 'border-transparent hover:border-gray-200'
            }`}
          >
            <div className="space-y-2">
              <span className={`inline-block px-2 py-1 rounded text-sm ${categoryColors[goal.category]}`}>
                {goal.category}
              </span>
              <h3 className="font-semibold text-lg">{goal.name}</h3>
              <p className="text-gray-600 text-sm">{goal.description}</p>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}