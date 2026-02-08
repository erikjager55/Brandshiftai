/**
 * Content Studio - Multi-Type Content Creation Platform
 * Supports: Text, Image, Video, Carousel with AI generation
 */

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Checkbox } from './ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  FileText,
  Image as ImageIcon,
  Video,
  Layers,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Save,
  Eye,
  Download,
  MoreVertical,
  Copy,
  Clock,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Wand2,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Link,
  Image,
  Undo,
  Redo,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
  Plus,
  X,
  Search,
  Filter,
  TrendingUp,
  Target,
  Users,
  Zap,
  User,
  Palette,
  ZoomIn,
  ZoomOut,
  ArrowUpCircle,
  ImagePlus,
  Film,
  ToggleLeft,
  ToggleRight,
  Coins,
  Crown,
  Lock,
  Check,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { ImproveScorePanel } from './content-studio/ImproveScorePanel';
import { mockQualityMetrics, applySuggestion, applyAllSuggestions, dismissSuggestion, calculateQualityScore } from '../data/mock-quality-suggestions';
import type { QualityMetric } from '../data/mock-quality-suggestions';
import { toast } from 'sonner';
import { InsertInsightPopover } from './content-studio/InsertInsightPopover';
import { ResearchInsightsLibrary } from './content-studio/ResearchInsightsLibrary';
import { mockResearchInsights, markInsightAsUsed, getUsedInsightsCount } from '../data/mock-research-insights';
import type { ResearchInsight, InsertMode, InsertLocation } from './content-studio/InsertInsightPopover';

interface ContentStudioProps {
  deliverableId: string;
  campaignId: string;
  onBack?: () => void;
}

type ContentType = 'text' | 'image' | 'video' | 'carousel';
type AIProvider = 'openai' | 'anthropic';
type GenerationStatus = 'idle' | 'generating' | 'success' | 'error';

// Mock campaign data
const mockCampaign = {
  id: 'camp-1',
  name: 'Q1 Product Launch Campaign',
  type: 'strategic' as const,
};

const mockAssets = [
  { id: 'a1', name: 'Brand Positioning', validated: true, type: 'brand' },
  { id: 'a2', name: 'Tech Enthusiast Persona', validated: true, type: 'persona' },
  { id: 'a3', name: 'Product Features', validated: true, type: 'product' },
  { id: 'a4', name: 'Market Trends 2026', validated: false, type: 'research' },
];

const mockInsights = [
  {
    id: 'i1',
    text: '78% of tech enthusiasts value performance over price when making purchase decisions...',
    source: 'survey' as const,
  },
  {
    id: 'i2',
    text: 'Brand perception study shows innovation is our strongest differentiator...',
    source: 'analysis' as const,
  },
  {
    id: 'i3',
    text: 'Customer interviews reveal that simplicity is highly valued in product setup...',
    source: 'interview' as const,
  },
];

