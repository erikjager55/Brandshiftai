import React, { useState, useMemo } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Eye,
  EyeOff,
  CheckCircle2,
  X,
  Sparkles,
  Brain,
  Target,
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface RegisterPageProps {
  onNavigateToLogin?: () => void;
  onRegister?: (data: {
    fullName: string;
    email: string;
    company: string;
    password: string;
  }) => void;
}

interface PasswordRequirement {
  id: string;
  label: string;
  test: (password: string) => boolean;
}

const passwordRequirements: PasswordRequirement[] = [
  {
    id: 'length',
    label: 'At least 8 characters',
    test: (pwd) => pwd.length >= 8,
  },
  {
    id: 'uppercase',
    label: 'One uppercase letter',
    test: (pwd) => /[A-Z]/.test(pwd),
  },
  {
    id: 'lowercase',
    label: 'One lowercase letter',
    test: (pwd) => /[a-z]/.test(pwd),
  },
  {
    id: 'number',
    label: 'One number',
    test: (pwd) => /[0-9]/.test(pwd),
  },
];

export function RegisterPage({
  onNavigateToLogin,
  onRegister,
}: RegisterPageProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const passwordStrength = useMemo(() => {
    const passedCount = passwordRequirements.filter(req => req.test(password)).length;
    return {
      score: passedCount,
      label:
        passedCount === 0
          ? ''
          : passedCount <= 1
          ? 'Weak'
          : passedCount <= 2
          ? 'Fair'
          : passedCount === 3
          ? 'Good'
          : 'Strong',
      color:
        passedCount === 0
          ? 'bg-muted'
          : passedCount <= 1
          ? 'bg-red-500'
          : passedCount <= 2
          ? 'bg-amber-500'
          : passedCount === 3
          ? 'bg-blue-500'
          : 'bg-green-600',
    };
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate password meets all requirements
    const allRequirementsMet = passwordRequirements.every(req => req.test(password));
    if (!allRequirementsMet) {
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onRegister?.({ fullName, email, company, password });
    setIsLoading(false);
  };

  const handleSocialSignup = async (provider: 'google' | 'microsoft') => {
    setIsLoading(true);
    console.log(`Signing up with ${provider}...`);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-primary to-primary/80 dark:from-primary dark:to-primary/90">
        {/* Logo */}
        <div>
          <h1 className="text-3xl font-semibold text-white mb-2">Brandshift.ai</h1>
          <p className="text-xl text-white/90">
            Build brand strategy backed by research, not assumptions
          </p>
        </div>

        {/* Value Props */}
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
              <Target className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">
                Research-validated decisions
              </h3>
              <p className="text-sm text-white/80">
                Make strategic choices backed by real data and validated insights
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">
                AI-powered content creation
              </h3>
              <p className="text-sm text-white/80">
                Generate on-brand content instantly with strategic intelligence
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">
                Strategic brand foundation
              </h3>
              <p className="text-sm text-white/80">
                Build a complete brand system with integrated research and strategy
              </p>
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <div className="rounded-xl bg-white/10 backdrop-blur-sm p-6 border border-white/20">
          <p className="text-white/90 mb-4">
            "The 14-day trial convinced us immediately. We went from guesswork to data-driven brand decisions in days."
          </p>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-sm font-semibold text-white">MC</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Michael Chen</p>
              <p className="text-xs text-white/70">Brand Director, GrowthLab</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Register Form */}
      <div className="flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-2xl font-semibold text-foreground mb-2">Brandshift.ai</h1>
          </div>

          {/* Header */}
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-semibold">Create your account</h2>
            <p className="text-muted-foreground">Start your 14-day free trial</p>
          </div>

          {/* Social Signup Buttons */}
          <div className="space-y-4">
            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={() => handleSocialSignup('google')}
              disabled={isLoading}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>

            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={() => handleSocialSignup('microsoft')}
              disabled={isLoading}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path fill="#F25022" d="M11.4 11.4H2V2h9.4v9.4z" />
                <path fill="#00A4EF" d="M22 11.4h-9.4V2H22v9.4z" />
                <path fill="#7FBA00" d="M11.4 22H2v-9.4h9.4V22z" />
                <path fill="#FFB900" d="M22 22h-9.4v-9.4H22V22z" />
              </svg>
              Continue with Microsoft
            </Button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                or continue with email
              </span>
            </div>
          </div>

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-medium">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="rounded-lg"
                  required
                />
              </div>

              {/* Work Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Work Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-lg"
                  required
                />
              </div>

              {/* Company Name */}
              <div className="space-y-2">
                <Label htmlFor="company" className="text-sm font-medium">
                  Company Name
                </Label>
                <Input
                  id="company"
                  type="text"
                  placeholder="Your Company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="rounded-lg"
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="rounded-lg pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {password && (
                  <div className="space-y-2">
                    <div className="flex gap-1">
                      {[0, 1, 2, 3].map((index) => (
                        <div
                          key={index}
                          className={cn(
                            'h-1 flex-1 rounded-full transition-colors',
                            index < passwordStrength.score
                              ? passwordStrength.color
                              : 'bg-muted'
                          )}
                        />
                      ))}
                    </div>
                    {passwordStrength.label && (
                      <p className="text-xs text-muted-foreground">
                        Password strength: <span className="font-medium">{passwordStrength.label}</span>
                      </p>
                    )}
                  </div>
                )}

                {/* Password Requirements */}
                {password && (
                  <div className="space-y-2 p-4 rounded-lg bg-muted/50 border">
                    <p className="text-xs font-medium text-muted-foreground">
                      Password must contain:
                    </p>
                    <div className="space-y-1">
                      {passwordRequirements.map((req) => {
                        const isPassed = req.test(password);
                        return (
                          <div
                            key={req.id}
                            className="flex items-center gap-2 text-xs"
                          >
                            {isPassed ? (
                              <CheckCircle2 className="h-3 w-3 text-green-600 dark:text-green-400 flex-shrink-0" />
                            ) : (
                              <X className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                            )}
                            <span
                              className={cn(
                                isPassed
                                  ? 'text-foreground'
                                  : 'text-muted-foreground'
                              )}
                            >
                              {req.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || passwordStrength.score < 4}
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>

            {/* Terms */}
            <p className="text-xs text-center text-muted-foreground">
              By signing up, you agree to our{' '}
              <a href="#" className="text-primary hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-primary hover:underline">
                Privacy Policy
              </a>
            </p>
          </form>

          {/* Footer */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <button
                onClick={onNavigateToLogin}
                className="text-primary hover:underline font-medium"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
