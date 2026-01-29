import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Checkbox } from '../ui/checkbox';
import {
  Plus,
  Trash2,
  Target,
  Heart,
  Globe,
  TrendingUp,
  Users,
  GripVertical,
  MessageSquare,
  CheckSquare,
  Star,
  HelpCircle,
  Save,
  ChevronRight,
  FileText,
  Upload
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { toast } from 'sonner@2.0.3';

interface Question {
  id: string;
  text: string;
  type: 'text' | 'textarea' | 'multiple-choice' | 'rating' | 'yes-no';
  linkedAssetId?: string;
  options?: string[];
  required: boolean;
}

interface QuestionnaireStep1DesignProps {
  questionnaire: any;
  onUpdate: (field: string, value: any) => void;
  onContinue: () => void;
  onBack?: () => void;
}

export function QuestionnaireStep1Design({
  questionnaire,
  onUpdate,
  onContinue,
  onBack
}: QuestionnaireStep1DesignProps) {
  const [importTemplateOpen, setImportTemplateOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [newQuestion, setNewQuestion] = useState<Partial<Question>>({
    text: '',
    type: 'text',
    required: false,
    options: []
  });

  const availableAssets = [
    { id: 'vision-mission', name: 'Vision & Mission', icon: Target },
    { id: 'core-values', name: 'Core Values', icon: Heart },
    { id: 'brand-positioning', name: 'Brand Positioning', icon: TrendingUp },
    { id: 'golden-circle', name: 'Golden Circle', icon: Target },
    { id: 'brand-archetype', name: 'Brand Archetype', icon: Users },
    { id: 'social-relevancy', name: 'Social Relevancy', icon: Globe },
  ];

  const templates = [
    {
      id: 'brand-perception',
      name: 'Brand Perception',
      description: 'Understand how stakeholders perceive your brand',
      questionCount: 8
    },
    {
      id: 'customer-experience',
      name: 'Customer Experience',
      description: 'Assess customer satisfaction and experience',
      questionCount: 10
    },
    {
      id: 'stakeholder-feedback',
      name: 'Stakeholder Feedback',
      description: 'Gather feedback from key stakeholders',
      questionCount: 12
    }
  ];

  const handleAddQuestion = () => {
    if (!newQuestion.text) {
      toast.error('Please enter a question');
      return;
    }

    const question: Question = {
      id: `q-${Date.now()}`,
      text: newQuestion.text,
      type: newQuestion.type || 'text',
      linkedAssetId: newQuestion.linkedAssetId,
      options: newQuestion.options || [],
      required: newQuestion.required || false
    };

    onUpdate('questions', [...(questionnaire.questions || []), question]);
    
    // Reset form
    setNewQuestion({
      text: '',
      type: 'text',
      required: false,
      options: []
    });
    
    toast.success('Question added');
  };

  const handleDeleteQuestion = (questionId: string) => {
    onUpdate(
      'questions',
      questionnaire.questions.filter((q: Question) => q.id !== questionId)
    );
    toast.success('Question deleted');
  };

  const handleImportTemplate = () => {
    if (!selectedTemplate) {
      toast.error('Please select a template');
      return;
    }

    // Mock template questions
    const templateQuestions: Question[] = [
      {
        id: `q-${Date.now()}-1`,
        text: 'How would you describe our brand personality?',
        type: 'multiple-choice',
        linkedAssetId: 'brand-archetype',
        options: ['Innovative', 'Reliable', 'Fun', 'Professional'],
        required: true
      },
      {
        id: `q-${Date.now()}-2`,
        text: 'On a scale of 1-5, how well does our mission statement resonate with you?',
        type: 'rating',
        linkedAssetId: 'vision-mission',
        required: true
      },
      {
        id: `q-${Date.now()}-3`,
        text: 'What do you think makes our brand unique?',
        type: 'textarea',
        linkedAssetId: 'brand-positioning',
        required: false
      }
    ];

    onUpdate('questions', [...(questionnaire.questions || []), ...templateQuestions]);
    setImportTemplateOpen(false);
    setSelectedTemplate('');
    toast.success('Template imported');
  };

  const getQuestionTypeIcon = (type: string) => {
    switch (type) {
      case 'text':
      case 'textarea':
        return <MessageSquare className="h-4 w-4" />;
      case 'multiple-choice':
        return <CheckSquare className="h-4 w-4" />;
      case 'rating':
        return <Star className="h-4 w-4" />;
      default:
        return <HelpCircle className="h-4 w-4" />;
    }
  };

  const handleContinue = () => {
    if (!questionnaire.name) {
      toast.error('Please enter a questionnaire name');
      return;
    }
    if ((questionnaire.questions || []).length === 0) {
      toast.error('Please add at least one question');
      return;
    }
    onContinue();
  };

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="pb-4 border-b border-border">
        <h2 className="text-xl font-semibold mb-1">Design Questionnaire</h2>
        <p className="text-sm text-muted-foreground">Build questions and link to brand assets</p>
      </div>

      {/* Section A: Basic Info */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Basic Information</h3>
        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="name">Questionnaire Name</Label>
            <Input
              id="name"
              placeholder="Brand Perception Survey"
              value={questionnaire.name || ''}
              onChange={(e) => onUpdate('name', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Quarterly survey to assess brand perception among stakeholders"
              value={questionnaire.description || ''}
              onChange={(e) => onUpdate('description', e.target.value)}
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* Section B: Questions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">Questions ({(questionnaire.questions || []).length})</h3>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setImportTemplateOpen(true)}
          >
            <Upload className="h-4 w-4 mr-2" />
            Import Template
          </Button>
        </div>

        {/* Existing Questions */}
        {(questionnaire.questions || []).length > 0 && (
          <div className="space-y-2">
            {questionnaire.questions.map((question: Question, index: number) => {
              const linkedAsset = availableAssets.find(a => a.id === question.linkedAssetId);
              const Icon = linkedAsset?.icon;

              return (
                <div
                  key={question.id}
                  className="p-4 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <GripVertical className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-semibold text-muted-foreground">Q{index + 1}</span>
                            <p className="text-sm font-medium">{question.text}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs h-5">
                              {getQuestionTypeIcon(question.type)}
                              <span className="ml-1 capitalize">{question.type.replace('-', ' ')}</span>
                            </Badge>
                            {linkedAsset && Icon && (
                              <Badge variant="outline" className="text-xs h-5">
                                <Icon className="h-2.5 w-2.5 mr-1" />
                                {linkedAsset.name}
                              </Badge>
                            )}
                            {question.required && (
                              <Badge variant="secondary" className="text-xs h-5 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                                Required
                              </Badge>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteQuestion(question.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                      {question.options && question.options.length > 0 && (
                        <div className="text-xs text-muted-foreground mt-2">
                          Options: {question.options.join(', ')}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Add New Question Form */}
        <div className="p-4 rounded-lg border-2 border-dashed border-border bg-muted/20">
          <h4 className="text-sm font-semibold mb-3">Add Question</h4>
          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="question-text">Question Text</Label>
              <Textarea
                id="question-text"
                placeholder="How would you describe our brand?"
                value={newQuestion.text || ''}
                onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
                rows={2}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="question-type">Question Type</Label>
                <Select
                  value={newQuestion.type || 'text'}
                  onValueChange={(value) => setNewQuestion({ ...newQuestion, type: value as any })}
                >
                  <SelectTrigger id="question-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Short Text</SelectItem>
                    <SelectItem value="textarea">Long Text</SelectItem>
                    <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                    <SelectItem value="rating">Rating Scale</SelectItem>
                    <SelectItem value="yes-no">Yes/No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="linked-asset">Link to Asset (Optional)</Label>
                <Select
                  value={newQuestion.linkedAssetId || 'none'}
                  onValueChange={(value) => setNewQuestion({ 
                    ...newQuestion, 
                    linkedAssetId: value === 'none' ? undefined : value 
                  })}
                >
                  <SelectTrigger id="linked-asset">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {availableAssets.map((asset) => (
                      <SelectItem key={asset.id} value={asset.id}>
                        {asset.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {(newQuestion.type === 'multiple-choice') && (
              <div className="space-y-2">
                <Label htmlFor="options">Options (comma separated)</Label>
                <Input
                  id="options"
                  placeholder="Option 1, Option 2, Option 3"
                  value={(newQuestion.options || []).join(', ')}
                  onChange={(e) => setNewQuestion({ 
                    ...newQuestion, 
                    options: e.target.value.split(',').map(o => o.trim()).filter(Boolean)
                  })}
                />
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Checkbox
                id="required"
                checked={newQuestion.required || false}
                onCheckedChange={(checked) => setNewQuestion({ 
                  ...newQuestion, 
                  required: checked === true 
                })}
              />
              <Label htmlFor="required" className="text-sm font-medium">
                Required question
              </Label>
            </div>

            <Button onClick={handleAddQuestion} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Question
            </Button>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-6 border-t border-border">
        <Button variant="outline" onClick={() => {
          toast.success('Draft saved');
        }}>
          <Save className="h-4 w-4 mr-2" />
          Save Draft
        </Button>
        <Button className="flex-1" onClick={handleContinue}>
          Continue to Distribution
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>

      {/* Import Template Modal */}
      <Dialog open={importTemplateOpen} onOpenChange={setImportTemplateOpen}>
        <DialogContent className="sm:max-w-[500px] p-0 gap-0 rounded-2xl">
          <DialogHeader className="px-6 pt-6 pb-4">
            <DialogTitle className="text-xl font-semibold">Import Question Template</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground mt-1">
              Choose a template to quickly add pre-configured questions
            </DialogDescription>
          </DialogHeader>
          <div className="px-6 py-4">
            <RadioGroup value={selectedTemplate} onValueChange={setSelectedTemplate} className="space-y-3">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer"
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <RadioGroupItem value={template.id} id={template.id} />
                  <div className="flex-1">
                    <Label htmlFor={template.id} className="text-sm font-semibold cursor-pointer">
                      {template.name}
                    </Label>
                    <p className="text-xs text-muted-foreground">{template.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {template.questionCount} questions
                    </p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
          <DialogFooter className="px-6 py-4 border-t border-border flex justify-end gap-3">
            <Button variant="outline" onClick={() => setImportTemplateOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleImportTemplate}>
              <FileText className="h-4 w-4 mr-2" />
              Import Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}