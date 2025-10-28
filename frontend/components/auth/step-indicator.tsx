import { motion } from 'framer-motion';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const stepVariants = {
  active: {
    scale: 1.1,
    backgroundColor: '#6E00FF',
    transition: { duration: 0.3 }
  },
  inactive: {
    scale: 1,
    backgroundColor: '#E5E7EB',
    transition: { duration: 0.3 }
  },
  completed: {
    scale: 1,
    backgroundColor: '#00E0B8',
    transition: { duration: 0.3 }
  }
};

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center space-x-3 mb-8">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <motion.div
          key={index}
          variants={stepVariants}
          initial="inactive"
          animate={
            index === currentStep
              ? 'active'
              : index < currentStep
              ? 'completed'
              : 'inactive'
          }
          className="w-3 h-3 rounded-full"
        />
      ))}
    </div>
  );
}