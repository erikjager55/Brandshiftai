/**
 * Demo Data Service
 * 
 * Provides pre-populated sample data for demo mode.
 * Data is cached for instant "AI" responses during presentations.
 */

import { BrandAsset } from '../data/brand-assets';
import { Persona } from '../types/persona';

export interface DemoCompanyProfile {
  name: string;
  industry: string;
  description: string;
  founded: string;
  employees: string;
  mission: string;
  values: string[];
}

export const DEMO_COMPANIES: Record<string, DemoCompanyProfile> = {
  'Technology': {
    name: 'TechNova Inc.',
    industry: 'Technology',
    description: 'Leading B2B SaaS platform for enterprise workflow automation',
    founded: '2019',
    employees: '150-200',
    mission: 'To empower businesses with intelligent automation that saves time and drives growth',
    values: ['Innovation', 'Customer Success', 'Data-Driven', 'Transparency'],
  },
  'Healthcare': {
    name: 'HealthFirst Solutions',
    industry: 'Healthcare',
    description: 'Digital health platform connecting patients with care providers',
    founded: '2020',
    employees: '100-150',
    mission: 'To make quality healthcare accessible to everyone',
    values: ['Patient Care', 'Privacy', 'Innovation', 'Accessibility'],
  },
  'Finance': {
    name: 'FinanceFlow',
    industry: 'Finance',
    description: 'Modern financial planning and investment platform for SMBs',
    founded: '2018',
    employees: '200-250',
    mission: 'To democratize financial expertise for small businesses',
    values: ['Trust', 'Security', 'Simplicity', 'Growth'],
  },
  'Retail': {
    name: 'ShopSmart',
    industry: 'Retail',
    description: 'Omnichannel retail platform with AI-powered personalization',
    founded: '2017',
    employees: '300-400',
    mission: 'To create seamless shopping experiences across all channels',
    values: ['Customer Delight', 'Quality', 'Sustainability', 'Innovation'],
  },
  'Education': {
    name: 'EduNext',
    industry: 'Education',
    description: 'Online learning platform with adaptive AI curriculum',
    founded: '2021',
    employees: '50-100',
    mission: 'To personalize education for every learner',
    values: ['Learning First', 'Inclusivity', 'Innovation', 'Growth'],
  },
  'Manufacturing': {
    name: 'ManuTech Industries',
    industry: 'Manufacturing',
    description: 'Smart manufacturing solutions with IoT integration',
    founded: '2016',
    employees: '500+',
    mission: 'To revolutionize manufacturing through intelligent automation',
    values: ['Quality', 'Efficiency', 'Innovation', 'Sustainability'],
  },
  'Marketing Agency': {
    name: 'BrandCraft Agency',
    industry: 'Marketing Agency',
    description: 'Full-service digital marketing agency for B2B brands',
    founded: '2015',
    employees: '75-100',
    mission: 'To build brands that inspire and convert',
    values: ['Creativity', 'Results', 'Partnership', 'Excellence'],
  },
  'Consulting': {
    name: 'StrategyWorks',
    industry: 'Consulting',
    description: 'Management consulting firm specializing in digital transformation',
    founded: '2014',
    employees: '200-250',
    mission: 'To guide companies through successful digital transformation',
    values: ['Expertise', 'Impact', 'Partnership', 'Innovation'],
  },
};

// Pre-cached AI content responses
export const DEMO_CONTENT_RESPONSES = {
  'blog-post': {
    title: '5 Ways AI is Transforming Enterprise Workflows',
    content: `In today's fast-paced business environment, artificial intelligence is no longer a luxury—it's a necessity. Here's how leading enterprises are leveraging AI to transform their workflows:

1. **Intelligent Automation**: AI-powered workflows reduce manual tasks by up to 70%, allowing teams to focus on strategic initiatives.

2. **Predictive Analytics**: Advanced algorithms analyze patterns to forecast trends and optimize decision-making.

3. **Personalized Experiences**: AI enables hyper-personalization at scale, improving customer satisfaction by 45%.

4. **Real-time Insights**: Instant data processing provides actionable insights when you need them most.

5. **Continuous Learning**: Machine learning models improve over time, delivering increasingly better results.

The future of work is intelligent, automated, and data-driven. Companies that embrace AI today will lead tomorrow's market.`,
    metadata: {
      wordCount: 156,
      readTime: '2 min',
      tone: 'Professional',
      brandAlignment: '94%',
    },
  },
  'social-post': {
    title: 'LinkedIn Post - Product Launch',
    content: `🚀 Excited to announce our latest innovation!

We've just launched TechNova Workflows 3.0 - the smartest way to automate your enterprise processes.

✨ What's new:
• AI-powered task prioritization
• 50+ new integrations
• Real-time collaboration tools
• Advanced analytics dashboard

Join 10,000+ businesses already transforming their workflows.

Learn more: [link] 

#Innovation #AI #Productivity #EnterpriseAutomation`,
    metadata: {
      wordCount: 58,
      readTime: '30 sec',
      tone: 'Engaging',
      brandAlignment: '96%',
    },
  },
  'email': {
    title: 'Product Update Email',
    subject: 'You asked, we delivered: TechNova 3.0 is here',
    content: `Hi [First Name],

Remember when you told us you needed smarter automation? We listened.

Today, we're thrilled to introduce TechNova Workflows 3.0 - built with your feedback at the heart of every feature.

**What you'll love:**
• AI that learns your workflow patterns
• Integrations with your favorite tools
• Real-time collaboration features
• Analytics that actually make sense

This isn't just an update. It's a complete reimagining of how work gets done.

Ready to experience the future of workflow automation?

[Get Started with 3.0]

Best,
The TechNova Team

P.S. As a valued customer, you get early access before our public launch next week.`,
    metadata: {
      wordCount: 112,
      readTime: '1 min',
      tone: 'Friendly Professional',
      brandAlignment: '95%',
    },
  },
};

