// Help & Support Data

export interface HelpArticle {
  id: string;
  title: string;
  description: string;
  category: string;
  categorySlug: string;
  readTime: string;
  updatedAt: string;
  content: string[];
  tableOfContents: string[];
  relatedArticles: string[];
  tags: string[];
}

export interface HelpCategory {
  id: string;
  slug: string;
  title: string;
  icon: string;
  color: string;
  bgColor: string;
  darkBgColor: string;
  articles: { title: string; id: string }[];
  articleCount: number;
}

export interface HelpVideo {
  id: string;
  title: string;
  category: string;
  duration: string;
  thumbnail: string;
  description: string;
}

export interface HelpFAQ {
  id: string;
  question: string;
  answer: string;
  relatedLinks: { title: string; id: string }[];
}

export interface FeatureRequest {
  id: string;
  title: string;
  votes: number;
  status: 'planned' | 'under-review' | 'in-progress' | 'shipped';
  hasVoted: boolean;
}

export interface SystemService {
  id: string;
  name: string;
  status: 'operational' | 'degraded' | 'outage';
}

export interface HelpResource {
  id: string;
  title: string;
  description: string;
  url: string;
  icon: string;
  external: boolean;
}

// Categories
export const helpCategories: HelpCategory[] = [
  {
    id: 'getting-started',
    slug: 'getting-started',
    title: 'Getting Started',
    icon: 'Rocket',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    darkBgColor: 'dark:bg-primary/20',
    articleCount: 8,
    articles: [
      { title: 'Platform overview', id: 'art-1' },
      { title: 'Setting up your workspace', id: 'art-2' },
      { title: 'Creating your first campaign', id: 'art-3' },
      { title: 'Importing brand assets', id: 'art-4' },
    ],
  },
  {
    id: 'features',
    slug: 'features',
    title: 'Features & Tools',
    icon: 'Sparkles',
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-100',
    darkBgColor: 'dark:bg-blue-900/30',
    articleCount: 15,
    articles: [
      { title: 'Content Studio', id: 'art-5' },
      { title: 'Campaign management', id: 'art-6' },
      { title: 'AI content generation', id: 'art-7' },
      { title: 'Research & validation', id: 'art-8' },
      { title: 'Brand Alignment', id: 'art-9' },
    ],
  },
  {
    id: 'knowledge',
    slug: 'knowledge',
    title: 'Knowledge Management',
    icon: 'BookOpen',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    darkBgColor: 'dark:bg-primary/20',
    articleCount: 12,
    articles: [
      { title: 'Brand Foundation setup', id: 'art-10' },
      { title: 'Managing personas', id: 'art-11' },
      { title: 'Products & services', id: 'art-12' },
      { title: 'Market insights', id: 'art-13' },
    ],
  },
  {
    id: 'account',
    slug: 'account',
    title: 'Account & Settings',
    icon: 'Users',
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-100',
    darkBgColor: 'dark:bg-purple-900/30',
    articleCount: 6,
    articles: [
      { title: 'Profile settings', id: 'art-14' },
      { title: 'Team & permissions', id: 'art-15' },
      { title: 'Workspace settings', id: 'art-16' },
      { title: 'Notifications', id: 'art-17' },
    ],
  },
  {
    id: 'billing',
    slug: 'billing',
    title: 'Billing & Plans',
    icon: 'FileText',
    color: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-100',
    darkBgColor: 'dark:bg-emerald-900/30',
    articleCount: 5,
    articles: [
      { title: 'Understanding plans', id: 'art-18' },
      { title: 'Upgrading your account', id: 'art-19' },
      { title: 'Payment methods', id: 'art-20' },
      { title: 'Invoices & receipts', id: 'art-21' },
    ],
  },
  {
    id: 'troubleshooting',
    slug: 'troubleshooting',
    title: 'Troubleshooting',
    icon: 'Settings',
    color: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-100',
    darkBgColor: 'dark:bg-amber-900/30',
    articleCount: 9,
    articles: [
      { title: 'Common issues', id: 'art-22' },
      { title: 'Error messages', id: 'art-23' },
      { title: 'Performance tips', id: 'art-24' },
      { title: 'Browser compatibility', id: 'art-25' },
    ],
  },
];

