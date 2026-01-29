import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  Brain,
  Target,
} from 'lucide-react';

interface ForgotPasswordPageProps {
  onNavigateToLogin?: () => void;
  onSendResetLink?: (email: string) => void;
}

export function ForgotPasswordPage({
  onNavigateToLogin,
  onSendResetLink,
}: ForgotPasswordPageProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onSendResetLink?.(email);
    setIsSuccess(true);
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

      {/* Right Panel - Forgot Password Form */}
      <div className="flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-2xl font-semibold text-foreground mb-2">Brandshift.ai</h1>
          </div>

          {isSuccess ? (
            // Success State
            <div className="space-y-6 text-center">
              {/* Success Icon */}
              <div className="flex justify-center">
                <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
              </div>

              {/* Header */}
              <div className="space-y-2">
                <h2 className="text-3xl font-semibold">Check your email</h2>
                <p className="text-muted-foreground">
                  We sent a password reset link to
                </p>
                <p className="text-sm font-medium">{email}</p>
              </div>

              {/* Instructions */}
              <div className="rounded-xl border p-6 bg-muted/50 text-left space-y-2">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Next steps:</span>
                </p>
                <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                  <li>Check your email inbox</li>
                  <li>Click the reset link in the email</li>
                  <li>Create a new password</li>
                </ol>
                <p className="text-xs text-muted-foreground pt-2">
                  Didn't receive the email? Check your spam folder or try again.
                </p>
              </div>

              {/* Actions */}
              <div className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setIsSuccess(false)}
                >
                  Send another email
                </Button>

                <button
                  onClick={onNavigateToLogin}
                  className="flex items-center justify-center gap-2 w-full text-sm text-primary hover:underline"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to login
                </button>
              </div>
            </div>
          ) : (
            // Reset Form
            <>
              {/* Header */}
              <div className="space-y-2 text-center">
                <h2 className="text-3xl font-semibold">Reset your password</h2>
                <p className="text-muted-foreground">
                  Enter your email address and we'll send you a link to reset your password
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
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
                    autoFocus
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </Button>
              </form>

              {/* Back to Login */}
              <div className="text-center">
                <button
                  onClick={onNavigateToLogin}
                  className="flex items-center justify-center gap-2 w-full text-sm text-primary hover:underline"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to login
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
