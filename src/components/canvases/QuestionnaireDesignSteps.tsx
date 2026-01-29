import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Check,
  CheckCircle2,
  Plus,
  Trash2,
  Edit,
  GripVertical,
  Target,
  Heart,
  Globe,
  TrendingUp,
  Users,
  MessageSquare,
  FileText,
  CheckSquare,
  Star,
  Circle as RadioIcon,
  Eye,
  Copy,
  ChevronDown,
  Mail,
  Link2,
  Clock,
  Calendar,
  Send,
  Settings,
  AlignLeft,
  Minus,
  Save
} from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Switch } from '../ui/switch';
import { toast } from 'sonner';

interface Question {
  id: string;
  text: string;
  type: 'text' | 'textarea' | 'multiple-choice' | 'rating' | 'yes-no';
  linkedAssetId?: string;
  options?: string[];
  required: boolean;
}

interface SectionDivider {
  id: string;
  type: 'divider';
  title: string;
  description?: string;
}

interface IntroText {
  id: string;
  type: 'intro';
  text: string;
}

type QuestionnaireItem = Question | SectionDivider | IntroText;

interface Asset {
  id: string;
  name: string;
  icon: any;
  type: string;
}

interface QuestionnaireDesignStepsProps {
  questionnaire: any;
  onUpdate: (field: string, value: any) => void;
  onContinue: () => void;
  onBack?: () => void;
}

