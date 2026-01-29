/**
 * Enhanced Interviews Manager met Asset-Vraag Koppeling
 * Volledige implementatie van alle 8 verbeteringen
 */

import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '../ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { 
  Users,
  CheckCircle2,
  Calendar,
  Clock,
  Plus,
  Eye,
  Mail,
  Phone,
  Edit,
  Trash2,
  MoreVertical,
  MessageCircle,
  Lightbulb,
  ChevronDown,
  ChevronRight,
  Timer,
  Layers,
  GripVertical,
  Pencil,
  X,
  Target,
  Heart,
  Globe,
  Sparkles,
  FileText,
  BookOpen,
  Loader2,
  AlertCircle,
  Download,
  Lock,
  Unlock,
} from 'lucide-react';
import { StatusDropdown, ExtendedStatus } from '../research/StatusDropdown';
import { formatDate } from '../../utils/datetime-format';
import { toast } from 'sonner@2.0.3';

interface Question {
  id: string;
  text: string;
  type: 'open' | 'multiple-choice' | 'multi-select' | 'rating' | 'ranking';
  assetId?: string; // Optional - linked to brand asset
  options?: string[];
  source: 'template' | 'ai-generated' | 'custom';
  order: number;
}

interface Interview {
  id: string;
  name: string;
  interviewee: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  date: string;
  time: string;
  duration: number;
  selectedAssets: string[];
  questions: Question[];
  answers: Record<string, string | string[]>;
  notes: string;
  status: 'to-schedule' | 'scheduled' | 'interview-held' | 'results-added' | 'completed';
  isLocked?: boolean;
}

interface BrandAsset {
  id: string;
  name: string;
  category: string;
  icon: any;
  questionCount: number;
}

// Mock brand assets
const mockAssets: BrandAsset[] = [
  { id: '1', name: 'Golden Circle', category: 'Foundation', icon: Target, questionCount: 4 },
  { id: '2', name: 'Core Values', category: 'Foundation', icon: Heart, questionCount: 3 },
  { id: '3', name: 'Brand Positioning', category: 'Strategy', icon: Globe, questionCount: 5 },
  { id: '4', name: 'Brand Personality', category: 'Expression', icon: Sparkles, questionCount: 2 },
];

// Question templates grouped by asset type
const questionTemplates: Record<string, Question[]> = {
  '1': [ // Golden Circle
    { id: 'tpl-1-1', text: 'What do you believe is our core purpose (WHY)?', type: 'open', assetId: '1', source: 'template', order: 0 },
    { id: 'tpl-1-2', text: 'How would you describe our unique approach (HOW)?', type: 'open', assetId: '1', source: 'template', order: 1 },
    { id: 'tpl-1-3', text: 'What products or services do you most associate with us (WHAT)?', type: 'open', assetId: '1', source: 'template', order: 2 },
    { id: 'tpl-1-4', text: 'How does our purpose align with your own values?', type: 'rating', assetId: '1', source: 'template', order: 3 },
  ],
  '2': [ // Core Values
    { id: 'tpl-2-1', text: 'What values do you most associate with our brand?', type: 'open', assetId: '2', source: 'template', order: 0 },
    { id: 'tpl-2-2', text: 'Which company value resonates most strongly with you?', type: 'multiple-choice', assetId: '2', source: 'template', order: 1, options: ['Innovation', 'Integrity', 'Customer Focus', 'Excellence'] },
    { id: 'tpl-2-3', text: 'Can you share an experience where you saw our values in action?', type: 'open', assetId: '2', source: 'template', order: 2 },
  ],
  '3': [ // Brand Positioning
    { id: 'tpl-3-1', text: 'How would you describe our brand in one sentence?', type: 'open', assetId: '3', source: 'template', order: 0 },
    { id: 'tpl-3-2', text: 'What makes us different from competitors?', type: 'open', assetId: '3', source: 'template', order: 1 },
    { id: 'tpl-3-3', text: 'Who do you see as our ideal customer?', type: 'open', assetId: '3', source: 'template', order: 2 },
    { id: 'tpl-3-4', text: 'What problem do we solve better than anyone else?', type: 'open', assetId: '3', source: 'template', order: 3 },
  ],
  '4': [ // Brand Personality
    { id: 'tpl-4-1', text: 'If our brand were a person, what three words would describe them?', type: 'open', assetId: '4', source: 'template', order: 0 },
    { id: 'tpl-4-2', text: 'How would our brand behave at a dinner party?', type: 'open', assetId: '4', source: 'template', order: 1 },
  ],
  'general': [
    { id: 'tpl-gen-1', text: 'How did you first hear about us?', type: 'open', source: 'template', order: 0 },
    { id: 'tpl-gen-2', text: 'What would you miss most if we didn\'t exist?', type: 'open', source: 'template', order: 1 },
    { id: 'tpl-gen-3', text: 'If you could change one thing about us, what would it be?', type: 'open', source: 'template', order: 2 },
    { id: 'tpl-gen-4', text: 'What should we absolutely keep doing?', type: 'open', source: 'template', order: 3 },
  ],
};

interface InterviewsManagerEnhancedProps {
  assetId: string;
}