// Pre-populated research results
export const DEMO_RESEARCH_RESULTS = {
  'survey-analysis': {
    title: 'Customer Satisfaction Survey Results',
    responses: 247,
    completionRate: '87%',
    keyFindings: [
      'Overall satisfaction: 4.6/5.0',
      '89% would recommend to colleagues',
      'Top feature: AI-powered automation',
      'Improvement area: Mobile app UX',
    ],
    insights: [
      'Users save average 3.2 hours per week',
      'ROI achieved within 4 months on average',
      'Enterprise customers show highest satisfaction (4.8/5)',
    ],
  },
  'competitor-analysis': {
    title: 'Competitive Landscape Analysis',
    competitorsAnalyzed: 8,
    marketPosition: 'Strong Challenger',
    keyFindings: [
      'TechNova ranks #2 in AI capabilities',
      'Pricing is competitive (mid-market)',
      'Integration ecosystem is a key differentiator',
      'Customer support rated highest in category',
    ],
    opportunities: [
      'Enterprise segment shows 40% growth opportunity',
      'International expansion potential in EMEA',
      'Vertical-specific solutions (healthcare, finance)',
    ],
  },
};

// Demo campaign data
export const DEMO_CAMPAIGNS = [
  {
    id: 'demo-campaign-1',
    name: 'Product Launch - TechNova 3.0',
    status: 'active' as const,
    startDate: '2024-01-15',
    endDate: '2024-02-15',
    deliverables: [
      {
        id: 'deliv-1',
        type: 'Blog Post',
        title: '5 Ways AI is Transforming Enterprise Workflows',
        status: 'completed',
        dueDate: '2024-01-20',
      },
      {
        id: 'deliv-2',
        type: 'Social Media',
        title: 'LinkedIn Product Launch Series',
        status: 'in-progress',
        dueDate: '2024-01-25',
      },
      {
        id: 'deliv-3',
        type: 'Email Campaign',
        title: 'Product Update Email',
        status: 'completed',
        dueDate: '2024-01-22',
      },
    ],
    performance: {
      reach: 45000,
      engagement: 3200,
      conversions: 450,
      roi: '340%',
    },
  },
];