// Videos
export const helpVideos: HelpVideo[] = [
  {
    id: 'vid-1',
    title: 'Platform Overview',
    category: 'Getting Started',
    duration: '4:32',
    thumbnail: 'https://images.unsplash.com/photo-1632931612792-fbaacfd952f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXRvcmlhbCUyMHZpZGVvJTIwdGh1bWJuYWlsJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NzA0MDYzMzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'A complete overview of the Brandshift platform and its key features.',
  },
  {
    id: 'vid-2',
    title: 'Creating Your First Campaign',
    category: 'Campaigns',
    duration: '6:15',
    thumbnail: 'https://images.unsplash.com/photo-1770368787779-8472da646193?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGRhc2hib2FyZCUyMHdvcmtzcGFjZSUyMHNjcmVlbnxlbnwxfHx8fDE3NzA0MTQ3MzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Step-by-step guide to creating and launching your first campaign.',
  },
  {
    id: 'vid-3',
    title: 'AI Content Generation',
    category: 'Features',
    duration: '8:45',
    thumbnail: 'https://images.unsplash.com/photo-1676287571987-2f98ced3e6c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMGNvbnRlbnQlMjBnZW5lcmF0aW9uJTIwdGVjaG5vbG9neSUyMGFic3RyYWN0fGVufDF8fHx8MTc3MDQxNDczNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Learn how to leverage AI for generating brand-aligned content.',
  },
  {
    id: 'vid-4',
    title: 'Brand Foundation Setup',
    category: 'Knowledge',
    duration: '5:20',
    thumbnail: 'https://images.unsplash.com/photo-1762330464824-21e95b769038?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMHN0cmF0ZWd5JTIwbWFya2V0aW5nJTIwZGlnaXRhbHxlbnwxfHx8fDE3NzA0MTQ3MzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'How to set up your brand foundation for maximum impact.',
  },
  {
    id: 'vid-5',
    title: 'Research & Validation',
    category: 'Validation',
    duration: '7:10',
    thumbnail: 'https://images.unsplash.com/photo-1723987251277-18fc0a1effd0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNlYXJjaCUyMGRhdGElMjBhbmFseXRpY3MlMjBjaGFydHxlbnwxfHx8fDE3NzA0MTQ3MzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Understanding and using the research & validation tools.',
  },
  {
    id: 'vid-6',
    title: 'Brand Alignment Tool',
    category: 'Knowledge',
    duration: '3:45',
    thumbnail: 'https://images.unsplash.com/photo-1768729797971-472ce92e7a71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHN0dWRpbyUyMGRlc2lnbiUyMHRvb2xzfGVufDF8fHx8MTc3MDQxNDczNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'How the Brand Alignment tool keeps your messaging consistent.',
  },
];

