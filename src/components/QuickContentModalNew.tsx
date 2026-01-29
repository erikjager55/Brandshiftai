/**
 * Quick Content Modal - Synchronized with Campaign Wizard
 * Uses master content types list for consistency
 */

import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import {
  Zap,
  FileText,
  Mail,
  Linkedin,
  Twitter,
  Instagram,
  Image,
  BookOpen,
  Megaphone,
  Video,
  ArrowRight,
  X,
  Sparkles,
  Target,
  Users,
  ChevronDown,
  Check,
  Plus,
  TrendingUp,
  CheckCircle2,
  Loader2,
  Layers,
  BarChart3,
  Presentation,
  Facebook,
  Share2,
} from 'lucide-react';
import { cn } from '../lib/utils';
import {
  CONTENT_TYPES,
  CONTENT_TYPE_CATEGORIES,
  getContentTypesByCategory,
  type ContentTypeCategory,
} from '../types/content-types';

interface QuickContentModalProps {
  open?: boolean;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onClose?: () => void;
  onCreateContent?: (data: {
    campaignId: string;
    name: string;
    contentType: string;
    topic: string;
  }) => void;
  onComplete?: (data: {
    campaignId: string;
    name: string;
    contentType: string;
    topic: string;
  }) => void;
}

// Icon mapping helper
const getIconComponent = (iconName: string) => {
  const icons: Record<string, any> = {
    FileText,
    BookOpen,
    Megaphone,
    Linkedin,
    Twitter,
    Instagram,
    Layers,
    Facebook,
    Image,
    BarChart3,
    Presentation,
    Video,
    Mail,
  };
  return icons[iconName] || FileText;
};

const QUICK_PROMPTS = [
  'Announce a product update',
  'Share industry insights',
  'Customer success story',
  'Thought leadership piece',
];

const SAMPLE_BRAND_ASSETS = [
  { id: 'mission', name: 'Mission Statement', validated: true },
  { id: 'values', name: 'Core Values', validated: true },
  { id: 'voice', name: 'Brand Voice Guide', validated: false },
  { id: 'positioning', name: 'Positioning Statement', validated: true },
];

const SAMPLE_PERSONAS = [
  { id: 'p1', name: 'Sarah', avatar: 'S', role: 'Tech Leader' },
  { id: 'p2', name: 'Michael', avatar: 'M', role: 'Startup Founder' },
  { id: 'p3', name: 'Lisa', avatar: 'L', role: 'Marketing Manager' },
];

const SAMPLE_INSIGHTS = [
  { id: 'i1', name: 'AI Personalization', impact: 'high' },
  { id: 'i2', name: 'Remote Work Trends', impact: 'medium' },
  { id: 'i3', name: 'Sustainability Focus', impact: 'high' },
  { id: 'i4', name: 'Data Privacy Concerns', impact: 'high' },
];

const TONES = ['Professional', 'Casual', 'Friendly', 'Authoritative', 'Inspirational'];
const LENGTHS = [
  { id: 'short', label: 'Short', description: '~300 words' },
  { id: 'medium', label: 'Medium', description: '~600 words' },
  { id: 'long', label: 'Long', description: '~1000+ words' },
];

// Helper function to generate auto-name from topic/brief
function generateContentName(topic: string, contentType: string): string {
  if (!topic || topic.trim().length < 10) {
    const date = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    return `${contentType} - ${date}`;
  }

  let name = topic.trim().substring(0, 40);

  const lastSpaceIndex = name.lastIndexOf(' ');
  if (lastSpaceIndex > 20) {
    name = name.substring(0, lastSpaceIndex);
  }

  if (topic.trim().length > name.length) {
    name += '...';
  }

  name = name.charAt(0).toUpperCase() + name.slice(1);

  return name;
}

