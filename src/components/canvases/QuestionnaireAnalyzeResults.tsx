import React, { useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Checkbox } from '../ui/checkbox';
import {
  ChevronDown,
  ChevronRight,
  FileText,
  Download,
  Share2,
  Unlock,
  CheckCircle2,
  Target,
  MessageSquare,
  CheckSquare,
  Star,
  BarChart3,
  Sparkles,
  RefreshCw,
  Eye,
  TrendingUp,
  Heart,
  Globe,
  Users,
  AlertTriangle,
  Lock
} from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

interface QuestionResult {
  id: string;
  text: string;
  type: 'text' | 'textarea' | 'multiple-choice' | 'rating' | 'yes-no';
  linkedAssetId?: string;
  linkedAssetName?: string;
  results?: any;
}

interface QuestionnaireAnalyzeResultsProps {
  questionnaire: any;
  onUnlock: () => void;
  onValidate: () => void;
}

export function QuestionnaireAnalyzeResults({
  questionnaire,
  onUnlock,
  onValidate
}: QuestionnaireAnalyzeResultsProps) {
  const [expandedQuestions, setExpandedQuestions] = useState<string[]>([]);
  const [selectedAssetTab, setSelectedAssetTab] = useState<string>('all');
  const [validateModalOpen, setValidateModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState<'pdf' | 'csv' | 'png'>('pdf');
  const [anonymizeData, setAnonymizeData] = useState(true);

  // Mock data for demonstration
  const totalResponses = 42;
  const responseRate = 84;
  const completionRate = 95;
  const avgTime = 8;
  const assetsCovered = 5;

  const questionResults: QuestionResult[] = [
    {
      id: 'q1',
      text: 'How would you describe our brand personality?',
      type: 'multiple-choice',
      linkedAssetId: 'brand-archetype',
      linkedAssetName: 'Brand Archetype',
      results: {
        options: [
          { label: 'Innovative & Forward-thinking', count: 28, percentage: 67 },
          { label: 'Reliable & Trustworthy', count: 18, percentage: 43 },
          { label: 'Fun & Playful', count: 12, percentage: 29 },
          { label: 'Professional & Serious', count: 8, percentage: 19 }
        ]
      }
    },
    {
      id: 'q2',
      text: 'On a scale of 1-5, how well does our mission statement resonate with you?',
      type: 'rating',
      linkedAssetId: 'vision-mission',
      linkedAssetName: 'Vision & Mission',
      results: {
        distribution: [
          { rating: 1, count: 2, percentage: 5 },
          { rating: 2, count: 4, percentage: 10 },
          { rating: 3, count: 8, percentage: 19 },
          { rating: 4, count: 18, percentage: 43 },
          { rating: 5, count: 10, percentage: 24 }
        ],
        average: 3.7
      }
    },
    {
      id: 'q3',
      text: 'What do you think makes our brand unique?',
      type: 'text',
      linkedAssetId: 'brand-positioning',
      linkedAssetName: 'Brand Positioning',
      results: {
        responses: [
          'Your commitment to sustainability',
          'Innovative product design',
          'Customer-first approach',
          'Quality and reliability',
          'Strong company values',
          'Modern and fresh perspective',
          'Transparent communication',
          'Community engagement'
        ],
        themes: [
          'Sustainability & Ethics',
          'Innovation & Design',
          'Customer Focus',
          'Quality & Reliability'
        ]
      }
    },
    {
      id: 'q4',
      text: 'How important are the following values to you? (Rank 1-5)',
      type: 'yes-no',
      linkedAssetId: 'core-values',
      linkedAssetName: 'Core Values',
      results: {
        rankings: [
          { value: 'Sustainability', avgRank: 1.8 },
          { value: 'Innovation', avgRank: 2.3 },
          { value: 'Trust', avgRank: 2.6 },
          { value: 'Community', avgRank: 3.2 },
          { value: 'Excellence', avgRank: 4.1 }
        ]
      }
    }
  ];

  const assets = [
    { id: 'brand-archetype', name: 'Brand Archetype', icon: Users, questionCount: 1 },
    { id: 'vision-mission', name: 'Vision & Mission', icon: Target, questionCount: 1 },
    { id: 'brand-positioning', name: 'Brand Positioning', icon: TrendingUp, questionCount: 1 },
    { id: 'core-values', name: 'Core Values', icon: Heart, questionCount: 1 },
    { id: 'social-relevancy', name: 'Social Relevancy', icon: Globe, questionCount: 0 }
  ];

  const toggleQuestion = (questionId: string) => {
    if (expandedQuestions.includes(questionId)) {
      setExpandedQuestions(expandedQuestions.filter(id => id !== questionId));
    } else {
      setExpandedQuestions([...expandedQuestions, questionId]);
    }
  };

  const getQuestionTypeIcon = (type: string) => {
    switch (type) {
      case 'text':
      case 'textarea':
        return <MessageSquare className="h-3 w-3" />;
      case 'multiple-choice':
        return <CheckSquare className="h-3 w-3" />;
      case 'rating':
        return <Star className="h-3 w-3" />;
      default:
        return <MessageSquare className="h-3 w-3" />;
    }
  };

  const getQuestionTypeLabel = (type: string) => {
    switch (type) {
      case 'text':
      case 'textarea':
        return 'Open';
      case 'multiple-choice':
        return 'Multiple Choice';
      case 'rating':
        return 'Rating';
      case 'yes-no':
        return 'Ranking';
      default:
        return type;
    }
  };

  const renderQuestionResults = (question: QuestionResult) => {
    // Multiple Choice / Multi-Select
    if (question.type === 'multiple-choice' && question.results?.options) {
      const maxCount = Math.max(...question.results.options.map((o: any) => o.count));
      
      return (
        <div className="space-y-3">
          {question.results.options.map((option: any, index: number) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{option.label}</span>
                <span className="text-muted-foreground">
                  {option.count} ({option.percentage}%)
                </span>
              </div>
              <div className="relative h-8 rounded-lg bg-muted overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    option.count === maxCount
                      ? 'bg-primary'
                      : 'bg-primary/60'
                  }`}
                  style={{ width: `${option.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      );
    }

    // Rating Scale
    if (question.type === 'rating' && question.results?.distribution) {
      const maxCount = Math.max(...question.results.distribution.map((d: any) => d.count));
      
      return (
        <div className="space-y-4">
          {/* Average Rating */}
          <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 text-center">
            <div className="text-sm text-muted-foreground mb-1">Average Rating</div>
            <div className="flex items-center justify-center gap-2">
              <Star className="h-6 w-6 text-amber-500 fill-amber-500" />
              <span className="text-3xl font-semibold">{question.results.average}</span>
              <span className="text-lg text-muted-foreground">/ 5</span>
            </div>
          </div>

          {/* Distribution */}
          <div className="space-y-2">
            {question.results.distribution.map((item: any) => (
              <div key={item.rating} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-16">
                  <span className="text-sm font-medium">{item.rating}</span>
                  <Star className="h-3 w-3 text-amber-500" />
                </div>
                <div className="flex-1 relative h-6 rounded-md bg-muted overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      item.count === maxCount
                        ? 'bg-amber-500'
                        : 'bg-amber-400/60'
                    }`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-16 text-right">
                  {item.count} ({item.percentage}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Ranking
    if (question.type === 'yes-no' && question.results?.rankings) {
      return (
        <div className="space-y-2">
          {question.results.rankings.map((item: any, index: number) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                {index + 1}
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm">{item.value}</div>
                <div className="text-xs text-muted-foreground">
                  Average rank: {item.avgRank.toFixed(1)}
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    // Open Text
    if ((question.type === 'text' || question.type === 'textarea') && question.results?.responses) {
      return (
        <div className="space-y-4">
          {/* AI-Generated Themes */}
          {question.results.themes && (
            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-semibold text-blue-900 dark:text-blue-100">
                  Common Themes
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {question.results.themes.map((theme: string, index: number) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                  >
                    {theme}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Sample Responses */}
          <div>
            <div className="text-sm font-semibold mb-3">Sample Responses</div>
            <div className="space-y-2">
              {question.results.responses.slice(0, 5).map((response: string, index: number) => (
                <div
                  key={index}
                  className="p-3 rounded-lg bg-muted/50 text-sm italic"
                >
                  "{response}"
                </div>
              ))}
            </div>
            {question.results.responses.length > 5 && (
              <Button variant="link" className="mt-2 h-auto p-0 text-sm">
                <Eye className="h-3 w-3 mr-1" />
                View All {question.results.responses.length} Responses
              </Button>
            )}
          </div>
        </div>
      );
    }

    return null;
  };

  const filteredQuestions = selectedAssetTab === 'all'
    ? questionResults
    : questionResults.filter(q => q.linkedAssetId === selectedAssetTab);

  const handleExport = () => {
    const formatLabels = {
      pdf: 'PDF Report',
      csv: 'CSV Data',
      png: 'PNG Charts'
    };
    
    toast.success(`Exporting ${formatLabels[exportFormat]}...`);
    setExportModalOpen(false);
    
    // Simulate download
    setTimeout(() => {
      toast.success('Export ready. Download started.');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="pb-4 border-b border-border">
        <h2 className="text-xl font-semibold mb-1">Analyze Results</h2>
        <p className="text-sm text-muted-foreground">Review insights and export findings</p>
      </div>

      {/* Section A: Summary Stats */}
      <div className="rounded-xl bg-muted/30 p-6">
        <div className="grid grid-cols-5 gap-4 text-center">
          <div>
            <div className="text-sm text-muted-foreground mb-1">Total Responses</div>
            <div className="text-3xl font-semibold">{totalResponses}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">Response Rate</div>
            <div className="text-3xl font-semibold">{responseRate}%</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">Completion Rate</div>
            <div className="text-3xl font-semibold">{completionRate}%</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">Avg. Time</div>
            <div className="text-3xl font-semibold">{avgTime} min</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">Assets Covered</div>
            <div className="text-3xl font-semibold">{assetsCovered}</div>
          </div>
        </div>
      </div>

      {/* Section D: AI-Generated Insights */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              <Sparkles className="h-3 w-3 mr-1" />
              AI Generated
            </Badge>
            <span className="text-sm font-semibold">Key Insights</span>
          </div>
          <Button variant="link" className="h-auto p-0 text-sm">
            <RefreshCw className="h-3 w-3 mr-1" />
            Regenerate
          </Button>
        </div>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">•</span>
            <span>
              <strong>Brand Personality:</strong> Respondents primarily view the brand as innovative and forward-thinking (67%), 
              aligning strongly with the desired brand archetype.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">•</span>
            <span>
              <strong>Mission Resonance:</strong> Average rating of 3.7/5 indicates good alignment, with 67% rating 4 or 5 stars. 
              Consider clarifying mission statement to improve resonance.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">•</span>
            <span>
              <strong>Unique Differentiators:</strong> Sustainability and innovation are the most cited unique qualities, 
              suggesting these should be emphasized in brand positioning.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">•</span>
            <span>
              <strong>Value Hierarchy:</strong> Sustainability ranks highest (1.8), followed by Innovation (2.3), 
              indicating clear priority alignment with target audience values.
            </span>
          </li>
        </ul>
      </div>

      {/* Asset Tabs */}
      <div className="border-b border-border">
        <div className="flex gap-4 overflow-x-auto">
          <button
            onClick={() => setSelectedAssetTab('all')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              selectedAssetTab === 'all'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            All Questions ({questionResults.length})
          </button>
          {assets
            .filter(asset => asset.questionCount > 0)
            .map((asset) => {
              const Icon = asset.icon;
              return (
                <button
                  key={asset.id}
                  onClick={() => setSelectedAssetTab(asset.id)}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 ${
                    selectedAssetTab === asset.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {asset.name} ({asset.questionCount})
                </button>
              );
            })}
        </div>
      </div>

      {/* Section B: Results by Question */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">
          {selectedAssetTab === 'all' ? 'Results by Question' : 'Results by Asset'}
        </h3>
        
        {filteredQuestions.map((question, index) => {
          const isExpanded = expandedQuestions.includes(question.id);
          
          return (
            <Collapsible
              key={question.id}
              open={isExpanded}
              onOpenChange={() => toggleQuestion(question.id)}
            >
              <div className="rounded-xl border border-border bg-card">
                <CollapsibleTrigger className="w-full p-4 flex items-start gap-3 hover:bg-muted/50 transition-colors">
                  <div className="mt-0.5">
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h4 className="text-sm font-semibold">
                        Q{index + 1}: {question.text}
                      </h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs h-5">
                        {getQuestionTypeIcon(question.type)}
                        <span className="ml-1">{getQuestionTypeLabel(question.type)}</span>
                      </Badge>
                      {question.linkedAssetName && (
                        <Badge variant="outline" className="text-xs h-5">
                          <Target className="h-2.5 w-2.5 mr-1" />
                          {question.linkedAssetName}
                        </Badge>
                      )}
                      <Badge variant="secondary" className="text-xs h-5 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        {totalResponses} responses
                      </Badge>
                    </div>
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <div className="px-4 pb-4 pt-2 border-t border-border">
                    {renderQuestionResults(question)}
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          );
        })}
      </div>

      {/* Section E: Export Options */}
      <div className="p-6 rounded-xl border border-border bg-card">
        <h3 className="text-sm font-semibold mb-4">Export Options</h3>
        <div className="flex flex-wrap gap-3">
          <Button 
            variant="outline"
            onClick={() => {
              setExportFormat('pdf');
              setExportModalOpen(true);
            }}
          >
            <FileText className="h-4 w-4 mr-2" />
            Export PDF Report
          </Button>
          <Button 
            variant="outline"
            onClick={() => {
              setExportFormat('csv');
              setExportModalOpen(true);
            }}
          >
            <Download className="h-4 w-4 mr-2" />
            Export Raw Data (CSV)
          </Button>
          <Button 
            variant="outline"
            onClick={() => {
              setExportFormat('png');
              setExportModalOpen(true);
            }}
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Export Charts (PNG)
          </Button>
          <Button variant="outline">
            <Share2 className="h-4 w-4 mr-2" />
            Share Results
          </Button>
        </div>
      </div>

      {/* Section F: Actions */}
      <div className="flex gap-3 pt-6 border-t border-border">
        <Button variant="outline" onClick={onUnlock}>
          <Unlock className="h-4 w-4 mr-2" />
          Unlock for Editing
        </Button>
        <Button className="flex-1" onClick={() => setValidateModalOpen(true)}>
          <CheckCircle2 className="h-4 w-4 mr-2" />
          Mark as Validated
        </Button>
      </div>

      {/* Validate Confirmation Modal */}
      <Dialog open={validateModalOpen} onOpenChange={setValidateModalOpen}>
        <DialogContent className="sm:max-w-[425px] p-0 gap-0 rounded-2xl">
          <DialogHeader className="px-6 pt-6 pb-4">
            <DialogTitle className="text-xl font-semibold">Validate Questionnaire Results?</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground mt-1">
              This will lock the questionnaire and update asset validation percentages
            </DialogDescription>
          </DialogHeader>
          <div className="px-6 py-4">
            <div className="space-y-3 p-4 rounded-lg bg-muted/50 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total responses:</span>
                <span className="font-semibold">{totalResponses}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Response rate:</span>
                <span className="font-semibold">{responseRate}%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Assets covered:</span>
                <span className="font-semibold">{assetsCovered}</span>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-green-900 dark:text-green-100 mb-1">
                    Asset validation will be updated
                  </p>
                  <p className="text-xs text-green-700 dark:text-green-300">
                    Brand assets linked to this questionnaire will have their validation percentages increased
                  </p>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="px-6 py-4 border-t border-border flex justify-end gap-3">
            <Button variant="outline" onClick={() => setValidateModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              setValidateModalOpen(false);
              onValidate();
            }}>
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Validate & Lock
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Export Confirmation Modal */}
      <Dialog open={exportModalOpen} onOpenChange={setExportModalOpen}>
        <DialogContent className="sm:max-w-[500px] p-0 gap-0 rounded-2xl">
          <DialogHeader className="px-6 pt-6 pb-4">
            <DialogTitle className="text-xl font-semibold">Export Questionnaire Results?</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground mt-1">
              Choose the format and options for exporting the results
            </DialogDescription>
          </DialogHeader>
          <div className="px-6 py-4 space-y-4">
            <div className="space-y-3 p-4 rounded-lg bg-muted/50">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total responses:</span>
                <span className="font-semibold">{totalResponses}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Response rate:</span>
                <span className="font-semibold">{responseRate}%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Assets covered:</span>
                <span className="font-semibold">{assetsCovered}</span>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <div className="flex items-start gap-3 mb-3">
                <FileText className="h-4 w-4 text-primary mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium mb-2">
                    Choose export format
                  </p>
                  <RadioGroup
                    value={exportFormat}
                    onValueChange={setExportFormat}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="pdf" />
                      <Label className="text-sm font-medium">PDF Report</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="csv" />
                      <Label className="text-sm font-medium">CSV Data</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="png" />
                      <Label className="text-sm font-medium">PNG Charts</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              <div className="flex items-start gap-3 pt-3 border-t border-border/50">
                <Checkbox
                  checked={anonymizeData}
                  onCheckedChange={(checked) => setAnonymizeData(checked === true)}
                  id="anonymize"
                />
                <div className="flex-1">
                  <Label htmlFor="anonymize" className="text-sm font-medium cursor-pointer">
                    Anonymize Data
                  </Label>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Remove any personally identifiable information from the export
                  </p>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="px-6 py-4 border-t border-border flex justify-end gap-3">
            <Button variant="outline" onClick={() => setExportModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}