// FAQs
export const helpFAQs: HelpFAQ[] = [
  {
    id: 'faq-1',
    question: 'How do I create my first campaign?',
    answer: 'To create a campaign, click "+ Create Content" in the sidebar, then select "New Campaign" from the dropdown. The Campaign Wizard will guide you through defining your campaign basics, selecting target audience, creating strategy, and adding deliverables. You can also start from a template in the Template Library.',
    relatedLinks: [
      { title: 'Campaign Wizard Guide', id: 'art-3' },
      { title: 'Template Library', id: 'art-5' },
    ],
  },
  {
    id: 'faq-2',
    question: 'What AI models does Brandshift use for content generation?',
    answer: 'Brandshift integrates with leading AI providers including OpenAI (GPT-4) and Anthropic (Claude) for text generation. For image generation, we use DALL-E and Midjourney integrations. You can select your preferred AI provider in the Content Studio settings. All generated content is automatically checked against your Brand Foundation for alignment.',
    relatedLinks: [
      { title: 'AI Content Generation Guide', id: 'art-7' },
      { title: 'Selecting AI Providers', id: 'art-5' },
    ],
  },
  {
    id: 'faq-3',
    question: 'How does Brand Alignment work?',
    answer: 'Brand Alignment analyzes your content against your Brand Foundation, including your mission, vision, values, tone of voice, and brand personality. It provides a percentage score and specific recommendations to improve consistency. You can run alignment checks on individual content pieces or across your entire campaign.',
    relatedLinks: [
      { title: 'Brand Alignment Guide', id: 'art-9' },
      { title: 'Brand Foundation Setup', id: 'art-10' },
    ],
  },
  {
    id: 'faq-4',
    question: 'Can I collaborate with my team on campaigns?',
    answer: 'Yes! Brandshift supports real-time collaboration. You can invite team members via email, assign roles (Admin, Editor, Viewer), leave comments on specific content sections, and track changes with version history. Team members receive notifications when they are mentioned or assigned tasks.',
    relatedLinks: [
      { title: 'Team & Permissions', id: 'art-15' },
      { title: 'Workspace Settings', id: 'art-16' },
    ],
  },
  {
    id: 'faq-5',
    question: 'How do I export my content?',
    answer: 'You can export content in multiple formats including PDF, DOCX, HTML, and plain text. Navigate to the Content Studio, open the content piece, and click the Export button in the toolbar. For campaign-wide exports, use the "Export Campaign" option in the campaign settings menu.',
    relatedLinks: [
      { title: 'Content Studio Guide', id: 'art-5' },
      { title: 'Campaign Management', id: 'art-6' },
    ],
  },
  {
    id: 'faq-6',
    question: "What's included in each pricing plan?",
    answer: 'Brandshift offers three plans: Starter (1 workspace, 3 campaigns/month, basic AI), Professional (5 workspaces, unlimited campaigns, advanced AI, team collaboration), and Enterprise (unlimited workspaces, custom AI models, priority support, SSO). Visit our Billing page for detailed feature comparisons.',
    relatedLinks: [
      { title: 'Understanding Plans', id: 'art-18' },
      { title: 'Upgrading Your Account', id: 'art-19' },
    ],
  },
  {
    id: 'faq-7',
    question: "How do I connect my brand's existing assets?",
    answer: 'You can import brand assets through the Brand Foundation section. Upload your brand guidelines, logos, color palettes, and typography specs. Brandshift also supports connecting to Figma, Google Drive, and Dropbox for seamless asset sync. All imported assets are automatically analyzed and cataloged.',
    relatedLinks: [
      { title: 'Importing Brand Assets', id: 'art-4' },
      { title: 'Brand Foundation Setup', id: 'art-10' },
    ],
  },
];

// Feature Requests
export const featureRequests: FeatureRequest[] = [
  { id: 'fr-1', title: 'Slack integration for notifications', votes: 127, status: 'planned', hasVoted: false },
  { id: 'fr-2', title: 'Export to Google Docs', votes: 89, status: 'under-review', hasVoted: true },
  { id: 'fr-3', title: 'Custom AI model training', votes: 64, status: 'planned', hasVoted: false },
  { id: 'fr-4', title: 'Multi-language content generation', votes: 52, status: 'in-progress', hasVoted: false },
  { id: 'fr-5', title: 'Advanced analytics dashboard', votes: 41, status: 'shipped', hasVoted: true },
];

// System Services
export const systemServices: SystemService[] = [
  { id: 'svc-1', name: 'Web Application', status: 'operational' },
  { id: 'svc-2', name: 'AI Services', status: 'operational' },
  { id: 'svc-3', name: 'API', status: 'operational' },
];

// Resources
export const helpResources: HelpResource[] = [
  { id: 'res-1', title: 'Documentation', description: 'docs.brandshift.ai', url: '#', icon: 'BookOpen', external: true },
  { id: 'res-2', title: 'API Reference', description: 'api.brandshift.ai', url: '#', icon: 'Zap', external: true },
  { id: 'res-3', title: 'Blog', description: 'blog.brandshift.ai', url: '#', icon: 'FileText', external: true },
  { id: 'res-4', title: 'Academy', description: 'Learn brand strategy', url: '#', icon: 'GraduationCap', external: false },
  { id: 'res-5', title: 'Community', description: 'Join the discussion', url: '#', icon: 'Users', external: false },
  { id: 'res-6', title: 'Webinars', description: 'Live training sessions', url: '#', icon: 'Video', external: false },
];

