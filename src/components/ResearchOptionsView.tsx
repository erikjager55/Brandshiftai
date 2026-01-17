import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Bot, Presentation, Users, ClipboardList, CheckCircle, ArrowRight } from 'lucide-react';

interface ResearchOption {
  id: number;
  name: string;
  icon: typeof Bot;
  description: string;
  features: string[];
  useCases: string[];
  price: number;
  included: boolean;
  duration: string;
  deliverables: string;
}

interface ResearchOptionsViewProps {
  onSelectMethod: (methodName: string) => void;
}

export function ResearchOptionsView({ onSelectMethod }: ResearchOptionsViewProps) {
  const researchMethods: ResearchOption[] = [
    {
      id: 1,
      name: 'AI Agent',
      icon: Bot,
      description: 'AI-powered analysis and content generation for your brand assets',
      features: [
        'Instant content generation',
        'Market trend analysis',
        'Competitor insights',
        'Brand voice consistency check'
      ],
      useCases: [
        'Quick initial drafts',
        'Content brainstorming',
        'Market research summaries',
        'Trend identification'
      ],
      price: 0,
      included: true,
      duration: 'Instant',
      deliverables: 'AI-generated content, insights report'
    },
    {
      id: 2,
      name: 'Canvas Workshop',
      icon: Presentation,
      description: 'Interactive visual mapping session to explore and develop brand concepts',
      features: [
        'Visual collaboration tools',
        'Real-time team input',
        'Structured frameworks',
        'Export and share results'
      ],
      useCases: [
        'Team alignment sessions',
        'Strategic planning',
        'Brand positioning',
        'Value proposition development'
      ],
      price: 0,
      included: true,
      duration: '2-3 hours',
      deliverables: 'Digital canvas, key insights summary'
    },
    {
      id: 3,
      name: '1-on-1 Interviews',
      icon: Users,
      description: 'Deep-dive interview sessions with industry experts, stakeholders, or customers',
      features: [
        'Expert facilitation',
        'Recorded sessions',
        'Professional transcription',
        'Insights extraction'
      ],
      useCases: [
        'Expert perspectives',
        'Customer insights',
        'Stakeholder alignment',
        'Deep research'
      ],
      price: 135,
      included: false,
      duration: '1 hour',
      deliverables: 'Interview transcript, insights report, recommendations'
    },
    {
      id: 4,
      name: 'Questionnaire',
      icon: ClipboardList,
      description: 'Comprehensive surveys to gather quantitative and qualitative data',
      features: [
        'Custom survey design',
        'Multi-channel distribution',
        'Automated analysis',
        'Visual data reports'
      ],
      useCases: [
        'Customer preferences',
        'Brand perception',
        'Market validation',
        'Audience segmentation'
      ],
      price: 90,
      included: false,
      duration: '1-2 weeks',
      deliverables: 'Survey results, analysis report, actionable insights'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Overview */}
      <div className="bg-muted/50 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">Validation Methods Overview</h2>
        <p className="text-muted-foreground">
          Choose the right research method for your brand development needs. Combine multiple methods for comprehensive insights.
        </p>
      </div>

      {/* Research Method Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {researchMethods.map((method) => {
          const Icon = method.icon;
          return (
            <Card key={method.id} className={`hover:shadow-lg transition-all ${method.included ? 'border-primary/50' : ''}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <CardTitle>{method.name}</CardTitle>
                        {method.included && (
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Included
                          </Badge>
                        )}
                      </div>
                      <CardDescription>{method.description}</CardDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    {method.included ? (
                      <div className="text-xl font-semibold text-green-600">Free</div>
                    ) : (
                      <div className="text-xl font-semibold">€{method.price}</div>
                    )}
                    <div className="text-xs text-muted-foreground">per session</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Details */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">Duration</p>
                    <p className="text-sm font-medium">{method.duration}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">Deliverables</p>
                    <p className="text-sm font-medium">{method.deliverables}</p>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h4 className="text-sm font-semibold mb-3">Key Features</h4>
                  <ul className="space-y-2">
                    {method.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Use Cases */}
                <div>
                  <h4 className="text-sm font-semibold mb-3">Best For</h4>
                  <div className="flex flex-wrap gap-2">
                    {method.useCases.map((useCase, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {useCase}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <Button 
                  className="w-full"
                  variant={method.included ? 'default' : 'outline'}
                  onClick={() => onSelectMethod(method.name)}
                >
                  {method.included ? 'Start Free Session' : 'Purchase & Start'}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle>Method Comparison</CardTitle>
          <CardDescription>Compare research methods to choose the best fit for your needs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold">Method</th>
                  <th className="text-left p-3 font-semibold">Duration</th>
                  <th className="text-left p-3 font-semibold">Cost</th>
                  <th className="text-left p-3 font-semibold">Depth</th>
                  <th className="text-left p-3 font-semibold">Speed</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-muted/30">
                  <td className="p-3 font-medium">AI Agent</td>
                  <td className="p-3 text-sm text-muted-foreground">Instant</td>
                  <td className="p-3 text-sm"><Badge className="bg-green-100 text-green-800">Free</Badge></td>
                  <td className="p-3 text-sm">⭐⭐⭐</td>
                  <td className="p-3 text-sm">⚡⚡⚡⚡⚡</td>
                </tr>
                <tr className="border-b hover:bg-muted/30">
                  <td className="p-3 font-medium">Canvas Workshop</td>
                  <td className="p-3 text-sm text-muted-foreground">2-3 hours</td>
                  <td className="p-3 text-sm"><Badge className="bg-green-100 text-green-800">Free</Badge></td>
                  <td className="p-3 text-sm">⭐⭐⭐⭐</td>
                  <td className="p-3 text-sm">⚡⚡⚡⚡</td>
                </tr>
                <tr className="border-b hover:bg-muted/30">
                  <td className="p-3 font-medium">1-on-1 Interviews</td>
                  <td className="p-3 text-sm text-muted-foreground">1 hour</td>
                  <td className="p-3 text-sm">€135</td>
                  <td className="p-3 text-sm">⭐⭐⭐⭐⭐</td>
                  <td className="p-3 text-sm">⚡⚡⚡</td>
                </tr>
                <tr className="hover:bg-muted/30">
                  <td className="p-3 font-medium">Questionnaire</td>
                  <td className="p-3 text-sm text-muted-foreground">1-2 weeks</td>
                  <td className="p-3 text-sm">€90</td>
                  <td className="p-3 text-sm">⭐⭐⭐⭐</td>
                  <td className="p-3 text-sm">⚡⚡</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Bundle Offer */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle>Multi-Method Bundle</CardTitle>
          <CardDescription>Combine methods for deeper insights and save 20%</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Get the most comprehensive brand research by combining multiple methods. Use AI for rapid ideation, 
              Canvas Workshop for team alignment, Interviews for expert insights, and Questionnaires for broad validation.
            </p>
            <div className="flex items-center justify-between p-4 bg-background rounded-lg">
              <div>
                <p className="font-semibold">Complete Research Bundle</p>
                <p className="text-sm text-muted-foreground">All 4 methods for one asset</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground line-through">€225</p>
                <p className="text-2xl font-semibold text-primary">€180</p>
                <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 mt-1">
                  Save 20%
                </Badge>
              </div>
            </div>
            <Button className="w-full" size="lg">
              Get Complete Bundle
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}