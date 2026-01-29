import React, { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft, Zap, Users, Target, TrendingUp, CheckCircle2, Sparkles, ArrowLeft, Rocket, Circle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { motion, AnimatePresence } from 'motion/react';
import logo from 'figma:asset/e0e0a87a533427f73679f2a4dcecdf2a949b2149.png';

interface WelcomeModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onGetStarted?: () => void;
}

const WELCOME_MODAL_KEY = 'welcome-modal-shown';

export function WelcomeModal({ isOpen = true, onClose, onGetStarted }: WelcomeModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for previous

  const slides = [
    {
      id: 'welcome',
      icon: Sparkles,
      iconColor: 'text-primary',
      iconBg: 'bg-primary/10',
      title: 'Welcome to Brandshift.ai',
      subtitle: 'Transform your brand from intuition-driven to data-backed strategy in weeks, not months.',
      features: [
        'Build your brand foundation with proven frameworks',
        'Validate assets through professional research',
        'Generate AI-powered strategies in minutes'
      ]
    },
    {
      id: 'how-it-works',
      icon: Target,
      iconColor: 'text-primary',
      iconBg: 'bg-primary/10',
      title: 'How It Works',
      subtitle: 'A simple 3-step process to go from brand assets to validated strategies.',
      steps: [
        {
          number: '1',
          title: 'Define Your Brand',
          description: 'Create strategic assets like Golden Circle, Vision, and Mission',
          borderColor: 'border-l-primary',
          bgColor: 'bg-primary/5'
        },
        {
          number: '2',
          title: 'Research & Validate',
          description: 'Use 4 methods: Workshops, Surveys, Interviews, or AI Exploration',
          borderColor: 'border-l-primary/70',
          bgColor: 'bg-primary/5'
        },
        {
          number: '3',
          title: 'Generate Strategy',
          description: 'AI creates campaigns, GTM plans, and customer journeys from your data',
          borderColor: 'border-l-primary/50',
          bgColor: 'bg-primary/5'
        }
      ]
    },
    {
      id: 'get-started',
      icon: Rocket,
      iconColor: 'text-primary',
      iconBg: 'bg-primary/10',
      title: "Let's Get Started!",
      subtitle: 'Follow our Quick Start checklist to unlock the full power of the platform.',
      quickWins: [
        'Create your first brand asset (Golden Circle)',
        'Define your target persona',
        'Plan your first research session',
        'Generate your first campaign strategy'
      ]
    }
  ];

  const currentSlideData = slides[currentSlide];
  const isLastSlide = currentSlide === slides.length - 1;
  const isFirstSlide = currentSlide === 0;

  const handleNext = () => {
    if (isLastSlide) {
      handleGetStarted();
    } else {
      setDirection(1);
      setCurrentSlide(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstSlide) {
      setDirection(-1);
      setCurrentSlide(prev => prev - 1);
    }
  };

  const handleGetStarted = () => {
    if (dontShowAgain) {
      localStorage.setItem(WELCOME_MODAL_KEY, 'true');
    }
    onGetStarted?.();
    onClose();
  };

  const handleSkip = () => {
    if (dontShowAgain) {
      localStorage.setItem(WELCOME_MODAL_KEY, 'true');
    }
    onClose();
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && !isLastSlide) {
        handleNext();
      } else if (e.key === 'ArrowLeft' && !isFirstSlide) {
        handlePrevious();
      } else if (e.key === 'Escape') {
        handleSkip();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSlide, isLastSlide, isFirstSlide]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0
    })
  };

  const Icon = currentSlideData.icon;

  if (!isOpen) {
    return null;
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-background rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="relative border-b border-border p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Brandshift.ai" className="h-10 object-contain" />
              <div>
                <p className="text-sm text-muted-foreground">
                  Step {currentSlide + 1} of {slides.length}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSkip}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Progress Dots */}
          <div className="flex items-center justify-center gap-2 py-4 border-b border-border">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => {
                  setDirection(index > currentSlide ? 1 : -1);
                  setCurrentSlide(index);
                }}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? 'w-8 bg-primary'
                    : index < currentSlide
                    ? 'w-2 bg-primary/50'
                    : 'w-2 bg-muted-foreground/30'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Slide Content */}
          <div className="relative overflow-hidden" style={{ minHeight: '450px' }}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentSlide}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="absolute inset-0 p-8"
              >
                <div className="grid md:grid-cols-2 gap-8 h-full">
                  {/* Left Column - Content */}
                  <div className="flex flex-col justify-center space-y-6">
                    <div>
                      <h3 className="text-2xl font-semibold mb-2">
                        {currentSlideData.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {currentSlideData.subtitle}
                      </p>
                    </div>

                    {/* Slide 1: Features */}
                    {currentSlideData.id === 'welcome' && currentSlideData.features && (
                      <ul className="space-y-3">
                        {currentSlideData.features.map((feature, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + 0.3 }}
                            className="flex items-start gap-2"
                          >
                            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    )}

                    {/* Slide 2: Steps */}
                    {currentSlideData.id === 'how-it-works' && currentSlideData.steps && (
                      <div className="space-y-3">
                        {currentSlideData.steps.map((step, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.15 + 0.3 }}
                            className={`p-4 rounded-xl border-l-4 ${step.borderColor} ${step.bgColor}`}
                          >
                            <div className="flex items-start gap-3">
                              <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 font-semibold text-sm">
                                {step.number}
                              </div>
                              <div>
                                <h4 className="font-semibold mb-1">{step.title}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {step.description}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {/* Slide 3: Quick Wins */}
                    {currentSlideData.id === 'get-started' && currentSlideData.quickWins && (
                      <div className="space-y-3">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                          You'll Complete:
                        </p>
                        {currentSlideData.quickWins.map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 + 0.3 }}
                            className="flex items-center gap-3 p-3 rounded-lg border hover:border-primary/30 transition-all duration-200 cursor-default"
                          >
                            <div className="h-6 w-6 rounded-full border-2 border-primary text-primary text-sm font-semibold flex items-center justify-center shrink-0">
                              {index + 1}
                            </div>
                            <span className="text-sm">{item}</span>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Right Column - Visual */}
                  <div className="hidden md:flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className="relative w-full h-full max-h-96 rounded-xl overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-background p-8 flex items-center justify-center"
                    >
                      {/* Abstract Geometric Illustration */}
                      {currentSlideData.id === 'welcome' && (
                        <div className="relative w-full h-full flex items-center justify-center">
                          {/* Large Circle */}
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="absolute w-48 h-48 rounded-full bg-primary/20 blur-3xl"
                          />
                          {/* Hexagon */}
                          <motion.div
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="absolute w-32 h-32 bg-primary/30 rotate-12"
                            style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
                          />
                          {/* Small circles */}
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5, duration: 0.4 }}
                            className="absolute top-8 right-12 w-16 h-16 rounded-full bg-primary/20"
                          />
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.6, duration: 0.4 }}
                            className="absolute bottom-12 left-8 w-12 h-12 rounded-full bg-primary/25"
                          />
                        </div>
                      )}

                      {/* Flow Diagram for Step 2 */}
                      {currentSlideData.id === 'how-it-works' && (
                        <div className="relative w-full h-full flex items-center justify-center">
                          <div className="flex flex-col items-center gap-6">
                            {[1, 2, 3].map((num, index) => (
                              <motion.div
                                key={num}
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + index * 0.2 }}
                                className="flex items-center gap-4"
                              >
                                <div className={`w-16 h-16 rounded-xl bg-primary/${90 - index * 20} flex items-center justify-center text-primary-foreground font-semibold text-lg`}>
                                  {num}
                                </div>
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: 120 }}
                                  transition={{ delay: 0.5 + index * 0.2, duration: 0.4 }}
                                  className={`h-1 bg-primary/${70 - index * 10} rounded-full`}
                                />
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Success Visual for Step 3 */}
                      {currentSlideData.id === 'get-started' && (
                        <div className="relative w-full h-full flex items-center justify-center">
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                            className="w-32 h-32 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center"
                          >
                            <CheckCircle2 className="h-16 w-16 text-green-600 dark:text-green-400" />
                          </motion.div>
                          {/* Confetti dots */}
                          {[...Array(8)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{
                                scale: [0, 1, 1],
                                opacity: [0, 1, 0],
                                x: Math.cos(i * 45 * Math.PI / 180) * 80,
                                y: Math.sin(i * 45 * Math.PI / 180) * 80
                              }}
                              transition={{ delay: 0.5 + i * 0.05, duration: 0.8 }}
                              className="absolute w-3 h-3 rounded-full bg-primary/60"
                            />
                          ))}
                        </div>
                      )}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="border-t border-border p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Checkbox
                  id="dont-show"
                  checked={dontShowAgain}
                  onCheckedChange={(checked) => setDontShowAgain(checked as boolean)}
                />
                <label
                  htmlFor="dont-show"
                  className="text-sm text-muted-foreground cursor-pointer select-none"
                >
                  Don't show this again
                </label>
              </div>

              <div className="flex items-center gap-3">
                {!isFirstSlide && (
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    className="gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Previous
                  </Button>
                )}
                
                {!isLastSlide && (
                  <Button
                    variant="ghost"
                    onClick={handleSkip}
                  >
                    Skip Tour
                  </Button>
                )}

                <Button
                  onClick={handleNext}
                  className="gap-2"
                  size="lg"
                >
                  {isLastSlide ? (
                    <>
                      Get Started
                      <Rocket className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Keyboard Hints */}
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs text-center text-muted-foreground">
                💡 Tip: Use arrow keys ← → to navigate, or press ESC to skip
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

// Hook to check if welcome modal should show
export function useShouldShowWelcome(): boolean {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    const hasShown = localStorage.getItem(WELCOME_MODAL_KEY);
    setShouldShow(!hasShown);
  }, []);

  return shouldShow;
}

// Function to reset welcome modal (for testing)
export function resetWelcomeModal() {
  localStorage.removeItem(WELCOME_MODAL_KEY);
}