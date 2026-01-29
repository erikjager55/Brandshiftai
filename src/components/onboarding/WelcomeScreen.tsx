import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import {
  ArrowRight,
  Hexagon,
  Microscope,
  PenTool,
  Circle,
  Sparkles,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

interface WelcomeScreenProps {
  firstName?: string;
  onGetStarted?: () => void;
  onSkip?: () => void;
}

interface ValueProp {
  icon: any;
  title: string;
  description: string;
  color: string;
}

interface OnboardingStep {
  label: string;
  duration: string;
}

const valueProps: ValueProp[] = [
  {
    icon: Hexagon,
    title: 'Build Your Foundation',
    description: 'Define brand assets with AI assistance',
    color: 'text-blue-600 dark:text-blue-400',
  },
  {
    icon: Microscope,
    title: 'Validate with Research',
    description: 'Back decisions with real data',
    color: 'text-purple-600 dark:text-purple-400',
  },
  {
    icon: PenTool,
    title: 'Create Content',
    description: 'Generate on-brand content instantly',
    color: 'text-primary',
  },
];

const onboardingSteps: OnboardingStep[] = [
  { label: 'Your brand profile', duration: '~2 min' },
  { label: 'Target audience', duration: '~3 min' },
  { label: 'First brand asset', duration: '~5 min' },
];

// Confetti particle component
const ConfettiParticle = ({ delay, x, color }: { delay: number; x: number; color: string }) => {
  return (
    <motion.div
      className="absolute top-0 w-2 h-2 rounded-full"
      style={{
        left: `${x}%`,
        backgroundColor: color,
      }}
      initial={{ y: -20, opacity: 0, rotate: 0 }}
      animate={{
        y: [0, 100, 200],
        opacity: [0, 1, 0],
        rotate: [0, 360],
      }}
      transition={{
        duration: 2,
        delay,
        ease: 'easeOut',
      }}
    />
  );
};

// Confetti animation overlay
const ConfettiAnimation = () => {
  const colors = ['#1FD1B2', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444'];
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    delay: Math.random() * 0.5,
    x: Math.random() * 100,
    color: colors[Math.floor(Math.random() * colors.length)],
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {particles.map((particle) => (
        <ConfettiParticle
          key={particle.id}
          delay={particle.delay}
          x={particle.x}
          color={particle.color}
        />
      ))}
    </div>
  );
};

export function WelcomeScreen({
  firstName = 'there',
  onGetStarted,
  onSkip,
}: WelcomeScreenProps) {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Hide confetti after animation completes
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8 relative overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti && <ConfettiAnimation />}

      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-purple-500/5 blur-3xl" />
      </div>

      {/* Main Content */}
      <motion.div
        className="w-full max-w-2xl space-y-12 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header with Logo */}
        <div className="text-center space-y-2">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1 className="text-3xl font-semibold mb-2 flex items-center justify-center gap-2">
              Brandshift.ai
              <Sparkles className="h-6 w-6 text-primary" />
            </h1>
          </motion.div>
        </div>

        {/* Welcome Message */}
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h2 className="text-3xl font-semibold">
            Welcome to Brandshift, {firstName}! 🎉
          </h2>
          <p className="text-lg text-muted-foreground">
            You're about to build a brand strategy that's backed by real research.
          </p>
        </motion.div>

        {/* Value Props Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {valueProps.map((prop, index) => {
            const Icon = prop.icon;
            return (
              <motion.div
                key={prop.title}
                className="rounded-xl border p-6 text-center bg-card hover:bg-muted/50 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
              >
                <div className="rounded-xl bg-primary/10 dark:bg-primary/20 p-4 w-fit mx-auto mb-4">
                  <Icon className={cn('h-8 w-8', prop.color)} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{prop.title}</h3>
                <p className="text-sm text-muted-foreground">{prop.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* What to Expect Section */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold text-center">
            Here's what we'll set up together:
          </h3>

          <div className="space-y-4">
            {onboardingSteps.map((step, index) => (
              <motion.div
                key={step.label}
                className="flex items-center justify-between p-4 rounded-xl border bg-card"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
              >
                <div className="flex items-center gap-4">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                    <Circle className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <span className="text-sm font-medium">{step.label}</span>
                </div>
                <span className="text-sm text-muted-foreground">{step.duration}</span>
              </motion.div>
            ))}

            <div className="text-center pt-2">
              <p className="text-sm text-muted-foreground">
                Total time: <span className="font-medium text-foreground">~10 minutes</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <Button
            size="lg"
            className="w-full gap-2 text-base"
            onClick={onGetStarted}
          >
            Let's Get Started
            <ArrowRight className="h-4 w-4" />
          </Button>

          <div className="text-center">
            <button
              onClick={onSkip}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Skip for now, explore on my own
            </button>
          </div>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div
          className="flex flex-col items-center gap-4 pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.5 }}
        >
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <div className="h-2 w-2 rounded-full bg-muted" />
            <div className="h-2 w-2 rounded-full bg-muted" />
            <div className="h-2 w-2 rounded-full bg-muted" />
          </div>
          <p className="text-sm text-muted-foreground">Step 1 of 4</p>
        </motion.div>
      </motion.div>
    </div>
  );
}