export function QuestionnaireDesignSteps({
  questionnaire,
  onUpdate,
  onContinue,
  onBack
}: QuestionnaireDesignStepsProps) {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);

  // Available brand assets
  const availableAssets: Asset[] = [
    { id: 'vision-mission', name: 'Vision & Mission', icon: Target, type: 'Vision Statement' },
    { id: 'core-values', name: 'Core Values', icon: Heart, type: 'Core Values' },
    { id: 'brand-positioning', name: 'Brand Positioning', icon: TrendingUp, type: 'Brand Positioning' },
    { id: 'golden-circle', name: 'Golden Circle', icon: Target, type: 'Golden Circle' },
    { id: 'brand-archetype', name: 'Brand Archetype', icon: Users, type: 'Brand Archetype' },
    { id: 'social-relevancy', name: 'Social Relevancy', icon: Globe, type: 'Social Impact' },
    { id: 'trends', name: 'Industry Trends', icon: TrendingUp, type: 'Trends Analysis' }
  ];

  const [items, setItems] = useState<QuestionnaireItem[]>(questionnaire.questions || []);
  const [selectedAssets, setSelectedAssets] = useState<string[]>(questionnaire.selectedAssets || []);

  // Distribution settings
  const [distributionMethod, setDistributionMethod] = useState<'email' | 'link' | 'both'>('email');
  const [emailSubject, setEmailSubject] = useState(`We'd love your feedback: ${questionnaire.name || ''}`);
  const [emailMessage, setEmailMessage] = useState(`Hi {recipient_name},\n\nWe're conducting a survey to better understand perspectives on our brand. Your insights would be invaluable.\n\nQuestionnaire: {questionnaire_title}\nEstimated time: {estimated_time}\nDeadline: {deadline}\n\nClick here to start: {questionnaire_link}\n\nThank you for your time!`);
  const [senderName, setSenderName] = useState('Brand Team');
  const [replyToEmail, setReplyToEmail] = useState('feedback@company.com');
  const [linkType, setLinkType] = useState<'public' | 'private'>('private');
  const [linkExpiration, setLinkExpiration] = useState('2-weeks');
  const [generatedLink, setGeneratedLink] = useState('');
  const [hasDeadline, setHasDeadline] = useState(true);
  const [deadline, setDeadline] = useState('2026-02-01');
  const [remindersEnabled, setRemindersEnabled] = useState(true);
  const [reminder1Days, setReminder1Days] = useState('7');
  const [reminder2Days, setReminder2Days] = useState('3');

  // Sync items to parent
  React.useEffect(() => {
    onUpdate('questions', items);
  }, [items]);

  // Sync selectedAssets to parent
  React.useEffect(() => {
    onUpdate('selectedAssets', selectedAssets);
  }, [selectedAssets]);

  const validateStep1 = () => {
    if (!questionnaire.name || !questionnaire.name.trim()) {
      toast.error('Please enter a questionnaire title');
      return false;
    }

    const questions = items.filter(item => !('type' in item) || item.type !== 'divider' && item.type !== 'intro');
    if (questions.length === 0) {
      toast.error('Please add at least one question');
      return false;
    }

    const emptyQuestions = questions.filter(q => !q.text || !q.text.trim());
    if (emptyQuestions.length > 0) {
      toast.error('Please fill in all question texts');
      return false;
    }

    return true;
  };

  const handleCompleteDesign = () => {
    if (!validateStep1()) {
      return;
    }

    // Generate unique link
    const uniqueId = Math.random().toString(36).substring(2, 9);
    const link = `https://brandshift.ai/q/${uniqueId}`;
    onUpdate('linkUrl', link);
    onUpdate('step1Complete', true);

    // Move to step 2
    setCurrentStep(2);
    toast.success('Design saved. Questionnaire link generated.');
  };

  const addQuestion = () => {
    const newQuestion: Question = {
      id: `q${Date.now()}`,
      text: '',
      type: 'text',
      required: false
    };
    setItems([...items, newQuestion]);
    setEditingQuestionId(newQuestion.id);
  };

  const addSectionDivider = () => {
    const newDivider: SectionDivider = {
      id: `d${Date.now()}`,
      type: 'divider',
      title: 'Section Title',
      description: ''
    };
    setItems([...items, newDivider]);
  };

  const addIntroText = () => {
    const newIntro: IntroText = {
      id: `i${Date.now()}`,
      type: 'intro',
      text: 'Instructions or context for respondents...'
    };
    setItems([...items, newIntro]);
  };

  const updateItem = (itemId: string, field: string, value: any) => {
    setItems(items.map(item => 
      item.id === itemId ? { ...item, [field]: value } : item
    ));
  };

  const deleteItem = (itemId: string) => {
    setItems(items.filter(item => item.id !== itemId));
  };

  const toggleAssetSelection = (assetId: string) => {
    if (selectedAssets.includes(assetId)) {
      setSelectedAssets(selectedAssets.filter(id => id !== assetId));
    } else {
      setSelectedAssets([...selectedAssets, assetId]);
    }
  };

  const getQuestionTypeLabel = (type: string) => {
    switch (type) {
      case 'text':
      case 'textarea':
        return 'Open (free text)';
      case 'multiple-choice':
        return 'Multiple Choice';
      case 'yes-no':
        return 'Multi-Select';
      case 'rating':
        return 'Rating Scale (1-5)';
      default:
        return type;
    }
  };

  const getQuestionTypeIcon = (type: string) => {
    switch (type) {
      case 'text':
      case 'textarea':
        return <MessageSquare className="h-4 w-4" />;
      case 'multiple-choice':
        return <CheckSquare className="h-4 w-4" />;
      case 'yes-no':
        return <RadioIcon className="h-4 w-4" />;
      case 'rating':
        return <Star className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const generateLink = () => {
    const randomId = Math.random().toString(36).substring(7);
    setGeneratedLink(`https://survey.brand.io/q/${randomId}`);
  };

  const copyToClipboard = async (text: string) => {
    try {
      // Try modern clipboard API
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        toast.success('Link copied to clipboard');
      } else {
        fallbackCopyTextToClipboard(text);
      }
    } catch (err) {
      fallbackCopyTextToClipboard(text);
    }
  };

  const fallbackCopyTextToClipboard = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      toast.success('Link copied to clipboard');
    } catch (err) {
      toast.error('Failed to copy link');
    }
    document.body.removeChild(textArea);
  };

  const handleSaveDraft = () => {
    onUpdate('questions', items);
    onUpdate('selectedAssets', selectedAssets);
    toast.success('Draft saved');
  };

  const handleImportTemplate = () => {
    toast.info('Template import coming soon');
  };

  const getQuestionsForAsset = (assetId: string) => {
    return items.filter(item => 
      'linkedAssetId' in item && item.linkedAssetId === assetId
    ).length;
  };

  if (currentStep === 1) {
    return (
      <div className="space-y-6">
        {/* Step Header */}
        <div className="pb-4 border-b border-border">
          <h2 className="text-xl font-semibold mb-1">Design Questionnaire</h2>
          <p className="text-sm text-muted-foreground">Build questions and link them to brand assets</p>
        </div>

        {/* Section A: Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Basic Information</h3>
          
          <div className="space-y-4 p-4 rounded-xl bg-muted/50">
            <div>
              <Label className="text-sm mb-2 block">
                Questionnaire Title <span className="text-red-500">*</span>
              </Label>
              <Input
                value={questionnaire.name || ''}
                onChange={(e) => onUpdate('name', e.target.value)}
                placeholder="e.g., Brand Perception Survey Q1 2026"
                className="text-sm"
              />
            </div>

            <div>
              <Label className="text-sm mb-2 block">Description (optional)</Label>
              <Textarea
                value={questionnaire.description || ''}
                onChange={(e) => onUpdate('description', e.target.value)}
                placeholder="Describe the purpose of this questionnaire..."
                rows={3}
                className="text-sm"
              />
            </div>

            <div>
              <Label className="text-sm mb-2 block">Estimated Completion Time</Label>
              <Select 
                value={questionnaire.estimatedTime || '10-min'}
                onValueChange={(value) => onUpdate('estimatedTime', value)}
              >
                <SelectTrigger className="text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5-min">5 minutes</SelectItem>
                  <SelectItem value="10-min">10 minutes</SelectItem>
                  <SelectItem value="15-min">15 minutes</SelectItem>
                  <SelectItem value="20-min">20 minutes</SelectItem>
                  <SelectItem value="30-min">30 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Section B: Brand Assets to Cover */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Brand Assets to Cover</h3>
          
          <div className="grid grid-cols-2 gap-4">
            {availableAssets.map((asset) => {
              const Icon = asset.icon;
              const isSelected = selectedAssets.includes(asset.id);
              const questionCount = getQuestionsForAsset(asset.id);
              
              return (
                <div
                  key={asset.id}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/30'
                  }`}
                  onClick={() => toggleAssetSelection(asset.id)}
                >
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => toggleAssetSelection(asset.id)}
                      className="mt-0.5"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="h-4 w-4 text-primary" />
                        <span className="text-sm font-semibold">{asset.name}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{asset.type}</p>
                      {isSelected && (
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs h-5">
                            {questionCount} {questionCount === 1 ? 'question' : 'questions'}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section C: Questions */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Questions</h3>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={addSectionDivider}>
                <Minus className="h-4 w-4 mr-2" />
                Add Section
              </Button>
              <Button size="sm" variant="outline" onClick={addIntroText}>
                <AlignLeft className="h-4 w-4 mr-2" />
                Add Introduction
              </Button>
              <Button size="sm" variant="outline" onClick={handleImportTemplate}>
                <FileText className="h-4 w-4 mr-2" />
                Import Template
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            {items.map((item, index) => {
              // Section Divider
              if ('type' in item && item.type === 'divider') {
                return (
                  <div key={item.id} className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border-2 border-amber-200 dark:border-amber-900">
                    <div className="flex items-start gap-3">
                      <GripVertical className="h-4 w-4 cursor-grab text-muted-foreground mt-1" />
                      <div className="flex-1 space-y-2">
                        <Input
                          value={item.title}
                          onChange={(e) => updateItem(item.id, 'title', e.target.value)}
                          placeholder="Section title..."
                          className="text-sm font-semibold"
                        />
                        <Input
                          value={item.description || ''}
                          onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                          placeholder="Section description (optional)..."
                          className="text-xs"
                        />
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 w-7 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
                        onClick={() => deleteItem(item.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                );
              }

              // Introduction Text
              if ('type' in item && item.type === 'intro') {
                return (
                  <div key={item.id} className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/20 border-2 border-blue-200 dark:border-blue-900">
                    <div className="flex items-start gap-3">
                      <GripVertical className="h-4 w-4 cursor-grab text-muted-foreground mt-1" />
                      <div className="flex-1">
                        <Textarea
                          value={item.text}
                          onChange={(e) => updateItem(item.id, 'text', e.target.value)}
                          placeholder="Instructions or context for respondents..."
                          rows={2}
                          className="text-sm"
                        />
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 w-7 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
                        onClick={() => deleteItem(item.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                );
              }

              // Question
              const question = item as Question;
              const isEditing = editingQuestionId === question.id;

              return (
                <div
                  key={question.id}
                  className={`p-4 border border-border rounded-xl transition-all hover:border-primary/30 ${
                    isEditing ? 'border-primary ring-2 ring-primary/20' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <GripVertical className="h-4 w-4 cursor-grab text-muted-foreground mt-3" />
                    <span className="text-sm font-semibold text-muted-foreground w-6 mt-3">{index + 1}</span>
                    
                    <div className="flex-1 space-y-3">
                      {/* Question Text */}
                      <div>
                        <Textarea
                          value={question.text}
                          onChange={(e) => updateItem(question.id, 'text', e.target.value)}
                          placeholder="Type your question here..."
                          rows={2}
                          className="text-sm"
                          onFocus={() => setEditingQuestionId(question.id)}
                        />
                      </div>

                      {/* Question Settings */}
                      {isEditing && (
                        <div className="space-y-3 pt-3 border-t border-border">
                          <div className="grid grid-cols-2 gap-4">
                            {/* Question Type */}
                            <div>
                              <Label className="text-xs mb-1.5 block">Question Type</Label>
                              <Select
                                value={question.type}
                                onValueChange={(value: any) => updateItem(question.id, 'type', value)}
                              >
                                <SelectTrigger className="h-8 text-xs">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="text">
                                    <div className="flex items-center gap-2">
                                      <MessageSquare className="h-3 w-3" />
                                      Open (free text)
                                    </div>
                                  </SelectItem>
                                  <SelectItem value="multiple-choice">
                                    <div className="flex items-center gap-2">
                                      <CheckSquare className="h-3 w-3" />
                                      Multiple Choice
                                    </div>
                                  </SelectItem>
                                  <SelectItem value="yes-no">
                                    <div className="flex items-center gap-2">
                                      <RadioIcon className="h-3 w-3" />
                                      Multi-Select
                                    </div>
                                  </SelectItem>
                                  <SelectItem value="rating">
                                    <div className="flex items-center gap-2">
                                      <Star className="h-3 w-3" />
                                      Rating Scale (1-5)
                                    </div>
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            {/* Link to Asset */}
                            <div>
                              <Label className="text-xs mb-1.5 block">Link to Brand Asset</Label>
                              <Select
                                value={question.linkedAssetId || 'none'}
                                onValueChange={(value) => {
                                  updateItem(question.id, 'linkedAssetId', value === 'none' ? undefined : value);
                                  if (value !== 'none' && !selectedAssets.includes(value)) {
                                    setSelectedAssets([...selectedAssets, value]);
                                  }
                                }}
                              >
                                <SelectTrigger className="h-8 text-xs">
                                  <SelectValue placeholder="No asset" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="none">
                                    <span className="text-muted-foreground">No asset linked</span>
                                  </SelectItem>
                                  {availableAssets.map((asset) => {
                                    const Icon = asset.icon;
                                    return (
                                      <SelectItem key={asset.id} value={asset.id}>
                                        <div className="flex items-center gap-2">
                                          <Icon className="h-3 w-3" />
                                          {asset.name}
                                        </div>
                                      </SelectItem>
                                    );
                                  })}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          {/* Multiple Choice Options */}
                          {question.type === 'multiple-choice' && (
                            <div className="space-y-2">
                              <Label className="text-xs">Answer Options</Label>
                              {(question.options || ['Option 1', 'Option 2']).map((option, optIndex) => (
                                <div key={optIndex} className="flex items-center gap-2">
                                  <RadioIcon className="h-3 w-3 text-muted-foreground" />
                                  <Input
                                    value={option}
                                    onChange={(e) => {
                                      const newOptions = [...(question.options || [])];
                                      newOptions[optIndex] = e.target.value;
                                      updateItem(question.id, 'options', newOptions);
                                    }}
                                    className="text-xs h-7"
                                    placeholder={`Option ${optIndex + 1}`}
                                  />
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-7 w-7 p-0"
                                    onClick={() => {
                                      const newOptions = (question.options || []).filter((_, i) => i !== optIndex);
                                      updateItem(question.id, 'options', newOptions);
                                    }}
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              ))}
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 text-xs"
                                onClick={() => {
                                  const newOptions = [...(question.options || []), `Option ${(question.options?.length || 0) + 1}`];
                                  updateItem(question.id, 'options', newOptions);
                                }}
                              >
                                <Plus className="h-3 w-3 mr-1" />
                                Add Option
                              </Button>
                            </div>
                          )}

                          {/* Required Toggle */}
                          <div className="flex items-center gap-2 pt-2 border-t border-border">
                            <Checkbox
                              id={`required-${question.id}`}
                              checked={question.required}
                              onCheckedChange={(checked) => updateItem(question.id, 'required', checked)}
                            />
                            <Label htmlFor={`required-${question.id}`} className="text-xs cursor-pointer">
                              Required question
                            </Label>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Question Actions */}
                    <div className="flex items-center gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 w-7 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
                        onClick={() => deleteItem(question.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Question Preview */}
                  {!isEditing && (
                    <div className="ml-9 mt-2 text-xs text-muted-foreground flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        {getQuestionTypeIcon(question.type)}
                        <span>{getQuestionTypeLabel(question.type)}</span>
                      </div>
                      {question.linkedAssetId && (
                        <Badge variant="outline" className="text-xs h-5">
                          <Target className="h-2.5 w-2.5 mr-1" />
                          {availableAssets.find(a => a.id === question.linkedAssetId)?.name}
                        </Badge>
                      )}
                      {question.required && (
                        <Badge variant="secondary" className="text-xs h-5 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                          Required
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Add Question Button */}
          <Button
            variant="outline"
            className="w-full border-dashed border-2"
            onClick={addQuestion}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Question
          </Button>
        </div>

        {/* Section D: Preview */}
        <div className="space-y-4">
          <Button variant="outline" className="w-full" onClick={() => setPreviewModalOpen(true)}>
            <Eye className="h-4 w-4 mr-2" />
            Preview Questionnaire
          </Button>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-6 border-t border-border">
          <Button variant="outline" onClick={handleSaveDraft}>
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button className="flex-1" onClick={handleCompleteDesign}>
            Continue to Distribution
            <ChevronDown className="h-4 w-4 ml-2 rotate-[-90deg]" />
          </Button>
        </div>
      </div>
    );
  }

  // Step 2: Configure Distribution
  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="pb-4 border-b border-border">
        <h2 className="text-xl font-semibold mb-1">Configure Distribution</h2>
        <p className="text-sm text-muted-foreground">Set up how the questionnaire will be sent</p>
      </div>

      {/* Section A: Distribution Method */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Distribution Method</h3>
        
        <RadioGroup value={distributionMethod} onValueChange={(value: any) => setDistributionMethod(value)}>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-4 rounded-xl border-2 border-border hover:border-primary/30 transition-all cursor-pointer">
              <RadioGroupItem value="email" id="method-email" className="mt-0.5" />
              <div className="flex-1">
                <Label htmlFor="method-email" className="text-sm font-semibold cursor-pointer">
                  Email invitations
                </Label>
                <p className="text-xs text-muted-foreground">Send personalized emails to recipients</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-4 rounded-xl border-2 border-border hover:border-primary/30 transition-all cursor-pointer">
              <RadioGroupItem value="link" id="method-link" className="mt-0.5" />
              <div className="flex-1">
                <Label htmlFor="method-link" className="text-sm font-semibold cursor-pointer">
                  Share link
                </Label>
                <p className="text-xs text-muted-foreground">Generate a public or private link</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-4 rounded-xl border-2 border-border hover:border-primary/30 transition-all cursor-pointer">
              <RadioGroupItem value="both" id="method-both" className="mt-0.5" />
              <div className="flex-1">
                <Label htmlFor="method-both" className="text-sm font-semibold cursor-pointer">
                  Both
                </Label>
                <p className="text-xs text-muted-foreground">Email invitations + shareable link</p>
              </div>
            </div>
          </div>
        </RadioGroup>
      </div>

      {/* Section B: Email Settings */}
      {(distributionMethod === 'email' || distributionMethod === 'both') && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Email Settings</h3>
          
          <div className="space-y-4 p-4 rounded-xl bg-muted/50">
            <div>
              <Label className="text-sm mb-2 block">Email Subject</Label>
              <Input
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                placeholder="We'd love your feedback: {Questionnaire Title}"
                className="text-sm"
              />
            </div>

            <div>
              <Label className="text-sm mb-2 block">Email Message</Label>
              <Textarea
                value={emailMessage}
                onChange={(e) => setEmailMessage(e.target.value)}
                rows={8}
                className="text-sm font-mono"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Available placeholders: {'{recipient_name}'}, {'{questionnaire_title}'}, {'{questionnaire_link}'}, {'{deadline}'}, {'{estimated_time}'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm mb-2 block">Sender Name</Label>
                <Input
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Brand Team"
                  className="text-sm"
                />
              </div>

              <div>
                <Label className="text-sm mb-2 block">Reply-to Email</Label>
                <Input
                  type="email"
                  value={replyToEmail}
                  onChange={(e) => setReplyToEmail(e.target.value)}
                  placeholder="feedback@company.com"
                  className="text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Section C: Link Settings */}
      {(distributionMethod === 'link' || distributionMethod === 'both') && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Link Settings</h3>
          
          <div className="space-y-4 p-4 rounded-xl bg-muted/50">
            <div>
              <Label className="text-sm mb-2 block">Link Type</Label>
              <RadioGroup value={linkType} onValueChange={(value: any) => setLinkType(value)}>
                <div className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="public" id="link-public" />
                    <Label htmlFor="link-public" className="text-sm cursor-pointer">
                      Public - Anyone with link can respond
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="private" id="link-private" />
                    <Label htmlFor="link-private" className="text-sm cursor-pointer">
                      Private - Only invited recipients
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-sm mb-2 block">Link Expiration</Label>
              <Select value={linkExpiration} onValueChange={setLinkExpiration}>
                <SelectTrigger className="text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no-expiration">No expiration</SelectItem>
                  <SelectItem value="1-week">1 week</SelectItem>
                  <SelectItem value="2-weeks">2 weeks</SelectItem>
                  <SelectItem value="1-month">1 month</SelectItem>
                  <SelectItem value="custom">Custom date</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Button variant="outline" onClick={generateLink} className="w-full">
                <Link2 className="h-4 w-4 mr-2" />
                Generate Link
              </Button>
              {generatedLink && (
                <div className="mt-3 p-3 rounded-lg bg-background border border-border">
                  <Label className="text-xs mb-2 block">Generated Link</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      value={generatedLink}
                      readOnly
                      className="text-xs font-mono"
                    />
                    <Button size="sm" variant="outline" onClick={() => copyToClipboard(generatedLink)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Section D: Deadline & Reminders */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Deadline & Reminders</h3>
        
        <div className="space-y-4 p-4 rounded-xl bg-muted/50">
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-sm">Response Deadline</Label>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="no-deadline"
                  checked={!hasDeadline}
                  onCheckedChange={(checked) => setHasDeadline(!checked)}
                />
                <Label htmlFor="no-deadline" className="text-xs cursor-pointer">
                  No deadline
                </Label>
              </div>
            </div>
            {hasDeadline && (
              <Input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="text-sm"
              />
            )}
          </div>

          <div className="pt-3 border-t border-border">
            <div className="flex items-center justify-between mb-3">
              <Label className="text-sm">Automatic Reminders</Label>
              <Switch
                checked={remindersEnabled}
                onCheckedChange={setRemindersEnabled}
              />
            </div>
            
            {remindersEnabled && hasDeadline && (
              <div className="space-y-3 pl-4 border-l-2 border-primary/20">
                <div className="flex items-center gap-3">
                  <Label className="text-xs text-muted-foreground w-24">Reminder 1:</Label>
                  <Select value={reminder1Days} onValueChange={setReminder1Days}>
                    <SelectTrigger className="text-xs h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 days before</SelectItem>
                      <SelectItem value="5">5 days before</SelectItem>
                      <SelectItem value="3">3 days before</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center gap-3">
                  <Label className="text-xs text-muted-foreground w-24">Reminder 2:</Label>
                  <Select value={reminder2Days} onValueChange={setReminder2Days}>
                    <SelectTrigger className="text-xs h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 days before</SelectItem>
                      <SelectItem value="2">2 days before</SelectItem>
                      <SelectItem value="1">1 day before</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center gap-3">
                  <Label className="text-xs text-muted-foreground w-24">Final reminder:</Label>
                  <span className="text-xs">1 day before deadline</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-6 border-t border-border">
        <Button variant="outline" onClick={() => setCurrentStep(1)}>
          <ChevronDown className="h-4 w-4 mr-2 rotate-90" />
          Back to Design
        </Button>
        <Button variant="outline" className="flex-1">
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
        <Button className="flex-1" onClick={onContinue}>
          Continue to Recipients
          <ChevronDown className="h-4 w-4 ml-2 rotate-[-90deg]" />
        </Button>
      </div>
    </div>
  );
}