export function ContentStudioNew({ deliverableId, campaignId, onBack }: ContentStudioProps) {
  // Content type state
  const [activeType, setActiveType] = useState<ContentType>('text');
  const [contentTitle, setContentTitle] = useState('Blog: AI Trends in 2026');
  
  // Generation settings
  const [aiProvider, setAiProvider] = useState<AIProvider>('openai');
  const [prompt, setPrompt] = useState('');
  const [selectedAssets, setSelectedAssets] = useState<string[]>(['a1', 'a2', 'a3']);
  
  // Text settings
  const [targetAudience, setTargetAudience] = useState('tech-enthusiast');
  const [tone, setTone] = useState('professional');
  const [length, setLength] = useState('medium');
  
  // Image settings
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [imageStyle, setImageStyle] = useState('photorealistic');
  const [colorPalette, setColorPalette] = useState('brand');
  
  // Video settings
  const [videoDuration, setVideoDuration] = useState(30);
  const [videoStyle, setVideoStyle] = useState('motion-graphics');
  const [includeMusic, setIncludeMusic] = useState(true);
  
  // 🎨 Nano Banana Features
  const [onBrand, setOnBrand] = useState(true);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [showStylePicker, setShowStylePicker] = useState(false);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [videoInputMode, setVideoInputMode] = useState<'text' | 'frames'>('text');
  const [startFrame, setStartFrame] = useState<string | null>(null);
  const [endFrame, setEndFrame] = useState<string | null>(null);
  const [imageEditMode, setImageEditMode] = useState<'prompt' | 'upscale'>('prompt');
  const [upscaleQuality, setUpscaleQuality] = useState('2x');
  const [selectedModel, setSelectedModel] = useState('nano-banana-pro');
  const [imageQuality, setImageQuality] = useState('1K');
  const [credits, setCredits] = useState(124.5);
  const [brandAIEnabled, setBrandAIEnabled] = useState(false);
  
  // Generation state
  const [generationStatus, setGenerationStatus] = useState<GenerationStatus>('idle');
  const [generationProgress, setGenerationProgress] = useState(0);
  
  // Content state
  const [textContent, setTextContent] = useState('');
  const [wordCount, setWordCount] = useState(0);
  
  // Right panel
  const [qualityScore, setQualityScore] = useState(86);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [checklist, setChecklist] = useState([
    { id: 'c1', label: 'Matches brand voice', completed: true },
    { id: 'c2', label: 'Addresses target persona', completed: true },
    { id: 'c3', label: 'Includes call-to-action', completed: false },
    { id: 'c4', label: 'Keywords present', completed: true },
    { id: 'c5', label: 'Within word target', completed: false },
  ]);

  // Improve Score Panel
  const [showImprovePanel, setShowImprovePanel] = useState(false);
  const [qualityMetricsData, setQualityMetricsData] = useState<QualityMetric[]>(mockQualityMetrics);
  const [previewSuggestionId, setPreviewSuggestionId] = useState<string | null>(null);

  // Research Insights
  const [researchInsights, setResearchInsights] = useState<ResearchInsight[]>(mockResearchInsights);
  const [showInsertPopover, setShowInsertPopover] = useState(false);
  const [selectedInsight, setSelectedInsight] = useState<ResearchInsight | null>(null);
  const [showInsightsLibrary, setShowInsightsLibrary] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  
  // Content type tabs
  const contentTypes = [
    { id: 'text' as ContentType, icon: FileText, label: 'Text', hasContent: !!textContent },
    { id: 'image' as ContentType, icon: ImageIcon, label: 'Images', hasContent: false },
    { id: 'video' as ContentType, icon: Video, label: 'Video', hasContent: false },
    { id: 'carousel' as ContentType, icon: Layers, label: 'Carousel', hasContent: false },
  ];

  const handleGenerate = () => {
    setGenerationStatus('generating');
    setGenerationProgress(0);
    
    // Simulate generation
    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setGenerationStatus('success');
          setTimeout(() => setGenerationStatus('idle'), 1000);
          
          // Generate mock content
          if (activeType === 'text') {
            setTextContent('Generated content based on your prompt...');
            setWordCount(847);
          }
          
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const getPromptTemplates = () => {
    switch (activeType) {
      case 'text':
        return ['Write compelling intro', 'Add statistics', 'Include CTA', 'Make more persuasive'];
      case 'image':
        return ['Professional business style', 'Minimalist design', 'Bold and colorful', 'Lifestyle photography'];
      case 'video':
        return ['Product showcase', 'Tutorial style', 'Testimonial format', 'Behind the scenes'];
      case 'carousel':
        return ['Story format', 'Step-by-step guide', 'Before/after', 'Feature highlights'];
    }
  };

  const getQualityMetrics = () => {
    switch (activeType) {
      case 'text':
        return [
          { name: 'Brand Alignment', score: 92 },
          { name: 'Audience Fit', score: 85 },
          { name: 'Research Backed', score: 78 },
          { name: 'Readability', score: 90 },
        ];
      case 'image':
        return [
          { name: 'Brand Alignment', score: 88 },
          { name: 'Visual Quality', score: 92 },
          { name: 'Composition', score: 85 },
          { name: 'Color Harmony', score: 90 },
        ];
      case 'video':
        return [
          { name: 'Brand Alignment', score: 85 },
          { name: 'Pacing', score: 88 },
          { name: 'Visual Quality', score: 92 },
          { name: 'Message Clarity', score: 80 },
        ];
      case 'carousel':
        return [
          { name: 'Brand Alignment', score: 90 },
          { name: 'Flow & Coherence', score: 87 },
          { name: 'Visual Consistency', score: 92 },
          { name: 'Message Impact', score: 85 },
        ];
    }
  };

  const getChecklist = () => {
    switch (activeType) {
      case 'text':
        return [
          { id: 'c1', label: 'Matches brand voice', completed: true },
          { id: 'c2', label: 'Addresses target persona', completed: true },
          { id: 'c3', label: 'Includes call-to-action', completed: false },
          { id: 'c4', label: 'Keywords present', completed: true },
          { id: 'c5', label: 'Within word target', completed: false },
        ];
      case 'image':
        return [
          { id: 'c1', label: 'Uses brand colors', completed: true },
          { id: 'c2', label: 'Correct dimensions', completed: true },
          { id: 'c3', label: 'Includes logo', completed: false },
          { id: 'c4', label: 'High resolution', completed: true },
          { id: 'c5', label: 'Text is readable', completed: false },
        ];
      case 'video':
        return [
          { id: 'c1', label: 'Brand intro present', completed: true },
          { id: 'c2', label: 'Clear CTA', completed: false },
          { id: 'c3', label: 'Correct duration', completed: true },
          { id: 'c4', label: 'Audio levels balanced', completed: false },
          { id: 'c5', label: 'Captions added', completed: false },
        ];
      case 'carousel':
        return [
          { id: 'c1', label: 'Consistent style across slides', completed: true },
          { id: 'c2', label: 'Clear progression', completed: true },
          { id: 'c3', label: 'Brand elements present', completed: true },
          { id: 'c4', label: 'Optimal slide count', completed: false },
          { id: 'c5', label: 'Mobile-friendly', completed: true },
        ];
    }
  };

  const completedChecklist = getChecklist().filter(c => c.completed).length;
  const totalChecklist = getChecklist().length;

  // Handlers for Improve Score Panel
  const handleApplySuggestion = (suggestionId: string) => {
    const updatedMetrics = applySuggestion(qualityMetricsData, suggestionId);
    setQualityMetricsData(updatedMetrics);
    const newScore = calculateQualityScore(updatedMetrics);
    setQualityScore(newScore);
    
    // Find the applied suggestion to show in toast
    const suggestion = qualityMetricsData
      .flatMap(m => m.suggestions)
      .find(s => s.id === suggestionId);
    
    if (suggestion) {
      toast.success(`Applied: ${suggestion.title}`, {
        description: `Score improved by +${suggestion.points} points`,
      });
    }
  };

  const handleApplyAll = () => {
    const totalSuggestions = qualityMetricsData.reduce((sum, m) => sum + m.suggestions.length, 0);
    const updatedMetrics = applyAllSuggestions(qualityMetricsData);
    setQualityMetricsData(updatedMetrics);
    const newScore = calculateQualityScore(updatedMetrics);
    setQualityScore(newScore);
    setShowImprovePanel(false);
    
    toast.success('All suggestions applied!', {
      description: `${totalSuggestions} improvements applied. New score: ${newScore}/100`,
    });
  };

  const handlePreview = (suggestionId: string) => {
    setPreviewSuggestionId(suggestionId);
    // In a real implementation, this would scroll to and highlight the content
    toast.info('Preview functionality', {
      description: 'This would highlight the relevant section in the editor',
    });
  };

  const handleDismiss = (suggestionId: string) => {
    const updatedMetrics = dismissSuggestion(qualityMetricsData, suggestionId);
    setQualityMetricsData(updatedMetrics);
    toast('Suggestion dismissed', {
      description: 'You can always re-scan for suggestions',
    });
  };

  // Handlers for Research Insights
  const handleInsertClick = (insight: ResearchInsight) => {
    setSelectedInsight(insight);
    setShowInsertPopover(true);
  };

  const handleInsertFromLibrary = (insightId: string) => {
    const insight = researchInsights.find(i => i.id === insightId);
    if (insight) {
      setSelectedInsight(insight);
      setShowInsightsLibrary(false);
      setShowInsertPopover(true);
    }
  };

  const handleInsert = (mode: InsertMode, location: InsertLocation) => {
    if (!selectedInsight) return;

    let insertedText = '';
    
    switch (mode) {
      case 'inline':
        insertedText = `According to our research, ${selectedInsight.fullText || selectedInsight.text}`;
        break;
      case 'quote':
        insertedText = `\n\n> "${selectedInsight.fullText || selectedInsight.text}"\n> — ${selectedInsight.source}\n\n`;
        break;
      case 'visualization':
        insertedText = `\n\n[Data Visualization: ${selectedInsight.text}]\n\n`;
        break;
      case 'ai-adapted':
        insertedText = ` ${selectedInsight.fullText || selectedInsight.text}`;
        break;
    }

    // Insert at cursor or AI best position
    if (location === 'cursor') {
      const before = textContent.slice(0, cursorPosition);
      const after = textContent.slice(cursorPosition);
      setTextContent(before + insertedText + after);
    } else {
      // AI best location - append for demo
      setTextContent(textContent + '\n\n' + insertedText);
    }

    // Mark insight as used
    const updatedInsights = markInsightAsUsed(selectedInsight.id, researchInsights);
    setResearchInsights(updatedInsights);

    // Update quality score (research-backed content improves quality)
    const newScore = Math.min(100, qualityScore + 2);
    setQualityScore(newScore);

    // Update word count
    setWordCount(prev => prev + insertedText.split(/\s+/).filter(Boolean).length);

    toast.success('Research insight inserted!', {
      description: `Quality score improved to ${newScore}/100`,
    });

    setShowInsertPopover(false);
    setSelectedInsight(null);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-20">
        <div className="px-8 py-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <button onClick={onBack} className="hover:text-foreground transition-colors">
              Campaigns
            </button>
            <span>/</span>
            <button onClick={onBack} className="hover:text-foreground transition-colors">
              {mockCampaign.name}
            </button>
            <span>/</span>
            <span className="text-foreground">{contentTitle}</span>
          </div>

          {/* Title and Actions */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold">{contentTitle}</h1>
              <Badge className="rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                Blog Article
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mr-2">
                <Clock className="h-3 w-3" />
                <span>Auto-saved 07:19</span>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Eye className="h-4 w-4" />
                Preview
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="h-4 w-4" />
                    Export
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Text
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="h-4 w-4 mr-2" />
                    Download .txt
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="h-4 w-4 mr-2" />
                    Download .docx
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="h-4 w-4 mr-2" />
                    Download .html
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button size="sm" className="gap-2">
                <Save className="h-4 w-4" />
                Save
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuItem>Share</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600 dark:text-red-400">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Content Type Tabs */}
          <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
            {contentTypes.map(type => (
              <button
                key={type.id}
                onClick={() => setActiveType(type.id)}
                className={cn(
                  'relative px-3 py-1.5 rounded-md text-sm font-medium cursor-pointer transition-colors flex items-center gap-1.5',
                  activeType === type.id
                    ? 'bg-background shadow-sm text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <type.icon className="h-4 w-4" />
                {type.label}
                {type.hasContent && (
                  <div className="w-2 h-2 rounded-full bg-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content - 3 Column Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Generation Settings */}
        <div className="w-[240px] bg-card border-r overflow-y-auto">
          <div className="p-4 space-y-6">
            {/* AI Provider (for text only) */}
            {activeType === 'text' && (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  AI Provider
                </h3>
                <div className="flex rounded-lg border p-1 gap-1">
                  <button
                    onClick={() => setAiProvider('openai')}
                    className={cn(
                      'flex-1 py-2 px-3 rounded-md text-sm font-medium text-center cursor-pointer transition-colors',
                      aiProvider === 'openai'
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-muted'
                    )}
                  >
                    GPT-4
                  </button>
                  <button
                    onClick={() => setAiProvider('anthropic')}
                    className={cn(
                      'flex-1 py-2 px-3 rounded-md text-sm font-medium text-center cursor-pointer transition-colors',
                      aiProvider === 'anthropic'
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-muted'
                    )}
                  >
                    Claude
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Using {aiProvider === 'openai' ? 'GPT-4' : 'Claude'} for generation
                </p>
              </div>
            )}

            {/* Prompt */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                Prompt
              </h3>
              <Textarea
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                placeholder="Describe what you want to create..."
                className="rounded-lg border p-3 min-h-[120px] text-sm resize-none"
              />
              <div className="text-xs text-muted-foreground text-right mt-1">
                {prompt.length} / 500
              </div>
              
              {/* Quick Prompts */}
              <div className="mt-3">
                <p className="text-xs text-muted-foreground mb-2">Quick prompts:</p>
                <div className="flex flex-wrap gap-2">
                  {getPromptTemplates().map((template, i) => (
                    <button
                      key={i}
                      onClick={() => setPrompt(template)}
                      className="px-2 py-1 text-xs bg-muted hover:bg-muted/80 rounded-md transition-colors"
                    >
                      {template}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Style Settings - Text */}
            {activeType === 'text' && (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  Style
                </h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Target Audience</label>
                    <Select value={targetAudience} onValueChange={setTargetAudience}>
                      <SelectTrigger className="rounded-lg">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tech-enthusiast">Tech Enthusiast</SelectItem>
                        <SelectItem value="startup-founder">Startup Founder</SelectItem>
                        <SelectItem value="marketing-manager">Marketing Manager</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Tone of Voice</label>
                    <div className="grid grid-cols-2 gap-2">
                      {['professional', 'casual', 'bold', 'friendly'].map(t => (
                        <button
                          key={t}
                          onClick={() => setTone(t)}
                          className={cn(
                            'border rounded-lg p-2 text-center text-sm cursor-pointer transition-colors capitalize',
                            tone === t ? 'border-primary bg-primary/5' : 'hover:bg-muted'
                          )}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Target Length</label>
                    <div className="space-y-2">
                      {[
                        { id: 'short', label: 'Short', desc: '~500 words' },
                        { id: 'medium', label: 'Medium', desc: '~1000 words' },
                        { id: 'long', label: 'Long', desc: '~1500+ words' },
                      ].map(l => (
                        <label key={l.id} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="length"
                            checked={length === l.id}
                            onChange={() => setLength(l.id)}
                            className="w-4 h-4"
                          />
                          <div className="flex-1">
                            <div className="text-sm">{l.label}</div>
                            <div className="text-xs text-muted-foreground">{l.desc}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Style Settings - Image */}
            {activeType === 'image' && (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  Image Settings
                </h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Aspect Ratio</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: '1:1', label: 'Square', w: 'w-8', h: 'h-8' },
                        { id: '16:9', label: 'Landscape', w: 'w-10', h: 'h-6' },
                        { id: '9:16', label: 'Portrait', w: 'w-6', h: 'h-10' },
                      ].map(ratio => (
                        <button
                          key={ratio.id}
                          onClick={() => setAspectRatio(ratio.id)}
                          className={cn(
                            'flex flex-col items-center gap-1 p-2 border rounded-lg cursor-pointer transition-colors',
                            aspectRatio === ratio.id ? 'border-primary bg-primary/5' : 'hover:bg-muted'
                          )}
                        >
                          <div className={cn('border-2 border-muted-foreground/30', ratio.w, ratio.h)} />
                          <span className="text-xs">{ratio.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Visual Style</label>
                    <Select value={imageStyle} onValueChange={setImageStyle}>
                      <SelectTrigger className="rounded-lg">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="photorealistic">Photorealistic</SelectItem>
                        <SelectItem value="illustration">Illustration</SelectItem>
                        <SelectItem value="3d-render">3D Render</SelectItem>
                        <SelectItem value="flat-design">Flat Design</SelectItem>
                        <SelectItem value="watercolor">Watercolor</SelectItem>
                        <SelectItem value="line-art">Line Art</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Color Palette</label>
                    <Select value={colorPalette} onValueChange={setColorPalette}>
                      <SelectTrigger className="rounded-lg">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="brand">From Brand</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                        <SelectItem value="ai-suggested">AI Suggested</SelectItem>
                      </SelectContent>
                    </Select>
                    {colorPalette === 'brand' && (
                      <div className="flex gap-1 mt-2">
                        <div className="w-6 h-6 rounded bg-[#1FD1B2]" />
                        <div className="w-6 h-6 rounded bg-[#1F2937]" />
                        <div className="w-6 h-6 rounded bg-[#F59E0B]" />
                        <div className="w-6 h-6 rounded bg-[#3B82F6]" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Style Settings - Video */}
            {activeType === 'video' && (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  Video Settings
                </h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Duration</label>
                    <div className="grid grid-cols-4 gap-2">
                      {[15, 30, 45, 60].map(dur => (
                        <button
                          key={dur}
                          onClick={() => setVideoDuration(dur)}
                          className={cn(
                            'p-2 border rounded-lg text-sm cursor-pointer transition-colors',
                            videoDuration === dur ? 'border-primary bg-primary/5' : 'hover:bg-muted'
                          )}
                        >
                          {dur}s
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Video Style</label>
                    <Select value={videoStyle} onValueChange={setVideoStyle}>
                      <SelectTrigger className="rounded-lg">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="motion-graphics">Motion Graphics</SelectItem>
                        <SelectItem value="slideshow">Slideshow</SelectItem>
                        <SelectItem value="kinetic-text">Kinetic Text</SelectItem>
                        <SelectItem value="product-demo">Product Demo</SelectItem>
                        <SelectItem value="animated-explainer">Animated Explainer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Background Music</span>
                      <button
                        onClick={() => setIncludeMusic(!includeMusic)}
                        className={cn(
                          'w-11 h-6 rounded-full transition-colors relative',
                          includeMusic ? 'bg-primary' : 'bg-muted'
                        )}
                      >
                        <div
                          className={cn(
                            'absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-background transition-transform',
                            includeMusic && 'translate-x-5'
                          )}
                        />
                      </button>
                    </label>
                    {includeMusic && (
                      <Select defaultValue="upbeat">
                        <SelectTrigger className="rounded-lg">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="upbeat">Upbeat</SelectItem>
                          <SelectItem value="corporate">Corporate</SelectItem>
                          <SelectItem value="emotional">Emotional</SelectItem>
                          <SelectItem value="minimal">Minimal</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Knowledge Assets */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                Knowledge Context
              </h3>
              <p className="text-xs text-muted-foreground mb-3">
                From campaign: {mockCampaign.name}
              </p>
              
              <div className="space-y-2">
                {mockAssets.map(asset => (
                  <label key={asset.id} className="flex items-center gap-2 cursor-pointer group">
                    <Checkbox
                      checked={selectedAssets.includes(asset.id)}
                      onCheckedChange={checked => {
                        if (checked) {
                          setSelectedAssets([...selectedAssets, asset.id]);
                        } else {
                          setSelectedAssets(selectedAssets.filter(id => id !== asset.id));
                        }
                      }}
                      className="w-4 h-4"
                    />
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm flex-1 truncate">{asset.name}</span>
                    <div className={cn(
                      'w-2 h-2 rounded-full',
                      asset.validated ? 'bg-green-500' : 'bg-amber-500'
                    )} />
                  </label>
                ))}
              </div>

              <div className="mt-3">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Context Confidence</span>
                  <span className="font-semibold">85%</span>
                </div>
                <Progress value={85} className="h-1.5" />
              </div>

              <a href="#" className="text-xs text-primary hover:underline block mt-2">
                Manage in Campaign →
              </a>
            </div>

            {/* Generate Button */}
            <div className="sticky bottom-0 bg-card border-t -mx-4 -mb-4 p-4 mt-6">
              <Button
                onClick={handleGenerate}
                disabled={generationStatus === 'generating'}
                className="w-full gap-2"
              >
                {generationStatus === 'generating' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Generate {activeType.charAt(0).toUpperCase() + activeType.slice(1)}
                  </>
                )}
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-2">
                Estimated: ~$0.05
              </p>
            </div>
          </div>
        </div>

        {/* Center Panel - Canvas/Editor */}
        <div className="flex-1 bg-muted/30 overflow-y-auto">
          <div className="p-6">
            {generationStatus === 'generating' && (
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-10">
                <div className="text-center">
                  <Sparkles className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
                  <h3 className="text-lg font-semibold mb-2">
                    Generating your {activeType}...
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {generationProgress < 30 && 'Analyzing brand context...'}
                    {generationProgress >= 30 && generationProgress < 70 && 'Creating content...'}
                    {generationProgress >= 70 && 'Finalizing...'}
                  </p>
                  <div className="w-64 mx-auto">
                    <Progress value={generationProgress} className="h-2" />
                  </div>
                  <Button variant="ghost" size="sm" className="mt-4">
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {/* Text Editor */}
            {activeType === 'text' && (
              <Card className="rounded-xl border shadow-sm overflow-hidden">
                {/* Toolbar */}
                <div className="flex items-center gap-1 p-2 border-b bg-muted/30 flex-wrap">
                  {/* AI Actions */}
                  <div className="flex items-center gap-1 pr-3 border-r">
                    <Button variant="ghost" size="sm" className="gap-1.5 text-xs">
                      <Sparkles className="h-4 w-4" />
                      AI Rewrite
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1.5 text-xs">
                      <Wand2 className="h-4 w-4" />
                      AI Expand
                    </Button>
                  </div>

                  {/* Formatting */}
                  <div className="flex items-center gap-1 pr-3 border-r">
                    <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                      <Italic className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                      <Underline className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                      <Strikethrough className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Paragraph */}
                  <div className="flex items-center gap-1 pr-3 border-r">
                    <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                      <List className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                      <ListOrdered className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Insert */}
                  <div className="flex items-center gap-1 pr-3 border-r">
                    <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                      <Link className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                      <Image className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* History */}
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                      <Undo className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                      <Redo className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Editor Content */}
                <div className="p-6 min-h-[400px]">
                  <Textarea
                    value={textContent}
                    onChange={e => {
                      setTextContent(e.target.value);
                      setWordCount(e.target.value.split(/\s+/).filter(Boolean).length);
                    }}
                    onClick={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      setCursorPosition(target.selectionStart);
                    }}
                    onKeyUp={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      setCursorPosition(target.selectionStart);
                    }}
                    placeholder="Start writing or generate with AI above..."
                    className="w-full min-h-[400px] border-none shadow-none resize-none focus-visible:ring-0 text-base leading-relaxed"
                  />
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between p-3 border-t bg-muted/30 text-xs text-muted-foreground">
                  <span>{wordCount} words • {Math.ceil(wordCount / 200)} min read</span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3 text-green-500" />
                    Auto-saved 07:19:05
                  </span>
                </div>
              </Card>
            )}

            {/* Image Canvas */}
            {activeType === 'image' && (
              <Card className="rounded-xl border shadow-sm overflow-hidden">
                {/* Toolbar */}
                <div className="flex items-center justify-between p-2 border-b">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                      <ZoomOut className="h-4 w-4" />
                    </Button>
                    <span className="text-sm font-medium">100%</span>
                    <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <RefreshCw className="h-4 w-4" />
                      Regenerate
                    </Button>
                  </div>
                </div>

                {/* Canvas */}
                <div className="flex items-center justify-center p-8 min-h-[500px] bg-[repeating-conic-gradient(#f3f4f6_0%_25%,white_0%_50%)] dark:bg-[repeating-conic-gradient(#374151_0%_25%,#1f2937_0%_50%)] bg-[length:20px_20px]">
                  <div className="border-2 border-dashed border-muted-foreground/30 rounded-xl flex items-center justify-center w-full max-w-2xl aspect-video">
                    <div className="text-center">
                      <ImageIcon className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Ready to Create</h3>
                      <p className="text-muted-foreground max-w-md">
                        Configure your settings and click Generate to create your image
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Video Canvas */}
            {activeType === 'video' && (
              <Card className="rounded-xl border shadow-sm overflow-hidden bg-black">
                {/* Video Preview */}
                <div className="flex items-center justify-center aspect-video bg-black">
                  <div className="text-center">
                    <Video className="h-16 w-16 text-white/30 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Ready to Create</h3>
                    <p className="text-white/70 max-w-md">
                      Configure your settings and click Generate to create your video
                    </p>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-3 p-3 bg-card border-t">
                  <Button size="sm" className="w-10 h-10 rounded-full p-0">
                    <Play className="h-5 w-5" />
                  </Button>
                  <span className="text-sm font-mono">00:00</span>
                  <div className="flex-1 h-12 bg-muted rounded-lg relative" />
                  <span className="text-sm font-mono">/ 00:30</span>
                  <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                    <Volume2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            )}

            {/* Carousel Canvas */}
            {activeType === 'carousel' && (
              <div className="space-y-4">
                <Card className="rounded-xl border shadow-sm overflow-hidden">
                  {/* Slide Navigation */}
                  <div className="flex items-center justify-between p-4 border-b">
                    <span className="text-sm">Slide 1 of 5</span>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button size="sm" className="gap-2">
                      <Plus className="h-4 w-4" />
                      Add Slide
                    </Button>
                  </div>

                  {/* Current Slide */}
                  <div className="flex items-center justify-center p-8 min-h-[400px] bg-[repeating-conic-gradient(#f3f4f6_0%_25%,white_0%_50%)] dark:bg-[repeating-conic-gradient(#374151_0%_25%,#1f2937_0%_50%)] bg-[length:20px_20px]">
                    <div className="border-2 border-dashed border-muted-foreground/30 rounded-xl flex items-center justify-center w-full max-w-xl aspect-square">
                      <div className="text-center">
                        <Layers className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Ready to Create</h3>
                        <p className="text-muted-foreground max-w-md">
                          Configure your settings and click Generate to create your carousel
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Slide Strip */}
                  <div className="flex gap-3 p-4 border-t overflow-x-auto">
                    {[1, 2, 3, 4, 5].map(i => (
                      <div
                        key={i}
                        className={cn(
                          'relative w-24 aspect-square rounded-lg border-2 cursor-pointer flex-shrink-0 flex items-center justify-center bg-muted',
                          i === 1 ? 'border-primary' : 'border-border'
                        )}
                      >
                        <div className="absolute top-1 left-1 w-5 h-5 rounded-full bg-black/50 text-white text-xs flex items-center justify-center">
                          {i}
                        </div>
                        {i > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-1 right-1 w-5 h-5 p-0 opacity-0 hover:opacity-100"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Quality & Details */}
        <div className="w-[280px] bg-card border-l overflow-y-auto">
          <div className="p-4 space-y-6">
            {/* Quality Score */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Content Quality</h3>
              
              {/* Score Donut */}
              <div className="flex items-center justify-center py-4">
                <div className="relative w-32 h-32">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-muted"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${(qualityScore / 100) * 351.86} 351.86`}
                      className="text-green-500"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-3xl font-semibold">{qualityScore}</div>
                    <div className="text-sm text-muted-foreground">/100</div>
                  </div>
                </div>
              </div>
              <p className="text-center text-sm font-medium text-green-600 dark:text-green-400">
                Excellent
              </p>

              {/* Metrics Breakdown */}
              <div className="space-y-3 mt-4">
                {getQualityMetrics().map(metric => (
                  <div key={metric.name} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{metric.name}</span>
                      <span className="font-medium">{metric.score}%</span>
                    </div>
                    <Progress
                      value={metric.score}
                      className={cn(
                        'h-1.5',
                        metric.score >= 80 && '[&>div]:bg-green-500',
                        metric.score >= 60 && metric.score < 80 && '[&>div]:bg-amber-500',
                        metric.score < 60 && '[&>div]:bg-red-500'
                      )}
                    />
                  </div>
                ))}
              </div>

              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => setShowImprovePanel(true)}
              >
                Improve Score
              </Button>
            </div>

            {/* Research Insights */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">Research Insights</h3>
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <button
                  onClick={() => setShowInsightsLibrary(true)}
                  className="text-xs text-primary hover:underline"
                >
                  See All
                </button>
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                Validated findings to strengthen your content
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                From: {mockCampaign.name}
              </p>

              <div className="space-y-3">
                {researchInsights.slice(0, 3).map(insight => {
                  const badgeStyles = insight.type === 'survey' 
                    ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
                    : insight.type === 'analysis'
                    ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                    : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400';
                  
                  return (
                    <div key={insight.id} className="bg-muted/50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={cn('text-xs px-2 py-0.5 rounded-full', badgeStyles)}>
                          {insight.type}
                        </Badge>
                        {insight.used && (
                          <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 text-xs px-2 py-0.5 rounded-full">
                            <Check className="h-3 w-3 mr-1" />
                            Used
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm line-clamp-2 mb-2">{insight.text}</p>
                      <button
                        onClick={() => handleInsertClick(insight)}
                        disabled={insight.used}
                        className={cn(
                          'text-xs hover:underline',
                          insight.used ? 'text-muted-foreground cursor-not-allowed' : 'text-primary'
                        )}
                      >
                        {insight.used ? 'Already Used' : 'Insert'}
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 p-3 bg-muted/30 rounded-lg border border-dashed">
                <button
                  onClick={() => setShowInsightsLibrary(true)}
                  className="text-sm text-primary hover:underline w-full text-center"
                >
                  + Browse all research findings
                </button>
              </div>

              <p className="text-xs text-muted-foreground mt-3">
                {getUsedInsightsCount(researchInsights)} of {researchInsights.length} insights used
              </p>
            </div>

            {/* Content Checklist */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Content Checklist</h3>
              
              <div className="space-y-2">
                {getChecklist().map(item => (
                  <label key={item.id} className="flex items-center gap-3 cursor-pointer">
                    <div
                      className={cn(
                        'w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0',
                        item.completed
                          ? 'bg-green-500 border-green-500'
                          : 'border-muted-foreground/30'
                      )}
                    >
                      {item.completed && (
                        <CheckCircle2 className="h-3 w-3 text-white" />
                      )}
                    </div>
                    <span
                      className={cn(
                        'text-sm',
                        item.completed ? 'text-foreground' : 'text-muted-foreground'
                      )}
                    >
                      {item.label}
                    </span>
                  </label>
                ))}
              </div>

              <p className="text-xs text-muted-foreground mt-3">
                {completedChecklist}/{totalChecklist} complete
              </p>
            </div>

            {/* Version History */}
            <div>
              <button
                onClick={() => setShowVersionHistory(!showVersionHistory)}
                className="flex items-center justify-between w-full cursor-pointer"
              >
                <h3 className="text-lg font-semibold">Version History</h3>
                {showVersionHistory ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </button>

              {showVersionHistory && (
                <div className="mt-4 space-y-2">
                  {[
                    { id: 'v3', label: 'v3', current: true, time: 'Jan 22, 07:19', type: 'Auto-saved' },
                    { id: 'v2', label: 'v2', current: false, time: 'Jan 22, 07:15', type: 'Manual save' },
                    { id: 'v1', label: 'v1', current: false, time: 'Jan 21, 22:30', type: 'Initial draft' },
                  ].map(version => (
                    <div key={version.id} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="text-sm font-medium">
                            {version.label}
                            {version.current && (
                              <span className="text-xs text-muted-foreground ml-2">(Current)</span>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {version.time} • {version.type}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {!version.current && (
                          <button className="text-xs text-primary hover:underline">
                            Restore
                          </button>
                        )}
                        <button className="text-xs text-muted-foreground hover:underline">
                          View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Export Options */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Export</h3>
              
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Copy className="h-4 w-4" />
                  Copy
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>

              <Button variant="outline" className="w-full mt-3">
                More Export Options...
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Improve Score Panel */}
      <ImproveScorePanel
        isOpen={showImprovePanel}
        onClose={() => setShowImprovePanel(false)}
        currentScore={qualityScore}
        metrics={qualityMetricsData}
        onApplySuggestion={handleApplySuggestion}
        onApplyAll={handleApplyAll}
        onPreview={handlePreview}
        onDismiss={handleDismiss}
      />

      {/* Insert Insight Popover */}
      {selectedInsight && (
        <InsertInsightPopover
          insight={selectedInsight}
          isOpen={showInsertPopover}
          onClose={() => {
            setShowInsertPopover(false);
            setSelectedInsight(null);
          }}
          onInsert={handleInsert}
        />
      )}

      {/* Research Insights Library */}
      <ResearchInsightsLibrary
        isOpen={showInsightsLibrary}
        onClose={() => setShowInsightsLibrary(false)}
        insights={researchInsights}
        onInsert={handleInsertFromLibrary}
      />
    </div>
  );
}