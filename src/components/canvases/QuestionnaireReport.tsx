import React from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { 
  ArrowLeft,
  Star,
  ThumbsUp,
  MessageSquare,
  Award,
  Percent,
  Clock,
  Activity,
  Users,
  Calendar,
  Download,
  BarChart3,
  AlertCircle,
  Target,
  Eye,
  Heart,
  ChevronDown,
  FileText
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface QuestionnaireReportProps {
  questionnaire: {
    id: string;
    name: string;
    recipientCount: number;
    responsesCount: number;
    startDate: string;
    endDate?: string;
    completedDate?: string;
    progress?: number;
    assets: string[];
  };
  availableAssets: Array<{
    id: string;
    name: string;
    icon: typeof Eye;
    type: string;
    questions: number;
  }>;
  onBack: () => void;
}

export function QuestionnaireReport({ questionnaire, availableAssets, onBack }: QuestionnaireReportProps) {
  const responseRate = questionnaire.progress !== undefined
    ? questionnaire.progress 
    : Math.round((questionnaire.responsesCount / questionnaire.recipientCount) * 100);

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="outline" onClick={onBack}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </Button>

      {/* Report Header */}
      <Card className="border-primary">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl mb-2">{questionnaire.name}</CardTitle>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {'completedDate' in questionnaire && questionnaire.completedDate
                        ? `Completed: ${questionnaire.completedDate}`
                        : `${questionnaire.startDate} - ${questionnaire.endDate}`}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{questionnaire.responsesCount} / {questionnaire.recipientCount} responses</span>
                  </div>
                </div>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download Report
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <FileText className="h-4 w-4 mr-2" />
                  Download CSV Data
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileText className="h-4 w-4 mr-2" />
                  Download PDF Report
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileText className="h-4 w-4 mr-2" />
                  Download Full Report
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileText className="h-4 w-4 mr-2" />
                  Download All Files (ZIP)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
      </Card>

      {/* Executive Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="h-4 w-4 mr-2 text-primary" />
            Executive Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-blue-900 dark:text-blue-100">Response Rate</p>
                <Percent className="h-4 w-4 text-blue-600" />
              </div>
              <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">{responseRate}%</p>
              <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">Above industry avg (45%)</p>
            </div>

            <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-green-900 dark:text-green-100">Avg. Completion Time</p>
                <Clock className="h-4 w-4 text-green-600" />
              </div>
              <p className="text-3xl font-bold text-green-900 dark:text-green-100">12.5 min</p>
              <p className="text-xs text-green-700 dark:text-green-300 mt-1">15% faster than expected</p>
            </div>

            <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-purple-900 dark:text-purple-100">Satisfaction Score</p>
                <Star className="h-4 w-4 text-purple-600" />
              </div>
              <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">4.2 / 5.0</p>
              <p className="text-xs text-purple-700 dark:text-purple-300 mt-1">Excellent rating</p>
            </div>

            <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-orange-900 dark:text-orange-100">Engagement Rate</p>
                <Activity className="h-4 w-4 text-orange-600" />
              </div>
              <p className="text-3xl font-bold text-orange-900 dark:text-orange-100">87%</p>
              <p className="text-xs text-orange-700 dark:text-orange-300 mt-1">High engagement</p>
            </div>
          </div>

          {/* Key Findings */}
          <div className="space-y-3">
            <h3 className="font-semibold">Key Findings</h3>
            <div className="space-y-2">
              <div className="flex items-start space-x-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                <ThumbsUp className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-green-900 dark:text-green-100">Strong Brand Recognition</p>
                  <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                    82% of respondents correctly identified your brand values, indicating strong value communication
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                <ThumbsUp className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-green-900 dark:text-green-100">Clear Mission Understanding</p>
                  <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                    76% of participants accurately described your mission statement in their own words
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
                <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-amber-900 dark:text-amber-100">Vision Communication Gap</p>
                  <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                    Only 54% clearly understood your long-term vision - opportunity for clearer communication
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Demographic Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-4 w-4 mr-2 text-primary" />
            Respondent Demographics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Age Distribution */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Age Distribution</h4>
              <div className="space-y-2">
                {[
                  { label: '18-24', value: 12 },
                  { label: '25-34', value: 35 },
                  { label: '35-44', value: 28 },
                  { label: '45-54', value: 18 },
                  { label: '55+', value: 7 }
                ].map((item) => (
                  <div key={item.label} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-medium">{item.value}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: `${item.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Role Distribution */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Role Distribution</h4>
              <div className="space-y-2">
                {[
                  { label: 'Customer', value: 45 },
                  { label: 'Employee', value: 32 },
                  { label: 'Partner', value: 15 },
                  { label: 'Stakeholder', value: 8 }
                ].map((item) => (
                  <div key={item.label} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-medium">{item.value}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${item.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Engagement Level */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Engagement with Brand</h4>
              <div className="space-y-2">
                {[
                  { label: 'Highly Engaged', value: 41 },
                  { label: 'Moderately Engaged', value: 38 },
                  { label: 'Somewhat Engaged', value: 16 },
                  { label: 'Not Engaged', value: 5 }
                ].map((item) => (
                  <div key={item.label} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-medium">{item.value}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: `${item.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Topic Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="h-4 w-4 mr-2 text-primary" />
            Topic-by-Topic Analysis
          </CardTitle>
          <CardDescription>
            Detailed insights for each brand asset covered in the questionnaire
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {questionnaire.assets.map((assetId) => {
            const asset = availableAssets.find(a => a.id === assetId);
            if (!asset) return null;
            const Icon = asset.icon;
            
            // Mock data specific to each asset
            const assetData: Record<string, { score: number; clarity: number; agreement: number; top: string; concern?: string }> = {
              'vision-mission': { 
                score: 65, 
                clarity: 72, 
                agreement: 80, 
                top: 'Long-term growth and customer-first approach',
                concern: 'Communication could be clearer'
              },
              'core-values': { 
                score: 82, 
                clarity: 89, 
                agreement: 91, 
                top: 'Integrity and transparency' 
              },
            };

            const data = assetData[assetId] || { score: 70, clarity: 75, agreement: 80, top: 'Strong alignment' };

            return (
              <div key={assetId} className="p-6 border rounded-lg space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{asset.name}</h4>
                      <p className="text-sm text-muted-foreground">{asset.type}</p>
                    </div>
                  </div>
                  <Badge variant={data.score >= 70 ? 'default' : 'secondary'} className="ml-2">
                    {data.score}% Understanding
                  </Badge>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Understanding Score</span>
                      <span className="font-medium">{data.score}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${data.score >= 70 ? 'bg-green-600' : 'bg-amber-500'}`}
                        style={{ width: `${data.score}%` }} 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Clarity Rating</span>
                      <span className="font-medium">{data.clarity}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-blue-600" 
                        style={{ width: `${data.clarity}%` }} 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Agreement Level</span>
                      <span className="font-medium">{data.agreement}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-purple-600" 
                        style={{ width: `${data.agreement}%` }} 
                      />
                    </div>
                  </div>
                </div>

                {/* Top Insight */}
                <div className="flex items-start space-x-2 p-3 bg-muted rounded-lg">
                  <MessageSquare className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Top Insight</p>
                    <p className="text-xs text-muted-foreground mt-1">{data.top}</p>
                  </div>
                </div>

                {/* Concern if exists */}
                {data.concern && (
                  <div className="flex items-start space-x-2 p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
                    <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-amber-900 dark:text-amber-100">Area for Improvement</p>
                      <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">{data.concern}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="border-primary">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="h-4 w-4 mr-2 text-primary" />
            Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                1
              </div>
              <div>
                <h4 className="font-medium mb-1">Clarify Vision Communication</h4>
                <p className="text-sm text-muted-foreground">
                  With only 54% clear understanding, consider simplifying your vision statement and incorporating it more prominently into customer touchpoints. Create visual materials and employee training to reinforce the message.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                2
              </div>
              <div>
                <h4 className="font-medium mb-1">Leverage Strong Core Values Recognition</h4>
                <p className="text-sm text-muted-foreground">
                  With 82% recognition, your core values are well-understood. Use this strength as the foundation for other brand communications and ensure consistency across all messaging.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                3
              </div>
              <div>
                <h4 className="font-medium mb-1">Maintain Mission Clarity</h4>
                <p className="text-sm text-muted-foreground">
                  76% understanding of your mission is strong. Continue current communication strategies and consider documenting what's working to replicate success in other areas.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}