// Popular searches
export const popularSearches = [
  'Getting started',
  'Creating campaigns',
  'AI content generation',
  'Brand alignment',
  'Team collaboration',
];

// Articles (detailed)
export const helpArticles: HelpArticle[] = [
  {
    id: 'art-3',
    title: 'Creating Your First Campaign',
    description: 'Learn how to set up and launch your first marketing campaign in Brandshift',
    category: 'Getting Started',
    categorySlug: 'getting-started',
    readTime: '5 min read',
    updatedAt: '3 days ago',
    tags: ['campaign', 'getting started', 'wizard', 'create'],
    tableOfContents: [
      'Prerequisites',
      'Step 1: Open the Campaign Wizard',
      'Step 2: Define Campaign Basics',
      'Step 3: Select Target Audience',
      'Step 4: Create Strategy',
      'Step 5: Add Deliverables',
      'Next Steps',
    ],
    content: [
      '## Prerequisites\n\nBefore creating a campaign, make sure you have:\n- Completed your Brand Foundation\n- Created at least one persona\n- (Optional) Added products or services',
      '## Step 1: Open the Campaign Wizard\n\nClick the "+ Create Content" button in the sidebar, then select "New Campaign" from the dropdown. This opens the Campaign Wizard, which will guide you through the entire process step by step.',
      '## Step 2: Define Campaign Basics\n\nEnter your campaign name, objective, and timeline. Choose from predefined objectives like Brand Awareness, Lead Generation, Product Launch, or create a custom objective. Set your start and end dates, and optionally add a budget.',
      '## Step 3: Select Target Audience\n\nSelect the personas you want to target with this campaign. You can choose from your existing personas or create a new one. The AI will use persona insights to tailor your content strategy.',
      '## Step 4: Create Strategy\n\nBrandshift will generate a strategic framework based on your objectives and target audience. Review the suggested channels, messaging pillars, and content themes. You can customize any aspect of the strategy.',
      '## Step 5: Add Deliverables\n\nAdd the content pieces you need for your campaign. Choose from templates or start from scratch. Each deliverable can be assigned to team members, given deadlines, and linked to specific channels.',
      '## Next Steps\n\nOnce your campaign is set up:\n- Use the Content Studio to create and refine each deliverable\n- Run Brand Alignment checks on your content\n- Share drafts with stakeholders for review\n- Monitor campaign progress on the dashboard',
    ],
    relatedArticles: ['art-6', 'art-7', 'art-5'],
  },
  {
    id: 'art-7',
    title: 'AI Content Generation',
    description: 'Learn how to leverage AI for generating brand-aligned content at scale',
    category: 'Features & Tools',
    categorySlug: 'features',
    readTime: '7 min read',
    updatedAt: '1 week ago',
    tags: ['AI', 'content', 'generation', 'GPT', 'Claude'],
    tableOfContents: [
      'Overview',
      'Supported AI Models',
      'Generating Content',
      'Brand Alignment Check',
      'Advanced Settings',
      'Best Practices',
    ],
    content: [
      '## Overview\n\nBrandshift integrates advanced AI models to help you create brand-consistent content quickly and efficiently. The AI uses your Brand Foundation as context to ensure all generated content aligns with your brand voice, values, and messaging.',
      '## Supported AI Models\n\nCurrently supported models:\n- **OpenAI GPT-4**: Best for long-form content, strategic messaging\n- **Anthropic Claude**: Great for nuanced, thoughtful content\n- **DALL-E**: AI image generation\n- **Midjourney**: Advanced visual content creation',
      '## Generating Content\n\n1. Open the Content Studio from your campaign\n2. Click "Generate with AI" or use the Insert Research Insights feature\n3. Provide a brief prompt or select from suggested topics\n4. Review and edit the generated content\n5. Run a Brand Alignment check before publishing',
      '## Brand Alignment Check\n\nEvery piece of AI-generated content is automatically scored against your Brand Foundation. The alignment score considers tone of voice, messaging pillars, brand values, and target audience relevance.',
      '## Advanced Settings\n\nCustomize AI behavior:\n- Temperature: Controls creativity (0.1 = precise, 1.0 = creative)\n- Tone: Override with specific tone preferences\n- Length: Set word count targets\n- Format: Choose output format (blog, social, email, etc.)',
      '## Best Practices\n\n- Always review AI-generated content before publishing\n- Use your Brand Foundation data for better context\n- Start with specific prompts for better results\n- Iterate: Generate multiple versions and pick the best',
    ],
    relatedArticles: ['art-5', 'art-9', 'art-3'],
  },
];

