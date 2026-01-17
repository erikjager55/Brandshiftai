import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { Label } from './ui/label';
import { 
  Download,
  FileText,
  LayoutGrid,
  Users,
  Lightbulb,
  CheckSquare,
  Circle,
  Target,
  Heart,
  Eye,
  Zap
} from 'lucide-react';

export function ResearchTemplates() {
  const [selectedTemplate, setSelectedTemplate] = useState('golden-circle-canvas');

  const templates = {
    canvases: [
      {
        id: 'golden-circle-canvas',
        name: 'Golden Circle Canvas',
        description: 'Discover your Why, How, and What through collaborative mapping',
        duration: '2-3 hours',
        participants: '5-8 people',
        sections: [
          { title: 'WHY', description: 'Purpose, cause, belief - why does your organization exist?', color: 'bg-red-50 border-red-200' },
          { title: 'HOW', description: 'Process, values - how do you fulfill your purpose?', color: 'bg-yellow-50 border-yellow-200' },
          { title: 'WHAT', description: 'Product, service - what do you do to fulfill your purpose?', color: 'bg-blue-50 border-blue-200' }
        ]
      },
      {
        id: 'brand-archetype-canvas',
        name: 'Brand Archetype Canvas',
        description: 'Identify your brand personality through archetypal mapping',
        duration: '1.5-2 hours',
        participants: '4-6 people',
        sections: [
          { title: 'Desires', description: 'What does your brand aspire to?', color: 'bg-purple-50 border-purple-200' },
          { title: 'Fears', description: 'What does your brand want to avoid?', color: 'bg-red-50 border-red-200' },
          { title: 'Strategy', description: 'How does your brand achieve its desires?', color: 'bg-green-50 border-green-200' },
          { title: 'Gift', description: 'What unique value does your brand bring?', color: 'bg-blue-50 border-blue-200' }
        ]
      },
      {
        id: 'values-prioritization-canvas',
        name: 'Values Prioritization Canvas',
        description: 'Collaborate to define and prioritize core organizational values',
        duration: '3-4 hours',
        participants: '6-10 people',
        sections: [
          { title: 'All Values', description: 'Brainstorm all potential values', color: 'bg-gray-50 border-gray-200' },
          { title: 'Core Values', description: 'Select 5-7 most important values', color: 'bg-blue-50 border-blue-200' },
          { title: 'Definitions', description: 'Define what each value means', color: 'bg-green-50 border-green-200' },
          { title: 'Behaviors', description: 'Identify behaviors that demonstrate values', color: 'bg-yellow-50 border-yellow-200' }
        ]
      }
    ],
    interviews: [
      {
        id: 'vision-stakeholder-guide',
        name: 'Vision Stakeholder Interview',
        description: 'Deep dive questions to uncover vision and strategic direction',
        duration: '45-60 minutes',
        sections: [
          {
            title: 'Opening Questions',
            questions: [
              'What inspired you to be part of this organization?',
              'How would you describe our organization to someone who has never heard of us?',
              'What makes you most proud about working here?'
            ]
          },
          {
            title: 'Vision & Future',
            questions: [
              'Where do you see this organization in 5-10 years?',
              'What impact do you want us to have on the world?',
              'What would success look like for our organization?',
              'What legacy do you want us to leave?'
            ]
          },
          {
            title: 'Values & Culture',
            questions: [
              'What values do you think guide our decisions?',
              'How would you describe our organizational culture?',
              'What behaviors do you think we should reward?',
              'What would you never want to see us compromise on?'
            ]
          }
        ]
      },
      {
        id: 'brand-story-interview',
        name: 'Brand Story Interview',
        description: 'Narrative-focused questions to uncover brand story elements',
        duration: '60-90 minutes',
        sections: [
          {
            title: 'Origin Story',
            questions: [
              'Tell me about how this organization began.',
              'What problem were you trying to solve when you started?',
              'What was the pivotal moment that made you realize this was needed?'
            ]
          },
          {
            title: 'Journey & Evolution',
            questions: [
              'What have been the biggest challenges you\'ve overcome?',
              'How has your understanding of your purpose evolved?',
              'What moments have defined who you are as an organization?'
            ]
          },
          {
            title: 'Heroes & Villains',
            questions: [
              'Who are the heroes in your story (customers, team members)?',
              'What obstacles or challenges do your customers face?',
              'How do you help your customers become the hero of their own story?'
            ]
          }
        ]
      }
    ],
    workshops: [
      {
        id: 'transformative-goals-workshop',
        name: 'Transformative Goals Workshop',
        description: 'Define how your brand changes people (Think, Feel, Act)',
        duration: '2-3 hours',
        participants: '6-8 people',
        activities: [
          {
            title: 'Think Transformation',
            description: 'How do you want to change the way people think?',
            instructions: 'Brainstorm mindset shifts, new perspectives, or beliefs you want to inspire',
            time: '30 minutes'
          },
          {
            title: 'Feel Transformation',
            description: 'How do you want to change the way people feel?',
            instructions: 'Identify emotional states, feelings, or experiences you want to create',
            time: '30 minutes'
          },
          {
            title: 'Act Transformation',
            description: 'How do you want to change the way people act?',
            instructions: 'Define behaviors, actions, or habits you want to encourage',
            time: '30 minutes'
          },
          {
            title: 'Integration & Prioritization',
            description: 'Combine and prioritize the most important transformations',
            instructions: 'Vote on the most impactful transformative goals across Think, Feel, Act',
            time: '45 minutes'
          }
        ]
      },
      {
        id: 'tonology-workshop',
        name: 'Brand Tonology Workshop',
        description: 'Define your brand voice, tone, and communication style',
        duration: '3-4 hours',
        participants: '4-6 people',
        activities: [
          {
            title: 'Voice Attributes',
            description: 'Define your core voice characteristics',
            instructions: 'Select 4-5 key attributes that describe your brand voice (e.g., confident, approachable, expert)',
            time: '45 minutes'
          },
          {
            title: 'Tone Variations',
            description: 'Map tone across different contexts',
            instructions: 'Define how your tone changes in different situations (crisis, celebration, education)',
            time: '60 minutes'
          },
          {
            title: 'Language Guidelines',
            description: 'Create specific language dos and don\'ts',
            instructions: 'Define specific words, phrases, and language patterns to use and avoid',
            time: '45 minutes'
          },
          {
            title: 'Voice Examples',
            description: 'Create example communications',
            instructions: 'Write sample messages in your brand voice for different scenarios',
            time: '60 minutes'
          }
        ]
      }
    ],
    questionnaires: [
      {
        id: 'brand-perception-survey',
        name: 'Brand Perception Survey',
        description: 'Quantitative assessment of brand perception and awareness',
        duration: '10-15 minutes',
        targetAudience: '50+ respondents',
        sections: [
          {
            title: 'Brand Awareness',
            questions: [
              'How familiar are you with [Brand Name]? (1-5 scale)',
              'Where have you heard about [Brand Name]? (multiple choice)',
              'How would you describe [Brand Name] in one sentence?'
            ],
            type: 'Multiple Choice & Text'
          },
          {
            title: 'Brand Perception',
            questions: [
              'Which words best describe [Brand Name]? (select all that apply)',
              'How likely are you to recommend [Brand Name]? (1-10 scale)',
              'What do you think [Brand Name] stands for?'
            ],
            type: 'Multiple Choice & Scale'
          },
          {
            title: 'Values Alignment',
            questions: [
              'How important are these values to you? (rate each 1-5)',
              'How well does [Brand Name] embody these values? (rate each 1-5)',
              'What values do you think are most important for [Brand Name]?'
            ],
            type: 'Scale & Ranking'
          }
        ]
      },
      {
        id: 'social-relevancy-survey',
        name: 'Social Relevancy Survey',
        description: 'Assess brand\'s social impact and relevance',
        duration: '8-12 minutes',
        targetAudience: '100+ respondents',
        sections: [
          {
            title: 'Social Issues',
            questions: [
              'Which social issues are most important to you?',
              'How important is it for brands to take a stand on social issues?',
              'What social issues do you associate with [Brand Name]?'
            ],
            type: 'Multiple Choice & Ranking'
          },
          {
            title: 'Impact Perception',
            questions: [
              'How would you rate [Brand Name]\'s positive social impact?',
              'In what ways does [Brand Name] contribute to society?',
              'How authentic do you find [Brand Name]\'s social initiatives?'
            ],
            type: 'Scale & Text'
          }
        ]
      }
    ]
  };

  const renderCanvasTemplate = (canvas: any) => (
    <div className="space-y-6">
      <div className="grid gap-4">
        {canvas.sections.map((section: any, index: number) => (
          <Card key={index} className={`${section.color} border-2 border-dashed`}>
            <CardHeader>
              <CardTitle className="text-lg">{section.title}</CardTitle>
              <CardDescription>{section.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="min-h-24 p-4 bg-white/50 rounded border border-dashed border-gray-300">
                <p className="text-sm text-muted-foreground italic">
                  Add sticky notes and ideas here...
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Duration: {canvas.duration} • Participants: {canvas.participants}
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Download Template
        </Button>
      </div>
    </div>
  );

  const renderInterviewGuide = (interview: any) => (
    <div className="space-y-6">
      {interview.sections.map((section: any, index: number) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="text-base">{section.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {section.questions.map((question: string, qIndex: number) => (
                <div key={qIndex} className="flex items-start space-x-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-medium text-primary">{qIndex + 1}</span>
                  </div>
                  <p className="text-sm">{question}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Duration: {interview.duration}
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Download Guide
        </Button>
      </div>
    </div>
  );

  const renderWorkshopTemplate = (workshop: any) => (
    <div className="space-y-6">
      {workshop.activities.map((activity: any, index: number) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="text-base flex items-center justify-between">
              {activity.title}
              <Badge variant="outline">{activity.time}</Badge>
            </CardTitle>
            <CardDescription>{activity.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{activity.instructions}</p>
            <div className="mt-4 p-4 bg-muted/50 rounded border border-dashed">
              <p className="text-sm text-muted-foreground italic">
                Workshop space for activity outputs...
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Duration: {workshop.duration} • Participants: {workshop.participants}
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Download Template
        </Button>
      </div>
    </div>
  );

  const renderQuestionnaireTemplate = (questionnaire: any) => (
    <div className="space-y-6">
      {questionnaire.sections.map((section: any, index: number) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="text-base flex items-center justify-between">
              {section.title}
              <Badge variant="outline">{section.type}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {section.questions.map((question: string, qIndex: number) => (
                <div key={qIndex} className="p-3 bg-muted/30 rounded">
                  <p className="text-sm font-medium">Q{qIndex + 1}: {question}</p>
                  <div className="mt-2 text-xs text-muted-foreground">
                    Response area...
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Duration: {questionnaire.duration} • Target: {questionnaire.targetAudience}
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Survey
        </Button>
      </div>
    </div>
  );

  return (
    <div className="p-6 h-full overflow-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-2">Research Templates</h1>
        <p className="text-muted-foreground">
          Ready-to-use templates and worksheets for brand research activities
        </p>
      </div>

      <Tabs defaultValue="canvases" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="canvases" className="flex items-center">
            <LayoutGrid className="h-4 w-4 mr-2" />
            Canvases
          </TabsTrigger>
          <TabsTrigger value="interviews" className="flex items-center">
            <Users className="h-4 w-4 mr-2" />
            Interviews
          </TabsTrigger>
          <TabsTrigger value="workshops" className="flex items-center">
            <Lightbulb className="h-4 w-4 mr-2" />
            Workshops
          </TabsTrigger>
          <TabsTrigger value="questionnaires" className="flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            Surveys
          </TabsTrigger>
        </TabsList>

        <TabsContent value="canvases" className="mt-6">
          <div className="grid lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <h3 className="font-medium">Select Template</h3>
              {templates.canvases.map((canvas) => (
                <Button
                  key={canvas.id}
                  variant={selectedTemplate === canvas.id ? "default" : "ghost"}
                  className="w-full justify-start text-left h-auto p-3"
                  onClick={() => setSelectedTemplate(canvas.id)}
                >
                  <div>
                    <p className="font-medium">{canvas.name}</p>
                    <p className="text-xs text-muted-foreground">{canvas.description}</p>
                  </div>
                </Button>
              ))}
            </div>
            <div className="lg:col-span-3">
              {selectedTemplate && templates.canvases.find(c => c.id === selectedTemplate) && 
                renderCanvasTemplate(templates.canvases.find(c => c.id === selectedTemplate))
              }
            </div>
          </div>
        </TabsContent>

        <TabsContent value="interviews" className="mt-6">
          <div className="grid lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <h3 className="font-medium">Select Guide</h3>
              {templates.interviews.map((interview) => (
                <Button
                  key={interview.id}
                  variant={selectedTemplate === interview.id ? "default" : "ghost"}
                  className="w-full justify-start text-left h-auto p-3"
                  onClick={() => setSelectedTemplate(interview.id)}
                >
                  <div>
                    <p className="font-medium">{interview.name}</p>
                    <p className="text-xs text-muted-foreground">{interview.description}</p>
                  </div>
                </Button>
              ))}
            </div>
            <div className="lg:col-span-3">
              {selectedTemplate && templates.interviews.find(i => i.id === selectedTemplate) && 
                renderInterviewGuide(templates.interviews.find(i => i.id === selectedTemplate))
              }
            </div>
          </div>
        </TabsContent>

        <TabsContent value="workshops" className="mt-6">
          <div className="grid lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <h3 className="font-medium">Select Workshop</h3>
              {templates.workshops.map((workshop) => (
                <Button
                  key={workshop.id}
                  variant={selectedTemplate === workshop.id ? "default" : "ghost"}
                  className="w-full justify-start text-left h-auto p-3"
                  onClick={() => setSelectedTemplate(workshop.id)}
                >
                  <div>
                    <p className="font-medium">{workshop.name}</p>
                    <p className="text-xs text-muted-foreground">{workshop.description}</p>
                  </div>
                </Button>
              ))}
            </div>
            <div className="lg:col-span-3">
              {selectedTemplate && templates.workshops.find(w => w.id === selectedTemplate) && 
                renderWorkshopTemplate(templates.workshops.find(w => w.id === selectedTemplate))
              }
            </div>
          </div>
        </TabsContent>

        <TabsContent value="questionnaires" className="mt-6">
          <div className="grid lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <h3 className="font-medium">Select Survey</h3>
              {templates.questionnaires.map((questionnaire) => (
                <Button
                  key={questionnaire.id}
                  variant={selectedTemplate === questionnaire.id ? "default" : "ghost"}
                  className="w-full justify-start text-left h-auto p-3"
                  onClick={() => setSelectedTemplate(questionnaire.id)}
                >
                  <div>
                    <p className="font-medium">{questionnaire.name}</p>
                    <p className="text-xs text-muted-foreground">{questionnaire.description}</p>
                  </div>
                </Button>
              ))}
            </div>
            <div className="lg:col-span-3">
              {selectedTemplate && templates.questionnaires.find(q => q.id === selectedTemplate) && 
                renderQuestionnaireTemplate(templates.questionnaires.find(q => q.id === selectedTemplate))
              }
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}