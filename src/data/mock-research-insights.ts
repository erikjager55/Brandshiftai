import type { ResearchInsight } from '../components/content-studio/InsertInsightPopover';

export const mockResearchInsights: ResearchInsight[] = [
  {
    id: 'insight-1',
    type: 'survey',
    text: '78% of tech enthusiasts value performance over price when making purchase decisions...',
    fullText: '78% of tech enthusiasts value performance over price when making purchasing decisions, with speed and reliability ranking as their top priorities.',
    source: 'Q4 2025 Customer Survey (n=1,247)',
    relevance: 95,
    used: false,
  },
  {
    id: 'insight-2',
    type: 'analysis',
    text: 'Brand perception study shows innovation is our strongest differentiator...',
    fullText: 'Brand perception study shows innovation is our strongest attribute among enterprise buyers, with 83% associating our brand with cutting-edge technology.',
    source: 'Brand Tracking Study 2025',
    relevance: 88,
    used: false,
  },
  {
    id: 'insight-3',
    type: 'interview',
    text: 'Customer interviews reveal that simplicity is highly valued in product setup...',
    fullText: '"The biggest challenge is keeping up with rapidly changing technology while maintaining brand consistency across all our channels."',
    source: 'Customer Interview - Sarah M., CMO',
    relevance: 82,
    used: false,
  },
  {
    id: 'insight-4',
    type: 'statistic',
    text: '92% increase in customer satisfaction after implementing AI-powered support',
    fullText: 'Companies that implemented AI-powered customer support saw an average 92% increase in customer satisfaction scores within the first quarter.',
    source: 'Industry Benchmark Report 2025',
    relevance: 78,
    used: false,
  },
  {
    id: 'insight-5',
    type: 'report',
    text: 'Digital transformation spending to reach $3.4 trillion by 2026',
    fullText: 'Global digital transformation spending is projected to reach $3.4 trillion by 2026, with AI and automation accounting for 42% of total investments.',
    source: 'Gartner Market Research 2025',
    relevance: 75,
    used: false,
  },
  {
    id: 'insight-6',
    type: 'interview',
    text: '"Speed to market is more important than ever"',
    fullText: '"In today\'s market, speed to market is more important than ever. We need tools that help us move faster without sacrificing quality."',
    source: 'Customer Interview - David K., Product Manager',
    relevance: 71,
    used: false,
  },
  {
    id: 'insight-7',
    type: 'survey',
    text: '67% of marketers struggle with maintaining brand consistency',
    fullText: '67% of marketers report struggling with maintaining brand consistency across multiple channels and touchpoints, citing lack of centralized tools as the primary challenge.',
    source: 'Marketing Challenges Survey 2025 (n=892)',
    relevance: 85,
    used: false,
  },
  {
    id: 'insight-8',
    type: 'analysis',
    text: 'AI-generated content saves an average of 12 hours per week',
    fullText: 'Content teams using AI-powered tools report saving an average of 12 hours per week on content creation, allowing more time for strategic planning and optimization.',
    source: 'Content Team Productivity Analysis',
    relevance: 90,
    used: false,
  },
  {
    id: 'insight-9',
    type: 'statistic',
    text: '3.2x higher engagement rates with personalized content',
    fullText: 'Personalized content experiences drive 3.2x higher engagement rates compared to generic messaging, with the greatest impact seen in email and social media channels.',
    source: 'Personalization Impact Study 2025',
    relevance: 79,
    used: false,
  },
  {
    id: 'insight-10',
    type: 'report',
    text: 'Early adopters of AI see 2.5x ROI within first year',
    fullText: 'Organizations that adopted AI tools early in their digital transformation journey reported an average 2.5x return on investment within the first year, primarily through efficiency gains and improved decision-making.',
    source: 'AI Adoption ROI Report 2025',
    relevance: 83,
    used: false,
  },
  {
    id: 'insight-11',
    type: 'interview',
    text: '"Our customers expect real-time responses"',
    fullText: '"Our customers expect real-time responses and personalized experiences. Traditional approaches just can\'t keep up with these demands anymore."',
    source: 'Customer Interview - Emily R., Customer Success Director',
    relevance: 68,
    used: false,
  },
  {
    id: 'insight-12',
    type: 'survey',
    text: '89% prefer brands that demonstrate thought leadership',
    fullText: '89% of B2B decision-makers prefer working with brands that demonstrate thought leadership and industry expertise through their content and communications.',
    source: 'B2B Buyer Preferences Survey 2025 (n=1,534)',
    relevance: 92,
    used: false,
  },
];

export function markInsightAsUsed(insightId: string, insights: ResearchInsight[]): ResearchInsight[] {
  return insights.map(insight =>
    insight.id === insightId ? { ...insight, used: true } : insight
  );
}

export function getUsedInsightsCount(insights: ResearchInsight[]): number {
  return insights.filter(insight => insight.used).length;
}

export function getInsightsByType(insights: ResearchInsight[], type: string): ResearchInsight[] {
  if (type === 'all') return insights;
  return insights.filter(insight => insight.type === type);
}
