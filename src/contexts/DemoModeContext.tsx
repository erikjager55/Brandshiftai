import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface DemoModeConfig {
  enabled: boolean;
  companyName: string;
  industry: string;
  dataDensity: 'minimal' | 'moderate' | 'full';
  tourActive: boolean;
  currentTourStep: number;
  presentationMode: boolean;
  showInvestorMetrics: boolean;
  tourStartTime: number | null;
}

export interface DemoTourStep {
  id: string;
  title: string;
  description: string;
  benefit: string;
  targetSelector?: string;
  route?: string;
  action?: () => void;
}

interface DemoModeContextType {
  config: DemoModeConfig;
  enableDemoMode: (companyName: string, industry: string, dataDensity: string) => void;
  disableDemoMode: () => void;
  startTour: () => void;
  endTour: () => void;
  nextTourStep: () => void;
  previousTourStep: () => void;
  goToTourStep: (step: number) => void;
  togglePresentationMode: () => void;
  toggleInvestorMetrics: () => void;
  resetDemoData: () => void;
  tourSteps: DemoTourStep[];
  formatTourTime: () => string;
}

const DemoModeContext = createContext<DemoModeContextType | undefined>(undefined);

export function useDemoMode() {
  const context = useContext(DemoModeContext);
  if (!context) {
    throw new Error('useDemoMode must be used within DemoModeProvider');
  }
  return context;
}

const DEFAULT_TOUR_STEPS: DemoTourStep[] = [
  {
    id: 'dashboard',
    title: 'Dashboard Overview',
    description: 'Your command center for brand strategy',
    benefit: 'Get a bird\'s eye view of all brand activities and insights',
    route: 'dashboard',
  },
  {
    id: 'brand-assets',
    title: 'Brand Assets',
    description: 'Centralized brand asset management',
    benefit: 'Track and validate every strategic brand decision',
    route: 'brand',
  },
  {
    id: 'personas',
    title: 'Audience Personas',
    description: 'Data-driven audience intelligence',
    benefit: 'Create content that resonates with your target audience',
    route: 'personas',
  },
  {
    id: 'research',
    title: 'Research Hub',
    description: 'Enterprise-grade market research',
    benefit: 'Replace $50K+ consultant fees with AI-powered insights',
    route: 'research',
  },
  {
    id: 'ai-generation',
    title: 'AI Content Generation',
    description: 'Research-backed content at scale',
    benefit: 'Generate brand-aligned content in minutes, not hours',
    route: 'content-library',
  },
  {
    id: 'campaigns',
    title: 'Campaign Management',
    description: 'End-to-end campaign orchestration',
    benefit: 'Launch campaigns faster with strategic confidence',
    route: 'active-campaigns',
  },
  {
    id: 'analytics',
    title: 'Analytics & Insights',
    description: 'Real-time brand performance tracking',
    benefit: 'Prove ROI with data-driven brand metrics',
    route: 'dashboard',
  },
  {
    id: 'summary',
    title: 'Platform Summary',
    description: 'The complete brand intelligence platform',
    benefit: 'Save 3.2 hours per content piece, $24.5K annually',
    route: 'investor-metrics',
  },
];

export function DemoModeProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<DemoModeConfig>(() => {
    // Check localStorage for saved demo config
    const saved = localStorage.getItem('demo-mode-config');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Fall through to default
      }
    }

    // Check URL params for demo mode
    const params = new URLSearchParams(window.location.search);
    const isDemoFromUrl = params.get('demo') === 'true';

    return {
      enabled: isDemoFromUrl,
      companyName: 'TechNova Inc.',
      industry: 'Technology',
      dataDensity: 'full' as const,
      tourActive: false,
      currentTourStep: 0,
      presentationMode: false,
      showInvestorMetrics: false,
      tourStartTime: null,
    };
  });

  // Save to localStorage when config changes
  useEffect(() => {
    localStorage.setItem('demo-mode-config', JSON.stringify(config));
  }, [config]);

  const enableDemoMode = (companyName: string, industry: string, dataDensity: string) => {
    setConfig(prev => ({
      ...prev,
      enabled: true,
      companyName,
      industry,
      dataDensity: dataDensity as 'minimal' | 'moderate' | 'full',
    }));
  };

  const disableDemoMode = () => {
    setConfig(prev => ({
      ...prev,
      enabled: false,
      tourActive: false,
      tourStartTime: null,
    }));
  };

  const startTour = () => {
    setConfig(prev => ({
      ...prev,
      tourActive: true,
      currentTourStep: 0,
      tourStartTime: Date.now(),
    }));
  };

  const endTour = () => {
    setConfig(prev => ({
      ...prev,
      tourActive: false,
      currentTourStep: 0,
      tourStartTime: null,
    }));
  };

  const nextTourStep = () => {
    setConfig(prev => ({
      ...prev,
      currentTourStep: Math.min(prev.currentTourStep + 1, DEFAULT_TOUR_STEPS.length - 1),
    }));
  };

  const previousTourStep = () => {
    setConfig(prev => ({
      ...prev,
      currentTourStep: Math.max(prev.currentTourStep - 1, 0),
    }));
  };

  const goToTourStep = (step: number) => {
    setConfig(prev => ({
      ...prev,
      currentTourStep: Math.max(0, Math.min(step, DEFAULT_TOUR_STEPS.length - 1)),
    }));
  };

  const togglePresentationMode = () => {
    setConfig(prev => ({
      ...prev,
      presentationMode: !prev.presentationMode,
    }));
  };

  const toggleInvestorMetrics = () => {
    setConfig(prev => ({
      ...prev,
      showInvestorMetrics: !prev.showInvestorMetrics,
    }));
  };

  const resetDemoData = () => {
    // Trigger a reset of all demo data (would be implemented elsewhere)
    console.log('Resetting demo data...');
    
    // Reset tour if active
    if (config.tourActive) {
      setConfig(prev => ({
        ...prev,
        currentTourStep: 0,
        tourStartTime: Date.now(),
      }));
    }
  };

  const formatTourTime = () => {
    if (!config.tourStartTime) return '00:00';
    
    const elapsed = Math.floor((Date.now() - config.tourStartTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const value: DemoModeContextType = {
    config,
    enableDemoMode,
    disableDemoMode,
    startTour,
    endTour,
    nextTourStep,
    previousTourStep,
    goToTourStep,
    togglePresentationMode,
    toggleInvestorMetrics,
    resetDemoData,
    tourSteps: DEFAULT_TOUR_STEPS,
    formatTourTime,
  };

  return (
    <DemoModeContext.Provider value={value}>
      {children}
    </DemoModeContext.Provider>
  );
}
