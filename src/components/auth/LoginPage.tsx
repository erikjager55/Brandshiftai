import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import {
  Eye,
  EyeOff,
  CheckCircle2,
  Sparkles,
  Brain,
  Target,
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface LoginPageProps {
  onNavigateToRegister?: () => void;
  onNavigateToForgotPassword?: () => void;
  onLogin?: (email: string, password: string) => void;
}

export function LoginPage({
  onNavigateToRegister,
  onNavigateToForgotPassword,
  onLogin,
}: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onLogin?.(email, password);
    setIsLoading(false);
  };

  const handleSocialLogin = async (provider: 'google' | 'microsoft') => {
    setIsLoading(true);
    console.log(`Logging in with ${provider}...`);
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
            "Brandshift transformed how we approach brand strategy. The research-backed insights gave us confidence in every decision."
          </p>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-sm font-semibold text-white">SJ</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Sarah Johnson</p>
              <p className="text-xs text-white/70">Head of Marketing, TechCorp</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-2xl font-semibold text-foreground mb-2">Brandshift.ai</h1>
          </div>

          {/* Header */}
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-semibold">Welcome back</h2>
            <p className="text-muted-foreground">Sign in to your account</p>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-4">
            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={() => handleSocialLogin('google')}
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
              onClick={() => handleSocialLogin('microsoft')}
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

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
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

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
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
              </div>
            </div>

            {/* Options Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <Label
                  htmlFor="remember"
                  className="text-sm font-medium cursor-pointer"
                >
                  Remember me
                </Label>
              </div>

              <button
                type="button"
                onClick={onNavigateToForgotPassword}
                className="text-sm text-primary hover:underline"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Footer */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <button
                onClick={onNavigateToRegister}
                className="text-primary hover:underline font-medium"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
