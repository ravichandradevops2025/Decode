import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between max-w-md mx-auto">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center flex-1">
            {/* Step Circle */}
            <div className="relative flex items-center justify-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                  step < currentStep
                    ? 'bg-primary text-white'
                    : step === currentStep
                    ? 'bg-primary text-white scale-110 shadow-lg'
                    : 'bg-slate-200 text-slate-400'
                }`}
              >
                {step < currentStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span>{step}</span>
                )}
              </div>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="flex-1 h-0.5 mx-2">
                <div
                  className={`h-full transition-all duration-300 ${
                    step < currentStep ? 'bg-primary' : 'bg-slate-200'
                  }`}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Step Labels */}
      <div className="flex items-center justify-between max-w-md mx-auto mt-3">
        <span className={`text-xs font-medium ${currentStep >= 1 ? 'text-primary' : 'text-slate-400'}`}>
          Account
        </span>
        <span className={`text-xs font-medium ${currentStep >= 2 ? 'text-primary' : 'text-slate-400'}`}>
          Goals
        </span>
        <span className={`text-xs font-medium ${currentStep >= 3 ? 'text-primary' : 'text-slate-400'}`}>
          Skills
        </span>
        <span className={`text-xs font-medium ${currentStep >= 4 ? 'text-primary' : 'text-slate-400'}`}>
          Done
        </span>
      </div>
    </div>
  );
}
