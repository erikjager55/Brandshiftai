// Mock data for content quality improvement suggestions

export interface Suggestion {
  id: string;
  title: string;
  description: string;
  points: number;
  type: 'replace' | 'add' | 'restructure';
  current?: string;
  suggested?: string;
  insertAfter?: string;
  bulletPoints?: string[];
}

export interface QualityMetric {
  name: string;
  score: number;
  category: 'brand-alignment' | 'pacing' | 'visual-quality' | 'message-clarity';
  potentialGain: number;
  suggestions: Suggestion[];
}

export const mockQualityMetrics: QualityMetric[] = [
  {
    name: 'Message Clarity',
    score: 80,
    category: 'message-clarity',
    potentialGain: 15,
    suggestions: [
      {
        id: 'mc-1',
        title: 'Strengthen your call-to-action',
        description: 'Your closing paragraph lacks a clear call-to-action. Adding a specific next step will improve message clarity and drive engagement.',
        points: 6,
        type: 'replace',
        current: 'AI trends will continue to evolve in 2026.',
        suggested: 'Ready to leverage these AI trends for your brand? Start with our AI-powered brand strategy assessment today.',
      },
      {
        id: 'mc-2',
        title: 'Simplify complex sentence',
        description: 'Paragraph 3 contains a 47-word sentence that may confuse readers. Breaking it up improves readability.',
        points: 5,
        type: 'replace',
        current: 'The implementation of artificial intelligence in brand strategy, which encompasses everything from customer segmentation to content creation and predictive analytics, has become essential for companies looking to stay competitive.',
        suggested: 'AI in brand strategy now covers customer segmentation, content creation, and predictive analytics. Companies need these capabilities to stay competitive.',
      },
      {
        id: 'mc-3',
        title: 'Add transition between sections',
        description: 'The jump from "Current AI Capabilities" to "Future Predictions" feels abrupt. A transition sentence would improve flow.',
        points: 4,
        type: 'add',
        insertAfter: 'section 2',
        suggested: 'With these capabilities now mainstream, what does the future hold? Let\'s explore the emerging trends shaping 2026.',
      },
    ],
  },
  {
    name: 'Brand Alignment',
    score: 85,
    category: 'brand-alignment',
    potentialGain: 8,
    suggestions: [
      {
        id: 'ba-1',
        title: 'Incorporate brand voice keywords',
        description: 'Your brandstyle defines key voice attributes: "innovative", "empowering", "forward-thinking". The content uses these only twice. Increasing frequency strengthens brand alignment.',
        points: 5,
        type: 'restructure',
        bulletPoints: [
          'Paragraph 2: Add "innovative" before "solutions"',
          'Paragraph 4: Replace "new" with "forward-thinking"',
          'Conclusion: Add "empowering brands to..."',
        ],
      },
      {
        id: 'ba-2',
        title: 'Align tone with target persona',
        description: 'Your target persona "Tech Enthusiast" prefers data-driven content. Adding a statistic in the introduction would resonate better.',
        points: 3,
        type: 'add',
        insertAfter: 'opening',
        suggested: 'By 2026, 78% of enterprise brands will use AI in their content strategy — here\'s what that means for your brand.',
      },
    ],
  },
  {
    name: 'Pacing',
    score: 88,
    category: 'pacing',
    potentialGain: 5,
    suggestions: [
      {
        id: 'p-1',
        title: 'Balance section lengths',
        description: 'Section 2 is 340 words while section 4 is only 85 words. Balancing lengths improves reading rhythm.',
        points: 5,
        type: 'restructure',
        bulletPoints: [
          'Split Section 2 into two subsections',
          'Expand Section 4 with an example',
        ],
      },
    ],
  },
  {
    name: 'Visual Quality',
    score: 92,
    category: 'visual-quality',
    potentialGain: 0,
    suggestions: [],
  },
];

// Helper to calculate overall quality score
export function calculateQualityScore(metrics: QualityMetric[]): number {
  const totalScore = metrics.reduce((sum, metric) => sum + metric.score, 0);
  return Math.round(totalScore / metrics.length);
}

// Helper to apply a suggestion and recalculate scores
export function applySuggestion(
  metrics: QualityMetric[],
  suggestionId: string
): QualityMetric[] {
  return metrics.map(metric => {
    const suggestionIndex = metric.suggestions.findIndex(s => s.id === suggestionId);
    if (suggestionIndex === -1) return metric;

    const suggestion = metric.suggestions[suggestionIndex];
    const newScore = Math.min(100, metric.score + suggestion.points);
    
    return {
      ...metric,
      score: newScore,
      potentialGain: Math.max(0, metric.potentialGain - suggestion.points),
      suggestions: metric.suggestions.filter(s => s.id !== suggestionId),
    };
  });
}

// Helper to apply all suggestions
export function applyAllSuggestions(metrics: QualityMetric[]): QualityMetric[] {
  return metrics.map(metric => ({
    ...metric,
    score: Math.min(100, metric.score + metric.potentialGain),
    potentialGain: 0,
    suggestions: [],
  }));
}

// Helper to dismiss a suggestion
export function dismissSuggestion(
  metrics: QualityMetric[],
  suggestionId: string
): QualityMetric[] {
  return metrics.map(metric => ({
    ...metric,
    suggestions: metric.suggestions.filter(s => s.id !== suggestionId),
    potentialGain: metric.suggestions
      .filter(s => s.id !== suggestionId)
      .reduce((sum, s) => sum + s.points, 0),
  }));
}
