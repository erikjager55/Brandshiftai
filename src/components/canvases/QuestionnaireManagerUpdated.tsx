import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';
import { 
  Users,
  ChevronDown,
  CheckCircle2,
  Calendar,
  Download,
  Clock,
  Plus,
  Eye,
  Target,
  Heart,
  Globe,
  TrendingUp,
  Mail,
  Edit,
  Save,
  X,
  Package,
  MoreVertical,
  FileText,
  AlertCircle,
  Check,
  Circle,
  MessageCircle,
  Play,
  Trash2,
  ChevronRight,
  Lightbulb,
  Send,
  ClipboardList,
  Link2,
  Copy,
  ExternalLink,
  Lock,
  Unlock,
  BarChart3,
  HelpCircle,
  Inbox,
  XCircle
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { toast } from 'sonner@2.0.3';
import { QuestionnaireAnalyzeResults } from './QuestionnaireAnalyzeResults';
import { QuestionnaireStep1Design } from './QuestionnaireStep1Design';
import { QuestionnaireStep2Distribution } from './QuestionnaireStep2Distribution';
import { QuestionnaireStep3Recipients } from './QuestionnaireStep3Recipients';
import { QuestionnaireStep4Collect } from './QuestionnaireStep4Collect';

interface Recipient {
  id: string;
  name: string;
  email: string;
  group: string;
  role: string;
  linkSent: boolean;
  responsesReceived: boolean;
  responseDate?: string;
}

interface Question {
  id: string;
  text: string;
  type: 'text' | 'textarea' | 'multiple-choice' | 'rating' | 'yes-no';
  linkedAssetId?: string;
  options?: string[];
  required: boolean;
}

interface Questionnaire {
  id: string;
  name: string;
  description: string;
  status: 'draft' | 'collecting' | 'closed' | 'analyzed';
  questions: Question[];
  recipients: Recipient[];
  selectedAssets: string[];
  createdDate: string;
  linkUrl?: string;
  step: number;
  lockStatus?: 'locked';
}

interface QuestionnaireManagerProps {
  assetId: string;
  onRerender?: () => void;
  onEdit?: (data: any) => void;
  initialConfig?: {
    numberOfQuestionnaires: number;
    selectedAssets: string[];
  };
  researchPlanConfig?: {
    entryMode?: 'asset' | 'bundle' | 'questionnaire';
    unlockedAssets?: string[];
  } | null;
  onNavigateToAsset?: (assetId: string) => void;
  onReturnToHub?: () => void;
}

export function QuestionnaireManager({ 
  assetId, 
  onRerender, 
  onEdit, 
  initialConfig,
  researchPlanConfig,
  onNavigateToAsset,
  onReturnToHub
}: QuestionnaireManagerProps) {
  const [viewStatus, setViewStatus] = useState<'draft' | 'in-progress' | 'completed'>('in-progress');
  const [selectedQuestionnaireId, setSelectedQuestionnaireId] = useState<string | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newQuestionnaireName, setNewQuestionnaireName] = useState('');
  const [newQuestionnaireDescription, setNewQuestionnaireDescription] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('blank');
  
  // Available brand assets
  const availableAssets = [
    { id: 'vision-mission', name: 'Vision & Mission', icon: Target, type: 'Vision Statement' },
    { id: 'core-values', name: 'Core Values', icon: Heart, type: 'Core Values' },
    { id: 'brand-positioning', name: 'Brand Positioning', icon: TrendingUp, type: 'Brand Positioning' },
    { id: 'golden-circle', name: 'Golden Circle', icon: Target, type: 'Golden Circle' },
    { id: 'brand-archetype', name: 'Brand Archetype', icon: Users, type: 'Brand Archetype' },
    { id: 'social-relevancy', name: 'Social Relevancy', icon: Globe, type: 'Social Impact' },
    { id: 'trends', name: 'Industry Trends', icon: TrendingUp, type: 'Trends Analysis' }
  ];

  const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>([
    {
      id: 'q1',
      name: 'Brand Perception Survey',
      description: 'Quarterly survey to assess brand perception among stakeholders',
      status: 'collecting',
      createdDate: '2025-12-01',
      linkUrl: 'https://survey.brand.io/q/abc123',
      selectedAssets: ['vision-mission', 'core-values', 'brand-positioning'],
      questions: [
        {
          id: 'q1-1',
          text: 'How well does our brand align with your values?',
          type: 'rating',
          linkedAssetId: 'core-values',
          required: true
        },
        {
          id: 'q1-2',
          text: 'What comes to mind when you think of our brand?',
          type: 'text',
          linkedAssetId: 'brand-positioning',
          required: true
        },
        {
          id: 'q1-3',
          text: 'Which aspect of our brand resonates most with you?',
          type: 'multiple-choice',
          linkedAssetId: 'vision-mission',
          options: ['Innovation', 'Reliability', 'Sustainability', 'Community'],
          required: false
        }
      ],
      recipients: [
        {
          id: 'r1',
          name: 'Sarah Johnson',
          email: 'sarah.johnson@company.com',
          group: 'Internal Team',
          role: 'Marketing Director',
          linkSent: true,
          responsesReceived: true,
          responseDate: '2025-12-05'
        },
        {
          id: 'r2',
          name: 'Michael Chen',
          email: 'michael.chen@company.com',
          group: 'External Stakeholders',
          role: 'Key Customer',
          linkSent: true,
          responsesReceived: true,
          responseDate: '2025-12-06'
        },
        {
          id: 'r3',
          name: 'Emily Rodriguez',
          email: 'emily.rodriguez@partner.com',
          group: 'Partners',
          role: 'Strategic Partner',
          linkSent: true,
          responsesReceived: false
        },
        {
          id: 'r4',
          name: 'David Williams',
          email: 'david.williams@customer.com',
          group: 'External Stakeholders',
          role: 'Customer',
          linkSent: true,
          responsesReceived: false
        },
        {
          id: 'r5',
          name: 'Lisa Anderson',
          email: 'lisa.anderson@company.com',
          group: 'Internal Team',
          role: 'Product Manager',
          linkSent: false,
          responsesReceived: false
        }
      ],
      step: 5
    },
    {
      id: 'q2',
      name: 'Customer Experience Survey',
      description: 'Gathering insights on customer satisfaction and experience',
      status: 'draft',
      createdDate: '2025-12-10',
      selectedAssets: ['brand-archetype', 'social-relevancy'],
      questions: [
        {
          id: 'q2-1',
          text: 'How would you rate your overall experience with our brand?',
          type: 'rating',
          required: true
        },
        {
          id: 'q2-2',
          text: 'What improvements would you suggest?',
          type: 'textarea',
          required: false
        }
      ],
      recipients: [],
      step: 1
    }
  ]);

  const formatDateString = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getStatusBadge = (status: Questionnaire['status']) => {
    const variants = {
      draft: { color: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300', icon: FileText },
      collecting: { color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400', icon: Inbox },
      closed: { color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400', icon: XCircle },
      analyzed: { color: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400', icon: CheckCircle2 }
    };
    const variant = variants[status];
    const Icon = variant.icon;
    
    return (
      <Badge variant="secondary" className={`${variant.color} capitalize`}>
        <Icon className="h-3 w-3 mr-1" />
        {status}
      </Badge>
    );
  };

  const getResponseRate = (questionnaire: Questionnaire) => {
    if (questionnaire.recipients.length === 0) return 0;
    const responses = questionnaire.recipients.filter(r => r.responsesReceived).length;
    return Math.round((responses / questionnaire.recipients.length) * 100);
  };

  const getTotalQuestions = () => {
    return questionnaires.reduce((sum, q) => sum + q.questions.length, 0);
  };

  const getTotalRecipients = () => {
    return questionnaires.reduce((sum, q) => sum + q.recipients.length, 0);
  };

  const getTotalResponses = () => {
    return questionnaires.reduce((sum, q) => {
      return sum + q.recipients.filter(r => r.responsesReceived).length;
    }, 0);
  };

  const getOverallResponseRate = () => {
    const totalRecipients = getTotalRecipients();
    if (totalRecipients === 0) return 0;
    const totalResponses = getTotalResponses();
    return Math.round((totalResponses / totalRecipients) * 100);
  };

  // Filter questionnaires by status
  const filteredQuestionnaires = questionnaires.filter(q => {
    if (viewStatus === 'draft') return q.status === 'draft';
    if (viewStatus === 'in-progress') return q.status === 'collecting' || q.status === 'closed';
    if (viewStatus === 'completed') return q.status === 'analyzed';
    return true;
  });

  const handleCreateQuestionnaire = () => {
    if (!newQuestionnaireName.trim()) {
      toast.error('Please enter a questionnaire name');
      return;
    }

    const newQuestionnaire: Questionnaire = {
      id: `q${Date.now()}`,
      name: newQuestionnaireName,
      description: newQuestionnaireDescription,
      status: 'draft',
      createdDate: new Date().toISOString().split('T')[0],
      selectedAssets: [],
      questions: [],
      recipients: [],
      step: 1
    };

    setQuestionnaires([newQuestionnaire, ...questionnaires]);
    setSelectedQuestionnaireId(newQuestionnaire.id);
    setCreateModalOpen(false);
    setNewQuestionnaireName('');
    setNewQuestionnaireDescription('');
    setSelectedTemplate('blank');
    toast.success('Questionnaire created');
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-semibold mb-2">Questionnaire</h1>
              <p className="text-sm text-muted-foreground">
                Collect brand insights through structured surveys
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Select value={viewStatus} onValueChange={(value: any) => setViewStatus(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Button size="sm" onClick={() => setCreateModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Questionnaire
              </Button>
            </div>
          </div>

          {/* Stats Row */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">{getTotalQuestions()} Questions</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">{getTotalRecipients()} Recipients</span>
            </div>
            <div className="flex items-center gap-2">
              <Inbox className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">{getTotalResponses()} Responses</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">{getOverallResponseRate()}% Response Rate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-4">
          {filteredQuestionnaires.length === 0 ? (
            <Card className="rounded-xl">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <ClipboardList className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-semibold mb-2">No questionnaires found</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {viewStatus === 'draft' && 'No draft questionnaires yet'}
                  {viewStatus === 'in-progress' && 'No active questionnaires'}
                  {viewStatus === 'completed' && 'No completed questionnaires'}
                </p>
                <Button size="sm" onClick={() => setCreateModalOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Questionnaire
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredQuestionnaires.map((questionnaire) => {
              const isExpanded = selectedQuestionnaireId === questionnaire.id;
              const responseRate = getResponseRate(questionnaire);
              const respondedCount = questionnaire.recipients.filter(r => r.responsesReceived).length;

              return (
                <Card key={questionnaire.id} className="rounded-xl border border-border bg-card">
                  {/* Card Header */}
                  <div className="p-4 border-b border-border">
                    <div className="flex items-start justify-between">
                      {/* Left Side */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{questionnaire.name}</h3>
                          {getStatusBadge(questionnaire.status)}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <HelpCircle className="h-3 w-3" />
                            {questionnaire.questions.length} questions
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {questionnaire.recipients.length} recipients
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Created {formatDateString(questionnaire.createdDate)}
                          </span>
                        </div>
                      </div>

                      {/* Right Side */}
                      <div className="flex items-center gap-3">
                        {/* Response Rate Indicator */}
                        {questionnaire.recipients.length > 0 && (
                          <div className="flex items-center gap-2">
                            <div className="relative w-12 h-12">
                              <svg className="w-12 h-12 transform -rotate-90">
                                <circle
                                  cx="24"
                                  cy="24"
                                  r="20"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                  fill="none"
                                  className="text-muted"
                                />
                                <circle
                                  cx="24"
                                  cy="24"
                                  r="20"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                  fill="none"
                                  strokeDasharray={`${2 * Math.PI * 20}`}
                                  strokeDashoffset={`${2 * Math.PI * 20 * (1 - responseRate / 100)}`}
                                  className="text-primary transition-all"
                                />
                              </svg>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xs font-semibold">{responseRate}%</span>
                              </div>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {respondedCount}/{questionnaire.recipients.length}
                            </div>
                          </div>
                        )}

                        {/* Actions Menu */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="h-4 w-4 mr-2" />
                              Duplicate
                            </DropdownMenuItem>
                            {questionnaire.status === 'collecting' && (
                              <DropdownMenuItem>
                                <XCircle className="h-4 w-4 mr-2" />
                                Close Survey
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem className="text-red-600 dark:text-red-400">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>

                  {/* Card Content - Expandable */}
                  <Collapsible open={isExpanded} onOpenChange={(open) => setSelectedQuestionnaireId(open ? questionnaire.id : null)}>
                    <CollapsibleTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="w-full justify-between hover:bg-muted/50 rounded-none border-b border-border p-4"
                      >
                        <span className="flex items-center gap-2">
                          <Eye className="h-4 w-4" />
                          {isExpanded ? 'Hide Details' : 'View Details'}
                        </span>
                        <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="p-6 space-y-6">
                        {/* Horizontal Stepper */}
                        <div className="flex items-center justify-between py-4">
                          {[
                            { id: 1, label: 'Design', status: questionnaire.step >= 1 ? (questionnaire.step > 1 ? 'completed' : 'current') : 'upcoming' },
                            { id: 2, label: 'Distribution', status: questionnaire.step >= 2 ? (questionnaire.step > 2 ? 'completed' : 'current') : 'upcoming' },
                            { id: 3, label: 'Recipients', status: questionnaire.step >= 3 ? (questionnaire.step > 3 ? 'completed' : 'current') : 'upcoming' },
                            { id: 4, label: 'Collect', status: questionnaire.step >= 4 ? (questionnaire.step > 4 ? 'completed' : 'current') : 'upcoming' },
                            { id: 5, label: 'Analyze', status: questionnaire.step >= 5 ? 'current' : 'upcoming' }
                          ].map((step, index, array) => (
                            <React.Fragment key={step.id}>
                              {/* Step */}
                              <div className="flex items-center gap-2">
                                {/* Circle */}
                                {step.status === 'completed' ? (
                                  <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                                  </div>
                                ) : step.status === 'current' ? (
                                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                                    <span className="text-sm font-semibold text-primary-foreground">{step.id}</span>
                                  </div>
                                ) : (
                                  <div className="h-8 w-8 rounded-full bg-muted border border-border flex items-center justify-center">
                                    <span className="text-sm font-medium text-muted-foreground">{step.id}</span>
                                  </div>
                                )}
                                
                                {/* Label */}
                                <span className={`text-sm ${
                                  step.status === 'completed' ? 'font-medium text-green-600 dark:text-green-400' :
                                  step.status === 'current' ? 'font-semibold text-primary' :
                                  'text-muted-foreground'
                                }`}>
                                  {step.label}
                                </span>
                              </div>
                              
                              {/* Connector */}
                              {index < array.length - 1 && (
                                <div className={`flex-1 h-0.5 mx-3 ${
                                  step.status === 'completed' ? 'bg-green-500 dark:bg-green-600' : 'bg-border'
                                }`} />
                              )}
                            </React.Fragment>
                          ))}
                        </div>

                        {/* Locked Banner */}
                        {(questionnaire.status === 'analyzed' || questionnaire.lockStatus === 'locked') && (
                          <div className="rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 px-4 py-3 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Lock className="h-5 w-5 text-amber-600 dark:text-amber-500" />
                              <span className="text-sm text-amber-800 dark:text-amber-200">
                                This questionnaire is locked. Unlock to make changes.
                              </span>
                            </div>
                            <button 
                              onClick={() => {
                                setQuestionnaires(questionnaires.map(q =>
                                  q.id === questionnaire.id ? { ...q, lockStatus: undefined, status: 'closed' } : q
                                ));
                                toast.success('Questionnaire unlocked');
                              }}
                              className="text-sm font-medium text-primary hover:underline"
                            >
                              Unlock Questionnaire
                            </button>
                          </div>
                        )}

                        {/* Divider */}
                        <div className="border-t border-border pt-4">
                          {/* Step Content */}
                          {questionnaire.step === 1 && (
                            <QuestionnaireStep1Design
                              questionnaire={questionnaire}
                              onUpdate={(field, value) => {
                                setQuestionnaires(questionnaires.map(q =>
                                  q.id === questionnaire.id ? { ...q, [field]: value } : q
                                ));
                              }}
                              onContinue={() => {
                                setQuestionnaires(questionnaires.map(q =>
                                  q.id === questionnaire.id ? { ...q, step: 2 } : q
                                ));
                                toast.success('Moving to distribution settings');
                              }}
                              onBack={() => {
                                // Optional back handler
                              }}
                            />
                          )}

                          {questionnaire.step === 2 && (
                            <QuestionnaireStep2Distribution
                              questionnaire={questionnaire}
                              onUpdate={(field, value) => {
                                setQuestionnaires(questionnaires.map(q =>
                                  q.id === questionnaire.id ? { ...q, [field]: value } : q
                                ));
                              }}
                              onContinue={() => {
                                setQuestionnaires(questionnaires.map(q =>
                                  q.id === questionnaire.id ? { ...q, step: 3 } : q
                                ));
                                toast.success('Moving to recipient management');
                              }}
                              onBack={() => {
                                setQuestionnaires(questionnaires.map(q =>
                                  q.id === questionnaire.id ? { ...q, step: 1 } : q
                                ));
                              }}
                            />
                          )}

                          {questionnaire.step === 3 && (
                            <QuestionnaireStep3Recipients
                              questionnaire={questionnaire}
                              onUpdate={(field, value) => {
                                setQuestionnaires(questionnaires.map(q =>
                                  q.id === questionnaire.id ? { ...q, [field]: value } : q
                                ));
                              }}
                              onContinue={() => {
                                setQuestionnaires(questionnaires.map(q =>
                                  q.id === questionnaire.id ? { ...q, step: 4 } : q
                                ));
                                toast.success('Moving to collection phase');
                              }}
                              onBack={() => {
                                setQuestionnaires(questionnaires.map(q =>
                                  q.id === questionnaire.id ? { ...q, step: 2 } : q
                                ));
                              }}
                            />
                          )}

                          {questionnaire.step === 4 && (
                            <QuestionnaireStep4Collect
                              questionnaire={questionnaire}
                              onUpdate={(field, value) => {
                                setQuestionnaires(questionnaires.map(q =>
                                  q.id === questionnaire.id ? { ...q, [field]: value } : q
                                ));
                              }}
                              onContinue={() => {
                                setQuestionnaires(questionnaires.map(q =>
                                  q.id === questionnaire.id ? { ...q, step: 5, status: 'closed' } : q
                                ));
                                toast.success('Moving to analysis');
                              }}
                              onBack={() => {
                                setQuestionnaires(questionnaires.map(q =>
                                  q.id === questionnaire.id ? { ...q, step: 3 } : q
                                ));
                              }}
                            />
                          )}

                          {questionnaire.step === 5 && (
                            <QuestionnaireAnalyzeResults
                              questionnaire={questionnaire}
                              onUnlock={() => {
                                setQuestionnaires(questionnaires.map(q =>
                                  q.id === questionnaire.id ? { ...q, lockStatus: undefined, status: 'closed' } : q
                                ));
                                toast.success('Questionnaire unlocked');
                              }}
                              onValidate={() => {
                                setQuestionnaires(questionnaires.map(q =>
                                  q.id === questionnaire.id ? { ...q, status: 'analyzed', lockStatus: 'locked' } : q
                                ));
                                toast.success('Questionnaire validated and locked');
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              );
            })
          )}
        </div>
      </div>

      {/* Create Questionnaire Modal */}
      <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
        <DialogContent className="sm:max-w-[425px] p-0 gap-0 rounded-2xl">
          <DialogHeader className="px-6 pt-6 pb-4">
            <DialogTitle className="text-xl font-semibold">Create New Questionnaire</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground mt-1">
              Add a new questionnaire to collect brand insights.
            </DialogDescription>
          </DialogHeader>
          <div className="px-6 py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">Name</Label>
              <Input
                id="name"
                placeholder="Brand Perception Survey"
                value={newQuestionnaireName}
                onChange={(e) => setNewQuestionnaireName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">Description</Label>
              <Textarea
                id="description"
                placeholder="Quarterly survey to assess brand perception among stakeholders"
                value={newQuestionnaireDescription}
                onChange={(e) => setNewQuestionnaireDescription(e.target.value)}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="template" className="text-sm font-medium">Template</Label>
              <Select
                value={selectedTemplate}
                onValueChange={setSelectedTemplate}
              >
                <SelectTrigger id="template">
                  <SelectValue placeholder="Select a template">
                    {selectedTemplate}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="blank">Blank</SelectItem>
                  <SelectItem value="brand-perception">Brand Perception</SelectItem>
                  <SelectItem value="customer-experience">Customer Experience</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="px-6 py-4 border-t border-border flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleCreateQuestionnaire}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}