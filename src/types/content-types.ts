import { LucideIcon } from 'lucide-react';

// Master lijst van alle content types in de applicatie
export type ContentTypeCategory = 'written' | 'social' | 'visual' | 'video' | 'email';

export type ContentTypeSupport = 'text' | 'image' | 'video' | 'carousel';

export interface ContentType {
  id: string;
  name: string;
  icon: string; // Lucide icon name
  category: ContentTypeCategory;
  description: string;
  supports: ContentTypeSupport[];
}

export const CONTENT_TYPES: ContentType[] = [
  // WRITTEN CONTENT
  {
    id: 'blog-post',
    name: 'Blog Post',
    icon: 'FileText',
    category: 'written',
    description: 'Long-form articles for your website',
    supports: ['text', 'image'],
  },
  {
    id: 'case-study',
    name: 'Case Study',
    icon: 'BookOpen',
    category: 'written',
    description: 'Customer success stories',
    supports: ['text', 'image'],
  },
  {
    id: 'whitepaper',
    name: 'Whitepaper',
    icon: 'FileText',
    category: 'written',
    description: 'In-depth research documents',
    supports: ['text', 'image'],
  },
  {
    id: 'press-release',
    name: 'Press Release',
    icon: 'Megaphone',
    category: 'written',
    description: 'Official announcements',
    supports: ['text'],
  },
  {
    id: 'article',
    name: 'Article',
    icon: 'FileText',
    category: 'written',
    description: 'General written content',
    supports: ['text', 'image'],
  },

  // SOCIAL MEDIA
  {
    id: 'linkedin-post',
    name: 'LinkedIn Post',
    icon: 'Linkedin',
    category: 'social',
    description: 'Professional network updates',
    supports: ['text', 'image'],
  },
  {
    id: 'twitter-post',
    name: 'Twitter/X Post',
    icon: 'Twitter',
    category: 'social',
    description: 'Short-form updates',
    supports: ['text', 'image'],
  },
  {
    id: 'instagram-post',
    name: 'Instagram Post',
    icon: 'Instagram',
    category: 'social',
    description: 'Visual-first content',
    supports: ['image', 'text'],
  },
  {
    id: 'social-carousel',
    name: 'Social Carousel',
    icon: 'Layers',
    category: 'social',
    description: 'Multi-slide posts',
    supports: ['carousel'],
  },
  {
    id: 'facebook-post',
    name: 'Facebook Post',
    icon: 'Facebook',
    category: 'social',
    description: 'Social network updates',
    supports: ['text', 'image'],
  },

  // VISUAL ASSETS
  {
    id: 'social-graphic',
    name: 'Social Graphic',
    icon: 'Image',
    category: 'visual',
    description: 'Platform-optimized images',
    supports: ['image'],
  },
  {
    id: 'infographic',
    name: 'Infographic',
    icon: 'BarChart3',
    category: 'visual',
    description: 'Data visualization graphics',
    supports: ['image'],
  },
  {
    id: 'banner-ad',
    name: 'Banner Ad',
    icon: 'Image',
    category: 'visual',
    description: 'Digital advertising creatives',
    supports: ['image'],
  },
  {
    id: 'presentation',
    name: 'Presentation',
    icon: 'Presentation',
    category: 'visual',
    description: 'Slide decks',
    supports: ['carousel'],
  },
  {
    id: 'thumbnail',
    name: 'Thumbnail',
    icon: 'Image',
    category: 'visual',
    description: 'Video/content thumbnails',
    supports: ['image'],
  },

  // VIDEO
  {
    id: 'short-video',
    name: 'Short Video',
    icon: 'Video',
    category: 'video',
    description: 'Reels, TikTok, Shorts (< 60s)',
    supports: ['video'],
  },
  {
    id: 'promo-video',
    name: 'Promo Video',
    icon: 'Video',
    category: 'video',
    description: 'Promotional content (1-3 min)',
    supports: ['video'],
  },
  {
    id: 'explainer-video',
    name: 'Explainer Video',
    icon: 'Video',
    category: 'video',
    description: 'Educational content',
    supports: ['video'],
  },
  {
    id: 'video-ad',
    name: 'Video Ad',
    icon: 'Video',
    category: 'video',
    description: 'Advertising spots',
    supports: ['video'],
  },

  // EMAIL
  {
    id: 'newsletter',
    name: 'Newsletter',
    icon: 'Mail',
    category: 'email',
    description: 'Regular subscriber updates',
    supports: ['text', 'image'],
  },
  {
    id: 'email-campaign',
    name: 'Email Campaign',
    icon: 'Mail',
    category: 'email',
    description: 'Marketing email sequence',
    supports: ['text', 'image'],
  },
  {
    id: 'promotional-email',
    name: 'Promotional Email',
    icon: 'Mail',
    category: 'email',
    description: 'Sales and offers',
    supports: ['text', 'image'],
  },
  {
    id: 'welcome-email',
    name: 'Welcome Email',
    icon: 'Mail',
    category: 'email',
    description: 'New subscriber onboarding',
    supports: ['text', 'image'],
  },
];

export const CONTENT_TYPE_CATEGORIES = [
  { id: 'written', label: 'Written', icon: 'FileText' },
  { id: 'social', label: 'Social', icon: 'Share2' },
  { id: 'visual', label: 'Visual', icon: 'Image' },
  { id: 'video', label: 'Video', icon: 'Video' },
  { id: 'email', label: 'Email', icon: 'Mail' },
] as const;

// Helper functions
export const getContentTypesByCategory = (category: ContentTypeCategory): ContentType[] => {
  return CONTENT_TYPES.filter(type => type.category === category);
};

export const getContentTypeById = (id: string): ContentType | undefined => {
  return CONTENT_TYPES.find(type => type.id === id);
};

export const getContentTypeName = (id: string): string => {
  return getContentTypeById(id)?.name || id;
};

export const getContentTypeIcon = (id: string): string => {
  return getContentTypeById(id)?.icon || 'FileText';
};
