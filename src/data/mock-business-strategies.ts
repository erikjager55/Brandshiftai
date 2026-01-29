export interface KeyResult {
  id: string;
  description: string;
  status: 'complete' | 'in-progress' | 'not-started';
  progress?: number;
  target?: string;
  current?: string;
}

export interface Objective {
  id: string;
  title: string;
  description: string;
  focusArea: string;
  priority: 'high' | 'medium' | 'low';
  status: 'on-track' | 'at-risk' | 'behind' | 'complete' | 'not-started';
  progress: number;
  metricType: 'percentage' | 'number' | 'currency';
  startValue: string;
  targetValue: string;
  currentValue: string;
  keyResults: KeyResult[];
  linkedCampaigns: string[];
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  date: string;
  quarter: string;
  status: 'complete' | 'pending' | 'upcoming';
}

export interface FocusArea {
  id: string;
  name: string;
  icon: string;
  description: string;
  objectiveCount: number;
}

export interface BusinessStrategy {
  id: string;
  name: string;
  description: string;
  icon: 'target' | 'rocket' | 'trending-up' | 'zap' | 'flag';
  status: 'active' | 'draft' | 'completed' | 'archived';
  type: 'growth' | 'market-entry' | 'product-launch' | 'brand-building' | 'operational-excellence' | 'custom';
  startDate: string;
  endDate: string;
  vision: string;
  rationale: string;
  assumptions: string[];
  progress: number;
  objectives: Objective[];
  focusAreas: FocusArea[];
  linkedCampaigns: Array<{
    id: string;
    name: string;
    status: 'active' | 'completed' | 'scheduled';
    deliverableCount: number;
    progress: number;
    targetObjectives: string[];
  }>;
  milestones: Milestone[];
  lastUpdated: string;
  createdBy: string;
  createdDate: string;
}

