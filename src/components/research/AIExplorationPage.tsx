/**
 * AI Exploration Research Method Page
 * Chat interface for AI-powered brand analysis with two states:
 * 1. IN PROGRESS - Interactive chat with AI questions
 * 2. COMPLETED - Analysis report with insights and recommendations
 */

import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Progress } from '../ui/progress';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ChevronDown,
  Play,
  Pause,
  X as XIcon,
  Save,
  FileText,
  Rocket,
  Target,
  Users,
  HelpCircle,
  TrendingUp,
  Lightbulb,
  ChevronRight,
  FileDown,
  Database,
  Unlock,
  Calendar,
  RefreshCw,
  Edit,
  AlertCircle,
  Trash2,
  Plus,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { mockBrandAssets } from '../../data/mock-brand-assets';
import { StatusDropdown, SimpleStatus } from './StatusDropdown';

interface AIExplorationPageProps {
  assetId: string;
  sessionId?: string;
  mode?: 'work' | 'results';
  onBack: () => void;
}

interface AIQuestion {
  id: number;
  question: string;
  answer: string;
}

// AI Questions for brand analysis
const AI_QUESTIONS = [
  "What does your business do and what makes it unique?",
  "Who is your primary target audience?",
  "What are the main challenges your customers face?",
  "How does your brand solve these challenges differently than competitors?",
  "What values are most important to your brand?",
  "What emotions do you want customers to associate with your brand?",
  "Where do you see your brand in 5 years?",
];

