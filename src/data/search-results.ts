export interface SearchResult {
  id: string;
  type: 'brand-asset' | 'persona' | 'campaign' | 'content' | 'research';
  title: string;
  description: string;
  breadcrumb: string;
  path: string;
  metadata?: {
    status?: 'active' | 'draft' | 'completed';
    contentType?: string;
    wordCount?: number;
    confidence?: number;
    completion?: number;
  };
}

export const mockSearchResults: SearchResult[] = [
  // Brand Assets
  {
    id: 'ba-1',
    type: 'brand-asset',
    title: 'Brand Positioning Statement',
    description: 'Our brand positioning defines how we stand out in the market. We help small businesses transform their brand strategy with data-driven insights.',
    breadcrumb: 'Your Brand > Brand Positioning',
    path: '/brand/positioning',
  },
  {
    id: 'ba-2',
    type: 'brand-asset',
    title: 'Brand Voice Guidelines',
    description: 'Voice and tone guidelines for consistent brand communication across all channels. Our brand voice is professional, empowering, and approachable.',
    breadcrumb: 'Your Brand > Brand Voice',
    path: '/brand/voice',
  },
  {
    id: 'ba-3',
    type: 'brand-asset',
    title: 'Visual Brand Identity',
    description: 'Complete visual identity system including logo usage, color palette, typography, and brand patterns for consistent brand presentation.',
    breadcrumb: 'Your Brand > Visual Identity',
    path: '/brand/visual',
  },
  
  // Personas
  {
    id: 'p-1',
    type: 'persona',
    title: 'Small Business Owner Sarah',
    description: 'Sarah is a 35-year-old entrepreneur running a small e-commerce brand. She needs help with brand strategy and market positioning to compete with larger brands.',
    breadcrumb: 'Personas > Primary Personas',
    path: '/personas/sarah',
  },
  {
    id: 'p-2',
    type: 'persona',
    title: 'Marketing Manager Mark',
    description: 'Mark manages brand and marketing for a mid-size company. He seeks data-driven insights to improve brand performance and customer engagement.',
    breadcrumb: 'Personas > Secondary Personas',
    path: '/personas/mark',
  },
  
  // Campaigns
  {
    id: 'c-1',
    type: 'campaign',
    title: 'Q1 Brand Awareness Campaign',
    description: 'Multi-channel brand awareness campaign targeting small business owners. Focus on brand storytelling and value proposition.',
    breadcrumb: 'Campaigns > Active Campaigns',
    path: '/campaigns/q1-awareness',
    metadata: {
      status: 'active',
    },
  },
  {
    id: 'c-2',
    type: 'campaign',
    title: 'Brand Refresh Launch',
    description: 'Campaign to launch our refreshed brand identity and updated brand messaging across all channels.',
    breadcrumb: 'Campaigns > Planned',
    path: '/campaigns/brand-refresh',
    metadata: {
      status: 'draft',
    },
  },
  
  // Content
  {
    id: 'co-1',
    type: 'content',
    title: 'The Ultimate Guide to Brand Strategy',
    description: 'Comprehensive guide covering brand positioning, brand identity, and brand storytelling for small businesses building their brand.',
    breadcrumb: 'Content > Blog Posts',
    path: '/content/brand-strategy-guide',
    metadata: {
      contentType: 'Blog Post',
      wordCount: 2500,
    },
  },
  {
    id: 'co-2',
    type: 'content',
    title: 'Brand Positioning Template',
    description: 'Free downloadable template to help you define your brand positioning and create a compelling brand narrative.',
    breadcrumb: 'Content > Templates',
    path: '/content/positioning-template',
    metadata: {
      contentType: 'Template',
      wordCount: 1200,
    },
  },
  
  // Research
  {
    id: 'r-1',
    type: 'research',
    title: 'Brand Perception Study 2024',
    description: 'Comprehensive brand perception research analyzing how our target audience perceives our brand compared to competitors.',
    breadcrumb: 'Research > Market Research',
    path: '/research/brand-perception',
    metadata: {
      confidence: 87,
      completion: 100,
    },
  },
  {
    id: 'r-2',
    type: 'research',
    title: 'Target Audience Brand Preferences',
    description: 'Research into brand preferences and decision-making factors for small business owners when choosing brand strategy tools.',
    breadcrumb: 'Research > Audience Research',
    path: '/research/brand-preferences',
    metadata: {
      confidence: 92,
      completion: 75,
    },
  },
];
