import { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SkillSelectorProps {
  selectedSkills: string[];
  onChange: (skills: string[]) => void;
}

const popularSkills = [
  'JavaScript',
  'Python',
  'React',
  'Node.js',
  'TypeScript',
  'Java',
  'SQL',
  'AWS',
  'Docker',
  'Git',
  'MongoDB',
  'REST API',
  'GraphQL',
  'HTML/CSS',
  'Next.js',
  'Express.js',
  'PostgreSQL',
  'Kubernetes',
  'DevOps',
  'Agile',
];

export function SkillSelector({ selectedSkills, onChange }: SkillSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [customSkill, setCustomSkill] = useState('');

  const filteredSkills = popularSkills.filter((skill) =>
    skill.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      onChange(selectedSkills.filter((s) => s !== skill));
    } else {
      onChange([...selectedSkills, skill]);
    }
  };

  const addCustomSkill = () => {
    if (customSkill.trim() && !selectedSkills.includes(customSkill.trim())) {
      onChange([...selectedSkills, customSkill.trim()]);
      setCustomSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    onChange(selectedSkills.filter((s) => s !== skill));
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">
        Select your current skills or add custom ones
      </p>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search skills..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
        />
      </div>

      {/* Selected Skills */}
      {selectedSkills.length > 0 && (
        <div className="flex flex-wrap gap-2 p-4 bg-slate-50 rounded-xl border border-slate-200">
          {selectedSkills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-lg text-sm font-medium"
            >
              {skill}
              <button
                onClick={() => removeSkill(skill)}
                className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Popular Skills */}
      <div>
        <h4 className="text-sm font-semibold text-slate-700 mb-3">Popular Skills</h4>
        <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto p-1">
          {filteredSkills.map((skill) => {
            const isSelected = selectedSkills.includes(skill);
            return (
              <button
                key={skill}
                type="button"
                onClick={() => toggleSkill(skill)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 ${
                  isSelected
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white border border-slate-200 text-slate-700 hover:border-primary/30'
                }`}
              >
                {skill}
              </button>
            );
          })}
        </div>
      </div>

      {/* Add Custom Skill */}
      <div className="pt-4 border-t border-slate-200">
        <h4 className="text-sm font-semibold text-slate-700 mb-3">Add Custom Skill</h4>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter skill name"
            value={customSkill}
            onChange={(e) => setCustomSkill(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addCustomSkill()}
            className="flex-1 px-4 py-2.5 border border-slate-200 rounded-lg bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
          />
          <button
            type="button"
            onClick={addCustomSkill}
            disabled={!customSkill.trim()}
            className="px-6 py-2.5 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