export function AIExplorationPage({ assetId, sessionId, mode = 'work', onBack }: AIExplorationPageProps) {
  const [currentMode, setCurrentMode] = useState<'work' | 'results'>(mode);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState<AIQuestion[]>(
    AI_QUESTIONS.map((q, idx) => ({ id: idx, question: q, answer: '' }))
  );
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [researchStatus, setResearchStatus] = useState<SimpleStatus>('in_progress');
  
  // Edit mode states
  const [isEditing, setIsEditing] = useState(false);
  const [editableContent, setEditableContent] = useState({
    executiveSummary: "Based on your responses, your brand demonstrates a strong value proposition centered around innovation and customer-centricity. The analysis reveals clear market differentiation through your unique approach to solving customer challenges. Your brand values align well with your target audience's expectations, creating a solid foundation for authentic brand storytelling.",
    brandPurpose: "Your brand exists to empower customers through innovative solutions that simplify complex challenges.",
    targetAudience: "Primary audience consists of forward-thinking professionals seeking efficiency and innovation in their workflow.",
    uniqueValue: "Differentiation through seamless user experience and data-driven insights that competitors lack.",
    customerChallenge: "Customers struggle with fragmented solutions and lack of integration across their workflow tools.",
    marketPosition: "Well-positioned as an innovative leader with strong growth potential in emerging market segments.",
    recommendations: [
      "Strengthen brand messaging to emphasize your unique problem-solving approach",
      "Develop content marketing strategy targeting forward-thinking professionals",
      "Create case studies showcasing seamless integration capabilities",
      "Build thought leadership in innovation and customer-centricity",
      "Establish strategic partnerships to expand market reach"
    ]
  });

  // Get asset
  const asset = mockBrandAssets.find((a) => a.id === assetId);
  if (!asset) return null;

  // Calculate progress
  const answeredQuestions = questions.filter((q) => q.answer.length > 0).length;
  const progressPercentage = Math.round((answeredQuestions / questions.length) * 100);

  // Initialize current answer from saved question
  useEffect(() => {
    setCurrentAnswer(questions[currentQuestion]?.answer || '');
  }, [currentQuestion, questions]);

  // Handle next question
  const handleNext = () => {
    // Save current answer
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestion].answer = currentAnswer;
    setQuestions(updatedQuestions);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Last question - generate report
      handleSubmit();
    }
  };

  // Handle previous question
  const handlePrevious = () => {
    // Save current answer
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestion].answer = currentAnswer;
    setQuestions(updatedQuestions);

    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // Handle submit and generate report
  const handleSubmit = () => {
    setIsGenerating(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setIsGenerating(false);
      setCurrentMode('results');
      toast.success('Analysis complete!', {
        description: 'Your brand analysis has been generated.',
      });
    }, 3000);
  };

  // Handle completion
  const handleComplete = () => {
    toast.success('Research completed!', {
      description: `AI Exploration data has been added to ${asset.type}.`,
    });
    onBack();
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Render breadcrumb
  const renderBreadcrumb = () => (
    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
      <button onClick={onBack} className="text-primary hover:underline">
        Dashboard
      </button>
      <ChevronRight className="h-4 w-4" />
      <button onClick={onBack} className="text-primary hover:underline">
        Brand Assets
      </button>
      <ChevronRight className="h-4 w-4" />
      <button onClick={onBack} className="text-primary hover:underline">
        {asset.type}
      </button>
      <ChevronRight className="h-4 w-4" />
      <span className="text-foreground font-medium">AI Brand Analysis</span>
    </div>
  );

  // Render back link
  const renderBackLink = () => (
    <button
      onClick={onBack}
      className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
    >
      <ArrowLeft className="h-4 w-4 mr-2" />
      Back to Asset
    </button>
  );

  // Loading state
  if (isGenerating) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex h-16 w-16 rounded-full bg-primary/10 items-center justify-center mb-4">
            <RefreshCw className="h-8 w-8 text-primary animate-spin" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Generating your brand analysis...</h2>
          <p className="text-sm text-muted-foreground">
            Analyzing responses • Generating insights • Creating recommendations
          </p>
        </div>
      </div>
    );
  }

  // IN PROGRESS STATE
  if (currentMode === 'work') {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto p-8">
          {renderBreadcrumb()}
          {renderBackLink()}

          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <Sparkles className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold">AI Brand Analysis</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Answer questions to generate insights for {asset.type}
                </p>
              </div>
            </div>

            {/* Status Dropdown */}
            <StatusDropdown
              variant="simple"
              currentStatus={researchStatus}
              onChange={(newStatus) => setResearchStatus(newStatus as SimpleStatus)}
            />
          </div>

          {/* Chat Interface */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-card border border-border rounded-2xl p-6">
              {/* Chat Messages */}
              <div className="space-y-4 mb-6">
                {/* Intro Message */}
                {currentQuestion === 0 && (
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                      <Sparkles className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div className="rounded-2xl rounded-tl-md bg-muted p-4 max-w-md">
                      <p className="text-sm">
                        Hello! I'll help you develop insights for your {asset.type}. Let's start with a few questions about your business.
                      </p>
                    </div>
                  </div>
                )}

                {/* Current Question */}
                <div className="flex items-start gap-3 mt-4">
                  <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                    <Sparkles className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div className="rounded-2xl rounded-tl-md border-2 border-primary/20 bg-primary/5 p-4 max-w-md">
                    <p className="text-sm font-medium">{questions[currentQuestion]?.question}</p>
                  </div>
                </div>

                {/* User's Previous Answer (if exists) */}
                {questions[currentQuestion]?.answer && (
                  <div className="flex items-start gap-3 justify-end">
                    <div className="rounded-2xl rounded-tr-md bg-primary text-primary-foreground p-4 max-w-md">
                      <p className="text-sm">{questions[currentQuestion].answer}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Progress Section */}
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm font-semibold text-primary">{progressPercentage}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>

              {/* User Input */}
              <div className="mt-6">
                <div className="relative">
                  <Textarea
                    value={currentAnswer}
                    onChange={(e) => setCurrentAnswer(e.target.value)}
                    placeholder="Type your answer here..."
                    className="w-full min-h-24 p-4 rounded-xl border border-border bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
                    {currentAnswer.length}/500
                  </div>
                </div>
              </div>

              {/* Navigation Footer */}
              <div className="flex justify-between items-center mt-6">
                <Button
                  variant="ghost"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className={currentQuestion === 0 ? 'opacity-50 cursor-not-allowed' : ''}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>

                <Button
                  onClick={handleNext}
                  disabled={!currentAnswer.trim()}
                  className={!currentAnswer.trim() ? 'opacity-50 cursor-not-allowed' : ''}
                >
                  {currentQuestion === questions.length - 1 ? 'Submit' : 'Next'}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // COMPLETED STATE
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-8">
        {renderBreadcrumb()}
        {renderBackLink()}

        {/* Success Banner */}
        <div className="rounded-xl bg-green-50 border border-green-200 p-6 dark:bg-green-900/20 dark:border-green-800">
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center dark:bg-green-900/50">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>

            {/* Content */}
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-green-800 dark:text-green-200">
                AI Brand Analysis Complete
              </h2>
              <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                Your brand framework has been successfully generated from {answeredQuestions} data points across multiple sources.
              </p>

              {/* Metadata */}
              <div className="flex items-center gap-4 mt-3 text-sm text-green-600 dark:text-green-400">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  Completed: {formatDate(new Date().toISOString())}
                </div>
                <div className="flex items-center gap-1.5">
                  <RefreshCw className="h-4 w-4" />
                  Last updated: {formatDate(new Date().toISOString())}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 mt-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-green-200 dark:bg-green-900/50 dark:border-green-700">
                  <Unlock className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-700 dark:text-green-400">Unlocked</span>
                </div>
                <button
                  onClick={() => toast.success('Downloading PDF...')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-green-200 hover:bg-green-50 transition-colors dark:bg-green-900/50 dark:border-green-700"
                >
                  <FileDown className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-700 dark:text-green-400">PDF download</span>
                </button>
                <button
                  onClick={() => toast.success('Downloading raw data...')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-green-200 hover:bg-green-50 transition-colors dark:bg-green-900/50 dark:border-green-700"
                >
                  <Database className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-700 dark:text-green-400">Download raw data</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Report Header */}
        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-muted-foreground" />
            <div>
              <h2 className="text-lg font-semibold">AI Generated Report</h2>
              <p className="text-sm text-muted-foreground">Based on {answeredQuestions} answered questions</p>
            </div>
          </div>

          {/* Edit Button */}
          {!isEditing && (
            <Button variant="ghost" onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Report
            </Button>
          )}
          {isEditing && (
            <div className="flex items-center gap-2">
              <Button onClick={() => {
                setIsEditing(false);
                toast.success('Changes saved!');
              }}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
              <Button variant="ghost" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          )}
        </div>

        {/* Executive Summary */}
        <div className="mt-6 rounded-xl border bg-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Rocket className="h-5 w-5 text-primary" />
            <h3 className="text-base font-semibold">Executive Summary</h3>
          </div>
          {isEditing ? (
            <Textarea
              value={editableContent.executiveSummary}
              onChange={(e) => setEditableContent({...editableContent, executiveSummary: e.target.value})}
              className="text-sm leading-relaxed min-h-24"
            />
          ) : (
            <p className="text-sm leading-relaxed text-muted-foreground">
              {editableContent.executiveSummary}
            </p>
          )}
        </div>

        {/* Key Findings */}
        <div className="mt-6 rounded-xl border bg-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Target className="h-5 w-5 text-primary" />
            <h3 className="text-base font-semibold">Key Findings</h3>
          </div>

          <div className="space-y-3">
            {/* Brand Purpose */}
            <div className="rounded-lg bg-muted/50 p-4 hover:bg-muted transition-colors">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Target className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold">Brand Purpose</h4>
                  {isEditing ? (
                    <Textarea
                      value={editableContent.brandPurpose}
                      onChange={(e) => setEditableContent({...editableContent, brandPurpose: e.target.value})}
                      className="text-sm text-muted-foreground mt-1 min-h-20"
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground mt-1">
                      {editableContent.brandPurpose}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Target Audience */}
            <div className="rounded-lg bg-muted/50 p-4 hover:bg-muted transition-colors">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold">Target Audience Definition</h4>
                  {isEditing ? (
                    <Textarea
                      value={editableContent.targetAudience}
                      onChange={(e) => setEditableContent({...editableContent, targetAudience: e.target.value})}
                      className="text-sm text-muted-foreground mt-1 min-h-20"
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground mt-1">
                      {editableContent.targetAudience}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Unique Value */}
            <div className="rounded-lg bg-muted/50 p-4 hover:bg-muted transition-colors">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold">Unique Value Proposition</h4>
                  {isEditing ? (
                    <Textarea
                      value={editableContent.uniqueValue}
                      onChange={(e) => setEditableContent({...editableContent, uniqueValue: e.target.value})}
                      className="text-sm text-muted-foreground mt-1 min-h-20"
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground mt-1">
                      {editableContent.uniqueValue}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Customer Challenge */}
            <div className="rounded-lg bg-muted/50 p-4 hover:bg-muted transition-colors">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <HelpCircle className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold">Customer Challenge</h4>
                  {isEditing ? (
                    <Textarea
                      value={editableContent.customerChallenge}
                      onChange={(e) => setEditableContent({...editableContent, customerChallenge: e.target.value})}
                      className="text-sm text-muted-foreground mt-1 min-h-20"
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground mt-1">
                      {editableContent.customerChallenge}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Market Position */}
            <div className="rounded-lg bg-muted/50 p-4 hover:bg-muted transition-colors">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold">Market Position</h4>
                  {isEditing ? (
                    <Textarea
                      value={editableContent.marketPosition}
                      onChange={(e) => setEditableContent({...editableContent, marketPosition: e.target.value})}
                      className="text-sm text-muted-foreground mt-1 min-h-20"
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground mt-1">
                      {editableContent.marketPosition}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Strategic Recommendations */}
        <div className="mt-6 rounded-xl border bg-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="h-5 w-5 text-primary" />
            <h3 className="text-base font-semibold">Strategic Recommendations</h3>
          </div>

          <div className="space-y-3">
            {editableContent.recommendations.map((rec, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-semibold text-primary-foreground">{index + 1}</span>
                </div>
                {isEditing ? (
                  <div className="flex-1 flex items-center gap-2">
                    <Textarea
                      value={rec}
                      onChange={(e) => {
                        const newRecs = [...editableContent.recommendations];
                        newRecs[index] = e.target.value;
                        setEditableContent({...editableContent, recommendations: newRecs});
                      }}
                      className="text-sm text-muted-foreground flex-1 min-h-16"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const newRecs = editableContent.recommendations.filter((_, i) => i !== index);
                        setEditableContent({...editableContent, recommendations: newRecs});
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground flex-1">{rec}</p>
                )}
              </div>
            ))}
            {isEditing && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setEditableContent({
                    ...editableContent,
                    recommendations: [...editableContent.recommendations, 'New recommendation']
                  });
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Recommendation
              </Button>
            )}
          </div>
        </div>

        {/* Report Footer */}
        <div className="mt-8 flex justify-between items-center">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Return to {asset.type}
          </Button>

          <Button onClick={handleComplete}>
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}