// Subject options for contact form
export const contactSubjects = [
  'Technical Issue',
  'Account & Billing',
  'Feature Request',
  'Bug Report',
  'General Question',
  'Enterprise Inquiry',
];

// Chat messages for demo
export interface ChatMessage {
  id: string;
  sender: 'agent' | 'user';
  text: string;
  time: string;
  agentName?: string;
}

export const initialChatMessages: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'agent',
    text: "Hi there! How can we help you today?",
    time: '2:33 PM',
    agentName: 'Sarah',
  },
];

// Onboarding items
export interface OnboardingItem {
  id: string;
  title: string;
  completed: boolean;
  route?: string;
}

export const onboardingItems: OnboardingItem[] = [
  { id: 'ob-1', title: 'Create your account', completed: true },
  { id: 'ob-2', title: 'Set up Brand Foundation', completed: true, route: 'brand' },
  { id: 'ob-3', title: 'Add your first persona', completed: true, route: 'personas' },
  { id: 'ob-4', title: 'Analyze your brandstyle', completed: true, route: 'brandstyle' },
  { id: 'ob-5', title: 'Create your first campaign', completed: false, route: 'active-campaigns' },
  { id: 'ob-6', title: 'Generate AI content', completed: false, route: 'content-library' },
];

// Search helper - search across all content
export function searchHelpContent(query: string) {
  const q = query.toLowerCase().trim();
  if (!q) return { articles: [], videos: [], faqs: [] };

  const articles: { type: 'article'; id: string; title: string; description: string; category: string }[] = [];
  const videos: { type: 'video'; id: string; title: string; description: string; duration: string }[] = [];
  const faqs: { type: 'faq'; id: string; question: string; answer: string }[] = [];

  // Search articles from categories
  helpCategories.forEach(cat => {
    cat.articles.forEach(art => {
      if (art.title.toLowerCase().includes(q)) {
        articles.push({
          type: 'article',
          id: art.id,
          title: art.title,
          description: `Learn about ${art.title.toLowerCase()} in the ${cat.title} section.`,
          category: cat.title,
        });
      }
    });
  });

  // Search detailed articles
  helpArticles.forEach(art => {
    if (
      (art.title.toLowerCase().includes(q) || art.description.toLowerCase().includes(q) || art.tags.some(t => t.includes(q))) &&
      !articles.find(a => a.id === art.id)
    ) {
      articles.push({
        type: 'article',
        id: art.id,
        title: art.title,
        description: art.description,
        category: art.category,
      });
    }
  });

  // Search videos
  helpVideos.forEach(vid => {
    if (vid.title.toLowerCase().includes(q) || vid.description.toLowerCase().includes(q) || vid.category.toLowerCase().includes(q)) {
      videos.push({
        type: 'video',
        id: vid.id,
        title: vid.title,
        description: vid.description,
        duration: vid.duration,
      });
    }
  });

  // Search FAQs
  helpFAQs.forEach(faq => {
    if (faq.question.toLowerCase().includes(q) || faq.answer.toLowerCase().includes(q)) {
      faqs.push({
        type: 'faq',
        id: faq.id,
        question: faq.question,
        answer: faq.answer,
      });
    }
  });

  return { articles, videos, faqs };
}
