import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible';
import {
  Edit,
  Trash2,
  CheckCircle2,
  Plus,
  Sparkles,
  Calendar,
  Clock,
  Flag,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Monitor,
  Smartphone,
  RotateCcw,
  Send,
  MessageSquare,
  FileText,
  Eye,
  Target,
  Users,
  ExternalLink,
  Circle,
  AlertCircle,
  Bold,
  Italic,
  List,
  Link,
  Image,
  Heading2,
} from 'lucide-react';
import { cn } from '../lib/utils';

interface CampaignDeliverableDetailViewProps {
  deliverableId: string;
  campaignId: string;
  onBack?: () => void;
}

interface Comment {
  id: string;
  author: string;
  avatar: string;
  timestamp: string;
  text: string;
}

interface Version {
  id: string;
  timestamp: string;
  author: string;
  changes: string;
}

const mockDeliverable = {
  id: '1',
  name: 'Blog Post: AI Trends in 2025',
  type: 'Blog Post',
  campaign: 'Product Launch',
  status: 'in-progress',
  dueDate: '2025-02-15',
  assignee: { name: 'Sarah Chen', avatar: 'SC' },
  priority: 'High',
  content: 'Artificial intelligence is transforming the way we work...',
  wordCount: 450,
  targetWords: 1500,
};

const researchSources = [
  { name: 'Brand Voice Guidelines', validated: true },
  { name: 'Target Persona: Sarah', validated: true },
  { name: 'Key Messages', validated: true },
];

const contentGuidelines = [
  { id: '1', label: 'Matches brand voice', checked: true },
  { id: '2', label: 'Addresses persona pain points', checked: false },
  { id: '3', label: 'Includes call-to-action', checked: false },
  { id: '4', label: 'SEO optimized', checked: true },
  { id: '5', label: 'Within word limit', checked: false },
];

const relatedDeliverables = [
  { id: '2', name: 'Social Media Post: AI Announcement', status: 'completed', type: 'Social' },
  { id: '3', name: 'Email: Product Launch', status: 'in-progress', type: 'Email' },
  { id: '4', name: 'Landing Page: AI Features', status: 'not-started', type: 'Landing Page' },
];

const mockComments: Comment[] = [
  { id: '1', author: 'John Doe', avatar: 'JD', timestamp: '2 hours ago', text: 'Great start! Can we add more data points?' },
  { id: '2', author: 'Sarah Chen', avatar: 'SC', timestamp: '1 hour ago', text: 'Updated with latest research findings.' },
];

const mockVersions: Version[] = [
  { id: '1', timestamp: 'Today, 2:30 PM', author: 'Sarah Chen', changes: 'Updated introduction paragraph' },
  { id: '2', timestamp: 'Today, 10:15 AM', author: 'Sarah Chen', changes: 'Added AI trends section' },
  { id: '3', timestamp: 'Yesterday, 4:00 PM', author: 'John Doe', changes: 'Initial draft' },
];

