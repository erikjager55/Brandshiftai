/**
 * Enhanced Persona Chat Modal - Rebuilt
 * Advanced AI-simulated persona chat with research modes, insights tracking, and personality-driven responses
 */

import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, 
  Send, 
  User, 
  Sparkles, 
  Loader2,
  AlertCircle,
  RotateCcw,
  Brain,
  Heart,
  Target,
  Lightbulb,
  TrendingUp,
  Download,
  Mic,
  Smile,
  Meh,
  Frown,
  Zap,
  Clock,
  MapPin as Journey,
  CheckCircle2,
  X,
  BookOpen,
  Plus
} from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Persona } from '../../types/persona';
import { ScrollArea } from '../ui/scroll-area';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { cn } from '../../lib/utils';
import { KnowledgeContextModal } from './KnowledgeContextModal';
import { mockBrandAssets } from '../../data/mock-brand-assets';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  mood?: 'happy' | 'neutral' | 'frustrated' | 'excited';
  category?: string;
}

interface Insight {
  id: string;
  category: 'goal' | 'pain' | 'motivation' | 'behavior' | 'decision';
  content: string;
  timestamp: Date;
}

type ChatMode = 'free' | 'interview' | 'empathy' | 'jtbd';

interface PersonaChatModalProps {
  persona: Persona | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CHAT_MODES = {
  free: {
    icon: MessageCircle,
    label: 'Free Chat',
    description: 'Open gesprek met de persona',
    color: 'text-blue-500'
  },
  interview: {
    icon: Mic,
    label: 'Interview',
    description: 'Gestructureerde onderzoeksvragen',
    color: 'text-purple-500'
  },
  empathy: {
    icon: Heart,
    label: 'Empathy Map',
    description: 'Verken gevoelens en gedachten',
    color: 'text-pink-500'
  },
  jtbd: {
    icon: Target,
    label: 'Jobs-to-be-Done',
    description: 'Focus op taken en outcomes',
    color: 'text-orange-500'
  }
};

const MOOD_ICONS = {
  happy: { icon: Smile, color: 'text-green-500', label: 'Positief' },
  neutral: { icon: Meh, color: 'text-gray-500', label: 'Neutraal' },
  frustrated: { icon: Frown, color: 'text-red-500', label: 'Gefrustreerd' },
  excited: { icon: Zap, color: 'text-yellow-500', label: 'Enthousiast' }
};

export function PersonaChatModal({ persona, open, onOpenChange }: PersonaChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatMode, setChatMode] = useState<ChatMode>('free');
  const [insights, setInsights] = useState<Insight[]>([]);
  const [activeTab, setActiveTab] = useState<'chat' | 'insights'>('chat');
  const [selectedKnowledgeAssets, setSelectedKnowledgeAssets] = useState<string[]>([]);
  const [showAssetPicker, setShowAssetPicker] = useState(false);
  const [showContextBar, setShowContextBar] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize conversation when persona changes
  useEffect(() => {
    if (persona && open) {
      initializeConversation();
    }
  }, [persona, open, chatMode]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const initializeConversation = () => {
    if (!persona) return;
    
    const welcomeMessages: Record<ChatMode, string> = {
      free: `Hi! I'm ${persona.name}. ${persona.tagline} Feel free to ask me anything about my work and challenges!`,
      interview: `Hello! Thank you for taking the time for this interview. I'm ${persona.name}, ${persona.demographics?.occupation?.toLowerCase() || 'professional'}. Feel free to ask your questions - I'll answer honestly!`,
      empathy: `Hey! I'm ${persona.name}. In this mode you can really dig into what I feel, think, say and do. I'm happy to share my perspective!`,
      jtbd: `Hi! ${persona.name} here. Let's talk about what I really want to achieve and why. Ask me about my tasks, goals and what I need to be successful!`
    };

    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: welcomeMessages[chatMode],
        timestamp: new Date(),
        mood: 'happy'
      },
    ]);
  };

  const extractInsight = (message: string, category: Insight['category']): Insight | null => {
    if (message.length > 30) {
      return {
        id: `insight-${Date.now()}`,
        category,
        content: message,
        timestamp: new Date()
      };
    }
    return null;
  };

  const generatePersonaResponse = (userMessage: string): { content: string; mood: Message['mood']; category?: string } => {
    if (!persona) return { content: 'Sorry, ik kan nu niet antwoorden.', mood: 'neutral' };

    const lowerMessage = userMessage.toLowerCase();
    const personality = persona.personality || 'professional';
    const isEnthusiastic = personality.toLowerCase().includes('enthusiast') || personality.toLowerCase().includes('energetic');
    const isAnalytical = personality.toLowerCase().includes('analytical') || personality.toLowerCase().includes('data');

    // Goals
    if (lowerMessage.includes('doel') || lowerMessage.includes('goal')) {
      const goals = persona.goals || [];
      if (goals.length > 0) {
        const insight = extractInsight(goals[0], 'goal');
        if (insight) setInsights(prev => [...prev, insight]);
        
        return {
          content: `Mijn primaire doel is ${goals[0].toLowerCase()}. ${goals.length > 1 ? `Daarnaast werk ik ook aan ${goals[1].toLowerCase()}.` : ''} Dit is belangrijk voor me omdat het direct impact heeft op mijn ${persona.demographics?.occupation ? 'werk als ' + persona.demographics.occupation.toLowerCase() : 'dagelijkse taken'}.`,
          mood: 'neutral',
          category: 'Goals'
        };
      }
    }

    // Frustrations
    if (lowerMessage.includes('probleem') || lowerMessage.includes('frustratie') || lowerMessage.includes('pain')) {
      const frustrations = persona.frustrations || [];
      if (frustrations.length > 0) {
        const insight = extractInsight(frustrations[0], 'pain');
        if (insight) setInsights(prev => [...prev, insight]);
        
        return {
          content: `Wat me het meeste frustreert is ${frustrations[0].toLowerCase()}. Dit kost me tijd en energie die ik liever anders besteed.`,
          mood: 'frustrated',
          category: 'Pain Points'
        };
      }
    }

    // Motivations
    if (lowerMessage.includes('motiv') || lowerMessage.includes('waarom') || lowerMessage.includes('drijfveer')) {
      const motivations = persona.motivations || [];
      if (motivations.length > 0) {
        const insight = extractInsight(motivations[0], 'motivation');
        if (insight) setInsights(prev => [...prev, insight]);
        
        return {
          content: `Wat me echt drijft is ${motivations[0].toLowerCase()}. ${isEnthusiastic ? 'Dit geeft me zoveel energie!' : 'Dit is mijn primaire motivatie.'}`,
          mood: 'excited',
          category: 'Motivations'
        };
      }
    }

    // Greeting
    if (lowerMessage.includes('hoi') || lowerMessage.includes('hallo') || lowerMessage.includes('hey')) {
      return {
        content: `${isEnthusiastic ? 'Hey! Super dat je met me chat!' : 'Hallo!'} Vraag me gerust alles wat je wilt weten!`,
        mood: 'happy'
      };
    }

    // Thanks
    if (lowerMessage.includes('bedankt') || lowerMessage.includes('dank')) {
      return {
        content: `${isEnthusiastic ? 'Graag gedaan!' : 'Geen probleem!'} Als je nog meer vragen hebt, stel ze gerust.`,
        mood: 'happy'
      };
    }

    // Default
    return {
      content: `Interessante vraag! Als ${persona.name} vind ik het belangrijk om ${isAnalytical ? 'data-gedreven en accuraat' : 'eerlijk en praktisch'} te zijn. Kun je je vraag wat specifieker maken?`,
      mood: 'neutral'
    };
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading || !persona) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    setTimeout(() => {
      const response = generatePersonaResponse(userMessage.content);
      
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response.content,
        timestamp: new Date(),
        mood: response.mood,
        category: response.category,
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
      inputRef.current?.focus();
    }, 1000 + Math.random() * 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleReset = () => {
    setInsights([]);
    initializeConversation();
  };

  const exportConversation = () => {
    if (!persona) return;

    const content = messages.map(m => 
      `[${m.timestamp.toLocaleTimeString('nl-NL')}] ${m.role === 'user' ? 'You' : persona.name}: ${m.content}`
    ).join('\n\n');

    const insightsContent = insights.length > 0 
      ? '\n\n=== INSIGHTS ===\n\n' + insights.map(i => `[${i.category.toUpperCase()}] ${i.content}`).join('\n')
      : '';

    const blob = new Blob([`Conversation with ${persona.name}\n${'='.repeat(40)}\n\n${content}${insightsContent}`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `persona-chat-${persona.name.toLowerCase().replace(/\s/g, '-')}-${Date.now()}.txt`;
    a.click();
  };

  if (!persona) return null;

  const lastMood = messages[messages.length - 1]?.mood || 'neutral';
  const MoodIcon = MOOD_ICONS[lastMood].icon;
  const moodColor = MOOD_ICONS[lastMood].color;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl h-[85vh] p-0 gap-0 flex flex-col overflow-hidden" aria-describedby={undefined}>
        <DialogTitle className="sr-only">Chat with {persona.name}</DialogTitle>
        
        {/* Refined Header */}
        <div className="flex items-center justify-between px-6 py-6 border-b bg-gradient-to-r from-gray-50/50 to-transparent flex-shrink-0">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Avatar className="h-12 w-12 ring-2 ring-primary/10 shadow-sm">
              <AvatarImage src={persona.avatar} alt={persona.name} />
              <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-semibold">
                {persona.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="font-semibold truncate">{persona.name}</h2>
                <Badge variant="outline" className="h-5 px-2 text-xs gap-1 border-primary/20">
                  <Sparkles className="h-3 w-3 text-primary" />
                  AI
                </Badge>
                <div className="flex items-center gap-1">
                  <MoodIcon className={cn("h-4 w-4", moodColor)} />
                </div>
              </div>
              <p className="text-sm text-muted-foreground truncate mt-0.5">
                {persona.demographics?.occupation || 'Professional'} • {persona.demographics?.age || 'N/A'}
              </p>
            </div>
          </div>
          <div className="flex gap-1.5">
            <Button variant="ghost" size="sm" onClick={exportConversation} className="h-9 w-9 p-0 hover:bg-gray-100">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleReset} className="h-9 w-9 p-0 hover:bg-gray-100">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Refined Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="flex-1 flex flex-col min-h-0 !gap-0">
          <TabsList className="mx-6 mt-4 mb-0 self-start bg-gray-100/80">
            <TabsTrigger value="chat" className="gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <MessageCircle className="h-4 w-4" />
              Chat
              {messages.length > 1 && (
                <Badge variant="secondary" className="ml-1 h-4 px-1.5 text-xs bg-primary/10 text-primary border-0">
                  {messages.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="insights" className="gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Lightbulb className="h-4 w-4" />
              Insights
              {insights.length > 0 && (
                <Badge variant="secondary" className="ml-1 h-4 px-1.5 text-xs bg-amber-100 text-amber-700 border-0">
                  {insights.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Chat Content */}
          <TabsContent value="chat" className="flex-1 flex flex-col min-h-0 m-0 mt-4">
            <ScrollArea className="flex-1 px-6" ref={scrollAreaRef}>
              <div className="space-y-6 pb-4">{messages.map((message) => {
                  const MoodIconComponent = message.mood ? MOOD_ICONS[message.mood].icon : null;
                  const isUser = message.role === 'user';
                  
                  return (
                    <div key={message.id} className={cn("flex gap-3", isUser && "flex-row-reverse")}>
                      {!isUser && (
                        <Avatar className="h-8 w-8 flex-shrink-0 ring-1 ring-gray-200/50">
                          <AvatarImage src={persona.avatar} alt={persona.name} />
                          <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary text-xs font-medium">
                            {persona.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      
                      <div className={cn("flex-1 space-y-1.5", isUser && "flex flex-col items-end")}>
                        <div className={cn(
                          "inline-block px-4 py-2.5 rounded-2xl max-w-[85%]",
                          isUser 
                            ? "bg-primary text-primary-foreground rounded-tr-sm" 
                            : "bg-gray-100 text-gray-900 rounded-tl-sm"
                        )}>
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                        </div>
                        
                        <div className={cn("flex items-center gap-2 text-xs text-muted-foreground px-1", isUser && "justify-end")}>
                          <span>{message.timestamp.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' })}</span>
                          {MoodIconComponent && !isUser && (
                            <>
                              <span>•</span>
                              <MoodIconComponent className={cn("h-3.5 w-3.5", message.mood ? MOOD_ICONS[message.mood].color : '')} />
                            </>
                          )}
                        </div>
                      </div>
                      
                      {isUser && (
                        <Avatar className="h-8 w-8 flex-shrink-0 bg-gray-200">
                          <AvatarFallback className="bg-gradient-to-br from-gray-300 to-gray-200 text-gray-700 text-xs font-medium">
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  );
                })}

                {isLoading && (
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarImage src={persona.avatar} alt={persona.name} />
                      <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary text-sm">
                        {persona.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-2xl px-4 py-3">
                      <div className="flex gap-1">
                        <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="px-6 pb-6 pt-4 flex-shrink-0">
              {/* Knowledge Context Bar */}
              {selectedKnowledgeAssets.length > 0 && (
                <div className="mb-3 p-3 rounded-lg bg-blue-50/50 border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-blue-600" />
                      <span className="text-xs font-medium text-blue-900">Context Knowledge</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowContextBar(!showContextBar)}
                      className="h-6 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-100"
                    >
                      {showContextBar ? 'Hide' : 'Show'} ({selectedKnowledgeAssets.length})
                    </Button>
                  </div>
                  {showContextBar && (
                    <div className="space-y-1.5 mt-2">
                      {selectedKnowledgeAssets.map(assetId => {
                        const asset = [...mockBrandAssets].find(a => a.id === assetId);
                        if (!asset) return null;
                        return (
                          <div key={assetId} className="flex items-center justify-between p-2 rounded bg-white border border-blue-100">
                            <span className="text-xs font-medium truncate flex-1">{asset.title || asset.type}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedKnowledgeAssets(prev => prev.filter(id => id !== assetId))}
                              className="h-6 w-6 p-0 hover:bg-red-50 hover:text-red-600"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
                <p className="text-xs text-muted-foreground flex-1">
                  AI-simulated conversation in <span className="font-medium">{CHAT_MODES[chatMode].label}</span> mode
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAssetPicker(true)}
                  className="h-7 gap-1.5 text-xs"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  {selectedKnowledgeAssets.length > 0 ? `Context (${selectedKnowledgeAssets.length})` : 'Add Context'}
                </Button>
              </div>
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  placeholder={`Ask ${persona.name.split(' ')[0]} a question...`}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  size="icon"
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Insights Content */}
          <TabsContent value="insights" className="flex-1 m-0 mt-3 overflow-auto">
            <div className="px-6 pb-6">
              {insights.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <Lightbulb className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No insights yet</h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Insights are automatically collected during your conversation. Start chatting!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">Conversation Insights</h3>
                      <p className="text-sm text-muted-foreground">
                        Key learnings from your conversation with {persona.name}
                      </p>
                    </div>
                    <Badge className="gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      {insights.length} insights
                    </Badge>
                  </div>

                  <div className="grid gap-3">
                    {insights.map((insight) => {
                      const categoryConfig = {
                        goal: { icon: Target, color: 'text-blue-500', bg: 'bg-blue-50', label: 'Goal' },
                        pain: { icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-50', label: 'Pain Point' },
                        motivation: { icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-50', label: 'Motivation' },
                        behavior: { icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-50', label: 'Behavior' },
                        decision: { icon: Brain, color: 'text-purple-500', bg: 'bg-purple-50', label: 'Decision' },
                      }[insight.category];

                      const Icon = categoryConfig.icon;

                      return (
                        <div key={insight.id} className={cn("p-4 rounded-lg border-2 border-l-4", categoryConfig.bg)}>
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-white">
                              <Icon className={cn("h-4 w-4", categoryConfig.color)} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant="secondary" className="text-xs">
                                  {categoryConfig.label}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {insight.timestamp.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                              <p className="text-sm leading-relaxed">{insight.content}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>

      {/* Asset Picker Modal */}
      {showAssetPicker && (
        <KnowledgeContextModal
          open={showAssetPicker}
          onOpenChange={setShowAssetPicker}
          assets={[...mockBrandAssets].map(asset => ({
            id: asset.id,
            title: asset.title,
            type: asset.type,
            status: asset.status as 'validated' | 'ready' | 'in-progress' | 'not-started',
            category: asset.category,
            description: asset.description,
            isRequired: false,
          }))}
          selectedAssets={selectedKnowledgeAssets}
          onApplySelection={(ids) => {
            setSelectedKnowledgeAssets(ids);
            setShowContextBar(true);
            setShowAssetPicker(false);
          }}
        />
      )}
    </Dialog>
  );
}