export const mockBusinessStrategies: BusinessStrategy[] = [
  {
    id: 'strategy-1',
    name: 'Growth Strategy 2026',
    description: 'Focus on market expansion and customer acquisition through digital channels and strategic partnerships.',
    icon: 'target',
    status: 'active',
    type: 'growth',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    vision: 'Become the market leader in sustainable brand solutions within 3 years, achieving 25% market share in our primary segments.',
    rationale: 'Market analysis indicates significant opportunity in the mid-market segment where competitors lack integrated brand strategy solutions. Our unique AI-powered approach positions us to capture this market.',
    assumptions: [
      'Market will continue growing at 15% annually',
      'Competitor response will be slow due to technical debt',
      'Customer willingness to pay premium for AI features',
      'Digital marketing effectiveness will remain stable',
    ],
    progress: 65,
    objectives: [
      {
        id: 'obj-1',
        title: 'Increase Market Share',
        description: 'Grow market share from 8% to 15% in primary market segment',
        focusArea: 'Market Share',
        priority: 'high',
        status: 'on-track',
        progress: 70,
        metricType: 'percentage',
        startValue: '8',
        targetValue: '15',
        currentValue: '12',
        keyResults: [
          {
            id: 'kr-1-1',
            description: 'Launch in 3 new regions',
            status: 'complete',
            progress: 100,
            current: '3/3',
          },
          {
            id: 'kr-1-2',
            description: 'Acquire 500 new enterprise customers',
            status: 'in-progress',
            progress: 56,
            current: '280/500',
          },
          {
            id: 'kr-1-3',
            description: 'Achieve 50 strategic partnerships',
            status: 'in-progress',
            progress: 24,
            current: '12/50',
          },
        ],
        linkedCampaigns: ['campaign-1', 'campaign-2'],
      },
      {
        id: 'obj-2',
        title: 'Revenue Growth',
        description: 'Achieve €5M ARR by end of 2026',
        focusArea: 'Revenue Growth',
        priority: 'high',
        status: 'on-track',
        progress: 65,
        metricType: 'currency',
        startValue: '1.8',
        targetValue: '5',
        currentValue: '3.2',
        keyResults: [
          {
            id: 'kr-2-1',
            description: 'Launch premium tier',
            status: 'complete',
            progress: 100,
          },
          {
            id: 'kr-2-2',
            description: 'Increase ARPU by 30%',
            status: 'in-progress',
            progress: 73,
            current: '+22%',
          },
          {
            id: 'kr-2-3',
            description: 'Reduce churn to <5%',
            status: 'in-progress',
            progress: 80,
            current: '6.2%',
          },
        ],
        linkedCampaigns: ['campaign-3', 'campaign-4'],
      },
      {
        id: 'obj-3',
        title: 'Brand Awareness',
        description: 'Increase unaided brand awareness from 12% to 35%',
        focusArea: 'Brand Awareness',
        priority: 'medium',
        status: 'at-risk',
        progress: 40,
        metricType: 'percentage',
        startValue: '12',
        targetValue: '35',
        currentValue: '21',
        keyResults: [
          {
            id: 'kr-3-1',
            description: 'Publish 50 thought leadership pieces',
            status: 'complete',
            progress: 100,
          },
          {
            id: 'kr-3-2',
            description: 'Achieve 100K social followers',
            status: 'in-progress',
            progress: 45,
            current: '45K/100K',
          },
          {
            id: 'kr-3-3',
            description: 'Secure 20 media mentions',
            status: 'in-progress',
            progress: 40,
            current: '8/20',
          },
        ],
        linkedCampaigns: ['campaign-5', 'campaign-6'],
      },
      {
        id: 'obj-4',
        title: 'Customer Acquisition',
        description: 'Scale digital acquisition channels',
        focusArea: 'Customer Acquisition',
        priority: 'high',
        status: 'on-track',
        progress: 55,
        metricType: 'number',
        startValue: '150',
        targetValue: '500',
        currentValue: '340',
        keyResults: [
          {
            id: 'kr-4-1',
            description: 'Launch 3 new marketing campaigns',
            status: 'complete',
            progress: 100,
          },
          {
            id: 'kr-4-2',
            description: 'Reduce CAC by 25%',
            status: 'in-progress',
            progress: 60,
            current: '-18%',
          },
        ],
        linkedCampaigns: ['campaign-1'],
      },
      {
        id: 'obj-5',
        title: 'Strategic Partnerships',
        description: 'Build alliances for market expansion',
        focusArea: 'Partnerships',
        priority: 'medium',
        status: 'on-track',
        progress: 45,
        metricType: 'number',
        startValue: '5',
        targetValue: '50',
        currentValue: '25',
        keyResults: [
          {
            id: 'kr-5-1',
            description: 'Sign 10 channel partners',
            status: 'in-progress',
            progress: 70,
            current: '7/10',
          },
          {
            id: 'kr-5-2',
            description: 'Launch co-marketing with 5 partners',
            status: 'in-progress',
            progress: 40,
            current: '2/5',
          },
        ],
        linkedCampaigns: [],
      },
    ],
    focusAreas: [
      {
        id: 'fa-1',
        name: 'Market Share',
        icon: 'trending-up',
        description: 'Primary focus on expanding market presence',
        objectiveCount: 2,
      },
      {
        id: 'fa-2',
        name: 'Revenue Growth',
        icon: 'dollar-sign',
        description: 'Grow ARR through upselling and new customer segments',
        objectiveCount: 1,
      },
      {
        id: 'fa-3',
        name: 'Customer Acquisition',
        icon: 'users',
        description: 'Scale acquisition through digital channels',
        objectiveCount: 2,
      },
      {
        id: 'fa-4',
        name: 'Brand Awareness',
        icon: 'zap',
        description: 'Increase market recognition and thought leadership',
        objectiveCount: 1,
      },
      {
        id: 'fa-5',
        name: 'Partnerships',
        icon: 'layers',
        description: 'Build strategic alliances for market expansion',
        objectiveCount: 1,
      },
    ],
    linkedCampaigns: [
      {
        id: 'campaign-1',
        name: 'Brand Awareness Q1',
        status: 'active',
        deliverableCount: 8,
        progress: 62,
        targetObjectives: ['obj-3'],
      },
      {
        id: 'campaign-2',
        name: 'Enterprise Customer Push',
        status: 'active',
        deliverableCount: 12,
        progress: 45,
        targetObjectives: ['obj-1', 'obj-2'],
      },
      {
        id: 'campaign-3',
        name: 'Premium Tier Launch',
        status: 'completed',
        deliverableCount: 6,
        progress: 100,
        targetObjectives: ['obj-2'],
      },
      {
        id: 'campaign-4',
        name: 'Content Marketing Program',
        status: 'active',
        deliverableCount: 24,
        progress: 38,
        targetObjectives: ['obj-3'],
      },
    ],
    milestones: [
      {
        id: 'ms-1',
        title: 'Strategy Launch',
        description: 'Official strategy kickoff and team alignment',
        date: '2026-01-15',
        quarter: 'Q1 2026',
        status: 'complete',
      },
      {
        id: 'ms-2',
        title: 'Mid-Year Review',
        description: 'Strategic review and course correction',
        date: '2026-07-01',
        quarter: 'Q2 2026',
        status: 'pending',
      },
      {
        id: 'ms-3',
        title: 'Product Launch',
        description: 'Major product release milestone',
        date: '2026-09-15',
        quarter: 'Q3 2026',
        status: 'upcoming',
      },
      {
        id: 'ms-4',
        title: 'Annual Review',
        description: 'End-of-year strategy assessment',
        date: '2026-12-15',
        quarter: 'Q4 2026',
        status: 'upcoming',
      },
    ],
    lastUpdated: '2026-01-25',
    createdBy: 'John Doe',
    createdDate: '2026-01-01',
  },
  {
    id: 'strategy-2',
    name: 'Product Launch Strategy',
    description: 'Strategic approach for launching new product line in European markets with focus on sustainability messaging.',
    icon: 'rocket',
    status: 'active',
    type: 'product-launch',
    startDate: '2026-03-01',
    endDate: '2026-09-30',
    vision: 'Successfully launch and establish our new sustainable product line as the preferred choice in European markets.',
    rationale: 'European market shows highest demand for sustainable solutions and has favorable regulatory environment.',
    assumptions: [
      'Regulatory approval will be obtained by Q2',
      'Supply chain can support European distribution',
      'Sustainability messaging resonates with target audience',
    ],
    progress: 30,
    objectives: [
      {
        id: 'obj-pl-1',
        title: 'Product Positioning',
        description: 'Establish clear product positioning in market',
        focusArea: 'Product Positioning',
        priority: 'high',
        status: 'on-track',
        progress: 50,
        metricType: 'percentage',
        startValue: '0',
        targetValue: '100',
        currentValue: '50',
        keyResults: [
          {
            id: 'kr-pl-1-1',
            description: 'Complete competitive analysis',
            status: 'complete',
            progress: 100,
          },
          {
            id: 'kr-pl-1-2',
            description: 'Define unique value proposition',
            status: 'in-progress',
            progress: 75,
          },
          {
            id: 'kr-pl-1-3',
            description: 'Create positioning framework',
            status: 'in-progress',
            progress: 40,
          },
        ],
        linkedCampaigns: ['campaign-7'],
      },
      {
        id: 'obj-pl-2',
        title: 'Market Entry',
        description: 'Successfully enter 5 European markets',
        focusArea: 'Market Entry',
        priority: 'high',
        status: 'on-track',
        progress: 40,
        metricType: 'number',
        startValue: '0',
        targetValue: '5',
        currentValue: '2',
        keyResults: [
          {
            id: 'kr-pl-2-1',
            description: 'Establish distribution partnerships',
            status: 'in-progress',
            progress: 40,
            current: '2/5',
          },
          {
            id: 'kr-pl-2-2',
            description: 'Complete regulatory compliance',
            status: 'in-progress',
            progress: 60,
            current: '3/5',
          },
        ],
        linkedCampaigns: ['campaign-8'],
      },
      {
        id: 'obj-pl-3',
        title: 'Sustainability Communication',
        description: 'Establish sustainability leadership',
        focusArea: 'Sustainability',
        priority: 'medium',
        status: 'at-risk',
        progress: 25,
        metricType: 'percentage',
        startValue: '0',
        targetValue: '100',
        currentValue: '25',
        keyResults: [
          {
            id: 'kr-pl-3-1',
            description: 'Obtain sustainability certifications',
            status: 'in-progress',
            progress: 50,
          },
          {
            id: 'kr-pl-3-2',
            description: 'Launch sustainability campaign',
            status: 'not-started',
            progress: 0,
          },
        ],
        linkedCampaigns: [],
      },
      {
        id: 'obj-pl-4',
        title: 'Launch Awareness',
        description: 'Generate awareness for product launch',
        focusArea: 'Launch Awareness',
        priority: 'high',
        status: 'not-started',
        progress: 10,
        metricType: 'number',
        startValue: '0',
        targetValue: '1000000',
        currentValue: '100000',
        keyResults: [
          {
            id: 'kr-pl-4-1',
            description: 'Reach 1M impressions',
            status: 'in-progress',
            progress: 10,
          },
          {
            id: 'kr-pl-4-2',
            description: 'Generate 10K leads',
            status: 'not-started',
            progress: 0,
          },
        ],
        linkedCampaigns: ['campaign-7'],
      },
    ],
    focusAreas: [
      {
        id: 'fa-pl-1',
        name: 'Product Positioning',
        icon: 'target',
        description: 'Establish clear market positioning',
        objectiveCount: 1,
      },
      {
        id: 'fa-pl-2',
        name: 'Market Entry',
        icon: 'flag',
        description: 'Successfully enter target markets',
        objectiveCount: 1,
      },
      {
        id: 'fa-pl-3',
        name: 'Sustainability',
        icon: 'zap',
        description: 'Lead with sustainability message',
        objectiveCount: 1,
      },
    ],
    linkedCampaigns: [
      {
        id: 'campaign-7',
        name: 'Product Launch Campaign',
        status: 'active',
        deliverableCount: 15,
        progress: 30,
        targetObjectives: ['obj-pl-1', 'obj-pl-4'],
      },
      {
        id: 'campaign-8',
        name: 'Market Entry Preparation',
        status: 'active',
        deliverableCount: 8,
        progress: 40,
        targetObjectives: ['obj-pl-2'],
      },
    ],
    milestones: [
      {
        id: 'ms-pl-1',
        title: 'Strategy Approval',
        description: 'Board approval for launch strategy',
        date: '2026-03-01',
        quarter: 'Q1 2026',
        status: 'complete',
      },
      {
        id: 'ms-pl-2',
        title: 'First Market Launch',
        description: 'Launch in first European market',
        date: '2026-06-15',
        quarter: 'Q2 2026',
        status: 'pending',
      },
      {
        id: 'ms-pl-3',
        title: 'Full Market Rollout',
        description: 'Complete rollout to all 5 markets',
        date: '2026-09-30',
        quarter: 'Q3 2026',
        status: 'upcoming',
      },
    ],
    lastUpdated: '2026-01-22',
    createdBy: 'Sarah Johnson',
    createdDate: '2026-02-15',
  },
  {
    id: 'strategy-3',
    name: 'Brand Building Initiative',
    description: 'Comprehensive brand building strategy to establish market leadership and thought leadership position.',
    icon: 'trending-up',
    status: 'active',
    type: 'brand-building',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    vision: 'Position our brand as the go-to thought leader in AI-powered brand strategy.',
    rationale: 'Strong brand recognition will reduce customer acquisition costs and enable premium pricing.',
    assumptions: [
      'Content marketing will drive brand awareness',
      'Thought leadership will attract quality leads',
      'Brand investment will show ROI within 12 months',
    ],
    progress: 42,
    objectives: [
      {
        id: 'obj-bb-1',
        title: 'Thought Leadership',
        description: 'Establish thought leadership position',
        focusArea: 'Thought Leadership',
        priority: 'high',
        status: 'on-track',
        progress: 60,
        metricType: 'number',
        startValue: '0',
        targetValue: '100',
        currentValue: '60',
        keyResults: [
          {
            id: 'kr-bb-1-1',
            description: 'Publish 100 articles',
            status: 'in-progress',
            progress: 60,
            current: '60/100',
          },
          {
            id: 'kr-bb-1-2',
            description: 'Speak at 10 conferences',
            status: 'in-progress',
            progress: 40,
            current: '4/10',
          },
        ],
        linkedCampaigns: ['campaign-4'],
      },
      {
        id: 'obj-bb-2',
        title: 'Brand Recognition',
        description: 'Increase brand recognition metrics',
        focusArea: 'Brand Recognition',
        priority: 'high',
        status: 'on-track',
        progress: 45,
        metricType: 'percentage',
        startValue: '8',
        targetValue: '35',
        currentValue: '20',
        keyResults: [
          {
            id: 'kr-bb-2-1',
            description: 'Achieve 35% brand awareness',
            status: 'in-progress',
            progress: 44,
          },
          {
            id: 'kr-bb-2-2',
            description: 'Maintain 80% brand favorability',
            status: 'in-progress',
            progress: 85,
          },
        ],
        linkedCampaigns: ['campaign-1'],
      },
    ],
    focusAreas: [
      {
        id: 'fa-bb-1',
        name: 'Thought Leadership',
        icon: 'zap',
        description: 'Establish expertise and authority',
        objectiveCount: 1,
      },
      {
        id: 'fa-bb-2',
        name: 'Brand Recognition',
        icon: 'trending-up',
        description: 'Build brand awareness and recall',
        objectiveCount: 1,
      },
    ],
    linkedCampaigns: [
      {
        id: 'campaign-1',
        name: 'Brand Awareness Q1',
        status: 'active',
        deliverableCount: 8,
        progress: 62,
        targetObjectives: ['obj-bb-2'],
      },
      {
        id: 'campaign-4',
        name: 'Content Marketing Program',
        status: 'active',
        deliverableCount: 24,
        progress: 38,
        targetObjectives: ['obj-bb-1'],
      },
    ],
    milestones: [
      {
        id: 'ms-bb-1',
        title: 'Brand Launch',
        description: 'Official brand relaunch',
        date: '2026-02-01',
        quarter: 'Q1 2026',
        status: 'complete',
      },
      {
        id: 'ms-bb-2',
        title: 'Mid-Year Assessment',
        description: 'Brand health assessment',
        date: '2026-07-01',
        quarter: 'Q2 2026',
        status: 'pending',
      },
    ],
    lastUpdated: '2026-01-20',
    createdBy: 'Michael Chen',
    createdDate: '2026-01-01',
  },
];
