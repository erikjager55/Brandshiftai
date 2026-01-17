import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Persona, PersonaResearchMethod, ResearchMethodStatus } from '../../types/persona';
import {
  Users,
  MessageSquare,
  FlaskConical,
  BarChart3,
  Eye,
  FileText,
  Target,
  TrendingUp,
  Play,
  CheckCircle,
  Clock,
  Lock,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface PersonaResearchMethodsProps {
  persona: Persona;
  onMethodClick?: (method: PersonaResearchMethod, mode: 'work' | 'results') => void;
}

// Define validation methods for personas
const PERSONA_VALIDATION_METHODS = [
  {
    id: 'user-interviews',
    name: 'User Interviews',
    description: 'In-depth interviews with target users to understand goals, behaviors, and pain points',
    icon: Users,
    category: 'Qualitative',
    estimatedTime: '2-3 weeks',
    participants: '5-10 users',
    unlockLevel: 'free' as const,
  },
  {
    id: 'surveys',
    name: 'User Surveys',
    description: 'Structured surveys to gather quantitative data about user demographics and preferences',
    icon: FileText,
    category: 'Quantitative',
    estimatedTime: '1-2 weeks',
    participants: '50-100 users',
    unlockLevel: 'free' as const,
  },
  {
    id: 'usability-testing',
    name: 'Usability Testing',
    description: 'Observe users interacting with product to validate assumptions about behaviors',
    icon: Eye,
    category: 'Observational',
    estimatedTime: '2-3 weeks',
    participants: '5-8 users',
    unlockLevel: 'basic' as const,
  },
  {
    id: 'analytics-analysis',
    name: 'Analytics Analysis',
    description: 'Analyze user behavior data to identify patterns and validate persona characteristics',
    icon: BarChart3,
    category: 'Quantitative',
    estimatedTime: '1 week',
    participants: 'Existing data',
    unlockLevel: 'free' as const,
  },
  {
    id: 'field-observations',
    name: 'Field Observations',
    description: 'Observe users in their natural environment to understand context and behaviors',
    icon: Target,
    category: 'Observational',
    estimatedTime: '3-4 weeks',
    participants: '8-12 users',
    unlockLevel: 'pro' as const,
  },
  {
    id: 'focus-groups',
    name: 'Focus Groups',
    description: 'Group discussions to explore attitudes, perceptions, and motivations',
    icon: MessageSquare,
    category: 'Qualitative',
    estimatedTime: '2 weeks',
    participants: '3-4 groups (6-8 each)',
    unlockLevel: 'pro' as const,
  },
  {
    id: 'diary-studies',
    name: 'Diary Studies',
    description: 'Users record their experiences over time to capture authentic behaviors',
    icon: FlaskConical,
    category: 'Longitudinal',
    estimatedTime: '4-6 weeks',
    participants: '10-15 users',
    unlockLevel: 'pro' as const,
  },
  {
    id: 'journey-mapping',
    name: 'Journey Mapping',
    description: 'Map user journeys to identify touchpoints, pain points, and opportunities',
    icon: TrendingUp,
    category: 'Synthesis',
    estimatedTime: '1-2 weeks',
    participants: 'Based on research',
    unlockLevel: 'basic' as const,
  },
  {
    id: 'ai-exploration',
    name: 'AI Exploration',
    description: 'Use AI to explore persona patterns, generate hypotheses, and identify research gaps',
    icon: Sparkles,
    category: 'AI-Assisted',
    estimatedTime: '1-3 days',
    participants: 'AI-generated insights',
    unlockLevel: 'free' as const,
  },
];

export function PersonaResearchMethods({ persona, onMethodClick }: PersonaResearchMethodsProps) {
  // Get status for each method
  const getMethodStatus = (methodId: string): ResearchMethodStatus => {
    const method = persona.researchMethods.find(m => m.type === methodId);
    return method?.status || 'not-started';
  };

  const getMethodProgress = (methodId: string): number => {
    const method = persona.researchMethods.find(m => m.type === methodId);
    return method?.progress || 0;
  };

  const getMethodData = (methodId: string): PersonaResearchMethod | undefined => {
    return persona.researchMethods.find(m => m.type === methodId);
  };

  // Check if method is unlocked (mock logic)
  const isMethodUnlocked = (unlockLevel: string): boolean => {
    return ['free', 'basic'].includes(unlockLevel);
  };

  // Get status badge info
  const getStatusBadge = (status: ResearchMethodStatus) => {
    switch (status) {
      case 'completed':
        return {
          label: 'Completed',
          color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
          icon: CheckCircle,
        };
      case 'in-progress':
        return {
          label: 'In Progress',
          color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
          icon: Clock,
        };
      case 'cancelled':
        return {
          label: 'Cancelled',
          color: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
          icon: Clock,
        };
      default:
        return {
          label: 'Not Started',
          color: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
          icon: Clock,
        };
    }
  };

  // Calculate summary stats
  const completedCount = PERSONA_VALIDATION_METHODS.filter(
    m => getMethodStatus(m.id) === 'completed'
  ).length;
  const inProgressCount = PERSONA_VALIDATION_METHODS.filter(
    m => getMethodStatus(m.id) === 'in-progress'
  ).length;

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{completedCount}</div>
            <div className="text-xs text-muted-foreground">Completed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{inProgressCount}</div>
            <div className="text-xs text-muted-foreground">In Progress</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{PERSONA_VALIDATION_METHODS.length}</div>
            <div className="text-xs text-muted-foreground">Total Methods</div>
          </CardContent>
        </Card>
      </div>

      {/* Methods List */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Validation Methods</h3>
        
        {PERSONA_VALIDATION_METHODS.map((method) => {
          const status = getMethodStatus(method.id);
          const progress = getMethodProgress(method.id);
          const methodData = getMethodData(method.id);
          const isUnlocked = isMethodUnlocked(method.unlockLevel);
          const statusBadge = getStatusBadge(status);
          const StatusIcon = statusBadge.icon;
          const MethodIcon = method.icon;

          return (
            <Card 
              key={method.id}
              className={`transition-all ${
                status === 'completed' 
                  ? 'border-green-200 bg-green-50/30 dark:border-green-900 dark:bg-green-950/10'
                  : status === 'in-progress'
                  ? 'border-blue-200 bg-blue-50/30 dark:border-blue-900 dark:bg-blue-950/10'
                  : ''
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    {/* Method Icon */}
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      status === 'completed'
                        ? 'bg-green-100 dark:bg-green-900/30'
                        : status === 'in-progress'
                        ? 'bg-blue-100 dark:bg-blue-900/30'
                        : 'bg-gray-100 dark:bg-gray-900/30'
                    }`}>
                      <MethodIcon className={`h-5 w-5 ${
                        status === 'completed'
                          ? 'text-green-600 dark:text-green-400'
                          : status === 'in-progress'
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-gray-600 dark:text-gray-400'
                      }`} />
                    </div>

                    {/* Method Info */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <CardTitle className="text-base">{method.name}</CardTitle>
                        <Badge className={statusBadge.color} variant="secondary">
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {statusBadge.label}
                        </Badge>
                        {!isUnlocked && (
                          <Badge variant="outline">
                            <Lock className="h-3 w-3 mr-1" />
                            {method.unlockLevel}
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="text-sm">
                        {method.description}
                      </CardDescription>
                      
                      {/* Method Details */}
                      <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center space-x-1">
                          <Badge variant="outline" className="text-xs">
                            {method.category}
                          </Badge>
                        </span>
                        <span>⏱️ {method.estimatedTime}</span>
                        <span>👥 {method.participants}</span>
                      </div>

                      {/* Progress Bar for In-Progress */}
                      {status === 'in-progress' && (
                        <div className="mt-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-muted-foreground">Progress</span>
                            <span className="text-xs font-semibold">{progress}%</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>
                      )}

                      {/* Completed Info */}
                      {status === 'completed' && methodData && (
                        <div className="mt-3 flex items-center space-x-4 text-xs">
                          {methodData.completedAt && (
                            <span className="text-muted-foreground">
                              ✓ Completed {methodData.completedAt}
                            </span>
                          )}
                          {methodData.participantCount && (
                            <span className="text-muted-foreground">
                              👥 {methodData.participantCount} participants
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2 ml-4">
                    {isUnlocked ? (
                      <>
                        {status === 'completed' ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onMethodClick?.(methodData!, 'results')}
                          >
                            View Results
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        ) : status === 'in-progress' ? (
                          <Button
                            size="sm"
                            onClick={() => onMethodClick?.(methodData!, 'work')}
                          >
                            Continue
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => {
                              // Create a mock method object for starting
                              const newMethod: PersonaResearchMethod = {
                                type: method.id as any,
                                status: 'not-started',
                              };
                              onMethodClick?.(newMethod, 'work');
                            }}
                          >
                            <Play className="h-4 w-4 mr-1" />
                            Start
                          </Button>
                        )}
                      </>
                    ) : (
                      <Button size="sm" variant="outline" disabled>
                        <Lock className="h-4 w-4 mr-1" />
                        Unlock
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
            </Card>
          );
        })}
      </div>

      {/* Help Section */}
      <Card className="border-blue-200 bg-blue-50/30 dark:border-blue-900 dark:bg-blue-950/10">
        <CardHeader>
          <CardTitle className="text-base flex items-center space-x-2">
            <FlaskConical className="h-4 w-4 text-blue-600" />
            <span>Research Best Practices</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          <p className="text-muted-foreground">
            • Start with <strong>User Interviews</strong> and <strong>Analytics Analysis</strong> to build foundation
          </p>
          <p className="text-muted-foreground">
            • Use <strong>Surveys</strong> to validate findings across larger sample size
          </p>
          <p className="text-muted-foreground">
            • Complete at least 4-5 methods for high-confidence personas
          </p>
          <p className="text-muted-foreground">
            • Update persona data regularly as you learn more about your users
          </p>
        </CardContent>
      </Card>
    </div>
  );
}