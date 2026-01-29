import React, { useState } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  BrandAssetsEmptyState,
  PersonasEmptyState,
  CampaignsEmptyState,
  ContentLibraryEmptyState,
  ResearchHubEmptyState,
  SearchResultsEmptyState,
  NotificationsEmptyState,
  TeamMembersEmptyState,
  ActivityFeedEmptyState,
  CommentsEmptyState,
  ProductsEmptyState,
  KnowledgeLibraryEmptyState,
  TrendLibraryEmptyState,
  StrategyToolsEmptyState,
  ReportsEmptyState,
  TemplatesEmptyState,
  SavedItemsEmptyState,
  InsightsEmptyState,
  EventsEmptyState,
  BrandColorsEmptyState,
} from './SpecificEmptyStates';
import { EmptyStateInline } from './EmptyState';
import { FileText, Users, Megaphone } from 'lucide-react';
import { cn } from '../../lib/utils';

interface EmptyStateDemo {
  id: string;
  name: string;
  category: 'primary' | 'secondary' | 'inline';
  component: React.ReactNode;
  description: string;
}

export function EmptyStatesLibrary() {
  const [selectedTab, setSelectedTab] = useState('primary');

  const handleAction = (action: string) => {
    console.log('Action triggered:', action);
  };

  const emptyStates: EmptyStateDemo[] = [
    // Primary Empty States (Full Page)
    {
      id: 'brand-assets',
      name: 'Brand Assets',
      category: 'primary',
      description: 'Shown when user has no brand assets created',
      component: (
        <BrandAssetsEmptyState
          onCreateAsset={() => handleAction('create-asset')}
          onLearnMore={() => handleAction('learn-more')}
        />
      ),
    },
    {
      id: 'personas',
      name: 'Personas',
      category: 'primary',
      description: 'Shown when user has no personas created',
      component: (
        <PersonasEmptyState
          onCreatePersona={() => handleAction('create-persona')}
          onImportFromResearch={() => handleAction('import-research')}
        />
      ),
    },
    {
      id: 'campaigns',
      name: 'Active Campaigns',
      category: 'primary',
      description: 'Shown when user has no active campaigns',
      component: (
        <CampaignsEmptyState
          onStartCampaign={() => handleAction('start-campaign')}
          onViewTemplates={() => handleAction('view-templates')}
        />
      ),
    },
    {
      id: 'content-library',
      name: 'Content Library',
      category: 'primary',
      description: 'Shown when content library is empty',
      component: (
        <ContentLibraryEmptyState
          onCreateContent={() => handleAction('create-content')}
          onViewTemplates={() => handleAction('view-templates')}
        />
      ),
    },
    {
      id: 'research-hub',
      name: 'Research Hub',
      category: 'primary',
      description: 'Shown when user has no research plans',
      component: (
        <ResearchHubEmptyState
          onStartResearch={() => handleAction('start-research')}
          onBrowseBundles={() => handleAction('browse-bundles')}
        />
      ),
    },
    {
      id: 'products',
      name: 'Products & Services',
      category: 'primary',
      description: 'Shown when user has no products added',
      component: (
        <ProductsEmptyState
          onAddProduct={() => handleAction('add-product')}
        />
      ),
    },
    {
      id: 'knowledge-library',
      name: 'Knowledge Library',
      category: 'primary',
      description: 'Shown when knowledge library is empty',
      component: (
        <KnowledgeLibraryEmptyState
          onAddResource={() => handleAction('add-resource')}
          onBrowseTemplates={() => handleAction('browse-templates')}
        />
      ),
    },
    {
      id: 'trend-library',
      name: 'Trend Library',
      category: 'primary',
      description: 'Shown when no trends are tracked',
      component: (
        <TrendLibraryEmptyState
          onDiscoverTrends={() => handleAction('discover-trends')}
        />
      ),
    },
    {
      id: 'strategy-tools',
      name: 'Strategy Tools',
      category: 'primary',
      description: 'Shown when no strategies created',
      component: (
        <StrategyToolsEmptyState
          onCreateStrategy={() => handleAction('create-strategy')}
        />
      ),
    },
    {
      id: 'templates',
      name: 'Templates',
      category: 'primary',
      description: 'Shown when user has no custom templates',
      component: (
        <TemplatesEmptyState
          onCreateTemplate={() => handleAction('create-template')}
          onBrowseLibrary={() => handleAction('browse-library')}
        />
      ),
    },

    // Secondary Empty States (Contextual)
    {
      id: 'search-results',
      name: 'Search Results',
      category: 'secondary',
      description: 'Shown when search returns no results',
      component: (
        <SearchResultsEmptyState
          query="example search"
          onNavigateToBrand={() => handleAction('navigate-brand')}
          onNavigateToCampaigns={() => handleAction('navigate-campaigns')}
          onNavigateToResearch={() => handleAction('navigate-research')}
        />
      ),
    },
    {
      id: 'notifications',
      name: 'Notifications',
      category: 'secondary',
      description: 'Shown when all notifications are read',
      component: (
        <NotificationsEmptyState
          onViewSettings={() => handleAction('view-settings')}
        />
      ),
    },
    {
      id: 'team-members',
      name: 'Team Members',
      category: 'secondary',
      description: 'Shown for new workspace with no team',
      component: (
        <TeamMembersEmptyState
          onInviteMembers={() => handleAction('invite-members')}
        />
      ),
    },
    {
      id: 'activity-feed',
      name: 'Activity Feed',
      category: 'secondary',
      description: 'Shown when no recent activity',
      component: <ActivityFeedEmptyState />,
    },
    {
      id: 'comments',
      name: 'Comments',
      category: 'secondary',
      description: 'Shown when no comments on item',
      component: (
        <CommentsEmptyState
          onAddComment={() => handleAction('add-comment')}
        />
      ),
    },
    {
      id: 'reports',
      name: 'Reports',
      category: 'secondary',
      description: 'Shown when no reports generated',
      component: (
        <ReportsEmptyState
          onGenerateReport={() => handleAction('generate-report')}
        />
      ),
    },
    {
      id: 'saved-items',
      name: 'Saved Items',
      category: 'secondary',
      description: 'Shown when user has no saved items',
      component: <SavedItemsEmptyState />,
    },
    {
      id: 'insights',
      name: 'Insights',
      category: 'secondary',
      description: 'Shown when no insights available',
      component: (
        <InsightsEmptyState
          onRunAnalysis={() => handleAction('run-analysis')}
        />
      ),
    },
    {
      id: 'events',
      name: 'Events/Calendar',
      category: 'secondary',
      description: 'Shown when no events scheduled',
      component: (
        <EventsEmptyState
          onCreateEvent={() => handleAction('create-event')}
        />
      ),
    },
    {
      id: 'brand-colors',
      name: 'Brand Colors',
      category: 'secondary',
      description: 'Shown when no brand colors defined',
      component: (
        <BrandColorsEmptyState
          onAddColors={() => handleAction('add-colors')}
        />
      ),
    },
  ];

  const primaryStates = emptyStates.filter(s => s.category === 'primary');
  const secondaryStates = emptyStates.filter(s => s.category === 'secondary');

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-8 py-8 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold">Empty States</h1>
          <p className="text-sm text-muted-foreground">
            A comprehensive collection of empty state designs for Brandshift.ai
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4">
          <Badge className="rounded-full">
            {emptyStates.length} total states
          </Badge>
          <Badge variant="outline" className="rounded-full">
            {primaryStates.length} primary
          </Badge>
          <Badge variant="outline" className="rounded-full">
            {secondaryStates.length} secondary
          </Badge>
        </div>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList>
            <TabsTrigger value="primary">Primary States</TabsTrigger>
            <TabsTrigger value="secondary">Secondary States</TabsTrigger>
            <TabsTrigger value="inline">Inline Variants</TabsTrigger>
            <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
          </TabsList>

          {/* Primary Empty States */}
          <TabsContent value="primary" className="space-y-6 mt-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Primary Empty States</h2>
              <p className="text-sm text-muted-foreground">
                Full-page empty states shown when a section has no content
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {primaryStates.map((state) => (
                <div key={state.id} className="rounded-xl border overflow-hidden">
                  {/* Header */}
                  <div className="p-4 border-b bg-muted/30">
                    <h3 className="text-lg font-semibold">{state.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {state.description}
                    </p>
                  </div>

                  {/* Empty State */}
                  <div className="bg-card min-h-[300px] flex items-center">
                    {state.component}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Secondary Empty States */}
          <TabsContent value="secondary" className="space-y-6 mt-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Secondary Empty States</h2>
              <p className="text-sm text-muted-foreground">
                Contextual empty states for specific features or sections
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {secondaryStates.map((state) => (
                <div key={state.id} className="rounded-xl border overflow-hidden">
                  {/* Header */}
                  <div className="p-4 border-b bg-muted/30">
                    <h3 className="text-lg font-semibold">{state.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {state.description}
                    </p>
                  </div>

                  {/* Empty State */}
                  <div className="bg-card min-h-[300px] flex items-center">
                    {state.component}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Inline Variants */}
          <TabsContent value="inline" className="space-y-6 mt-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Inline Empty States</h2>
              <p className="text-sm text-muted-foreground">
                Smaller variants for use within cards or sections
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Example 1 */}
              <div className="rounded-xl border p-6">
                <EmptyStateInline
                  icon={FileText}
                  title="No drafts"
                  description="Create a new draft to get started"
                  action={{
                    label: 'New Draft',
                    onClick: () => handleAction('new-draft'),
                  }}
                />
              </div>

              {/* Example 2 */}
              <div className="rounded-xl border p-6">
                <EmptyStateInline
                  icon={Users}
                  title="No collaborators"
                  description="Invite team members to collaborate"
                  action={{
                    label: 'Invite',
                    onClick: () => handleAction('invite'),
                  }}
                />
              </div>

              {/* Example 3 */}
              <div className="rounded-xl border p-6">
                <EmptyStateInline
                  icon={Megaphone}
                  title="No campaigns"
                  action={{
                    label: 'Create Campaign',
                    onClick: () => handleAction('create-campaign'),
                  }}
                />
              </div>

              {/* Example 4 - No action */}
              <div className="rounded-xl border p-6">
                <EmptyStateInline
                  icon={FileText}
                  title="No files"
                  description="Upload files to see them here"
                />
              </div>

              {/* Example 5 - Compact */}
              <div className="rounded-xl border p-4">
                <EmptyStateInline
                  title="No tags"
                  action={{
                    label: 'Add Tag',
                    onClick: () => handleAction('add-tag'),
                  }}
                />
              </div>

              {/* Example 6 - In table */}
              <div className="rounded-xl border overflow-hidden">
                <div className="p-4 border-b bg-muted/30">
                  <h4 className="text-lg font-semibold">Recent Items</h4>
                </div>
                <EmptyStateInline
                  title="No recent items"
                  description="Items you view will appear here"
                />
              </div>
            </div>
          </TabsContent>

          {/* Guidelines */}
          <TabsContent value="guidelines" className="space-y-6 mt-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Design Guidelines</h2>
              <p className="text-sm text-muted-foreground">
                Best practices for implementing empty states
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Structure */}
              <div className="rounded-xl border p-6 space-y-4">
                <h3 className="text-lg font-semibold">Structure</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-primary">1</span>
                    </div>
                    <div>
                      <p className="font-medium">Icon/Illustration</p>
                      <p className="text-muted-foreground">h-24 w-24 for primary, h-12 w-12 for inline</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-primary">2</span>
                    </div>
                    <div>
                      <p className="font-medium">Title</p>
                      <p className="text-muted-foreground">text-xl font-semibold for primary</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-primary">3</span>
                    </div>
                    <div>
                      <p className="font-medium">Description</p>
                      <p className="text-muted-foreground">text-sm text-muted-foreground, max 2 lines</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-primary">4</span>
                    </div>
                    <div>
                      <p className="font-medium">Primary Action</p>
                      <p className="text-muted-foreground">Button with icon (usually Plus)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-primary">5</span>
                    </div>
                    <div>
                      <p className="font-medium">Secondary Action/Links</p>
                      <p className="text-muted-foreground">Optional text links</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Spacing */}
              <div className="rounded-xl border p-6 space-y-4">
                <h3 className="text-lg font-semibold">Spacing</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-muted-foreground">Container: <code className="bg-muted px-2 py-1 rounded">max-w-md</code> centered</p>
                  <p className="text-muted-foreground">Padding: <code className="bg-muted px-2 py-1 rounded">py-12 px-6</code></p>
                  <p className="text-muted-foreground">Element spacing: <code className="bg-muted px-2 py-1 rounded">space-y-6</code></p>
                  <p className="text-muted-foreground">Title/desc: <code className="bg-muted px-2 py-1 rounded">space-y-2</code></p>
                  <p className="text-muted-foreground">Actions: <code className="bg-muted px-2 py-1 rounded">gap-2</code></p>
                </div>
              </div>

              {/* Icons */}
              <div className="rounded-xl border p-6 space-y-4">
                <h3 className="text-lg font-semibold">Icons</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-muted-foreground">
                    Use semantic icons that relate to the content
                  </p>
                  <p className="text-muted-foreground">
                    Primary: <code className="bg-muted px-2 py-1 rounded">h-12 w-12</code> in container
                  </p>
                  <p className="text-muted-foreground">
                    Container: <code className="bg-muted px-2 py-1 rounded">h-24 w-24 rounded-xl bg-muted/50</code>
                  </p>
                  <p className="text-muted-foreground">
                    Color: <code className="bg-muted px-2 py-1 rounded">text-muted-foreground/30</code>
                  </p>
                </div>
              </div>

              {/* Copy Guidelines */}
              <div className="rounded-xl border p-6 space-y-4">
                <h3 className="text-lg font-semibold">Copy Guidelines</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <p className="font-medium mb-1">Title</p>
                    <p className="text-muted-foreground">
                      Clear and concise. State what's missing.
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      ✓ "No brand assets yet" / ✗ "Nothing here"
                    </p>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Description</p>
                    <p className="text-muted-foreground">
                      Explain value or next step. Max 2 lines.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Action</p>
                    <p className="text-muted-foreground">
                      Use action verbs: "Create", "Start", "Add"
                    </p>
                  </div>
                </div>
              </div>

              {/* Animations */}
              <div className="rounded-xl border p-6 space-y-4">
                <h3 className="text-lg font-semibold">Animations</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-muted-foreground">
                    Fade in + slide up on mount
                  </p>
                  <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
{`initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.3 }}`}
                  </pre>
                </div>
              </div>

              {/* Dark Mode */}
              <div className="rounded-xl border p-6 space-y-4">
                <h3 className="text-lg font-semibold">Dark Mode</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-muted-foreground">
                    All colors must have dark: variants
                  </p>
                  <p className="text-muted-foreground">
                    Icon container: <code className="bg-muted px-2 py-1 rounded text-xs">dark:bg-muted/30</code>
                  </p>
                  <p className="text-muted-foreground">
                    Icon: <code className="bg-muted px-2 py-1 rounded text-xs">dark:text-muted-foreground/20</code>
                  </p>
                </div>
              </div>
            </div>

            {/* Usage Example */}
            <div className="rounded-xl border overflow-hidden">
              <div className="p-6 border-b bg-muted/30">
                <h3 className="text-lg font-semibold">Usage Example</h3>
              </div>
              <div className="p-6 bg-card">
                <pre className="text-xs overflow-x-auto">
                  <code className="text-muted-foreground">{`import { BrandAssetsEmptyState } from './components/empty-states/SpecificEmptyStates';

// In your component
{brandAssets.length === 0 ? (
  <BrandAssetsEmptyState
    onCreateAsset={() => navigate('create-asset')}
    onLearnMore={() => openHelpModal()}
  />
) : (
  <BrandAssetsList assets={brandAssets} />
)}`}</code>
                </pre>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
