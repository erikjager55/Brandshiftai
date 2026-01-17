import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import {
  MessageSquare,
  Users,
  ClipboardList,
  Eye,
  Brain,
  ArrowRight,
  CheckCircle,
  Clock,
  Target,
  Sparkles,
  TrendingUp
} from 'lucide-react';

interface PersonaResearchMethod {
  id: string;
  type: 'interviews' | 'surveys' | 'observation' | 'focus-groups' | 'empathy-mapping';
  name: string;
  description: string;
  icon: any;
  color: string;
  bgColor: string;
  
  // Persona-specific attributes
  bestFor: string[];
  insights: string[];
  timeEstimate: string;
  participantCount: string;
  
  // Scoring
  qualityScore: number; // 0-100, how well suited for persona research
  effortLevel: 'low' | 'medium' | 'high';
  
  status?: 'not-started' | 'in-progress' | 'completed';
  progress?: number;
  lastActivity?: string;
}

const personaResearchMethods: PersonaResearchMethod[] = [
  {
    id: 'empathy-interviews',
    type: 'interviews',
    name: 'Empathy Interviews',
    description: 'Deep 1-on-1 conversations to understand motivations, pain points, and goals',
    icon: MessageSquare,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    bestFor: [
      'Understanding deep motivations',
      'Uncovering hidden pain points',
      'Exploring emotional drivers',
      'Building persona narratives'
    ],
    insights: [
      'Personal stories and experiences',
      'Emotional responses to challenges',
      'Decision-making processes',
      'Unmet needs and desires'
    ],
    timeEstimate: '45-60 min per interview',
    participantCount: '5-8 participants',
    qualityScore: 95,
    effortLevel: 'high',
    status: 'completed',
    progress: 100,
    lastActivity: '2 days ago'
  },
  {
    id: 'behavioral-surveys',
    type: 'surveys',
    name: 'Behavioral Surveys',
    description: 'Quantitative research to validate persona attributes and behaviors at scale',
    icon: ClipboardList,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    bestFor: [
      'Validating persona assumptions',
      'Quantifying behavior patterns',
      'Segmenting audiences',
      'Priority ranking features'
    ],
    insights: [
      'Statistical validation',
      'Behavior frequency patterns',
      'Preference rankings',
      'Demographic correlations'
    ],
    timeEstimate: '10-15 min per response',
    participantCount: '50-200+ participants',
    qualityScore: 85,
    effortLevel: 'medium',
    status: 'in-progress',
    progress: 65,
    lastActivity: 'Today'
  },
  {
    id: 'contextual-observation',
    type: 'observation',
    name: 'Contextual Observation',
    description: 'Observe personas in their natural environment to understand real behaviors',
    icon: Eye,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    bestFor: [
      'Understanding workflows',
      'Identifying friction points',
      'Discovering workarounds',
      'Validating use cases'
    ],
    insights: [
      'Actual vs stated behavior',
      'Environmental constraints',
      'Tool and process usage',
      'Collaboration patterns'
    ],
    timeEstimate: '2-4 hours per session',
    participantCount: '3-5 observations',
    qualityScore: 90,
    effortLevel: 'high',
    status: 'not-started',
    progress: 0
  },
  {
    id: 'focus-groups',
    type: 'focus-groups',
    name: 'Focus Group Sessions',
    description: 'Moderated group discussions to explore shared experiences and diverse perspectives',
    icon: Users,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    bestFor: [
      'Exploring group dynamics',
      'Testing concepts collectively',
      'Gathering diverse opinions',
      'Identifying common themes'
    ],
    insights: [
      'Shared pain points',
      'Group consensus patterns',
      'Diverse perspectives',
      'Social proof validation'
    ],
    timeEstimate: '90-120 min per session',
    participantCount: '6-10 per group',
    qualityScore: 75,
    effortLevel: 'medium',
    status: 'not-started',
    progress: 0
  },
  {
    id: 'empathy-mapping',
    type: 'empathy-mapping',
    name: 'Empathy Mapping Workshop',
    description: 'Collaborative workshop to visualize persona thoughts, feelings, and experiences',
    icon: Brain,
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    bestFor: [
      'Team alignment on personas',
      'Synthesizing research data',
      'Creating shared understanding',
      'Identifying research gaps'
    ],
    insights: [
      'Says, thinks, does, feels matrix',
      'Pain and gain mapping',
      'Influence network',
      'Journey touchpoints'
    ],
    timeEstimate: '2-3 hours workshop',
    participantCount: 'Internal team (5-8)',
    qualityScore: 80,
    effortLevel: 'low',
    status: 'not-started',
    progress: 0
  }
];

interface PersonaResearchMethodsProps {
  personaId: string;
  personaName: string;
  onStartMethod?: (methodId: string) => void;
  onViewResults?: (methodId: string) => void;
}

