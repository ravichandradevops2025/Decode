'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Check, Mail, Lock, User, Sparkles } from 'lucide-react';
import { AuthCard } from '@/components/auth/auth-card';
import { InputField } from '@/components/auth/input-field';
import { OAuthButton } from '@/components/auth/oauth-button';
import { GoalSelector } from '@/components/auth/goal-selector';
import { SkillSelector } from '@/components/auth/skill-selector';
import { StepIndicator } from '@/components/auth/step-indicator';
import Link from 'next/link';

const TOTAL_STEPS = 4;

export default function SignUpPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    goals: [] as string[],
    skills: [] as string[],
  });

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    // TODO: Implement signup API call
    console.log('Signup data:', formData);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-slate-50 via-white to-primary/5">
      <div className="w-full max-w-2xl">
        {/* Step Indicator */}
        <StepIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />

        {/* Auth Card with Steps */}
        <AuthCard
          title={
            currentStep === 1
              ? 'Create Your Account'
              : currentStep === 2
              ? 'Choose Your Goals'
              : currentStep === 3
              ? 'Select Your Skills'
              : 'Welcome to Decode!'
          }
          subtitle={
            currentStep === 1
              ? 'Start your learning journey today'
              : currentStep === 2
              ? 'What do you want to achieve?'
              : currentStep === 3
              ? 'Tell us what you already know'
              : "You're all set! Let's get started"
          }
        >
          <AnimatePresence mode="wait" custom={currentStep}>
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                custom={currentStep}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* OAuth Buttons */}
                <div className="space-y-3">
                  <OAuthButton provider="google" onClick={() => console.log('Google OAuth')}>
                    Continue with Google
                  </OAuthButton>
                  <OAuthButton provider="linkedin" onClick={() => console.log('LinkedIn OAuth')}>
                    Continue with LinkedIn
                  </OAuthButton>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-slate-500">Or sign up with email</span>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  <InputField
                    icon={User}
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  <InputField
                    icon={Mail}
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  <InputField
                    icon={Lock}
                    type="password"
                    placeholder="Password (min. 8 characters)"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>

                <button
                  onClick={handleNext}
                  disabled={!formData.name || !formData.email || !formData.password}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
                >
                  Continue
                  <ChevronRight className="w-5 h-5" />
                </button>

                <p className="text-center text-sm text-slate-600">
                  Already have an account?{' '}
                  <Link href="/auth/signin" className="text-primary font-semibold hover:underline">
                    Sign in
                  </Link>
                </p>
              </motion.div>
            )}

            {/* Step 2: Goals */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                custom={currentStep}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <GoalSelector
                  selectedGoals={formData.goals}
                  onChange={(goals) => setFormData({ ...formData, goals })}
                />

                <div className="flex gap-3">
                  <button
                    onClick={handleBack}
                    className="flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-all duration-300"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={formData.goals.length === 0}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
                  >
                    Continue
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Skills */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                custom={currentStep}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <SkillSelector
                  selectedSkills={formData.skills}
                  onChange={(skills) => setFormData({ ...formData, skills })}
                />

                <div className="flex gap-3">
                  <button
                    onClick={handleBack}
                    className="flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-all duration-300"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={formData.skills.length === 0}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
                  >
                    Continue
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Completion */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                custom={currentStep}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="space-y-6 text-center"
              >
                <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-primary" />
                </div>

                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-700">Profile Complete</span>
                  </div>

                  <div className="space-y-2 py-4">
                    <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>{formData.goals.length} goals selected</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>{formData.skills.length} skills added</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleSubmit}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    Start Learning
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleBack}
                    className="text-sm text-slate-600 hover:text-primary transition-colors"
                  >
                    Go back to make changes
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </AuthCard>

        {/* Terms and Privacy */}
        {currentStep === 1 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-center text-xs text-slate-500"
          >
            By signing up, you agree to our{' '}
            <Link href="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </motion.p>
        )}
      </div>
    </div>
  );
}