// Demo personas
export const DEMO_PERSONAS: Persona[] = [
  {
    id: 'demo-persona-1',
    name: 'Enterprise Emily',
    role: 'VP of Operations',
    category: 'Primary Target',
    demographics: {
      ageRange: '35-45',
      location: 'Urban, Major Cities',
      education: 'MBA or equivalent',
      income: '$150K-250K',
    },
    psychographics: {
      goals: [
        'Increase operational efficiency',
        'Reduce costs while maintaining quality',
        'Enable team to focus on strategic work',
      ],
      challenges: [
        'Managing multiple disconnected tools',
        'Lack of real-time visibility',
        'Team resistance to new technology',
      ],
      values: [
        'Data-driven decision making',
        'Innovation',
        'Team empowerment',
      ],
    },
    behaviors: {
      mediaConsumption: ['LinkedIn', 'Industry publications', 'Podcasts'],
      purchaseJourney: 'Careful evaluation with multiple stakeholders',
      brandInteraction: 'Seeks peer recommendations and case studies',
    },
    insights: {
      keyMessage: 'Save time, gain insights, empower your team',
      painPoints: [
        'Too many manual processes',
        'Limited visibility into workflows',
        'Difficulty proving ROI of operations',
      ],
      opportunities: [
        'Automation of repetitive tasks',
        'Real-time analytics dashboard',
        'Integration with existing tools',
      ],
    },
  },
  {
    id: 'demo-persona-2',
    name: 'Startup Steve',
    role: 'Founder / CEO',
    category: 'Secondary Target',
    demographics: {
      ageRange: '28-38',
      location: 'Tech hubs',
      education: 'Bachelor\'s degree',
      income: '$80K-150K',
    },
    psychographics: {
      goals: [
        'Scale operations efficiently',
        'Compete with larger players',
        'Build a strong company culture',
      ],
      challenges: [
        'Limited budget and resources',
        'Wearing multiple hats',
        'Need to move fast',
      ],
      values: [
        'Agility',
        'Innovation',
        'Growth',
      ],
    },
    behaviors: {
      mediaConsumption: ['Twitter/X', 'Product Hunt', 'Tech blogs'],
      purchaseJourney: 'Quick decision, tries before buying',
      brandInteraction: 'Self-serve, looks for free trials',
    },
    insights: {
      keyMessage: 'Enterprise power, startup speed',
      painPoints: [
        'Can\'t afford enterprise tools',
        'Need results fast',
        'Limited technical resources',
      ],
      opportunities: [
        'Affordable pricing tiers',
        'Quick setup and onboarding',
        'Self-serve platform',
      ],
    },
  },
  {
    id: 'demo-persona-3',
    name: 'Manager Mike',
    role: 'Project Manager',
    category: 'Influencer',
    demographics: {
      ageRange: '30-40',
      location: 'Suburban and urban',
      education: 'Bachelor\'s degree',
      income: '$70K-120K',
    },
    psychographics: {
      goals: [
        'Deliver projects on time and budget',
        'Improve team collaboration',
        'Demonstrate value to leadership',
      ],
      challenges: [
        'Coordinating across multiple teams',
        'Tracking project status',
        'Managing stakeholder expectations',
      ],
      values: [
        'Reliability',
        'Organization',
        'Team success',
      ],
    },
    behaviors: {
      mediaConsumption: ['LinkedIn', 'PM blogs', 'Webinars'],
      purchaseJourney: 'Recommends to leadership',
      brandInteraction: 'Attends demos, reads reviews',
    },
    insights: {
      keyMessage: 'Keep projects on track, team aligned',
      painPoints: [
        'Lack of visibility',
        'Too many status meetings',
        'Difficulty prioritizing',
      ],
      opportunities: [
        'Project tracking dashboards',
        'Automated status updates',
        'Priority management tools',
      ],
    },
  },
];

class DemoDataService {
  private static instance: DemoDataService;

  private constructor() {}

  static getInstance(): DemoDataService {
    if (!DemoDataService.instance) {
      DemoDataService.instance = new DemoDataService();
    }
    return DemoDataService.instance;
  }

  /**
   * Get company profile for specific industry
   */
  getCompanyProfile(industry: string): DemoCompanyProfile {
    return DEMO_COMPANIES[industry] || DEMO_COMPANIES['Technology'];
  }

  /**
   * Get pre-cached AI content response
   */
  getContentResponse(type: 'blog-post' | 'social-post' | 'email'): typeof DEMO_CONTENT_RESPONSES['blog-post'] {
    return DEMO_CONTENT_RESPONSES[type];
  }

  /**
   * Get research results
   */
  getResearchResults(type: 'survey-analysis' | 'competitor-analysis'): typeof DEMO_RESEARCH_RESULTS['survey-analysis'] {
    return DEMO_RESEARCH_RESULTS[type];
  }

  /**
   * Get demo campaigns
   */
  getCampaigns() {
    return DEMO_CAMPAIGNS;
  }

  /**
   * Get demo personas
   */
  getPersonas(): Persona[] {
    return DEMO_PERSONAS;
  }

  /**
   * Simulate instant AI generation (no actual delay)
   */
  async generateContentInstantly(type: 'blog-post' | 'social-post' | 'email', prompt: string): Promise<typeof DEMO_CONTENT_RESPONSES['blog-post']> {
    // In demo mode, return instant cached response
    return Promise.resolve(this.getContentResponse(type));
  }

  /**
   * Simulate research completion (animated progress)
   */
  async runResearchInstantly(type: 'survey-analysis' | 'competitor-analysis'): Promise<typeof DEMO_RESEARCH_RESULTS['survey-analysis']> {
    // Return instant cached response
    return Promise.resolve(this.getResearchResults(type));
  }

  /**
   * Reset all demo data to initial state
   */
  resetDemoData(): void {
    console.log('Demo data reset to initial state');
    // In a real implementation, this would reset any modified demo state
  }
}

export const demoDataService = DemoDataService.getInstance();
