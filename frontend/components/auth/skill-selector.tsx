import { Skill, SkillCategory } from '../../../../shared/types/skill.interface';
import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

interface SkillSelectorProps {
  selectedSkills: string[];
  onSelect: (skillId: string) => void;
  skills: Skill[];
}

const categoryColors = {
  [SkillCategory.PROGRAMMING]: 'bg-blue-100 border-blue-500 text-blue-700',
  [SkillCategory.FRAMEWORK]: 'bg-purple-100 border-purple-500 text-purple-700',
  [SkillCategory.DATABASE]: 'bg-green-100 border-green-500 text-green-700',
  [SkillCategory.CLOUD]: 'bg-orange-100 border-orange-500 text-orange-700',
  [SkillCategory.DEVOPS]: 'bg-red-100 border-red-500 text-red-700',
  [SkillCategory.SOFT_SKILLS]: 'bg-yellow-100 border-yellow-500 text-yellow-700',
};

export function SkillSelector({ selectedSkills, onSelect, skills }: SkillSelectorProps) {
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<SkillCategory, Skill[]>);

  return (
    <div className="space-y-6">
      {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
        <div key={category} className="space-y-3">
          <h3 className="font-semibold text-lg text-gray-700">{category}</h3>
          <div className="flex flex-wrap gap-2">
            {categorySkills.map((skill) => (
              <motion.div
                key={skill.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge
                  onClick={() => onSelect(skill.id)}
                  className={`cursor-pointer px-3 py-1.5 text-sm transition-colors ${
                    selectedSkills.includes(skill.id)
                      ? 'bg-electric-indigo text-white'
                      : categoryColors[skill.category]
                  }`}
                >
                  {skill.name}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}