export function CampaignDeliverableDetailView({ deliverableId, campaignId, onBack }: CampaignDeliverableDetailViewProps) {
  const [content, setContent] = useState(mockDeliverable.content);
  const [activeTab, setActiveTab] = useState<'content' | 'preview' | 'versions'>('content');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [aiPanelExpanded, setAiPanelExpanded] = useState(false);
  const [aiTone, setAiTone] = useState('professional');
  const [aiLength, setAiLength] = useState('medium');
  const [aiGenerated, setAiGenerated] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [commentText, setCommentText] = useState('');
  const [guidelines, setGuidelines] = useState(contentGuidelines);
  const [researchExpanded, setResearchExpanded] = useState(false);

  const daysRemaining = Math.ceil(
    (new Date(mockDeliverable.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  const statusConfig = {
    'in-progress': { label: 'In Progress', class: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' },
    'completed': { label: 'Complete', class: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' },
    'not-started': { label: 'Not Started', class: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300' },
  };

  const priorityConfig = {
    'High': { color: 'text-red-600 dark:text-red-400' },
    'Medium': { color: 'text-amber-600 dark:text-amber-400' },
    'Low': { color: 'text-gray-600 dark:text-gray-400' },
  };

  const currentStatus = statusConfig[mockDeliverable.status as keyof typeof statusConfig];
  const currentPriority = priorityConfig[mockDeliverable.priority as keyof typeof priorityConfig];

  const handleGenerateAI = () => {
    setGeneratedContent(
      'Artificial intelligence is rapidly transforming industries across the globe in 2025. From automated decision-making to personalized customer experiences, AI is becoming an integral part of modern business strategy.\n\nKey trends include the rise of generative AI, improved natural language processing, and ethical AI frameworks that ensure responsible deployment. Organizations that embrace these technologies are seeing significant improvements in efficiency and innovation.\n\nAs we look to the future, AI will continue to evolve, creating new opportunities for businesses willing to adapt and integrate these powerful tools into their operations.'
    );
    setAiGenerated(true);
  };

  const handleUseGenerated = () => {
    setContent(generatedContent);
    setAiGenerated(false);
    setAiPanelExpanded(false);
  };

  const toggleGuideline = (id: string) => {
    setGuidelines(prev =>
      prev.map(g => (g.id === id ? { ...g, checked: !g.checked } : g))
    );
  };

  const handlePostComment = () => {
    if (commentText.trim()) {
      // Add comment logic
      setCommentText('');
    }
  };

  return (
    <div className="h-full overflow-auto bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-10">
        <div className="max-w-7xl mx-auto px-8 py-6 space-y-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <button onClick={onBack} className="hover:text-primary transition-colors duration-200">
              Campaigns
            </button>
            <ChevronRight className="h-4 w-4" />
            <button onClick={onBack} className="hover:text-primary transition-colors duration-200">
              {mockDeliverable.campaign}
            </button>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{mockDeliverable.name}</span>
          </div>

          {/* Title row */}
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div>
                <h1 className="text-3xl font-semibold mb-2">{mockDeliverable.name}</h1>
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-full px-3 py-1">
                    {mockDeliverable.type}
                  </Badge>
                  <Badge className={cn("rounded-full px-3 py-1", currentStatus.class)}>
                    {currentStatus.label}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Action bar */}
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button onClick={() => setAiPanelExpanded(true)}>
              <Sparkles className="h-4 w-4 mr-2" />
              Generate with AI
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Change Status
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
                  Mark as Complete
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Clock className="h-4 w-4 mr-2 text-blue-600" />
                  Mark In Progress
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Circle className="h-4 w-4 mr-2 text-gray-600" />
                  Mark Not Started
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Content - Split Layout */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid lg:grid-cols-[60%_40%] gap-6">
          {/* LEFT PANEL - CONTENT */}
          <div className="space-y-6">
            {/* Content Editor Card */}
            <Card className="rounded-xl border">
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
                <CardHeader className="pb-0">
                  <TabsList>
                    <TabsTrigger value="content">Content</TabsTrigger>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                    <TabsTrigger value="versions">Versions</TabsTrigger>
                  </TabsList>
                </CardHeader>

                <CardContent className="p-6">
                  {/* Content Tab */}
                  <TabsContent value="content" className="mt-0">
                    {/* Toolbar */}
                    <div className="flex items-center gap-1 mb-4 p-2 border border-border rounded-lg bg-muted/30">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Bold className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Italic className="h-4 w-4" />
                      </Button>
                      <Separator orientation="vertical" className="h-6 mx-1" />
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Heading2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <List className="h-4 w-4" />
                      </Button>
                      <Separator orientation="vertical" className="h-6 mx-1" />
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Link className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Image className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Editor */}
                    <Textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Start writing or generate content with AI..."
                      rows={15}
                      className="rounded-lg resize-none font-serif text-base leading-relaxed"
                    />

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
                      <span>{content.split(' ').filter(w => w).length}/{mockDeliverable.targetWords} words</span>
                      <span>Last saved 2 min ago</span>
                    </div>
                  </TabsContent>

                  {/* Preview Tab */}
                  <TabsContent value="preview" className="mt-0">
                    {/* Device Toggle */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant={previewDevice === 'desktop' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setPreviewDevice('desktop')}
                        >
                          <Monitor className="h-4 w-4 mr-2" />
                          Desktop
                        </Button>
                        <Button
                          variant={previewDevice === 'mobile' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setPreviewDevice('mobile')}
                        >
                          <Smartphone className="h-4 w-4 mr-2" />
                          Mobile
                        </Button>
                      </div>
                    </div>

                    {/* Preview Content */}
                    <div
                      className={cn(
                        "mx-auto border border-border rounded-lg p-6 bg-background",
                        previewDevice === 'mobile' ? "max-w-sm" : "max-w-full"
                      )}
                    >
                      <h2 className="text-2xl font-semibold mb-4">{mockDeliverable.name}</h2>
                      <div className="prose prose-sm max-w-none">
                        <p className="whitespace-pre-wrap">{content}</p>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Versions Tab */}
                  <TabsContent value="versions" className="mt-0">
                    <div className="space-y-3">
                      {mockVersions.map((version) => (
                        <Card key={version.id} className="rounded-lg border p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-semibold">{version.author}</span>
                                <span className="text-xs text-muted-foreground">{version.timestamp}</span>
                              </div>
                              <p className="text-sm text-muted-foreground">{version.changes}</p>
                            </div>
                            <Button variant="outline" size="sm">
                              <RotateCcw className="h-4 w-4 mr-2" />
                              Restore
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </CardContent>
              </Tabs>
            </Card>

            {/* AI Generation Panel */}
            <Collapsible open={aiPanelExpanded} onOpenChange={setAiPanelExpanded}>
              <Card className="rounded-xl border bg-primary/5">
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-primary/10 transition-colors duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">AI Content Assistant</CardTitle>
                      </div>
                      {aiPanelExpanded ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Generate content based on your research</span>
                          <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <CardContent className="space-y-4">
                    {!aiGenerated ? (
                      <>
                        {/* Tone Selector */}
                        <div className="space-y-2">
                          <label className="text-sm font-semibold">Tone</label>
                          <div className="flex gap-2">
                            {['Professional', 'Casual', 'Urgent', 'Friendly'].map((tone) => (
                              <Button
                                key={tone}
                                variant={aiTone === tone.toLowerCase() ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setAiTone(tone.toLowerCase())}
                              >
                                {tone}
                              </Button>
                            ))}
                          </div>
                        </div>

                        {/* Length Selector */}
                        <div className="space-y-2">
                          <label className="text-sm font-semibold">Length</label>
                          <div className="flex gap-2">
                            {['Short', 'Medium', 'Long'].map((length) => (
                              <Button
                                key={length}
                                variant={aiLength === length.toLowerCase() ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setAiLength(length.toLowerCase())}
                              >
                                {length}
                              </Button>
                            ))}
                          </div>
                        </div>

                        {/* Generate Button */}
                        <Button onClick={handleGenerateAI} className="w-full">
                          <Sparkles className="h-4 w-4 mr-2" />
                          Generate Content
                        </Button>
                      </>
                    ) : (
                      <>
                        {/* Generated Content */}
                        <div className="p-4 border border-border rounded-lg bg-background">
                          <p className="text-sm whitespace-pre-wrap">{generatedContent}</p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <Button onClick={handleGenerateAI} variant="outline" className="flex-1">
                            <RotateCcw className="h-4 w-4 mr-2" />
                            Regenerate
                          </Button>
                          <Button onClick={handleUseGenerated} className="flex-1">
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            Use This
                          </Button>
                        </div>
                      </>
                    )}
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          </div>

          {/* RIGHT PANEL - CONTEXT */}
          <div className="space-y-6">
            {/* Deliverable Info Card */}
            <Card className="rounded-xl border p-6">
              <h3 className="text-lg font-semibold mb-4">Deliverable Info</h3>
              <div className="space-y-4">
                {/* Due Date */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Due Date</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      {new Date(mockDeliverable.dueDate).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </div>
                    <Badge className={cn(
                      "rounded-full px-2 py-0.5 text-xs mt-1",
                      daysRemaining < 3 
                        ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                        : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                    )}>
                      {daysRemaining} days left
                    </Badge>
                  </div>
                </div>

                <Separator />

                {/* Assignee */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Assignee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">{mockDeliverable.assignee.avatar}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{mockDeliverable.assignee.name}</span>
                    <Button variant="link" className="h-auto p-0 text-xs">
                      Change
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Priority */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Flag className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Priority</span>
                  </div>
                  <span className={cn("text-sm font-semibold", currentPriority.color)}>
                    {mockDeliverable.priority}
                  </span>
                </div>

                <Separator />

                {/* Campaign Link */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Part of</span>
                  <Button variant="link" className="h-auto p-0 text-sm" onClick={onBack}>
                    {mockDeliverable.campaign} Campaign
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Research Foundation Card */}
            <Card className="rounded-xl border p-6 bg-primary/5">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Content powered by research</h3>
              </div>

              {/* Confidence Score */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Research Confidence</span>
                  <span className="text-2xl font-semibold text-green-600 dark:text-green-400">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>

              {/* Sources */}
              <div className="space-y-2 mb-4">
                {researchSources.map((source, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <span className="text-sm">{source.name}</span>
                  </div>
                ))}
              </div>

              {/* View Research Expandable */}
              <Collapsible open={researchExpanded} onOpenChange={setResearchExpanded}>
                <CollapsibleTrigger asChild>
                  <Button variant="link" className="h-auto p-0 text-sm">
                    View Research
                    {researchExpanded ? (
                      <ChevronUp className="h-4 w-4 ml-1" />
                    ) : (
                      <ChevronDown className="h-4 w-4 ml-1" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-3">
                  <div className="p-3 border border-border rounded-lg bg-background space-y-2">
                    <div>
                      <div className="text-sm font-semibold">Brand Voice</div>
                      <p className="text-xs text-muted-foreground">Professional, innovative, human-centered</p>
                    </div>
                    <Separator />
                    <div>
                      <div className="text-sm font-semibold">Target Persona</div>
                      <p className="text-xs text-muted-foreground">Tech-savvy professionals, 30-45 years old</p>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </Card>

            {/* Content Guidelines Card */}
            <Card className="rounded-xl border p-6">
              <h3 className="text-lg font-semibold mb-4">Content Guidelines</h3>
              <div className="space-y-3">
                {guidelines.map((guideline) => (
                  <div key={guideline.id} className="flex items-center gap-2">
                    <Checkbox
                      checked={guideline.checked}
                      onCheckedChange={() => toggleGuideline(guideline.id)}
                      className="rounded"
                    />
                    <label className="text-sm cursor-pointer" onClick={() => toggleGuideline(guideline.id)}>
                      {guideline.label}
                    </label>
                  </div>
                ))}
              </div>
            </Card>

            {/* Related Deliverables Card */}
            <Card className="rounded-xl border p-6">
              <h3 className="text-lg font-semibold mb-4">Related Deliverables</h3>
              <div className="space-y-2">
                {relatedDeliverables.map((item) => {
                  const statusDot = {
                    'completed': 'bg-green-500',
                    'in-progress': 'bg-blue-500',
                    'not-started': 'bg-gray-300',
                  }[item.status];

                  return (
                    <button
                      key={item.id}
                      className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors duration-200"
                    >
                      <div className="flex items-center gap-2">
                        <div className={cn("h-2 w-2 rounded-full", statusDot)} />
                        <span className="text-sm">{item.name}</span>
                      </div>
                      <Badge className="bg-muted text-foreground rounded-full px-2 py-0.5 text-xs">
                        {item.type}
                      </Badge>
                    </button>
                  );
                })}
              </div>
            </Card>

            {/* Comments Section */}
            <Card className="rounded-xl border p-6">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-lg font-semibold">Comments</h3>
                <Badge className="bg-muted text-foreground rounded-full px-2 py-0.5 text-xs">
                  {mockComments.length}
                </Badge>
              </div>

              {/* Comment Input */}
              <div className="flex gap-2 mb-4">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs">You</AvatarFallback>
                </Avatar>
                <div className="flex-1 flex gap-2">
                  <Textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Add a comment..."
                    rows={2}
                    className="rounded-lg resize-none"
                  />
                  <Button onClick={handlePostComment} disabled={!commentText.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Separator className="my-4" />

              {/* Comment Thread */}
              <div className="space-y-4">
                {mockComments.map((comment) => (
                  <div key={comment.id} className="flex gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">{comment.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold">{comment.author}</span>
                        <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{comment.text}</p>
                      <Button variant="link" className="h-auto p-0 text-xs mt-1">
                        Reply
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}