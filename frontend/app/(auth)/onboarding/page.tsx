import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import confetti from 'canvas-confetti';
import { AuthCard } from '@/components/auth/auth-card';
import { StepIndicator } from '@/components/auth/step-indicator';
import { GoalSelector } from '@/components/auth/goal-selector';
import { SkillSelector } from '@/components/auth/skill-selector';
import { Button } from '@/components/ui/button';
import { setUser } from '@/store/authSlice';
import { PREDEFINED_GOALS } from '../../../../shared/types/goal.interface';
import { PREDEFINED_SKILLS } from '../../../../shared/types/skill.interface';
import { UserRole } from '../../../../shared/types/user.interface';

const steps = [
  { id: 1, title: 'Choose your goals' },
  { id: 2, title: 'Select your role' },
  { id: 3, title: 'Pick your skills' },
  { id: 4, title: 'Review & Complete' },
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function OnboardingPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedRole, setSelectedRole] = useState<UserRole>();
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    try {
      const response = await fetch('/api/auth/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          goals: selectedGoals,
          role: selectedRole,
          skills: selectedSkills,
        }),
      });

      if (response.ok) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });

        const data = await response.json();
        dispatch(setUser(data.user));
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Onboarding failed:', error);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            key="goals"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <GoalSelector
              goals={PREDEFINED_GOALS}
              selectedGoals={selectedGoals}
              onSelect={(goalId) => {
                setSelectedGoals((prev) =>
                  prev.includes(goalId)
                    ? prev.filter((id) => id !== goalId)
                    : [...prev, goalId]
                );
              }}
            />
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="role"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {Object.values(UserRole).map((role) => (
              <Button
                key={role}
                variant={selectedRole === role ? 'default' : 'outline'}
                onClick={() => setSelectedRole(role)}
                className="p-6 text-lg"
              >
                {role}
              </Button>
            ))}
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="skills"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <SkillSelector
              skills={PREDEFINED_SKILLS}
              selectedSkills={selectedSkills}
              onSelect={(skillId) => {
                setSelectedSkills((prev) =>
                  prev.includes(skillId)
                    ? prev.filter((id) => id !== skillId)
                    : [...prev, skillId]
                );
              }}
            />
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            key="review"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <div>
              <h3 className="font-semibold mb-2">Selected Goals</h3>
              <ul className="list-disc list-inside">
                {selectedGoals.map((goalId) => (
                  <li key={goalId}>
                    {PREDEFINED_GOALS.find((g) => g.id === goalId)?.name}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Selected Role</h3>
              <p>{selectedRole}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Selected Skills</h3>
              <ul className="list-disc list-inside">
                {selectedSkills.map((skillId) => (
                  <li key={skillId}>
                    {PREDEFINED_SKILLS.find((s) => s.id === skillId)?.name}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="min-h-screen flex items-center justify-center px-4 py-12"
    >
      <AuthCard
        title={steps[currentStep - 1].title}
        subtitle="Let's personalize your learning journey"
      >
        <div className="space-y-8">
          <StepIndicator currentStep={currentStep - 1} totalSteps={steps.length} />

          {renderStep()}

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              Back
            </Button>

            <Button
              onClick={handleNext}
              disabled={
                (currentStep === 1 && selectedGoals.length === 0) ||
                (currentStep === 2 && !selectedRole) ||
                (currentStep === 3 && selectedSkills.length === 0)
              }
            >
              {currentStep === steps.length ? 'Complete' : 'Next'}
            </Button>
          </div>
        </div>
      </AuthCard>
    </motion.div>
  );
}