export function PersonaResearchMethods({
  personaId,
  personaName,
  onStartMethod,
  onViewResults
}: PersonaResearchMethodsProps) {

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'completed':
        return { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50', label: 'Completed' };
      case 'in-progress':
        return { icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50', label: 'In Progress' };
      default:
        return { icon: Target, color: 'text-gray-400', bg: 'bg-gray-50', label: 'Not Started' };
    }
  };

  const getEffortBadge = (effort: string) => {
    const config = {
      low: { variant: 'default' as const, label: 'Low Effort' },
      medium: { variant: 'secondary' as const, label: 'Medium Effort' },
      high: { variant: 'outline' as const, label: 'High Effort' }
    };
    return config[effort as keyof typeof config] || config.medium;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Persona Research Methods</h2>
        <p className="text-muted-foreground">
          Choose the right research approach to deeply understand {personaName}
        </p>
      </div>

      {/* Overall Progress */}
      <Card className="border-2 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">RESEARCH PROGRESS</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-bold">
                  {personaResearchMethods.filter(m => m.status === 'completed').length}
                </h3>
                <span className="text-muted-foreground">/ {personaResearchMethods.length} methods</span>
              </div>
            </div>
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Users className="h-8 w-8 text-white" />
            </div>
          </div>
          <Progress 
            value={(personaResearchMethods.filter(m => m.status === 'completed').length / personaResearchMethods.length) * 100} 
            className="h-2" 
          />
        </CardContent>
      </Card>

      {/* Research Methods Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {personaResearchMethods.map((method) => {
          const Icon = method.icon;
          const statusConfig = getStatusConfig(method.status || 'not-started');
          const StatusIcon = statusConfig.icon;
          const effortBadge = getEffortBadge(method.effortLevel);

          return (
            <Card key={method.id} className="border-2 hover:border-purple-300 hover:shadow-lg transition-all group">
              <CardHeader>
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-3 rounded-lg ${method.bgColor} border-2 border-transparent group-hover:border-current`}>
                    <Icon className={`h-6 w-6 ${method.color}`} />
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge variant={effortBadge.variant} className="text-xs">
                      {effortBadge.label}
                    </Badge>
                    <div className={`flex items-center gap-1 text-xs ${statusConfig.color}`}>
                      <StatusIcon className="h-3 w-3" />
                      <span>{statusConfig.label}</span>
                    </div>
                  </div>
                </div>

                <CardTitle className="text-lg">{method.name}</CardTitle>
                <CardDescription>{method.description}</CardDescription>

                {/* Progress Bar for In-Progress Methods */}
                {method.status === 'in-progress' && method.progress !== undefined && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Progress</span>
                      <span className="text-xs font-medium">{method.progress}%</span>
                    </div>
                    <Progress value={method.progress} className="h-1.5" />
                    {method.lastActivity && (
                      <p className="text-xs text-muted-foreground mt-1">Last activity: {method.lastActivity}</p>
                    )}
                  </div>
                )}
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Quality Score */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-900">Quality Score</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-2xl font-bold text-green-600">{method.qualityScore}</span>
                    <span className="text-sm text-green-600">/100</span>
                  </div>
                </div>

                {/* Method Details */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-muted-foreground">Time per session</span>
                    <span className="font-medium">{method.timeEstimate}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-muted-foreground">Participants</span>
                    <span className="font-medium">{method.participantCount}</span>
                  </div>
                </div>

                {/* Best For */}
                <div>
                  <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Best For
                  </h4>
                  <div className="space-y-1.5">
                    {method.bestFor.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Insights Preview */}
                <div>
                  <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Insights You'll Gain
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {method.insights.slice(0, 2).map((insight, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {insight}
                      </Badge>
                    ))}
                    {method.insights.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{method.insights.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* CTA */}
                {method.status === 'completed' ? (
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => onViewResults?.(method.id)}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    View Results
                  </Button>
                ) : method.status === 'in-progress' ? (
                  <Button 
                    className="w-full"
                    onClick={() => onStartMethod?.(method.id)}
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    Continue Research
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button 
                    className="w-full"
                    onClick={() => onStartMethod?.(method.id)}
                  >
                    Start {method.name}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Comparison Guide */}
      <Card>
        <CardHeader>
          <CardTitle>Choosing the Right Method</CardTitle>
          <CardDescription>
            Different methods provide different types of insights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-medium mb-2 text-sm">🎯 Deep Understanding</h4>
              <p className="text-xs text-muted-foreground mb-2">
                For uncovering motivations and emotional drivers
              </p>
              <div className="space-y-1">
                <Badge variant="outline" className="text-xs">Empathy Interviews</Badge>
                <br />
                <Badge variant="outline" className="text-xs">Contextual Observation</Badge>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2 text-sm">📊 Validation & Scale</h4>
              <p className="text-xs text-muted-foreground mb-2">
                For quantifying behaviors and validating assumptions
              </p>
              <div className="space-y-1">
                <Badge variant="outline" className="text-xs">Behavioral Surveys</Badge>
                <br />
                <Badge variant="outline" className="text-xs">Focus Groups</Badge>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2 text-sm">🧠 Synthesis & Alignment</h4>
              <p className="text-xs text-muted-foreground mb-2">
                For organizing insights and building shared understanding
              </p>
              <div className="space-y-1">
                <Badge variant="outline" className="text-xs">Empathy Mapping</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
