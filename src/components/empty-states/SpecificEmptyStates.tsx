import React from 'react';
import { EmptyState } from './EmptyState';
import {
  Plus,
  Users,
  Megaphone,
  FileText,
  Microscope,
  Search,
  Bell,
  Activity,
  MessageSquare,
  Hexagon,
  X,
  CheckCircle2,
  Package,
  FolderOpen,
  Target,
  TrendingUp,
  BookOpen,
  Lightbulb,
  Sparkles,
  Calendar,
  BarChart3,
  Layers,
  Palette,
} from 'lucide-react';

// 1. Brand Assets Empty State
export function BrandAssetsEmptyState({ onCreateAsset, onLearnMore }: {
  onCreateAsset: () => void;
  onLearnMore?: () => void;
}) {
  return (
    <EmptyState
      icon={Hexagon}
      title="No brand assets yet"
      description="Start building your strategic foundation with your first brand asset"
      primaryAction={{
        label: 'Create First Asset',
        onClick: onCreateAsset,
        icon: Plus,
      }}
      secondaryAction={onLearnMore ? {
        label: 'Learn about brand assets',
        onClick: onLearnMore,
      } : undefined}
    />
  );
}

// 2. Personas Empty State
export function PersonasEmptyState({ onCreatePersona, onImportFromResearch }: {
  onCreatePersona: () => void;
  onImportFromResearch?: () => void;
}) {
  return (
    <EmptyState
      icon={Users}
      title="No personas created"
      description="Define your target audience to power your content strategy"
      primaryAction={{
        label: 'Create First Persona',
        onClick: onCreatePersona,
        icon: Plus,
      }}
      secondaryAction={onImportFromResearch ? {
        label: 'Import from research',
        onClick: onImportFromResearch,
      } : undefined}
    />
  );
}

// 3. Campaigns Empty State
export function CampaignsEmptyState({ onStartCampaign, onViewTemplates }: {
  onStartCampaign: () => void;
  onViewTemplates?: () => void;
}) {
  return (
    <EmptyState
      icon={Megaphone}
      title="No active campaigns"
      description="Create your first research-backed campaign"
      primaryAction={{
        label: 'Start New Campaign',
        onClick: onStartCampaign,
        icon: Plus,
      }}
      secondaryAction={onViewTemplates ? {
        label: 'View campaign templates',
        onClick: onViewTemplates,
      } : undefined}
    />
  );
}

// 4. Content Library Empty State
export function ContentLibraryEmptyState({ onCreateContent, onViewTemplates }: {
  onCreateContent: () => void;
  onViewTemplates?: () => void;
}) {
  return (
    <EmptyState
      icon={FileText}
      title="Your content library is empty"
      description="Generate your first piece of AI-powered content"
      primaryAction={{
        label: 'Create Content',
        onClick: onCreateContent,
        icon: Sparkles,
      }}
      secondaryAction={onViewTemplates ? {
        label: 'Browse templates',
        onClick: onViewTemplates,
      } : undefined}
    />
  );
}

// 5. Research Hub Empty State
export function ResearchHubEmptyState({ onStartResearch, onBrowseBundles }: {
  onStartResearch: () => void;
  onBrowseBundles?: () => void;
}) {
  return (
    <EmptyState
      icon={Microscope}
      title="No research plans yet"
      description="Validate your brand decisions with structured research"
      primaryAction={{
        label: 'Start Research',
        onClick: onStartResearch,
        icon: Plus,
      }}
      secondaryAction={onBrowseBundles ? {
        label: 'Browse research bundles',
        onClick: onBrowseBundles,
      } : undefined}
    />
  );
}

// 6. Search Results Empty State
export function SearchResultsEmptyState({ 
  query, 
  onNavigateToBrand, 
  onNavigateToCampaigns, 
  onNavigateToResearch 
}: {
  query?: string;
  onNavigateToBrand?: () => void;
  onNavigateToCampaigns?: () => void;
  onNavigateToResearch?: () => void;
}) {
  return (
    <EmptyState
      iconElement={
        <div className="h-24 w-24 rounded-xl bg-muted/50 dark:bg-muted/30 flex items-center justify-center relative">
          <Search className="h-12 w-12 text-muted-foreground/30 dark:text-muted-foreground/20" />
          <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-background flex items-center justify-center">
            <X className="h-5 w-5 text-muted-foreground/50" />
          </div>
        </div>
      }
      title={query ? `No results found for "${query}"` : "No results found"}
      description="Try different keywords or browse categories"
      links={[
        ...(onNavigateToBrand ? [{ label: 'Brand Assets', onClick: onNavigateToBrand }] : []),
        ...(onNavigateToCampaigns ? [{ label: 'Campaigns', onClick: onNavigateToCampaigns }] : []),
        ...(onNavigateToResearch ? [{ label: 'Research', onClick: onNavigateToResearch }] : []),
      ]}
    />
  );
}

// 7. Notifications Empty State
export function NotificationsEmptyState({ onViewSettings }: {
  onViewSettings?: () => void;
}) {
  return (
    <EmptyState
      iconElement={
        <div className="h-24 w-24 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center relative">
          <Bell className="h-12 w-12 text-green-600 dark:text-green-400" />
          <div className="absolute -top-1 -right-1 h-8 w-8 rounded-full bg-green-600 dark:bg-green-400 flex items-center justify-center">
            <CheckCircle2 className="h-5 w-5 text-white dark:text-green-950" />
          </div>
        </div>
      }
      title="All caught up!"
      description="You have no new notifications"
      secondaryAction={onViewSettings ? {
        label: 'Notification settings',
        onClick: onViewSettings,
      } : undefined}
    />
  );
}