export function InterviewsManagerEnhanced({ assetId }: InterviewsManagerEnhancedProps) {
  const [researchStatus, setResearchStatus] = useState<ExtendedStatus>('in_progress');
  const [interviews, setInterviews] = useState<Interview[]>([
    {
      id: '1',
      name: 'Leadership Interview #1',
      interviewee: 'John Smith',
      email: 'john.smith@company.com',
      phone: '+1 (555) 123-4567',
      company: 'TechCorp Inc.',
      position: 'CEO',
      date: '2026-01-19',
      time: '10:00',
      duration: 45,
      selectedAssets: ['1', '2'],
      questions: [
        { id: 'q1', text: 'What do you believe is our core purpose (WHY)?', type: 'open', assetId: '1', source: 'template', order: 0 },
        { id: 'q2', text: 'How would you describe our unique approach (HOW)?', type: 'open', assetId: '1', source: 'template', order: 1 },
        { id: 'q3', text: 'What values do you most associate with our brand?', type: 'open', assetId: '2', source: 'template', order: 2 },
      ],
      answers: {
        'q1': 'To empower businesses through innovation and technology',
        'q2': 'Human-centered design with cutting-edge technology',
      },
      notes: '',
      status: 'completed',
      isLocked: true,
    },
    {
      id: '2',
      name: 'Leadership Interview #2',
      interviewee: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      phone: '+1 (555) 234-5678',
      company: 'TechCorp Inc.',
      position: 'CMO',
      date: '2026-01-22',
      time: '14:30',
      duration: 60,
      selectedAssets: ['1', '3'],
      questions: [],
      answers: {},
      notes: '',
      status: 'scheduled',
    },
  ]);

  const [selectedInterviewId, setSelectedInterviewId] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [addQuestionModalOpen, setAddQuestionModalOpen] = useState(false);
  const [templateLibraryOpen, setTemplateLibraryOpen] = useState(false);
  const [unlockModalOpen, setUnlockModalOpen] = useState(false);
  const [unlockReason, setUnlockReason] = useState('');
  const [contextAssetId, setContextAssetId] = useState<string | null>(null);
  const [addedTemplateIds, setAddedTemplateIds] = useState<Set<string>>(new Set());
  const [newQuestion, setNewQuestion] = useState<Partial<Question>>({
    type: 'open',
    source: 'custom',
    options: [],
  });
  const [expandedAssets, setExpandedAssets] = useState<Record<string, boolean>>({});
  
  // ✅ TAAK 7: Auto-save state
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // ✅ TAAK 7: Auto-save simulation
  useEffect(() => {
    if (saveStatus === 'saving') {
      const timer = setTimeout(() => {
        setSaveStatus('saved');
        setLastSaved(new Date());
        
        // Reset to idle after 2 seconds
        setTimeout(() => setSaveStatus('idle'), 2000);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [saveStatus]);

  // Trigger save when interviews change
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (interviews.length > 0) {
        setSaveStatus('saving');
      }
    }, 1000);
    
    return () => clearTimeout(debounceTimer);
  }, [interviews]);

  const selectedInterview = interviews.find(i => i.id === selectedInterviewId);

  // Calculate stats
  const toScheduleCount = interviews.filter(i => i.status === 'to-schedule').length;
  const scheduledCount = interviews.filter(i => i.status === 'scheduled').length;
  const completedCount = interviews.filter(i => i.status === 'completed').length;
  const inReviewCount = interviews.filter(i => i.status === 'results-added').length;

  const handleAddQuestion = () => {
    if (!selectedInterview || !newQuestion.text) return;

    const question: Question = {
      id: `q-${Date.now()}`,
      text: newQuestion.text,
      type: newQuestion.type || 'open',
      assetId: newQuestion.assetId,
      options: newQuestion.options,
      source: 'custom',
      order: selectedInterview.questions.length,
    };

    setInterviews(interviews.map(i => 
      i.id === selectedInterviewId 
        ? { ...i, questions: [...i.questions, question] }
        : i
    ));

    setNewQuestion({ type: 'open', source: 'custom', options: [] });
    setAddQuestionModalOpen(false);
    toast.success('Question added');
  };

  const handleAddTemplateQuestion = (template: Question) => {
    if (!selectedInterview) return;

    // If there's a context asset, automatically assign the question to it
    const assetId = contextAssetId || template.assetId;
    
    const question: Question = {
      ...template,
      id: `q-${Date.now()}`,
      assetId: assetId,
      order: selectedInterview.questions.length,
    };

    setInterviews(interviews.map(i => 
      i.id === selectedInterviewId 
        ? { ...i, questions: [...i.questions, question] }
        : i
    ));

    // Mark template as added for checkmark animation
    setAddedTemplateIds(prev => new Set([...prev, template.id]));
    setTimeout(() => {
      setAddedTemplateIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(template.id);
        return newSet;
      });
    }, 2000);

    // Context-aware toast message
    if (contextAssetId) {
      const asset = getAssetById(contextAssetId);
      toast.success(`Question added to ${asset?.name || 'asset'}`);
    } else {
      toast.success('Template question added');
    }
  };

  const handleRemoveQuestion = (questionId: string) => {
    if (!selectedInterview) return;

    setInterviews(interviews.map(i => 
      i.id === selectedInterviewId 
        ? { ...i, questions: i.questions.filter(q => q.id !== questionId) }
        : i
    ));
  };

  const handleUnlockInterview = () => {
    if (!selectedInterview) return;

    setInterviews(interviews.map(i => 
      i.id === selectedInterviewId 
        ? { ...i, isLocked: false, status: 'results-added' as const }
        : i
    ));

    setUnlockModalOpen(false);
    setUnlockReason('');
    toast.success('Interview unlocked for editing');

    toast.success('Question removed');
  };

  const handleAddInterview = () => {
    const newInterview: Interview = {
      id: `interview-${Date.now()}`,
      name: `Interview #${interviews.length + 1}`,
      interviewee: '',
      email: '',
      phone: '',
      company: '',
      position: '',
      date: new Date().toISOString().split('T')[0],
      time: '10:00',
      duration: 60,
      selectedAssets: [],
      questions: [],
      answers: {},
      notes: '',
      status: 'to-schedule',
    };
    
    setInterviews([...interviews, newInterview]);
    setSelectedInterviewId(newInterview.id);
    toast.success('Interview created');
  };

  const handleDeleteInterview = (interviewId: string) => {
    setInterviews(interviews.filter(i => i.id !== interviewId));
    if (selectedInterviewId === interviewId) {
      setSelectedInterviewId(null);
    }
    toast.success('Interview deleted');
  };

  const handleDuplicateInterview = (interviewId: string) => {
    const interview = interviews.find(i => i.id === interviewId);
    if (!interview) return;

    const duplicated: Interview = {
      ...interview,
      id: `interview-${Date.now()}`,
      name: `${interview.name} (Copy)`,
      status: 'to-schedule',
    };

    setInterviews([...interviews, duplicated]);
    toast.success('Interview duplicated');
  };

  const handleExportNotes = (interviewId: string) => {
    const interview = interviews.find(i => i.id === interviewId);
    if (!interview) return;

    toast.success('Notes exported (demo)');
  };

  const groupQuestionsByAsset = (questions: Question[]) => {
    const groups: Record<string, Question[]> = {};
    
    questions.forEach(q => {
      const key = q.assetId || 'general';
      if (!groups[key]) groups[key] = [];
      groups[key].push(q);
    });

    return groups;
  };

  const getAssetById = (id: string) => mockAssets.find(a => a.id === id);

  // Get organized template categories
  const getOrganizedTemplates = () => {
    const categories = [
      { id: '1', name: 'Golden Circle Templates', icon: Target },
      { id: '2', name: 'Core Values Templates', icon: Heart },
      { id: '3', name: 'Brand Positioning Templates', icon: Globe },
      { id: '4', name: 'Brand Personality Templates', icon: Sparkles },
      { id: 'general', name: 'General Interview Templates', icon: MessageCircle },
    ];

    // If there's a context asset, move it to the front as recommended
    if (contextAssetId) {
      const contextIndex = categories.findIndex(c => c.id === contextAssetId);
      if (contextIndex > -1) {
        const [contextCategory] = categories.splice(contextIndex, 1);
        categories.unshift(contextCategory);
      }
    }

    // Also prioritize categories for selected assets
    if (selectedInterview) {
      const selectedAssetIds = selectedInterview.selectedAssets;
      const recommended = categories.filter(c => selectedAssetIds.includes(c.id));
      const others = categories.filter(c => !selectedAssetIds.includes(c.id));
      return { recommended, others };
    }

    return { recommended: [], others: categories };
  };

  // ✅ TAAK 8: Check step completion
  const isStepCompleted = (interview: Interview, stepNum: number) => {
    switch (stepNum) {
      case 1: // Contact info
        return Boolean(interview.interviewee && interview.email && interview.company && interview.position);
      case 2: // Schedule (ALLEEN date, time, duration)
        return Boolean(interview.date && interview.time);
      case 3: // Questions (assets + questions)
        return interview.selectedAssets.length > 0 && interview.questions.length > 0;
      case 4: // Conduct
        return interview.status === 'interview-held' || interview.status === 'results-added' || interview.status === 'completed';
      case 5: // Review
        return interview.status === 'completed';
      default:
        return false;
    }
  };

  // ✅ TAAK 8: Get step status
  const getStepStatus = (interview: Interview, stepNum: number) => {
    if (isStepCompleted(interview, stepNum)) return 'completed';
    if (currentStep === stepNum) return 'current';
    
    // Check if step is locked (previous step not completed)
    if (stepNum > 1 && !isStepCompleted(interview, stepNum - 1)) return 'locked';
    
    return 'upcoming';
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 p-6">
      {/* ✅ TAAK 1: Page Header Verbetering */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold">Interviews</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Conduct structured interviews with stakeholders
              </p>
            </div>
          </div>
          
          <StatusDropdown
            variant="extended"
            currentStatus={researchStatus}
            onChange={(newStatus) => setResearchStatus(newStatus as ExtendedStatus)}
          />
        </div>

        {/* Stats row met legend */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            <div className="text-2xl font-semibold">{interviews.length} Interviews</div>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-gray-500" />
                <span className="text-sm text-muted-foreground">{toScheduleCount} To Schedule</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-500" />
                <span className="text-sm text-muted-foreground">{scheduledCount} Scheduled</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-sm text-muted-foreground">{completedCount} Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-purple-500" />
                <span className="text-sm text-muted-foreground">{inReviewCount} In Review</span>
              </div>
            </div>
          </div>
          
          <Button onClick={handleAddInterview}>
            <Plus className="h-4 w-4 mr-2" />
            Add Interview
          </Button>
        </div>
      </div>

      {/* Interview Cards */}
      <div className="space-y-4">
        {interviews.map(interview => (
          <Card key={interview.id} className="overflow-hidden p-0">
            {/* ✅ TAAK 1 & 2: Interview Card Header met consistente padding */}
            <div className="px-6 py-4 border-b border-border">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold">{interview.name}</h3>
                    {interview.isLocked && (
                      <Lock className="h-4 w-4 text-amber-600" />
                    )}
                    <Badge 
                      className={
                        interview.status === 'to-schedule' ? 'bg-gray-100 text-gray-700' :
                        interview.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                        interview.status === 'interview-held' ? 'bg-amber-100 text-amber-700' :
                        interview.status === 'results-added' ? 'bg-purple-100 text-purple-700' :
                        'bg-green-100 text-green-700'
                      }
                    >
                      {interview.status === 'to-schedule' ? 'To Schedule' :
                       interview.status === 'scheduled' ? 'Scheduled' :
                       interview.status === 'interview-held' ? 'Interview Held' :
                       interview.status === 'results-added' ? 'Results Added' :
                       'Completed'}
                    </Badge>
                    {interview.isLocked && (
                      <Badge className="bg-amber-100 text-amber-600">
                        Locked
                      </Badge>
                    )}
                  </div>
                  
                  {/* ✅ TAAK 9: Conditional rendering voor contact info */}
                  <p className="text-sm text-muted-foreground mt-1">
                    {interview.interviewee ? (
                      <>
                        {interview.interviewee}
                        {interview.position && ` - ${interview.position}`}
                        {interview.company && ` at ${interview.company}`}
                      </>
                    ) : (
                      <span className="italic">Contact details not added</span>
                    )}
                  </p>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                    {interview.date ? (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(interview.date)} • {interview.time} • {interview.duration} min
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 italic">
                        Not scheduled
                      </div>
                    )}
                    {interview.selectedAssets.length > 0 ? (
                      <div className="flex items-center gap-1">
                        <Layers className="h-3 w-3" />
                        {interview.selectedAssets.length} assets
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 italic">
                        No assets selected
                      </div>
                    )}
                  </div>
                  
                  {/* ✅ TAAK 9: Alleen tonen als data beschikbaar */}
                  {(interview.email || interview.phone) && (
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                      {interview.email && (
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {interview.email}
                        </div>
                      )}
                      {interview.phone && (
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {interview.phone}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setSelectedInterviewId(interview.id)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {interview.isLocked && (
                        <>
                          <DropdownMenuItem onClick={() => {
                            setSelectedInterviewId(interview.id);
                            setUnlockModalOpen(true);
                          }}>
                            <Unlock className="h-4 w-4 mr-2" />
                            Unlock Interview
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                        </>
                      )}
                      <DropdownMenuItem onClick={() => toast.info('Edit interview details (demo)')}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDuplicateInterview(interview.id)}>
                        <FileText className="h-4 w-4 mr-2" />
                        Duplicate Interview
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleExportNotes(interview.id)}>
                        <BookOpen className="h-4 w-4 mr-2" />
                        Export Notes
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="text-destructive"
                        onClick={() => handleDeleteInterview(interview.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>

            {/* Quick preview of progress */}
            {selectedInterviewId === interview.id && (
              <div className="px-6 py-4">
                {/* ✅ TAAK 7: Auto-save indicator */}
                <div className="flex items-center justify-end mb-4">
                  {saveStatus === 'saving' && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      Saving...
                    </div>
                  )}
                  {saveStatus === 'saved' && lastSaved && (
                    <div className="flex items-center gap-2 text-xs text-green-600">
                      <CheckCircle2 className="h-3 w-3" />
                      All changes saved
                      <span className="text-muted-foreground">• {lastSaved.toLocaleTimeString()}</span>
                    </div>
                  )}
                  {saveStatus === 'error' && (
                    <div className="flex items-center gap-2 text-xs text-red-600">
                      <X className="h-3 w-3" />
                      Failed to save
                      <Button variant="link" size="sm" className="h-auto p-0 text-xs text-red-600">
                        Retry
                      </Button>
                    </div>
                  )}
                </div>

                {/* ✅ TAAK 3 & 8: Workflow Steps met Completion Status */}
                <div className="space-y-6">
                  {/* ✅ TAAK 8: Step indicators met dynamic completion */}
                  <div className="flex items-center gap-4">
                    {[
                      { num: 1, label: 'Contact' },
                      { num: 2, label: 'Schedule' },
                      { num: 3, label: 'Questions' },
                      { num: 4, label: 'Conduct' },
                      { num: 5, label: 'Review' },
                    ].map((step, idx) => {
                      const status = getStepStatus(interview, step.num);
                      const isClickable = status === 'completed' || status === 'current';
                      
                      return (
                        <React.Fragment key={step.num}>
                          <div 
                            className={`flex items-center gap-2 transition-colors ${
                              isClickable ? 'cursor-pointer' : 'cursor-not-allowed'
                            } ${currentStep === step.num ? 'text-primary' : ''}`}
                            onClick={() => {
                              if (isClickable) {
                                setCurrentStep(step.num);
                              } else {
                                toast.info('Complete previous steps first');
                              }
                            }}
                            title={status === 'locked' ? 'Complete previous steps first' : ''}
                          >
                            <div className={`h-8 w-8 rounded-full flex items-center justify-center transition-colors ${
                              status === 'completed' ? 'bg-green-100 text-green-600' :
                              status === 'current' ? 'bg-primary text-white' :
                              status === 'locked' ? 'bg-muted text-muted-foreground opacity-50' :
                              'bg-muted text-muted-foreground'
                            }`}>
                              {status === 'completed' ? (
                                <CheckCircle2 className="h-4 w-4" />
                              ) : (
                                <span className="text-xs font-semibold">{step.num}</span>
                              )}
                            </div>
                            <span className={`text-sm ${
                              status === 'completed' ? 'font-medium text-green-600' :
                              status === 'current' ? 'font-semibold text-primary' :
                              'text-muted-foreground'
                            }`}>
                              {step.label}
                            </span>
                          </div>
                          {idx < 4 && (
                            <div className={`h-0.5 flex-1 ${
                              status === 'completed' ? 'bg-green-500' : 'bg-border'
                            }`} />
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>

                  <Separator />

                  {/* Step content */}
                  {currentStep === 1 && (
                    <div className="py-4 space-y-4">
                      {/* Locked banner */}
                      {interview.isLocked && (
                        <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 flex items-center gap-3">
                          <Lock className="h-4 w-4 text-amber-600 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="text-sm text-amber-900">
                              This interview is locked. Unlock to make changes.
                            </p>
                          </div>
                          <button
                            className="text-sm font-medium text-primary hover:underline"
                            onClick={() => setUnlockModalOpen(true)}
                          >
                            Unlock Interview
                          </button>
                        </div>
                      )}

                      {/* ✅ TAAK 2: Contact Information Form */}
                      <div>
                        <h4 className="text-base font-semibold">Contact Information</h4>
                        <p className="text-sm text-muted-foreground">Enter interviewee details</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {/* Row 1 */}
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Interviewee Name</Label>
                          <Input
                            placeholder="e.g., Sarah Johnson"
                            value={interview.interviewee}
                            disabled={interview.isLocked}
                            onChange={(e) => {
                              setInterviews(interviews.map(i =>
                                i.id === interview.id ? { ...i, interviewee: e.target.value } : i
                              ));
                            }}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Position</Label>
                          <Input
                            placeholder="e.g., CMO"
                            value={interview.position}
                            disabled={interview.isLocked}
                            onChange={(e) => {
                              setInterviews(interviews.map(i =>
                                i.id === interview.id ? { ...i, position: e.target.value } : i
                              ));
                            }}
                          />
                        </div>

                        {/* Row 2 */}
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Email</Label>
                          <Input
                            type="email"
                            placeholder="e.g., sarah@company.com"
                            value={interview.email}
                            disabled={interview.isLocked}
                            onChange={(e) => {
                              setInterviews(interviews.map(i =>
                                i.id === interview.id ? { ...i, email: e.target.value } : i
                              ));
                            }}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Phone (optional)</Label>
                          <Input
                            type="tel"
                            placeholder="e.g., +1 (555) 234-5678"
                            value={interview.phone}
                            disabled={interview.isLocked}
                            onChange={(e) => {
                              setInterviews(interviews.map(i =>
                                i.id === interview.id ? { ...i, phone: e.target.value } : i
                              ));
                            }}
                          />
                        </div>

                        {/* Row 3 */}
                        <div className="col-span-2 space-y-2">
                          <Label className="text-sm font-medium">Company</Label>
                          <Input
                            placeholder="e.g., TechCorp Inc."
                            value={interview.company}
                            disabled={interview.isLocked}
                            onChange={(e) => {
                              setInterviews(interviews.map(i =>
                                i.id === interview.id ? { ...i, company: e.target.value } : i
                              ));
                            }}
                          />
                        </div>
                      </div>

                      <div className="flex justify-end mt-6">
                        <Button
                          onClick={() => {
                            if (isStepCompleted(interview, 1)) {
                              setCurrentStep(2);
                              toast.success('Contact saved');
                            } else {
                              toast.error('Please fill in all required fields');
                            }
                          }}
                        >
                          Save Contact
                        </Button>
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="py-4 space-y-4">
                      {/* Locked banner */}
                      {interview.isLocked && (
                        <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 flex items-center gap-3">
                          <Lock className="h-4 w-4 text-amber-600 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="text-sm text-amber-900">
                              This interview is locked. Unlock to make changes.
                            </p>
                          </div>
                          <button
                            className="text-sm font-medium text-primary hover:underline"
                            onClick={() => setUnlockModalOpen(true)}
                          >
                            Unlock Interview
                          </button>
                        </div>
                      )}

                      {/* STEP 2: SCHEDULE (alleen planning) */}
                      <div>
                        <h4 className="text-base font-semibold">Interview Schedule</h4>
                        <p className="text-sm text-muted-foreground">Set date, time, and duration</p>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Date</Label>
                          <Input
                            type="date"
                            value={interview.date}
                            onChange={(e) => {
                              setInterviews(interviews.map(i =>
                                i.id === interview.id ? { ...i, date: e.target.value } : i
                              ));
                            }}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Time</Label>
                          <Input
                            type="time"
                            value={interview.time}
                            onChange={(e) => {
                              setInterviews(interviews.map(i =>
                                i.id === interview.id ? { ...i, time: e.target.value } : i
                              ));
                            }}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Duration (min)</Label>
                          <Select
                            value={String(interview.duration)}
                            onValueChange={(value) => {
                              setInterviews(interviews.map(i =>
                                i.id === interview.id ? { ...i, duration: Number(value) } : i
                              ));
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="30">30 min</SelectItem>
                              <SelectItem value="45">45 min</SelectItem>
                              <SelectItem value="60">60 min</SelectItem>
                              <SelectItem value="90">90 min</SelectItem>
                              <SelectItem value="120">120 min</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="flex justify-end mt-6">
                        <Button
                          onClick={() => {
                            if (isStepCompleted(interview, 2)) {
                              setCurrentStep(3);
                              toast.success('Schedule saved');
                            } else {
                              toast.error('Please complete all schedule fields');
                            }
                          }}
                        >
                          Save Schedule
                        </Button>
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="py-4 space-y-6">
                      {/* Locked banner */}
                      {interview.isLocked && (
                        <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 flex items-center gap-3">
                          <Lock className="h-4 w-4 text-amber-600 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="text-sm text-amber-900">
                              This interview is locked. Unlock to make changes.
                            </p>
                          </div>
                          <button
                            className="text-sm font-medium text-primary hover:underline"
                            onClick={() => setUnlockModalOpen(true)}
                          >
                            Unlock Interview
                          </button>
                        </div>
                      )}

                      {/* STEP 3: QUESTIONS (assets + vragen samen) */}
                      
                      {/* SECTIE A: Brand Assets to Discuss */}
                      <div>
                        <h4 className="text-base font-semibold">Brand Assets to Discuss</h4>
                        <p className="text-sm text-muted-foreground">
                          Select which brand assets to cover in this interview
                        </p>
                      </div>

                      {/* Asset cards */}
                      <div className="space-y-3">
                        {mockAssets.map(asset => {
                          const AssetIcon = asset.icon;
                          const isExpanded = expandedAssets[asset.id];
                          const assetQuestions = interview.questions.filter(q => q.assetId === asset.id);
                          const isSelected = interview.selectedAssets.includes(asset.id);

                          return (
                            <div key={asset.id}>
                              <div className={`p-4 rounded-xl ${isSelected ? 'border-2 border-primary bg-primary/5' : 'border border-border bg-card'}`}>
                                <div className="flex justify-between items-start">
                                  <div className="flex items-center gap-3">
                                    <Checkbox 
                                      checked={interview.selectedAssets.includes(asset.id)}
                                      onCheckedChange={(checked) => {
                                        if (checked) {
                                          setInterviews(interviews.map(i =>
                                            i.id === interview.id
                                              ? { ...i, selectedAssets: [...i.selectedAssets, asset.id] }
                                              : i
                                          ));
                                        } else {
                                          setInterviews(interviews.map(i =>
                                            i.id === interview.id
                                              ? { ...i, selectedAssets: i.selectedAssets.filter(id => id !== asset.id) }
                                              : i
                                          ));
                                        }
                                      }}
                                    />
                                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                      <AssetIcon className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                      <div className="text-sm font-semibold">{asset.name}</div>
                                      <div className="text-xs text-muted-foreground">{asset.category}</div>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <span className="text-xs text-muted-foreground">
                                      {assetQuestions.length} questions
                                    </span>
                                    <Button
                                      variant="link"
                                      size="sm"
                                      className="h-auto p-0 text-xs"
                                      onClick={() => setExpandedAssets({ ...expandedAssets, [asset.id]: !isExpanded })}
                                    >
                                      {isExpanded ? 'Hide' : 'View'}
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      onClick={() => {
                                        setContextAssetId(asset.id);
                                        setTemplateLibraryOpen(true);
                                      }}
                                    >
                                      <Plus className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>

                                {/* Expandable questions preview */}
                                {isExpanded && assetQuestions.length > 0 && (
                                  <div className="mt-3 pt-3 border-t border-border space-y-2">
                                    {assetQuestions.map((q, idx) => (
                                      <div key={q.id} className="flex items-start gap-2">
                                        <span className="text-sm text-muted-foreground">Q{idx + 1}:</span>
                                        <span className="text-sm text-muted-foreground flex-1">{q.text}</span>
                                        <Badge 
                                          className={
                                            q.source === 'template' ? 'bg-blue-100 text-blue-700' :
                                            q.source === 'ai-generated' ? 'bg-purple-100 text-purple-700' :
                                            'bg-gray-100 text-gray-700'
                                          }
                                        >
                                          {q.source === 'template' ? 'Template' :
                                           q.source === 'ai-generated' ? 'AI' :
                                           'Custom'}
                                        </Badge>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <Separator />

                      {/* SECTIE B: Questions per Asset (alleen voor geselecteerde assets) */}
                      <div className="rounded-xl border bg-card p-6">
                        <div className="flex justify-between items-center mb-6">
                          <div>
                            <h4 className="text-lg font-semibold">Interview Questions</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              Configure questions for each selected asset
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button 
                              size="sm"
                              onClick={() => setAddQuestionModalOpen(true)}
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Add Question
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                setContextAssetId(null);
                                setTemplateLibraryOpen(true);
                              }}
                            >
                              <BookOpen className="h-4 w-4 mr-2" />
                              Import from Templates
                            </Button>
                          </div>
                        </div>

                        {/* Questions grouped by asset (alleen geselecteerde assets) */}
                        {interview.selectedAssets.length > 0 ? (
                          <>
                            {interview.selectedAssets.map(assetId => {
                              const asset = getAssetById(assetId);
                              if (!asset) return null;
                              
                              const AssetIcon = asset.icon;
                              const assetQuestions = interview.questions.filter(q => q.assetId === assetId);

                              return (
                                <div key={assetId} className="mb-6 last:mb-0">
                                  {/* Asset group header */}
                                  <div className="flex justify-between items-center py-2 border-b border-border mb-3">
                                    <div className="flex items-center gap-2">
                                      <AssetIcon className="h-5 w-5 text-muted-foreground" />
                                      <span className="text-sm font-semibold">{asset.name}</span>
                                      <Badge className="bg-muted text-muted-foreground">
                                        {asset.category}
                                      </Badge>
                                    </div>
                                    <div className="flex items-center gap-3">
                                      <span className="text-xs text-muted-foreground">
                                        {assetQuestions.length} questions
                                      </span>
                                      <Button 
                                        variant="ghost" 
                                        size="sm"
                                        onClick={() => {
                                          setNewQuestion({ ...newQuestion, assetId: assetId });
                                          setAddQuestionModalOpen(true);
                                        }}
                                      >
                                        <Plus className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>

                                  {/* Questions */}
                                  {assetQuestions.length > 0 ? (
                                    assetQuestions.map((question, idx) => (
                                      <div 
                                        key={question.id} 
                                        className="py-3 border-b border-border last:border-0 group"
                                      >
                                        <div className="flex justify-between items-start gap-4">
                                          <div className="flex items-start gap-3 flex-1">
                                            <GripVertical className="h-4 w-4 text-muted-foreground mt-0.5 cursor-move opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <span className="text-sm font-semibold text-muted-foreground w-8">
                                              Q{idx + 1}.
                                            </span>
                                            <div className="flex-1">
                                              <p className="text-sm">{question.text}</p>
                                              <div className="flex items-center gap-2 mt-1">
                                                <Badge className="bg-muted text-muted-foreground text-xs">
                                                  {question.type === 'open' ? 'Open' :
                                                   question.type === 'multiple-choice' ? 'Multiple Choice' :
                                                   question.type === 'multi-select' ? 'Multi-Select' :
                                                   question.type === 'rating' ? 'Rating' :
                                                   'Ranking'}
                                                </Badge>
                                                <Badge 
                                                  className={
                                                    question.source === 'template' ? 'bg-blue-100 text-blue-700' :
                                                    question.source === 'ai-generated' ? 'bg-purple-100 text-purple-700' :
                                                    'bg-gray-100 text-gray-700'
                                                  }
                                                >
                                                  {question.source === 'template' ? 'Template' :
                                                   question.source === 'ai-generated' ? 'AI Generated' :
                                                   'Custom'}
                                                </Badge>
                                              </div>
                                            </div>
                                          </div>

                                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button 
                                              variant="ghost" 
                                              size="sm"
                                              onClick={() => toast.info('Edit question (demo)')}
                                            >
                                              <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button 
                                              variant="ghost" 
                                              size="sm"
                                              onClick={() => handleRemoveQuestion(question.id)}
                                            >
                                              <X className="h-4 w-4" />
                                            </Button>
                                          </div>
                                        </div>
                                      </div>
                                    ))
                                  ) : (
                                    <div className="text-center py-4 text-sm text-muted-foreground italic">
                                      No questions added for this asset yet
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </>
                        ) : (
                          <div className="text-center py-8 text-sm text-muted-foreground">
                            Select brand assets above to add questions
                          </div>
                        )}

                        <div className="flex justify-end mt-6">
                          <Button
                            onClick={() => {
                              if (isStepCompleted(interview, 3)) {
                                setCurrentStep(4);
                                toast.success('Questions saved');
                              } else {
                                toast.error('Please select at least one asset and add questions');
                              }
                            }}
                          >
                            Save Questions
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 4 && (
                    <div className="py-4 space-y-4">
                      {/* Locked banner */}
                      {interview.isLocked && (
                        <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 flex items-center gap-3">
                          <Lock className="h-4 w-4 text-amber-600 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="text-sm text-amber-900">
                              This interview is locked. Unlock to make changes.
                            </p>
                          </div>
                          <button
                            className="text-sm font-medium text-primary hover:underline"
                            onClick={() => setUnlockModalOpen(true)}
                          >
                            Unlock Interview
                          </button>
                        </div>
                      )}

                      {/* ✅ TAAK 5: Conduct Interview Interface */}
                      <div>
                        <h4 className="text-base font-semibold">Conduct Interview</h4>
                        <p className="text-sm text-muted-foreground">
                          Document answers during or after the interview
                        </p>
                      </div>

                      {/* Progress indicator */}
                      {interview.questions.length > 0 && (
                        <div className="mb-6">
                          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                            <span>
                              {Object.keys(interview.answers).length} of {interview.questions.length} questions answered
                            </span>
                            <span>
                              {Math.round((Object.keys(interview.answers).length / interview.questions.length) * 100)}% complete
                            </span>
                          </div>
                          <div className="h-2 rounded-full bg-muted overflow-hidden">
                            <div 
                              className="h-full bg-primary transition-all duration-300"
                              style={{ 
                                width: `${(Object.keys(interview.answers).length / interview.questions.length) * 100}%` 
                              }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Navigation between questions */}
                      {interview.questions.length > 0 && (
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <Button
                              variant="outline"
                              size="sm"
                              disabled={currentQuestionIndex === 0}
                              onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                            >
                              Previous Question
                            </Button>
                            <span className="text-sm text-muted-foreground">
                              Question {currentQuestionIndex + 1} / {interview.questions.length}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              disabled={currentQuestionIndex === interview.questions.length - 1}
                              onClick={() => setCurrentQuestionIndex(prev => Math.min(interview.questions.length - 1, prev + 1))}
                            >
                              Next Question
                            </Button>
                          </div>

                          {/* Current question */}
                          {(() => {
                            const question = interview.questions[currentQuestionIndex];
                            if (!question) return null;
                            
                            const asset = question.assetId ? getAssetById(question.assetId) : null;
                            
                            return (
                              <div className="p-4 rounded-xl border bg-card">
                                <div className="space-y-3">
                                  <div className="flex items-start gap-2">
                                    {asset && (
                                      <Badge className="bg-primary/10 text-primary">
                                        {asset.name}
                                      </Badge>
                                    )}
                                    <Badge className="bg-muted text-muted-foreground">
                                      {question.type}
                                    </Badge>
                                  </div>
                                  
                                  <div className="flex items-start gap-2">
                                    <span className="font-semibold">Q{currentQuestionIndex + 1}.</span>
                                    <p className="text-sm font-medium flex-1">{question.text}</p>
                                  </div>

                                  {/* Answer input based on type */}
                                  <div className="mt-3">
                                    {question.type === 'open' && (
                                      <Textarea
                                        placeholder="Enter interviewee's answer..."
                                        className="min-h-24"
                                        value={(interview.answers[question.id] as string) || ''}
                                        onChange={(e) => {
                                          setInterviews(interviews.map(i =>
                                            i.id === interview.id
                                              ? { ...i, answers: { ...i.answers, [question.id]: e.target.value } }
                                              : i
                                          ));
                                        }}
                                      />
                                    )}

                                    {question.type === 'multiple-choice' && question.options && (
                                      <RadioGroup
                                        value={(interview.answers[question.id] as string) || ''}
                                        onValueChange={(value) => {
                                          setInterviews(interviews.map(i =>
                                            i.id === interview.id
                                              ? { ...i, answers: { ...i.answers, [question.id]: value } }
                                              : i
                                          ));
                                        }}
                                      >
                                        {question.options.map(option => (
                                          <div key={option} className="flex items-center space-x-2">
                                            <RadioGroupItem value={option} id={`${question.id}-${option}`} />
                                            <Label htmlFor={`${question.id}-${option}`}>{option}</Label>
                                          </div>
                                        ))}
                                      </RadioGroup>
                                    )}

                                    {question.type === 'rating' && (
                                      <div className="flex items-center gap-2">
                                        {[1, 2, 3, 4, 5].map(rating => (
                                          <Button
                                            key={rating}
                                            variant={
                                              (interview.answers[question.id] as string) === String(rating)
                                                ? 'default'
                                                : 'outline'
                                            }
                                            size="sm"
                                            onClick={() => {
                                              setInterviews(interviews.map(i =>
                                                i.id === interview.id
                                                  ? { ...i, answers: { ...i.answers, [question.id]: String(rating) } }
                                                  : i
                                              ));
                                            }}
                                          >
                                            {rating}
                                          </Button>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })()}
                        </div>
                      )}

                      {/* General notes */}
                      <div className="mt-6 pt-6 border-t border-border">
                        <Label className="text-sm font-semibold">General Notes</Label>
                        <Textarea
                          placeholder="Add any additional observations or insights..."
                          className="mt-2 min-h-24"
                          value={interview.notes}
                          onChange={(e) => {
                            setInterviews(interviews.map(i =>
                              i.id === interview.id ? { ...i, notes: e.target.value } : i
                            ));
                          }}
                        />
                      </div>

                      <div className="flex justify-between items-center mt-6">
                        <Button
                          variant="outline"
                          onClick={() => {
                            toast.success('Progress saved');
                          }}
                        >
                          Save Progress
                        </Button>
                        <Button
                          onClick={() => {
                            setInterviews(interviews.map(i =>
                              i.id === interview.id ? { ...i, status: 'interview-held' } : i
                            ));
                            setCurrentStep(5);
                            toast.success('Interview completed');
                          }}
                        >
                          Complete Interview
                        </Button>
                      </div>
                    </div>
                  )}

                  {currentStep === 5 && (
                    <div className="py-4 space-y-4">
                      {/* Locked banner */}
                      {interview.isLocked && (
                        <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 flex items-center gap-3">
                          <Lock className="h-4 w-4 text-amber-600 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="text-sm text-amber-900">
                              This interview is locked. Unlock to make changes.
                            </p>
                          </div>
                          <button
                            className="text-sm font-medium text-primary hover:underline"
                            onClick={() => setUnlockModalOpen(true)}
                          >
                            Unlock Interview
                          </button>
                        </div>
                      )}

                      {/* ✅ TAAK 6: Review & Results */}
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h4 className="text-base font-semibold">Review Results</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Review and finalize interview outcomes
                          </p>
                        </div>
                        <Badge className={
                          interview.status === 'completed' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-blue-100 text-blue-700'
                        }>
                          {interview.status === 'completed' ? 'Approved' : 'Ready for approval'}
                        </Badge>
                      </div>

                      {/* Interview Summary card */}
                      <div className="rounded-xl border bg-muted/30 p-4 mb-6">
                        <div className="grid grid-cols-4 gap-4 text-center">
                          <div>
                            <div className="text-2xl font-semibold text-primary">
                              {Object.keys(interview.answers).length}/{interview.questions.length}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">Questions Answered</div>
                          </div>
                          <div>
                            <div className="text-2xl font-semibold text-primary">{interview.duration} min</div>
                            <div className="text-xs text-muted-foreground mt-1">Duration</div>
                          </div>
                          <div>
                            <div className="text-2xl font-semibold text-primary">{interview.selectedAssets.length}</div>
                            <div className="text-xs text-muted-foreground mt-1">Assets Covered</div>
                          </div>
                          <div>
                            <div className="text-2xl font-semibold text-primary">
                              {Math.round((Object.keys(interview.answers).length / interview.questions.length) * 100)}%
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">Completion</div>
                          </div>
                        </div>
                      </div>

                      {/* Results by asset (read-only accordion view) */}
                      <div className="rounded-xl border bg-card p-6">

                        {/* Grouped by asset */}
                        {Object.entries(groupQuestionsByAsset(interview.questions)).map(([assetId, questions]) => {
                          const asset = assetId === 'general' ? null : getAssetById(assetId);
                          const AssetIcon = asset?.icon || MessageCircle;
                          const answeredCount = questions.filter(q => interview.answers[q.id]).length;

                          return (
                            <div key={assetId} className="mb-6 last:mb-0">
                              <div className="flex items-center justify-between py-2 border-b border-border mb-4">
                                <div className="flex items-center gap-2">
                                  <AssetIcon className="h-5 w-5 text-muted-foreground" />
                                  <span className="text-sm font-semibold">
                                    {asset?.name || 'General Questions'}
                                  </span>
                                  {asset && (
                                    <Badge className="bg-muted text-muted-foreground">
                                      {asset.category}
                                    </Badge>
                                  )}
                                </div>
                                <span className="text-xs text-muted-foreground">
                                  {answeredCount}/{questions.length} answered
                                </span>
                              </div>

                              <div className="space-y-4">
                                {questions.map((question, idx) => (
                                  <div key={question.id} className="py-4 border-b border-border last:border-0">
                                    <div className="space-y-3">
                                      <div className="flex items-start gap-2">
                                        <span className="font-semibold text-muted-foreground text-sm">
                                          Q{idx + 1}.
                                        </span>
                                        <div className="flex-1">
                                          <p className="text-sm font-medium">{question.text}</p>
                                          <div className="flex items-center gap-2 mt-1">
                                            <Badge className="bg-muted text-muted-foreground text-xs">
                                              {question.type === 'open' ? 'Open' : question.type}
                                            </Badge>
                                            <Badge 
                                              className={
                                                question.source === 'template' ? 'bg-blue-100 text-blue-700 text-xs' :
                                                'bg-gray-100 text-gray-700 text-xs'
                                              }
                                            >
                                              {question.source === 'template' ? 'Template' : 'Custom'}
                                            </Badge>
                                            {asset && (
                                              <Badge className="bg-primary/10 text-primary text-xs">
                                                {asset.name}
                                              </Badge>
                                            )}
                                          </div>
                                        </div>
                                      </div>

                                      {/* Answer input based on question type */}
                                      {question.type === 'open' && (
                                        <Textarea
                                          placeholder="Enter interviewee's answer..."
                                          className="min-h-24"
                                          value={(interview.answers[question.id] as string) || ''}
                                          onChange={(e) => {
                                            setInterviews(interviews.map(i =>
                                              i.id === interview.id
                                                ? { ...i, answers: { ...i.answers, [question.id]: e.target.value } }
                                                : i
                                            ));
                                          }}
                                        />
                                      )}

                                      {question.type === 'multiple-choice' && question.options && (
                                        <RadioGroup
                                          value={(interview.answers[question.id] as string) || ''}
                                          onValueChange={(value) => {
                                            setInterviews(interviews.map(i =>
                                              i.id === interview.id
                                                ? { ...i, answers: { ...i.answers, [question.id]: value } }
                                                : i
                                            ));
                                          }}
                                        >
                                          {question.options.map(option => (
                                            <div key={option} className="flex items-center space-x-2">
                                              <RadioGroupItem value={option} id={`${question.id}-${option}`} />
                                              <Label htmlFor={`${question.id}-${option}`}>{option}</Label>
                                            </div>
                                          ))}
                                        </RadioGroup>
                                      )}

                                      {question.type === 'multi-select' && question.options && (
                                        <div className="space-y-2">
                                          {question.options.map(option => {
                                            const selectedOptions = (interview.answers[question.id] as string[]) || [];
                                            return (
                                              <div key={option} className="flex items-center space-x-2">
                                                <Checkbox
                                                  id={`${question.id}-${option}`}
                                                  checked={selectedOptions.includes(option)}
                                                  onCheckedChange={(checked) => {
                                                    const current = (interview.answers[question.id] as string[]) || [];
                                                    const updated = checked
                                                      ? [...current, option]
                                                      : current.filter(o => o !== option);
                                                    setInterviews(interviews.map(i =>
                                                      i.id === interview.id
                                                        ? { ...i, answers: { ...i.answers, [question.id]: updated } }
                                                        : i
                                                    ));
                                                  }}
                                                />
                                                <Label htmlFor={`${question.id}-${option}`}>{option}</Label>
                                              </div>
                                            );
                                          })}
                                        </div>
                                      )}

                                      {question.type === 'rating' && (
                                        <div className="flex items-center gap-2">
                                          {[1, 2, 3, 4, 5].map(rating => (
                                            <Button
                                              key={rating}
                                              variant={
                                                (interview.answers[question.id] as string) === String(rating)
                                                  ? 'default'
                                                  : 'outline'
                                              }
                                              size="sm"
                                              onClick={() => {
                                                setInterviews(interviews.map(i =>
                                                  i.id === interview.id
                                                    ? { ...i, answers: { ...i.answers, [question.id]: String(rating) } }
                                                    : i
                                                ));
                                              }}
                                            >
                                              {rating}
                                            </Button>
                                          ))}
                                        </div>
                                      )}

                                      {question.type === 'ranking' && question.options && (
                                        <div className="space-y-2">
                                          <p className="text-xs text-muted-foreground">
                                            Drag to reorder (1 = most important)
                                          </p>
                                          {question.options.map((option, idx) => (
                                            <div 
                                              key={option} 
                                              className="flex items-center gap-2 p-2 border border-border rounded-lg bg-muted/30"
                                            >
                                              <span className="text-sm font-semibold text-muted-foreground w-6">
                                                {idx + 1}.
                                              </span>
                                              <span className="text-sm flex-1">{option}</span>
                                              <GripVertical className="h-4 w-4 text-muted-foreground" />
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })}

                        {/* Interview Notes section */}
                        <div className="mt-6 pt-6 border-t border-border">
                          <Label className="text-sm font-semibold">Interview Notes</Label>
                          <div className="mt-2 p-3 rounded-lg bg-muted/30 border border-border">
                            <p className="text-sm whitespace-pre-wrap">
                              {interview.notes || <span className="italic text-muted-foreground">No notes added</span>}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex justify-between items-center mt-6">
                        <div className="flex items-center gap-2">
                          {interview.isLocked && (
                            <Button
                              variant="outline"
                              onClick={() => setUnlockModalOpen(true)}
                            >
                              <Unlock className="h-4 w-4 mr-2" />
                              Unlock Interview
                            </Button>
                          )}
                          {!interview.isLocked && (
                            <Button
                              variant="outline"
                              onClick={() => {
                                setCurrentStep(4);
                                toast.info('Editing responses');
                              }}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Responses
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            onClick={() => {
                              toast.success('Export PDF (demo)');
                            }}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Export PDF
                          </Button>
                        </div>
                        
                        {interview.status !== 'completed' && !interview.isLocked && (
                          <Button
                            onClick={() => {
                              setInterviews(interviews.map(i =>
                                i.id === interview.id ? { ...i, status: 'completed', isLocked: true } : i
                              ));
                              toast.success('Interview approved and locked');
                            }}
                          >
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            Approve & Lock
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* ✅ TAAK 6: Add Question Modal */}
      <Dialog open={addQuestionModalOpen} onOpenChange={setAddQuestionModalOpen}>
        <DialogContent className="max-w-lg rounded-2xl p-0">
          <DialogHeader className="px-6 pt-6 pb-4">
            <DialogTitle className="text-xl font-semibold">Add Interview Question</DialogTitle>
            <DialogDescription>
              Create a custom question for this interview
            </DialogDescription>
          </DialogHeader>

          <div className="px-6 py-4 space-y-4">
            {/* Field 1: Link to Brand Asset */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Link to Brand Asset (optional)</Label>
              <Select
                value={newQuestion.assetId || 'general'}
                onValueChange={(value) => 
                  setNewQuestion({ ...newQuestion, assetId: value === 'general' ? undefined : value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select asset or leave empty for general question" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Question</SelectItem>
                  {selectedInterview?.selectedAssets.map(assetId => {
                    const asset = getAssetById(assetId);
                    return asset ? (
                      <SelectItem key={asset.id} value={asset.id}>
                        {asset.name}
                      </SelectItem>
                    ) : null;
                  })}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Questions linked to assets help validate specific brand elements
              </p>
            </div>

            {/* Field 2: Question Type */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Question Type</Label>
              <RadioGroup
                value={newQuestion.type}
                onValueChange={(value) => 
                  setNewQuestion({ ...newQuestion, type: value as Question['type'] })
                }
                className="grid grid-cols-2 gap-2 mt-2"
              >
                <div className="flex items-center space-x-2 border rounded-lg p-3">
                  <RadioGroupItem value="open" id="type-open" />
                  <Label htmlFor="type-open" className="cursor-pointer">Open (free text)</Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-lg p-3">
                  <RadioGroupItem value="multiple-choice" id="type-mc" />
                  <Label htmlFor="type-mc" className="cursor-pointer">Multiple Choice</Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-lg p-3">
                  <RadioGroupItem value="multi-select" id="type-ms" />
                  <Label htmlFor="type-ms" className="cursor-pointer">Multi-Select</Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-lg p-3">
                  <RadioGroupItem value="rating" id="type-rating" />
                  <Label htmlFor="type-rating" className="cursor-pointer">Rating Scale (1-5)</Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-lg p-3">
                  <RadioGroupItem value="ranking" id="type-ranking" />
                  <Label htmlFor="type-ranking" className="cursor-pointer">Ranking</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Field 3: Question Text */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Question</Label>
              <Textarea
                rows={3}
                placeholder="Enter your interview question..."
                value={newQuestion.text || ''}
                onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
              />
            </div>

            {/* Field 4: Answer Options (for multiple choice) */}
            {(newQuestion.type === 'multiple-choice' || newQuestion.type === 'multi-select' || newQuestion.type === 'ranking') && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Answer Options</Label>
                <div className="space-y-2">
                  {(newQuestion.options || []).map((option, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Input
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...(newQuestion.options || [])];
                          newOptions[idx] = e.target.value;
                          setNewQuestion({ ...newQuestion, options: newOptions });
                        }}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const newOptions = (newQuestion.options || []).filter((_, i) => i !== idx);
                          setNewQuestion({ ...newQuestion, options: newOptions });
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setNewQuestion({ 
                        ...newQuestion, 
                        options: [...(newQuestion.options || []), ''] 
                      });
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Option
                  </Button>
                </div>
              </div>
            )}

            {/* Field 5: Template suggestion */}
            <div className="p-3 rounded-lg bg-muted/50 border border-border">
              <div className="flex items-start gap-2">
                <Lightbulb className="h-4 w-4 text-amber-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm">Looking for inspiration?</p>
                  <Button
                    variant="link"
                    size="sm"
                    className="h-auto p-0 text-sm"
                    onClick={() => {
                      setAddQuestionModalOpen(false);
                      setTemplateLibraryOpen(true);
                    }}
                  >
                    Browse question templates
                  </Button>
                </div>
              </div>
            </div>

            {/* Checkbox: Save to library */}
            <div className="flex items-center space-x-2">
              <Checkbox id="save-library" />
              <Label htmlFor="save-library" className="text-sm cursor-pointer">
                Save to my Question Library for reuse
              </Label>
            </div>
          </div>

          <DialogFooter className="px-6 py-4 border-t border-border">
            <Button variant="outline" onClick={() => setAddQuestionModalOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleAddQuestion}
              disabled={!newQuestion.text}
            >
              Add Question
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ✅ TAAK 7: Question Template Library Panel */}
      <Sheet open={templateLibraryOpen} onOpenChange={(open) => {
        setTemplateLibraryOpen(open);
        if (!open) setContextAssetId(null);
      }}>
        <SheetContent className="w-96 p-6">
          <SheetHeader>
            <SheetTitle>Question Templates</SheetTitle>
            <SheetDescription>
              Browse and add pre-made interview questions
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-4">
            {/* Context banner */}
            {contextAssetId && (
              <div className="rounded-lg bg-primary/10 border border-primary/20 p-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-primary">
                        Showing templates for: {getAssetById(contextAssetId)?.name}
                      </p>
                      <button
                        className="text-xs text-primary hover:underline"
                        onClick={() => setContextAssetId(null)}
                      >
                        Show all templates
                      </button>
                    </div>
                  </div>
                  <X 
                    className="h-4 w-4 text-primary cursor-pointer" 
                    onClick={() => setContextAssetId(null)}
                  />
                </div>
              </div>
            )}

            {/* Search input */}
            <Input placeholder="Search templates..." />

            {/* Template groups */}
            <Accordion 
              type="single" 
              collapsible 
              className="w-full"
              defaultValue={
                contextAssetId === '1' ? 'golden-circle' :
                contextAssetId === '2' ? 'core-values' :
                contextAssetId === '3' ? 'positioning' :
                contextAssetId === '4' ? 'personality' :
                undefined
              }
            >
              <AccordionItem value="golden-circle">
                <AccordionTrigger className="text-sm font-semibold">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Golden Circle Templates
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {questionTemplates['1'].map(template => {
                      const isAdded = addedTemplateIds.has(template.id);
                      return (
                        <div
                          key={template.id}
                          className={`p-3 rounded-lg cursor-pointer transition-all group ${
                            isAdded ? 'bg-green-50 border border-green-200' : 'hover:bg-muted'
                          }`}
                          onClick={() => handleAddTemplateQuestion(template)}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm flex-1">{template.text}</p>
                            {isAdded ? (
                              <CheckCircle2 className="h-4 w-4 text-green-600" />
                            ) : (
                              <Plus className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge className="bg-muted text-muted-foreground text-xs">
                              {template.type}
                            </Badge>
                            <Badge className="bg-blue-100 text-blue-700 text-xs">
                              Golden Circle
                            </Badge>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="core-values">
                <AccordionTrigger className="text-sm font-semibold">
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4" />
                    Core Values Templates
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {questionTemplates['2'].map(template => {
                      const isAdded = addedTemplateIds.has(template.id);
                      return (
                        <div
                          key={template.id}
                          className={`p-3 rounded-lg cursor-pointer transition-all group ${
                            isAdded ? 'bg-green-50 border border-green-200' : 'hover:bg-muted'
                          }`}
                          onClick={() => handleAddTemplateQuestion(template)}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm flex-1">{template.text}</p>
                            {isAdded ? (
                              <CheckCircle2 className="h-4 w-4 text-green-600" />
                            ) : (
                              <Plus className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge className="bg-muted text-muted-foreground text-xs">
                              {template.type}
                            </Badge>
                            <Badge className="bg-blue-100 text-blue-700 text-xs">
                              Core Values
                            </Badge>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="positioning">
                <AccordionTrigger className="text-sm font-semibold">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Brand Positioning Templates
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {questionTemplates['3'].map(template => {
                      const isAdded = addedTemplateIds.has(template.id);
                      return (
                        <div
                          key={template.id}
                          className={`p-3 rounded-lg cursor-pointer transition-all group ${
                            isAdded ? 'bg-green-50 border border-green-200' : 'hover:bg-muted'
                          }`}
                          onClick={() => handleAddTemplateQuestion(template)}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm flex-1">{template.text}</p>
                            {isAdded ? (
                              <CheckCircle2 className="h-4 w-4 text-green-600" />
                            ) : (
                              <Plus className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge className="bg-muted text-muted-foreground text-xs">
                              {template.type}
                            </Badge>
                            <Badge className="bg-blue-100 text-blue-700 text-xs">
                              Positioning
                            </Badge>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="personality">
                <AccordionTrigger className="text-sm font-semibold">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Brand Personality Templates
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {questionTemplates['4'].map(template => {
                      const isAdded = addedTemplateIds.has(template.id);
                      return (
                        <div
                          key={template.id}
                          className={`p-3 rounded-lg cursor-pointer transition-all group ${
                            isAdded ? 'bg-green-50 border border-green-200' : 'hover:bg-muted'
                          }`}
                          onClick={() => handleAddTemplateQuestion(template)}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm flex-1">{template.text}</p>
                            {isAdded ? (
                              <CheckCircle2 className="h-4 w-4 text-green-600" />
                            ) : (
                              <Plus className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge className="bg-muted text-muted-foreground text-xs">
                              {template.type}
                            </Badge>
                            <Badge className="bg-purple-100 text-purple-700 text-xs">
                              Personality
                            </Badge>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="general">
                <AccordionTrigger className="text-sm font-semibold">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    General Interview Templates
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {questionTemplates['general'].map(template => {
                      const isAdded = addedTemplateIds.has(template.id);
                      return (
                        <div
                          key={template.id}
                          className={`p-3 rounded-lg cursor-pointer transition-all group ${
                            isAdded ? 'bg-green-50 border border-green-200' : 'hover:bg-muted'
                          }`}
                          onClick={() => handleAddTemplateQuestion(template)}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm flex-1">{template.text}</p>
                            {isAdded ? (
                              <CheckCircle2 className="h-4 w-4 text-green-600" />
                            ) : (
                              <Plus className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                            )}
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge className="bg-muted text-muted-foreground text-xs">
                            {template.type}
                          </Badge>
                          <Badge className="bg-gray-100 text-gray-700 text-xs">
                            General
                          </Badge>
                        </div>
                      </div>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </SheetContent>
      </Sheet>

      {/* Unlock Confirmation Modal */}
      <Dialog open={unlockModalOpen} onOpenChange={setUnlockModalOpen}>
        <DialogContent className="max-w-md rounded-2xl p-0">
          <div className="px-6 pt-6 pb-4 text-center">
            <div className="mx-auto h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
              <Unlock className="h-6 w-6 text-amber-500" />
            </div>
            <DialogTitle className="text-xl font-semibold mb-2">Unlock Interview?</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              You're about to unlock this interview for editing.
            </DialogDescription>
          </div>

          <div className="px-6 py-4 space-y-4">
            {/* Warning box */}
            <div className="rounded-lg bg-amber-50 border border-amber-200 p-4">
              <p className="text-sm font-medium text-amber-900 mb-2">
                What happens when you unlock:
              </p>
              <ul className="space-y-1 text-sm text-amber-800">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-0.5">•</span>
                  <span>Interview status changes to In Review</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-0.5">•</span>
                  <span>Responses can be edited</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-0.5">•</span>
                  <span>You may need to re-approve after changes</span>
                </li>
              </ul>
            </div>

            {/* Optional reason */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Reason for unlocking (optional)</Label>
              <Textarea
                rows={3}
                placeholder="e.g., Need to correct an answer..."
                value={unlockReason}
                onChange={(e) => setUnlockReason(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter className="px-6 py-4 border-t border-border">
            <Button variant="outline" onClick={() => {
              setUnlockModalOpen(false);
              setUnlockReason('');
            }}>
              Cancel
            </Button>
            <Button onClick={handleUnlockInterview}>
              Unlock Interview
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
