import React, { useState, useMemo } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  LayoutDashboard,
  Users,
  Target,
  Lightbulb,
  FlaskConical,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  Rocket,
  Brain,
  Database,
  CheckSquare,
  ChevronDown,
  HelpCircle,
  Plus,
  Bell,
  Palette,
  CreditCard,
  UserPlus,
  Building,
  Zap,
} from 'lucide-react';
import { cn } from '../lib/utils';
import logo from 'figma:asset/e0e0a87a533427f73679f2a4dcecdf2a949b2149.png';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface EnhancedSidebarSimpleProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  onAssetClick?: (assetId: string) => void;
  onMethodClick?: (assetId: string, methodType: ResearchMethodType) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  onOpenQuickContent?: () => void;
}

interface NavigationItem {
  id: string;
  label: string;
  icon: any;
  badge?: string;
}

// Mock data for demonstration
const mockBrandAssets = [
  { id: '1', name: 'Golden Circle', status: 'ready-to-validate' },
  { id: '2', name: 'Vision Statement', status: 'validated' },
];

export function EnhancedSidebarSimple({
  activeSection,
  setActiveSection,
  collapsed,
  onToggleCollapse,
  onOpenQuickContent,
}: EnhancedSidebarSimpleProps) {
  // Navigation groups
  const workspaceItems: NavigationItem[] = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
  ];

  const knowledgeItems: NavigationItem[] = [
    { id: 'brand', label: 'Brand Foundation', icon: Lightbulb },
    { id: 'business-strategy', label: 'Business Strategy', icon: Target },
    { id: 'brandstyle', label: 'Brandstyle', icon: FlaskConical },
    { id: 'personas', label: 'Personas', icon: Users },
    { id: 'products', label: 'Products & Services', icon: Target },
    { id: 'trends', label: 'Market Insights', icon: Lightbulb },
    { id: 'knowledge', label: 'Knowledge Library', icon: Database },
  ];

  const strategyItems: NavigationItem[] = [
    { id: 'active-campaigns', label: 'Active Campaigns', icon: Target },
    { id: 'content-library', label: 'Content Library', icon: Database },
  ];

  const validationItems: NavigationItem[] = [
    { id: 'research', label: 'Research Hub', icon: Target },
    { id: 'research-bundles', label: 'Research Bundles', icon: CheckSquare },
    { id: 'custom-validation', label: 'Custom Validation', icon: Brain },
  ];

  const [clientSelectorOpen, setClientSelectorOpen] = useState(false);

  // Count assets that need attention
  const needsAttentionCount = useMemo(() => {
    return mockBrandAssets.filter(asset => asset.status === 'ready-to-validate').length;
  }, []);

  if (collapsed) {
    return (
      <div className="h-screen bg-white border-r border-border w-16 flex flex-col shadow-sm">
        {/* Logo - Collapsed */}
        <div className="p-3 border-b border-border">
          <img src={logo} alt="Brandshift.ai" className="w-10 h-10 object-contain" />
        </div>

        <div className="p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="w-8 h-8 hover:bg-muted transition-colors duration-200"
          >
            <PanelLeftOpen className="h-4 w-4 text-gray-600" />
          </Button>
        </div>
        <nav className="flex-1 p-2 space-y-1">
          {[...workspaceItems, ...knowledgeItems, ...strategyItems, ...validationItems].map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id || activeSection.startsWith(item.id + '-');

            return (
              <Button
                key={item.id}
                variant="ghost"
                size="icon"
                className={`w-full h-10 transition-colors duration-200 ${
                  isActive
                    ? 'bg-gray-200 text-black'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => setActiveSection(item.id)}
                title={item.label}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'fill-black' : ''}`} />
              </Button>
            );
          })}
        </nav>
      </div>
    );
  }

  return (
    <div className="h-screen bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 w-64 flex flex-col" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Top Section - Logo & Collapse Button */}
      <div className="px-4 pt-6 pb-4 border-b border-gray-200 dark:border-gray-800">
        {/* Logo/Brand */}
        <div className="flex items-center justify-between mb-4">
          <img src={logo} alt="Brandshift.ai" className="h-8 object-contain" />
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 flex-shrink-0 transition-colors duration-200"
          >
            <PanelLeftClose className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Create CTA Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="w-full justify-start gap-2 h-10 px-4 bg-gradient-to-r from-primary to-teal-600 hover:brightness-110 text-white rounded-xl transition-all duration-200"
            >
              <Plus className="h-4 w-4" />
              <span className="text-sm font-semibold">Create Content</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-64">
            <DropdownMenuItem onClick={() => onOpenQuickContent?.()} className="cursor-pointer p-3">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-blue-100 dark:bg-blue-900/30 p-1.5 flex-shrink-0">
                  <Zap className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Quick Content</p>
                  <p className="text-xs text-muted-foreground">Create content fast with auto settings</p>
                </div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setActiveSection('new-campaign')} className="cursor-pointer p-3">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-primary/10 p-1.5 flex-shrink-0">
                  <Plus className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold">New Campaign</p>
                  <p className="text-xs text-muted-foreground">Full strategic campaign</p>
                </div>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 pt-4 space-y-6">
        {/* WORKSPACE Section */}
        <div className="space-y-1">
          <div className="px-2 mb-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Workspace
            </h3>
          </div>
          {workspaceItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id || activeSection.startsWith(item.id + '-');
            const showBadge = item.id === 'risks-priorities' && needsAttentionCount > 0;

            return (
              <Button
                key={item.id}
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-2 h-9 px-3 transition-colors duration-200 relative",
                  isActive
                    ? 'bg-primary/10 dark:bg-primary/20 text-primary hover:bg-primary/15 dark:hover:bg-primary/25 border-l-2 border-primary'
                    : 'text-foreground dark:text-gray-300 hover:bg-muted/50 dark:hover:bg-gray-800 border-l-2 border-transparent'
                )}
                onClick={() => setActiveSection(item.id)}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                <span className="flex-1 text-left text-sm">{item.label}</span>
                {showBadge && (
                  <Badge className="rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-0 text-xs font-semibold h-5 px-2">
                    {needsAttentionCount}
                  </Badge>
                )}
              </Button>
            );
          })}
        </div>

        {/* STRATEGY Section */}
        <div className="space-y-1">
          <div className="px-2 mb-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Strategy
            </h3>
          </div>
          {strategyItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id || activeSection.startsWith(item.id + '-');

            return (
              <Button
                key={item.id}
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-2 h-9 px-3 transition-colors duration-200 relative",
                  isActive
                    ? 'bg-primary/10 dark:bg-primary/20 text-primary hover:bg-primary/15 dark:hover:bg-primary/25 border-l-2 border-primary'
                    : 'text-foreground dark:text-gray-300 hover:bg-muted/50 dark:hover:bg-gray-800 border-l-2 border-transparent'
                )}
                onClick={() => setActiveSection(item.id)}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                <span className="flex-1 text-left text-sm">{item.label}</span>
              </Button>
            );
          })}
        </div>

        {/* KNOWLEDGE Section */}
        <div className="space-y-1">
          <div className="px-2 mb-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Knowledge
            </h3>
          </div>
          {knowledgeItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id || activeSection.startsWith(item.id + '-');
            const showBadge = item.id === 'brand' && needsAttentionCount > 0;

            return (
              <Button
                key={item.id}
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-2 h-9 px-3 transition-colors duration-200 relative",
                  isActive
                    ? 'bg-primary/10 dark:bg-primary/20 text-primary hover:bg-primary/15 dark:hover:bg-primary/25 border-l-2 border-primary'
                    : 'text-foreground dark:text-gray-300 hover:bg-muted/50 dark:hover:bg-gray-800 border-l-2 border-transparent'
                )}
                onClick={() => setActiveSection(item.id)}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                <span className="flex-1 text-left text-sm">{item.label}</span>
                {showBadge && (
                  <Badge className="rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-0 text-xs font-semibold h-5 px-2">
                    {needsAttentionCount}
                  </Badge>
                )}
              </Button>
            );
          })}
        </div>

        {/* VALIDATION Section */}
        <div className="space-y-1">
          <div className="px-2 mb-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Validation
            </h3>
          </div>
          {validationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id || activeSection.startsWith(item.id + '-');

            return (
              <Button
                key={item.id}
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-2 h-9 px-3 transition-colors duration-200 relative",
                  isActive
                    ? 'bg-primary/10 dark:bg-primary/20 text-primary hover:bg-primary/15 dark:hover:bg-primary/25 border-l-2 border-primary'
                    : 'text-foreground dark:text-gray-300 hover:bg-muted/50 dark:hover:bg-gray-800 border-l-2 border-transparent'
                )}
                onClick={() => setActiveSection(item.id)}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                <span className="flex-1 text-left text-sm">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </nav>

      {/* Footer - Settings, Help & User Profile */}
      <div className="border-t border-border dark:border-gray-800 p-3 space-y-2">
        {/* Settings - Single Link (not expandable) */}
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-2 h-9 px-3 transition-colors duration-200",
            activeSection.startsWith('settings-')
              ? 'bg-muted text-foreground rounded-lg'
              : 'text-foreground dark:text-gray-300 hover:bg-muted/50 dark:hover:bg-gray-800'
          )}
          onClick={() => setActiveSection('settings-account')}
        >
          <Settings className="h-4 w-4 flex-shrink-0" />
          <span className="text-sm">Settings</span>
        </Button>

        {/* Help & Support */}
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 h-9 px-3 text-foreground dark:text-gray-300 hover:bg-muted/50 dark:hover:bg-gray-800 transition-colors duration-200"
        >
          <HelpCircle className="h-4 w-4 flex-shrink-0" />
          <span className="flex-1 text-left text-sm">Help & Support</span>
        </Button>

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-12 px-3 hover:bg-muted/50 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              <Avatar className="h-8 w-8 rounded-full">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left overflow-hidden">
                <p className="text-sm font-semibold text-foreground dark:text-white truncate">John Doe</p>
                <p className="text-xs text-muted-foreground truncate">john@company.com</p>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setActiveSection('settings-account')}>
              <Users className="h-4 w-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setActiveSection('settings-billing')}>
              <CreditCard className="h-4 w-4 mr-2" />
              Billing
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setActiveSection('settings-appearance')}>
              <Palette className="h-4 w-4 mr-2" />
              Appearance
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 dark:text-red-400">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}