// 8. Team Members Empty State
export function TeamMembersEmptyState({ onInviteMembers }: {
  onInviteMembers: () => void;
}) {
  return (
    <EmptyState
      icon={Users}
      title="You're the only one here"
      description="Invite team members to collaborate on brand strategy"
      primaryAction={{
        label: 'Invite Members',
        onClick: onInviteMembers,
        icon: Plus,
      }}
    />
  );
}

// 9. Activity Feed Empty State
export function ActivityFeedEmptyState() {
  return (
    <EmptyState
      icon={Activity}
      title="No recent activity"
      description="Activity from you and your team will appear here"
    />
  );
}

// 10. Comments Empty State
export function CommentsEmptyState({ onAddComment }: {
  onAddComment?: () => void;
}) {
  return (
    <EmptyState
      icon={MessageSquare}
      title="No comments yet"
      description="Be the first to leave a comment"
      primaryAction={onAddComment ? {
        label: 'Add Comment',
        onClick: onAddComment,
        icon: Plus,
      } : undefined}
    />
  );
}

// 11. Products & Services Empty State
export function ProductsEmptyState({ onAddProduct }: {
  onAddProduct: () => void;
}) {
  return (
    <EmptyState
      icon={Package}
      title="No products or services yet"
      description="Add your first product or service to start analyzing performance"
      primaryAction={{
        label: 'Add Product',
        onClick: onAddProduct,
        icon: Plus,
      }}
    />
  );
}

// 12. Knowledge Library Empty State
export function KnowledgeLibraryEmptyState({ onAddResource, onBrowseTemplates }: {
  onAddResource: () => void;
  onBrowseTemplates?: () => void;
}) {
  return (
    <EmptyState
      icon={BookOpen}
      title="No resources yet"
      description="Build your knowledge base with guides, templates, and insights"
      primaryAction={{
        label: 'Add Resource',
        onClick: onAddResource,
        icon: Plus,
      }}
      secondaryAction={onBrowseTemplates ? {
        label: 'Browse templates',
        onClick: onBrowseTemplates,
      } : undefined}
    />
  );
}

// 13. Trend Library Empty State
export function TrendLibraryEmptyState({ onDiscoverTrends }: {
  onDiscoverTrends: () => void;
}) {
  return (
    <EmptyState
      icon={TrendingUp}
      title="No trends tracked yet"
      description="Start monitoring industry trends and market insights"
      primaryAction={{
        label: 'Discover Trends',
        onClick: onDiscoverTrends,
        icon: Sparkles,
      }}
    />
  );
}

// 14. Strategy Tools Empty State
export function StrategyToolsEmptyState({ onCreateStrategy }: {
  onCreateStrategy: () => void;
}) {
  return (
    <EmptyState
      icon={Target}
      title="No strategies created"
      description="Use strategic tools to plan and execute your brand vision"
      primaryAction={{
        label: 'Create Strategy',
        onClick: onCreateStrategy,
        icon: Plus,
      }}
    />
  );
}

// 15. Reports Empty State
export function ReportsEmptyState({ onGenerateReport }: {
  onGenerateReport: () => void;
}) {
  return (
    <EmptyState
      icon={BarChart3}
      title="No reports generated"
      description="Create your first report to track brand performance"
      primaryAction={{
        label: 'Generate Report',
        onClick: onGenerateReport,
        icon: Plus,
      }}
    />
  );
}

// 16. Templates Empty State
export function TemplatesEmptyState({ onCreateTemplate, onBrowseLibrary }: {
  onCreateTemplate: () => void;
  onBrowseLibrary?: () => void;
}) {
  return (
    <EmptyState
      icon={Layers}
      title="No custom templates"
      description="Create reusable templates for faster content creation"
      primaryAction={{
        label: 'Create Template',
        onClick: onCreateTemplate,
        icon: Plus,
      }}
      secondaryAction={onBrowseLibrary ? {
        label: 'Browse template library',
        onClick: onBrowseLibrary,
      } : undefined}
    />
  );
}

// 17. Saved Items Empty State
export function SavedItemsEmptyState() {
  return (
    <EmptyState
      icon={FolderOpen}
      title="No saved items"
      description="Items you save will appear here for quick access"
    />
  );
}

// 18. Insights Empty State
export function InsightsEmptyState({ onRunAnalysis }: {
  onRunAnalysis?: () => void;
}) {
  return (
    <EmptyState
      icon={Lightbulb}
      title="No insights yet"
      description="Complete research to unlock AI-powered insights"
      primaryAction={onRunAnalysis ? {
        label: 'Run Analysis',
        onClick: onRunAnalysis,
        icon: Sparkles,
      } : undefined}
    />
  );
}

// 19. Calendar/Events Empty State
export function EventsEmptyState({ onCreateEvent }: {
  onCreateEvent: () => void;
}) {
  return (
    <EmptyState
      icon={Calendar}
      title="No events scheduled"
      description="Add your first event to start planning"
      primaryAction={{
        label: 'Create Event',
        onClick: onCreateEvent,
        icon: Plus,
      }}
    />
  );
}

// 20. Brand Colors/Palette Empty State
export function BrandColorsEmptyState({ onAddColors }: {
  onAddColors: () => void;
}) {
  return (
    <EmptyState
      icon={Palette}
      title="No brand colors defined"
      description="Define your brand color palette to maintain consistency"
      primaryAction={{
        label: 'Add Colors',
        onClick: onAddColors,
        icon: Plus,
      }}
    />
  );
}