export function QuickContentModal({
  open,
  isOpen: isOpenProp,
  onOpenChange,
  onClose,
  onCreateContent,
  onComplete,
}: QuickContentModalProps) {
  const isOpen = open ?? isOpenProp ?? false;
  const handleClose = () => {
    onOpenChange?.(false);
    onClose?.();
  };

  const [activeCategory, setActiveCategory] = useState<ContentTypeCategory>('written');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [topic, setTopic] = useState('');
  const [knowledgeExpanded, setKnowledgeExpanded] = useState(false);
  const [styleExpanded, setStyleExpanded] = useState(false);
  const [selectedBrandAssets, setSelectedBrandAssets] = useState<string[]>([]);
  const [selectedPersonas, setSelectedPersonas] = useState<string[]>([]);
  const [selectedInsights, setSelectedInsights] = useState<string[]>([]);
  const [tone, setTone] = useState('Professional');
  const [length, setLength] = useState('medium');
  const [isCreating, setIsCreating] = useState(false);
  const [errors, setErrors] = useState<{ type?: string; topic?: string }>({});

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setActiveCategory('written');
        setSelectedType(null);
        setTopic('');
        setKnowledgeExpanded(false);
        setStyleExpanded(false);
        setSelectedBrandAssets([]);
        setSelectedPersonas([]);
        setSelectedInsights([]);
        setTone('Professional');
        setLength('medium');
        setIsCreating(false);
        setErrors({});
      }, 200);
    }
  }, [isOpen]);

  const handlePromptClick = (prompt: string) => {
    const expandedPrompt: Record<string, string> = {
      'Announce a product update':
        'Write an announcement about our latest product update, highlighting the key new features and improvements that will benefit our users. Include specific details about availability and next steps.',
      'Share industry insights':
        'Create a post sharing valuable industry insights based on recent trends and data. Position our brand as a thought leader and provide actionable takeaways for our audience.',
      'Customer success story':
        'Tell a compelling customer success story that showcases how our product/service helped solve a real business challenge. Include specific results and metrics where possible.',
      'Thought leadership piece':
        'Write a thought leadership piece that presents a unique perspective or forward-thinking ideas related to our industry. Focus on providing value and sparking meaningful conversation.',
    };

    setTopic(expandedPrompt[prompt] || prompt);
  };

  const handleCreate = () => {
    const newErrors: { type?: string; topic?: string } = {};

    if (!selectedType) {
      newErrors.type = 'Please select a content type';
    }
    if (topic.trim().length < 10) {
      newErrors.topic = 'Please describe what you want to create (minimum 10 characters)';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsCreating(true);

    setTimeout(() => {
      const data = {
        campaignId: 'quick-' + Date.now(),
        name: generateContentName(topic, selectedType!),
        contentType: selectedType!,
        topic: topic,
      };
      onCreateContent?.(data);
      onComplete?.(data);
      handleClose();
    }, 3000);
  };

  const canCreate = selectedType && topic.trim().length >= 10;
  const totalSelectedKnowledge =
    selectedBrandAssets.length + selectedPersonas.length + selectedInsights.length;

  const contentTypesForCategory = getContentTypesByCategory(activeCategory);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 transition-opacity duration-200"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-3xl max-h-[90vh] bg-card rounded-2xl shadow-xl flex flex-col animate-in fade-in-0 zoom-in-95 duration-200">
        {isCreating ? (
          /* Loading State */
          <div className="flex flex-col items-center justify-center py-12 px-6">
            <Sparkles className="h-12 w-12 text-primary animate-pulse" />
            <h3 className="text-lg font-semibold mt-4">Creating your content...</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Setting up your Quick Campaign and opening the editor
            </p>
            <div className="mt-6 space-y-2 w-full max-w-sm">
              <div className="flex items-center gap-3 text-sm">
                <Check className="h-4 w-4 text-green-600" />
                <span className="text-muted-foreground">Creating Quick Campaign...</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Loader2 className="h-4 w-4 text-primary animate-spin" />
                <span>Generating initial draft...</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/30" />
                <span className="text-muted-foreground">Opening Content Studio...</span>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="px-6 py-4 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Zap className="h-6 w-6 text-primary" />
                  <div>
                    <h2 className="text-xl font-semibold">Quick Content</h2>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      Create a single piece of content quickly. We'll set up a mini-campaign
                      automatically.
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <X className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 py-6 overflow-y-auto flex-1 space-y-6">
              {/* Section 1: Content Type with Tabs */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                  What do you want to create?
                </h3>
                
                {errors.type && (
                  <p className="text-sm text-red-600 dark:text-red-400 mb-3">{errors.type}</p>
                )}

                {/* Category Tabs */}
                <div className="flex gap-2 border-b mb-4">
                  {CONTENT_TYPE_CATEGORIES.map((category) => {
                    const Icon = getIconComponent(category.icon);
                    const isActive = activeCategory === category.id;
                    
                    return (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id as ContentTypeCategory)}
                        className={cn(
                          'flex items-center gap-2 px-4 py-2 border-b-2 transition-colors text-sm font-medium',
                          isActive
                            ? 'border-primary text-primary'
                            : 'border-transparent text-muted-foreground hover:text-foreground'
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {category.label}
                      </button>
                    );
                  })}
                </div>

                {/* Content Type Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {contentTypesForCategory.map((type) => {
                    const Icon = getIconComponent(type.icon);
                    const isSelected = selectedType === type.id;

                    // Support badges
                    const supportIcons: Record<string, any> = {
                      text: FileText,
                      image: Image,
                      video: Video,
                      carousel: Layers,
                    };

                    return (
                      <div
                        key={type.id}
                        onClick={() => {
                          setSelectedType(type.id);
                          setErrors((prev) => ({ ...prev, type: undefined }));
                        }}
                        className={cn(
                          'relative border rounded-xl p-4 cursor-pointer hover:bg-muted transition-all',
                          isSelected && 'border-primary bg-primary/5 shadow-sm'
                        )}
                      >
                        {isSelected && (
                          <CheckCircle2 className="absolute top-3 right-3 h-4 w-4 text-primary" />
                        )}
                        
                        <div className="flex items-start gap-3">
                          <Icon
                            className={cn(
                              'h-5 w-5 flex-shrink-0 mt-0.5',
                              isSelected ? 'text-primary' : 'text-muted-foreground'
                            )}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium mb-1">{type.name}</div>
                            <div className="text-xs text-muted-foreground mb-2">
                              {type.description}
                            </div>
                            
                            {/* Supports badges */}
                            <div className="flex flex-wrap gap-1">
                              {type.supports.map((support) => {
                                const SupportIcon = supportIcons[support];
                                return (
                                  <div
                                    key={support}
                                    className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted text-xs"
                                  >
                                    <SupportIcon className="h-3 w-3" />
                                    <span className="capitalize">{support}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Section 2: Topic or Brief */}
              <div className="mt-6">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  What's it about?
                </h3>
                {errors.topic && (
                  <p className="text-sm text-red-600 dark:text-red-400 mb-3">{errors.topic}</p>
                )}
                <div className="relative">
                  <Textarea
                    value={topic}
                    onChange={(e) => {
                      if (e.target.value.length <= 500) {
                        setTopic(e.target.value);
                        if (e.target.value.trim().length >= 10) {
                          setErrors((prev) => ({ ...prev, topic: undefined }));
                        }
                      }
                    }}
                    placeholder="Describe what you want to create, e.g., 'A blog post about our new product launch focusing on the key features and benefits for startup founders...'"
                    className={cn(
                      'rounded-lg border p-4 min-h-[100px] w-full resize-none text-sm',
                      errors.topic && 'border-red-500'
                    )}
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
                    {topic.length}/500
                  </div>
                </div>

                {/* Quick Prompts */}
                <div className="mt-3">
                  <p className="text-xs text-muted-foreground mb-2">Or try a quick prompt:</p>
                  <div className="flex flex-wrap gap-2">
                    {QUICK_PROMPTS.map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => handlePromptClick(prompt)}
                        className="px-3 py-1.5 rounded-full border text-xs cursor-pointer hover:bg-muted transition-colors"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Section 3: Knowledge Context (Collapsed by default) */}
              <div className="mt-6">
                <button
                  onClick={() => setKnowledgeExpanded(!knowledgeExpanded)}
                  className="flex items-center justify-between cursor-pointer py-3 w-full"
                >
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Add context from your knowledge
                    </h3>
                    <Badge className="text-xs px-2 py-0 rounded-full bg-primary/10 text-primary border-0">
                      Optional
                    </Badge>
                  </div>
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 text-muted-foreground transition-transform',
                      knowledgeExpanded && 'rotate-180'
                    )}
                  />
                </button>

                {!knowledgeExpanded && (
                  <p className="text-xs text-muted-foreground">
                    Select brand assets, personas, or insights to inform your content
                  </p>
                )}

                {knowledgeExpanded && (
                  <div className="border rounded-xl p-4 mt-3 bg-muted/30">
                    <p className="text-xs text-muted-foreground mb-3">
                      Knowledge selection will be available in the Content Studio
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t bg-muted/30">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Zap className="h-3 w-3" />
                <span>Content will be saved to a new Quick Campaign</span>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button onClick={handleCreate} disabled={!canCreate} className="gap-2">
                  <Sparkles className="h-4 w-4" />
                  Create Content
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}