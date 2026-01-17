/**
 * Component Showcase
 * 
 * Interactieve demo van alle unified components
 * Gebruik deze pagina om componenten te bekijken en te testen
 */

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Package,
  Users,
  FileText,
  Search,
  Target,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Info,
  XCircle,
  Lock,
  TrendingUp,
  Plus,
  Trash2,
  Edit,
  Eye,
  MoreHorizontal,
} from 'lucide-react';

// Import unified components
import {
  SearchBar,
  FilterSelect,
  FilterDropdown,
  SearchFilterBar,
  QuickFilterTabs,
  StatusBadge,
  IconButton,
  DeleteButton,
  EditButton,
  ViewButton,
  AddButton,
  LockButton,
  CTAButton,
  ActionGroup,
  StatCard,
  ListItemCard,
  ActionCard,
  FeatureCard,
  EmptyStateCard,
  SectionCard,
} from './ui/unified';

export function ComponentShowcase() {
  // Demo state
  const [searchValue, setSearchValue] = useState('');
  const [filterValue, setFilterValue] = useState('all');
  const [multiFilter, setMultiFilter] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [isLocked, setIsLocked] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="h-full overflow-auto bg-background">
      <div className="max-w-6xl mx-auto px-8 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">🎨 Component Showcase</h1>
          <p className="text-muted-foreground">
            Interactieve demo van alle Brandshift.ai unified components
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="search">Search & Filter</TabsTrigger>
            <TabsTrigger value="buttons">Buttons & Actions</TabsTrigger>
            <TabsTrigger value="badges">Badges & Status</TabsTrigger>
            <TabsTrigger value="cards">Cards</TabsTrigger>
          </TabsList>

          {/* OVERVIEW TAB */}
          <TabsContent value="overview" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Design System Overview</CardTitle>
                <CardDescription>
                  Quick reference voor alle unified components
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl border bg-card text-center">
                  <div className="text-3xl font-bold text-primary">15+</div>
                  <div className="text-sm text-muted-foreground">Components</div>
                </div>
                <div className="p-4 rounded-xl border bg-card text-center">
                  <div className="text-3xl font-bold text-green-600">6</div>
                  <div className="text-sm text-muted-foreground">Status Variants</div>
                </div>
                <div className="p-4 rounded-xl border bg-card text-center">
                  <div className="text-3xl font-bold text-blue-600">3</div>
                  <div className="text-sm text-muted-foreground">Size Options</div>
                </div>
                <div className="p-4 rounded-xl border bg-card text-center">
                  <div className="text-3xl font-bold text-purple-600">100%</div>
                  <div className="text-sm text-muted-foreground">Dark Mode</div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Examples */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Search Components</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <SearchBar
                    value={searchValue}
                    onChange={setSearchValue}
                    placeholder="Try typing something..."
                  />
                  <FilterSelect
                    value={filterValue}
                    onChange={setFilterValue}
                    options={[
                      { value: 'active', label: 'Active' },
                      { value: 'pending', label: 'Pending' },
                      { value: 'completed', label: 'Completed' },
                    ]}
                    allLabel="All Status"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Action Buttons</CardTitle>
                </CardHeader>
                <CardContent>
                  <ActionGroup>
                    <EditButton onClick={() => alert('Edit clicked!')} />
                    <ViewButton isVisible={isVisible} onClick={() => setIsVisible(!isVisible)} />
                    <LockButton isLocked={isLocked} onClick={() => setIsLocked(!isLocked)} />
                    <DeleteButton onClick={() => alert('Delete clicked!')} />
                  </ActionGroup>
                  <div className="mt-4">
                    <CTAButton onClick={() => alert('CTA clicked!')}>
                      Get Started
                    </CTAButton>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* SEARCH & FILTER TAB */}
          <TabsContent value="search" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>SearchBar</CardTitle>
                <CardDescription>Standard search input with icon</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Small</p>
                    <SearchBar
                      value={searchValue}
                      onChange={setSearchValue}
                      placeholder="Search..."
                      size="sm"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Medium (default)</p>
                    <SearchBar
                      value={searchValue}
                      onChange={setSearchValue}
                      placeholder="Search..."
                      size="md"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Large</p>
                    <SearchBar
                      value={searchValue}
                      onChange={setSearchValue}
                      placeholder="Search..."
                      size="lg"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>FilterSelect</CardTitle>
                <CardDescription>Single-select dropdown filter</CardDescription>
              </CardHeader>
              <CardContent>
                <FilterSelect
                  value={filterValue}
                  onChange={setFilterValue}
                  options={[
                    { value: 'brand-assets', label: 'Brand Assets' },
                    { value: 'personas', label: 'Personas' },
                    { value: 'campaigns', label: 'Campaigns' },
                    { value: 'research', label: 'Research' },
                  ]}
                  allLabel="All Categories"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Selected: <code className="bg-muted px-1 rounded">{filterValue}</code>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>FilterDropdown</CardTitle>
                <CardDescription>Multi-select filter with checkboxes</CardDescription>
              </CardHeader>
              <CardContent>
                <FilterDropdown
                  label="Tags"
                  options={['Marketing', 'Sales', 'Product', 'Design', 'Engineering']}
                  selected={multiFilter}
                  onChange={setMultiFilter}
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Selected: <code className="bg-muted px-1 rounded">{multiFilter.join(', ') || 'none'}</code>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>QuickFilterTabs</CardTitle>
                <CardDescription>Tab-style status filters with counts</CardDescription>
              </CardHeader>
              <CardContent>
                <QuickFilterTabs
                  tabs={[
                    { id: 'all', label: 'All', count: 42 },
                    { id: 'active', label: 'Active', count: 28 },
                    { id: 'pending', label: 'Pending', count: 8 },
                    { id: 'completed', label: 'Completed', count: 6 },
                  ]}
                  activeTab={filterValue === 'all' ? 'all' : filterValue}
                  onTabChange={(id) => setFilterValue(id)}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* BUTTONS & ACTIONS TAB */}
          <TabsContent value="buttons" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Pre-configured Action Buttons</CardTitle>
                <CardDescription>Common actions with consistent styling</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  <div className="flex flex-col items-center gap-2">
                    <EditButton onClick={() => {}} />
                    <span className="text-xs text-muted-foreground">EditButton</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <ViewButton isVisible={true} onClick={() => {}} />
                    <span className="text-xs text-muted-foreground">ViewButton</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <LockButton isLocked={false} onClick={() => {}} />
                    <span className="text-xs text-muted-foreground">LockButton</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <LockButton isLocked={true} onClick={() => {}} />
                    <span className="text-xs text-muted-foreground">Locked</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <DeleteButton onClick={() => {}} />
                    <span className="text-xs text-muted-foreground">DeleteButton</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <AddButton onClick={() => {}} />
                    <span className="text-xs text-muted-foreground">AddButton</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ActionGroup</CardTitle>
                <CardDescription>Container for grouping action buttons</CardDescription>
              </CardHeader>
              <CardContent>
                <ActionGroup>
                  <IconButton icon={Eye} tooltip="View" onClick={() => {}} />
                  <IconButton icon={Edit} tooltip="Edit" onClick={() => {}} />
                  <IconButton icon={MoreHorizontal} tooltip="More" onClick={() => {}} />
                  <DeleteButton onClick={() => {}} />
                </ActionGroup>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>CTAButton</CardTitle>
                <CardDescription>Animated call-to-action button</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <CTAButton onClick={() => alert('Clicked!')}>
                  Start Your Journey
                </CTAButton>
                <p className="text-sm text-muted-foreground">
                  Features subtle animation and arrow icon on hover
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* BADGES & STATUS TAB */}
          <TabsContent value="badges" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>StatusBadge Variants</CardTitle>
                <CardDescription>Consistent status indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  <StatusBadge variant="success">Success</StatusBadge>
                  <StatusBadge variant="warning">Warning</StatusBadge>
                  <StatusBadge variant="error">Error</StatusBadge>
                  <StatusBadge variant="info">Info</StatusBadge>
                  <StatusBadge variant="neutral">Neutral</StatusBadge>
                  <StatusBadge variant="locked">Locked</StatusBadge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>StatusBadge met Icons</CardTitle>
                <CardDescription>Badges with leading icons</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  <StatusBadge variant="success" icon={CheckCircle2}>Completed</StatusBadge>
                  <StatusBadge variant="warning" icon={AlertTriangle}>Pending Review</StatusBadge>
                  <StatusBadge variant="error" icon={XCircle}>Failed</StatusBadge>
                  <StatusBadge variant="info" icon={Info}>Processing</StatusBadge>
                  <StatusBadge variant="locked" icon={Lock}>Premium</StatusBadge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Color Reference</CardTitle>
                <CardDescription>Standard kleuren voor status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-green-50 border border-green-200 dark:bg-green-900/20 dark:border-green-800">
                    <span className="text-green-700 dark:text-green-400 font-medium">Success / Green</span>
                  </div>
                  <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 dark:bg-amber-900/20 dark:border-amber-800">
                    <span className="text-amber-700 dark:text-amber-400 font-medium">Warning / Amber</span>
                  </div>
                  <div className="p-4 rounded-lg bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-800">
                    <span className="text-red-700 dark:text-red-400 font-medium">Error / Red</span>
                  </div>
                  <div className="p-4 rounded-lg bg-blue-50 border border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
                    <span className="text-blue-700 dark:text-blue-400 font-medium">Info / Blue</span>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-50 border border-gray-200 dark:bg-gray-900/20 dark:border-gray-800">
                    <span className="text-gray-700 dark:text-gray-400 font-medium">Neutral / Gray</span>
                  </div>
                  <div className="p-4 rounded-lg bg-purple-50 border border-purple-200 dark:bg-purple-900/20 dark:border-purple-800">
                    <span className="text-purple-700 dark:text-purple-400 font-medium">Accent / Purple</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* CARDS TAB */}
          <TabsContent value="cards" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>StatCard</CardTitle>
                <CardDescription>Statistics display with optional trend</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <StatCard
                    title="Total Assets"
                    value={42}
                    icon={Package}
                  />
                  <StatCard
                    title="Active Users"
                    value={128}
                    icon={Users}
                    trend={{ value: 12, isPositive: true }}
                    variant="success"
                  />
                  <StatCard
                    title="Pending"
                    value={8}
                    icon={AlertTriangle}
                    trend={{ value: 3, isPositive: false }}
                    variant="warning"
                  />
                  <StatCard
                    title="Completed"
                    value="94%"
                    icon={Target}
                    progress={94}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ListItemCard</CardTitle>
                <CardDescription>Clickable list items</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <ListItemCard
                  icon={FileText}
                  title="Brand Guidelines"
                  subtitle="Updated 2 hours ago"
                  badge={<StatusBadge variant="success">Active</StatusBadge>}
                  onClick={() => alert('Clicked!')}
                />
                <ListItemCard
                  icon={Users}
                  title="Persona Research"
                  subtitle="3 personas defined"
                  badge={<StatusBadge variant="warning">In Progress</StatusBadge>}
                  onClick={() => alert('Clicked!')}
                />
                <ListItemCard
                  icon={Target}
                  title="Campaign Strategy"
                  subtitle="Q1 2025 Campaign"
                  meta="Due in 5 days"
                  onClick={() => alert('Clicked!')}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>FeatureCard</CardTitle>
                <CardDescription>Feature display with status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FeatureCard
                    icon={Sparkles}
                    title="AI Generation"
                    description="Generate content with AI"
                    status="available"
                    onClick={() => alert('Available!')}
                  />
                  <FeatureCard
                    icon={Target}
                    title="Advanced Analytics"
                    description="Deep insights and reporting"
                    status="locked"
                    onClick={() => alert('Locked!')}
                  />
                  <FeatureCard
                    icon={TrendingUp}
                    title="Trend Prediction"
                    description="Predict market trends"
                    status="coming-soon"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>EmptyStateCard</CardTitle>
                <CardDescription>Empty state with action</CardDescription>
              </CardHeader>
              <CardContent>
                <EmptyStateCard
                  icon={Search}
                  title="No results found"
                  description="Try adjusting your search or filters to find what you're looking for."
                  action={{
                    label: "Clear filters",
                    onClick: () => alert('Filters cleared!')
                  }}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default ComponentShowcase;
