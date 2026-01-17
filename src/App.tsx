import React, { useState, useEffect, lazy, Suspense } from 'react';

// =============================================================================
// CORE COMPONENTS (always loaded)
// =============================================================================
import { Dashboard } from './components/Dashboard';
import { WorkflowEnhancer } from './components/WorkflowEnhancer';
import { TopNavigationBar } from './components/TopNavigationBar';
import { ErrorBoundary } from './components/ErrorBoundary';
import { TooltipProvider } from './components/ui/tooltip';
import { AppProviders, useBrandAssets, useResearchPlan, useUIState } from './contexts';
import { EnhancedSidebarSimple } from './components/EnhancedSidebarSimple';
import { ActivityFeed } from './components/ActivityFeed';

// =============================================================================
// LAZY LOADED COMPONENTS (loaded on demand for better performance)
// =============================================================================
const ResearchDashboard = lazy(() => import('./components/ResearchDashboard').then(m => ({ default: m.ResearchDashboard })));
const StrategicResearchPlanner = lazy(() => import('./components/StrategicResearchPlanner').then(m => ({ default: m.StrategicResearchPlanner })));
const ResearchPlansSectionGamified = lazy(() => import('./components/ResearchPlansSectionGamified').then(m => ({ default: m.ResearchPlansSectionGamified })));
const ResearchPlansPage = lazy(() => import('./components/ResearchPlansPage').then(m => ({ default: m.ResearchPlansPage })));
const ResearchHubEnhanced = lazy(() => import('./components/ResearchHubEnhanced').then(m => ({ default: m.ResearchHubEnhanced })));
const PersonasSection = lazy(() => import('./components/PersonasSection').then(m => ({ default: m.PersonasSection })));
const StrategyHubSection = lazy(() => import('./components/StrategyHubSection').then(m => ({ default: m.StrategyHubSection })));
const RelationshipsPage = lazy(() => import('./components/RelationshipsPage').then(m => ({ default: m.RelationshipsPage })));
const ProductsServices = lazy(() => import('./components/ProductsServices').then(m => ({ default: m.ProductsServices })));
const ProductServiceView = lazy(() => import('./components/ProductServiceView').then(m => ({ default: m.ProductServiceView })));
const TrendLibrary = lazy(() => import('./components/TrendLibrary').then(m => ({ default: m.TrendLibrary })));
const KnowledgeLibrary = lazy(() => import('./components/KnowledgeLibrary').then(m => ({ default: m.KnowledgeLibrary })));
const BrandAssetsViewSimple = lazy(() => import('./components/BrandAssetsViewSimple').then(m => ({ default: m.BrandAssetsViewSimple })));
const AssetUnlockDetailView = lazy(() => import('./components/AssetUnlockDetailView').then(m => ({ default: m.AssetUnlockDetailView })));
const TransformativeGoalsDashboard = lazy(() => import('./components/TransformativeGoalsDashboard').then(m => ({ default: m.TransformativeGoalsDashboard })));
const SocialRelevancyDashboard = lazy(() => import('./components/SocialRelevancyDashboard').then(m => ({ default: m.SocialRelevancyDashboard })));
const UniversalAssetDashboard = lazy(() => import('./components/UniversalAssetDashboard').then(m => ({ default: m.UniversalAssetDashboard })));
const TemplateLibraryPage = lazy(() => import('./components/templates/TemplateLibraryPage').then(m => ({ default: m.TemplateLibraryPage })));
const AgencySettingsPage = lazy(() => import('./components/white-label/AgencySettingsPage').then(m => ({ default: m.AgencySettingsPage })));
const ClientManagementPage = lazy(() => import('./components/white-label/ClientManagementPage').then(m => ({ default: m.ClientManagementPage })));
const TeamManagementPage = lazy(() => import('./components/collaboration/TeamManagementPage').then(m => ({ default: m.TeamManagementPage })));
const AccountSettingsPage = lazy(() => import('./components/settings/AccountSettingsPage').then(m => ({ default: m.AccountSettingsPage })));
const NotificationsSettingsPage = lazy(() => import('./components/settings/NotificationsSettingsPage').then(m => ({ default: m.NotificationsSettingsPage })));
const AppearanceSettingsPage = lazy(() => import('./components/settings/AppearanceSettingsPage').then(m => ({ default: m.AppearanceSettingsPage })));
const BillingSettingsPage = lazy(() => import('./components/settings/BillingSettingsPage').then(m => ({ default: m.BillingSettingsPage })));
const CommercialDemoPage = lazy(() => import('./components/commercial/CommercialDemoPage').then(m => ({ default: m.CommercialDemoPage })));
const ActiveCampaignsPage = lazy(() => import('./components/ActiveCampaignsPage').then(m => ({ default: m.ActiveCampaignsPage })));
const NewStrategyPage = lazy(() => import('./components/NewStrategyPage').then(m => ({ default: m.NewStrategyPage })));
const CampaignWorkspace = lazy(() => import('./components/CampaignWorkspace').then(m => ({ default: m.CampaignWorkspace })));
const ResearchValidationPage = lazy(() => import('./components/ResearchValidationPage').then(m => ({ default: m.ResearchValidationPage })));
const ValidationPlanLandingPage = lazy(() => import('./components/ValidationPlanLandingPage').then(m => ({ default: m.ValidationPlanLandingPage })));
const BundleDetailsPage = lazy(() => import('./components/BundleDetailsPage').then(m => ({ default: m.BundleDetailsPage })));
const ValidationMethodDemo = lazy(() => import('./components/ValidationMethodDemo').then(m => ({ default: m.ValidationMethodDemo })));
const BrandstyleView = lazy(() => import('./components/BrandstyleView').then(m => ({ default: m.BrandstyleView })));

// =============================================================================
// DATA & UTILITIES
// =============================================================================
import { researchBundles } from './data/research-bundles';
import { getResearchOptionId, ResearchMethodType } from './utils/research-method-helpers';
import { logger } from './utils/logger';
import { recentItems } from './services/RecentItemsService';
import { calculateBrandScore } from './utils/brand-score-calculator';
import { generateMockActivities } from './data/mock-activities';
import { BrandAsset } from './data/brand-assets';
import { useBreadcrumbs } from './hooks/useBreadcrumbs';
import { mockBrandAssets } from './data/mock-brand-assets';
import { ResearchBundle } from './data/research-bundles';

// =============================================================================
// LOADING FALLBACK COMPONENT
// =============================================================================
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-full">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

function AppContent() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [activityOpen, setActivityOpen] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);
  const [selectedCampaignTab, setSelectedCampaignTab] = useState<'configure' | 'result'>('configure');
  const [selectedBundle, setSelectedBundle] = useState<ResearchBundle | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  
  // ✨ Use Context Hooks instead of local state
  const {
    activeSection,
    selectedAssetId,
    selectedResearchOption,
    viewingAssetResults,
    sidebarCollapsed,
    showApproachSelection,
    setActiveSection: setActiveSectionRaw,
    setSelectedAssetId,
    setSelectedResearchOption,
    setViewingAssetResults,
    setSidebarCollapsed,
    setShowApproachSelection,
    navigateToAsset,
    resetAssetStates,
  } = useUIState();

  const {
    activeResearchPlan,
    setActiveResearchPlan,
    sharedSelectedAssets,
    setSharedSelectedAssets,
    updateSharedAssets,
    isMethodUnlocked,
    isAssetUnlocked,
  } = useResearchPlan();

  const { brandAssets, getBrandAsset } = useBrandAssets();

  // Generate breadcrumbs
  const breadcrumbs = useBreadcrumbs(activeSection, selectedAssetId);

  // Initialize mock activities on first load
  useEffect(() => {
    // Only generate once per session
    const hasGeneratedActivities = sessionStorage.getItem('mock-activities-generated');
    if (!hasGeneratedActivities) {
      generateMockActivities();
      sessionStorage.setItem('mock-activities-generated', 'true');
    }
  }, []);

  // Track recent items when navigating
  useEffect(() => {
    if (activeSection === 'dashboard') {
      // Don't track dashboard visits
      return;
    }

    // Track brand asset visits
    if (selectedAssetId) {
      const asset = brandAssets.find(a => a.id === selectedAssetId);
      if (asset) {
        recentItems.addItem({
          id: asset.id,
          type: 'brand-asset',
          title: asset.title,
          subtitle: asset.category,
          route: `brand-${asset.id}`,
          metadata: {
            status: asset.status,
            category: asset.category
          }
        });
      }
    }
    // Track page visits
    else if (activeSection) {
      const pageMap: Record<string, { title: string; subtitle: string }> = {
        'brand': { title: 'Brand Assets', subtitle: 'Prioritized by Strategic Risk' },
        'research': { title: 'Research Hub', subtitle: 'Plan & Execute' },
        'personas': { title: 'Personas', subtitle: 'Strategic Decision Instruments' },
        'strategy': { title: 'Strategy & Goals', subtitle: 'Strategic Planning' },
        'products': { title: 'Products & Services', subtitle: 'Catalog' },
        'trends': { title: 'Trend Library', subtitle: 'Market Insights' },
        'knowledge': { title: 'Knowledge Library', subtitle: 'Resources' }
      };

      const pageInfo = pageMap[activeSection];
      if (pageInfo) {
        recentItems.addItem({
          id: activeSection,
          type: 'page',
          title: pageInfo.title,
          subtitle: pageInfo.subtitle,
          route: activeSection
        });
      }
    }
  }, [activeSection, selectedAssetId, brandAssets]);

  // Wrapper for setActiveSection to reset asset states when needed
  const handleSetActiveSection = (section: string) => {
    setActiveSectionRaw(section);
    
    // If navigating away from brand assets, reset asset-related states
    if (!section.startsWith('brand-') && section !== 'brand') {
      resetAssetStates();
    }
  };

  const handleEditAsset = (assetId: string) => {
    setSelectedAssetId(assetId);
    setSelectedResearchOption(null); // Reset research option when switching assets
    setViewingAssetResults(true); // Show asset results by default
    setActiveSectionRaw(`brand-${assetId}`);
  };

  const handleNavigateAsset = (assetId: string) => {
    setSelectedAssetId(assetId);
    setSelectedResearchOption(null); // Reset research option when switching assets
    setViewingAssetResults(true); // Show asset results by default
    setActiveSectionRaw(`brand-${assetId}`);
  };

  const handleNavigateAssetResults = (assetId: string) => {
    setSelectedAssetId(assetId);
    setSelectedResearchOption(null);
    setViewingAssetResults(true);
    setActiveSectionRaw(`brand-${assetId}`);
  };

  const handleNavigateResearchOption = (optionId: string) => {
    setSelectedResearchOption(optionId);
    setViewingAssetResults(false);
  };

  const handleNavigateResearchOptionFromSidebar = (assetId: string, optionId: string) => {
    setSelectedAssetId(assetId);
    setSelectedResearchOption(optionId);
    setViewingAssetResults(false);
    setActiveSectionRaw(`brand-${assetId}`);
  };

  const handleBackToBrand = () => {
    resetAssetStates();
    setActiveSectionRaw('brand');
  };
  
  // Handler for navigating to validation method from BrandAssetsView
  const handleNavigateToResearchMethod = (assetId: string, methodType: ResearchMethodType, mode: 'work' | 'results') => {
    const optionId = getResearchOptionId(methodType);
    logger.navigation('Navigating to validation method', { assetId, methodType, optionId, mode });
    setSelectedAssetId(assetId);
    
    if (mode === 'results') {
      // Navigating to results view - show the UniversalAssetDashboard
      setSelectedResearchOption(null);
      setViewingAssetResults(true);
    } else {
      // Navigating to work/research mode - show ResearchDashboard
      setSelectedResearchOption(optionId);
      setViewingAssetResults(false);
    }
    
    setActiveSectionRaw(`brand-${assetId}`);
  };

  const handlePlanCreated = (config: {
    approachId: string;
    selectedAssets: string[];
    configuration: any;
    entryMode: 'asset' | 'bundle' | 'questionnaire';
    rationale?: Record<string, string>;
  }) => {
    // Create new research plan and unlock methods/assets
    const methods = config.configuration?.methods || {};
    const allMethods = Object.values(methods) as string[];
    const uniqueMethods = [...new Set([...allMethods, 'ai-agent'])]; // Always unlock AI (ai-agent is the correct optionId)
    
    const newPlan = {
      id: `plan-${Date.now()}`,
      method: config.approachId,
      unlockedMethods: uniqueMethods,
      unlockedAssets: config.selectedAssets,
      entryMode: config.entryMode,
      rationale: config.rationale,
      configuration: config.configuration,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setActiveResearchPlan(newPlan);
    
    // Update shared assets for each method
    const updatedSharedAssets = { ...sharedSelectedAssets };
    config.selectedAssets.forEach(assetId => {
      const methodId = methods[assetId];
      if (methodId && updatedSharedAssets[methodId as keyof typeof updatedSharedAssets]) {
        const existing = updatedSharedAssets[methodId as keyof typeof updatedSharedAssets];
        if (!existing.includes(assetId)) {
          updatedSharedAssets[methodId as keyof typeof updatedSharedAssets] = [...existing, assetId];
        }
      }
    });
    setSharedSelectedAssets(updatedSharedAssets);
    
    // Close the planner and navigate to dashboard
    setShowApproachSelection(false);
    setActiveSectionRaw('dashboard');
  };

  const renderContent = () => {
    // Show research approach selection if requested
    if (showApproachSelection) {
      return (
        <StrategicResearchPlanner
          onPlanCreated={handlePlanCreated}
          onCancel={() => setShowApproachSelection(false)}
        />
      );
    }

    // Check if we're viewing asset results page (canonical asset view)
    if (activeSection.startsWith('brand-') && selectedAssetId && viewingAssetResults) {
      // Use UniversalAssetDashboard for ALL assets (replaces old specific dashboards)
      return (
        <UniversalAssetDashboard 
          assetId={selectedAssetId}
          onBack={handleBackToBrand}
          onStartResearch={(methodId, mode = 'work') => {
            logger.navigation('Starting research from asset', { assetId: selectedAssetId, methodId, mode });
            handleNavigateToResearchMethod(selectedAssetId, methodId as ResearchMethodType, mode);
          }}
        />
      );
    }

    // Check if we're viewing a specific validation method
    if (activeSection.startsWith('brand-') && selectedAssetId && selectedResearchOption) {
      // Check if this method is completed for this asset (using context)
      const asset = getBrandAsset(selectedAssetId);
      const isMethodCompleted = asset?.researchMethods?.some(
        m => m.type === selectedResearchOption && m.status === 'completed'
      );
      
      const methodUnlocked = isMethodUnlocked(selectedResearchOption);
      
      // Allow access if method is unlocked OR if it's already completed (for viewing)
      if (!methodUnlocked && !isMethodCompleted) {
        // Method not unlocked and not completed - redirect to research planner
        return (
          <StrategicResearchPlanner
            onPlanCreated={handlePlanCreated}
            onCancel={() => {
              setSelectedResearchOption(null);
              setViewingAssetResults(true);
            }}
          />
        );
      } else {
        // Method is unlocked or completed - show research dashboard
        return (
          <ResearchDashboard 
            assetId={selectedAssetId}
            optionId={selectedResearchOption}
            onBack={() => {
              setSelectedResearchOption(null);
              setViewingAssetResults(true);
            }}
            sharedSelectedAssets={sharedSelectedAssets}
            onAssetsChange={(tool, assets) => {
              setSharedSelectedAssets(prev => ({ ...prev, [tool]: assets }));
            }}
            researchPlanConfig={activeResearchPlan}
          />
        );
      }
    }

    // Deprecated: Old fallback - now using UniversalAssetDashboard for all assets
    if (activeSection.startsWith('brand-') && selectedAssetId) {
      return (
        <UniversalAssetDashboard 
          assetId={selectedAssetId}
          onBack={handleBackToBrand}
          onStartResearch={(methodId, mode = 'work') => {
            logger.navigation('Starting research from asset', { assetId: selectedAssetId, methodId, mode });
            handleNavigateToResearchMethod(selectedAssetId, methodId as ResearchMethodType, mode);
          }}
        />
      );
    }

    switch (activeSection) {
      case 'dashboard':
        return (
          <Dashboard 
            onStartResearch={() => setShowApproachSelection(true)}
            onNavigate={(url) => {
              // Handle URL navigation
              logger.navigation('Navigating from Dashboard', { url });
              handleSetActiveSection('strategy');
            }}
          />
        );
      case 'research':
        return (
          <ResearchHubEnhanced 
            onNavigate={handleSetActiveSection}
            onCreatePlan={() => setShowApproachSelection(true)}
          />
        );
      case 'brand':
        return <BrandAssetsViewSimple 
          onAssetClick={handleNavigateAsset}
          onNavigateToResearchMethod={handleNavigateToResearchMethod}
          onNavigate={handleSetActiveSection}
        />;
      
      // 🎨 NEW: Brandstyle Analyzer
      case 'brandstyle':
        return <BrandstyleView />;
      
      // 🆕 NEW: Asset Unlock Detail View (Design Demo)
      case 'asset-unlock-demo':
        return <TransformativeGoalsDashboard 
          onBack={() => handleSetActiveSection('brand')}
          onStartResearch={(methodId) => {
            logger.navigation('Starting research from Transformative Goals', { methodId });
            handleNavigateToResearchMethod('6', methodId as ResearchMethodType, 'work'); // '6' is Transformative Goals asset ID
          }}
        />;
      
      case 'risks-priorities':
      case 'research-plans': // Keep for backwards compatibility
      case 'research-bundles': // New route for research bundles
        return (
          <ResearchPlansPage 
            onSelectBundle={(bundle) => {
              logger.navigation('Bundle selected', { bundleId: bundle.id });
              // Handle bundle selection - could navigate to payment or bundle details
              setSelectedBundle(bundle);
              handleSetActiveSection('bundle-details');
            }}
            onNavigateToCustomValidation={() => {
              logger.navigation('Navigating to custom validation');
              handleSetActiveSection('custom-validation');
            }}
          />
        );
      case 'custom-validation': // New route for custom validation
        return (
          <ValidationPlanLandingPage
            onBack={() => handleSetActiveSection('research-bundles')}
            onStartPlan={(selectedAssets, selectedMethods) => {
              logger.navigation('Custom validation plan started', { 
                assetsCount: selectedAssets.length,
                methodsCount: selectedMethods.length 
              });
              // Handle starting custom validation plan
              handleSetActiveSection('research');
            }}
          />
        );
      case 'bundle-details': // New route for bundle details
        if (!selectedBundle) {
          handleSetActiveSection('research-bundles');
          return null;
        }
        return (
          <BundleDetailsPage
            bundle={selectedBundle}
            onBack={() => {
              setSelectedBundle(null);
              handleSetActiveSection('research-bundles');
            }}
            onStartPlan={(selectedAssets, selectedMethods) => {
              logger.navigation('Bundle plan started', { 
                bundleId: selectedBundle.id,
                assetsCount: selectedAssets.length,
                methodsCount: selectedMethods.length 
              });
              // Handle starting bundle plan
              handleSetActiveSection('research');
            }}
          />
        );
      case 'products':
        return <ProductsServices onNavigate={(section, productId) => {
          if (section === 'product-detail' && productId) {
            setSelectedProductId(productId);
            handleSetActiveSection('product-detail');
          } else {
            handleSetActiveSection(section);
          }
        }} />;
      case 'product-analyzer':
        return <ProductServiceView />;
      case 'product-detail':
        if (!selectedProductId) {
          handleSetActiveSection('products');
          return null;
        }
        return (
          <ProductServiceView 
            productId={selectedProductId}
            onBack={() => {
              setSelectedProductId(null);
              handleSetActiveSection('products');
            }}
          />
        );
      case 'personas':
        return <PersonasSection onNavigate={handleSetActiveSection} />;
      case 'strategy':
      case 'new-strategy':
        return <NewStrategyPage />;
      case 'active-campaigns':
        return <ActiveCampaignsPage onNavigateToCampaign={(campaignId, tab = 'result') => {
          setSelectedCampaignId(campaignId);
          setSelectedCampaignTab(tab);
          handleSetActiveSection('campaign-workspace');
        }} />;
      case 'campaign-workspace':
        if (!selectedCampaignId) {
          handleSetActiveSection('active-campaigns');
          return null;
        }
        return (
          <CampaignWorkspace 
            campaignId={selectedCampaignId} 
            initialTab={selectedCampaignTab}
            onBack={() => {
              setSelectedCampaignId(null);
              setSelectedCampaignTab('configure');
              handleSetActiveSection('active-campaigns');
            }} 
          />
        );
      case 'trends':
        return <TrendLibrary />;
      case 'knowledge':
        return <KnowledgeLibrary />;
      case 'research-validation':
        return <ResearchValidationPage />;
      
      // 🆕 NEW: Relationships & Insights (Decision Status)
      case 'relationships':
        return <RelationshipsPage onNavigate={handleSetActiveSection} />;
      
      // 🆕 NEW: Agency Settings (White Label)
      case 'agency':
        return <AgencySettingsPage />;
      
      // 🆕 NEW: Client Management
      case 'clients':
        return <ClientManagementPage />;
      
      // 🆕 NEW: Team Management
      case 'team':
        return <TeamManagementPage />;
      
      // ⚙️ Settings Subsections
      case 'settings-account':
        return <AccountSettingsPage />;
      
      case 'settings-team':
        return <TeamManagementPage />;
      
      case 'settings-agency':
        return <AgencySettingsPage />;
      
      case 'settings-clients':
        return <ClientManagementPage />;
      
      case 'settings-notifications':
        return <NotificationsSettingsPage />;
      
      case 'settings-appearance':
        return <AppearanceSettingsPage />;
      
      case 'settings-billing':
        return <BillingSettingsPage />;
      
      // 🆕 NEW: Commercial Demo
      case 'commercial-demo':
      case 'settings-commercial-demo':
        return <CommercialDemoPage />;
      
      // 🎨 DEMO: ValidationMethodButton Demo
      case 'validation-demo':
        return <ValidationMethodDemo />;
      
      default:
        return <Dashboard onStartResearch={() => setShowApproachSelection(true)} />;
    }
  };

  return (
    <WorkflowEnhancer
      onNavigate={handleSetActiveSection}
      onAction={(actionId) => {
        logger.action('Quick action executed', { actionId });
      }}
      searchOpen={searchOpen}
      setSearchOpen={setSearchOpen}
      activityOpen={activityOpen}
      setActivityOpen={setActivityOpen}
    >
      <div className="flex flex-col h-screen bg-background">
        {/* Top Navigation */}
        <TopNavigationBar
          breadcrumbs={breadcrumbs}
          onNavigate={handleSetActiveSection}
          onSearchClick={() => setSearchOpen(true)}
          onActivityClick={() => setActivityOpen(true)}
        />

        {/* Main Layout */}
        <div className="flex flex-1 overflow-hidden">
          <EnhancedSidebarSimple 
            activeSection={activeSection} 
            setActiveSection={handleSetActiveSection}
            onAssetClick={handleNavigateAsset}
            onMethodClick={handleNavigateToResearchMethod}
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
          <main className="flex-1 overflow-y-auto bg-background">
            <Suspense fallback={<LoadingFallback />}>
              {renderContent()}
            </Suspense>
          </main>
        </div>
      </div>

      {/* Activity Feed Modal */}
      <ActivityFeed
        isOpen={activityOpen}
        onClose={() => setActivityOpen(false)}
        onNavigate={(route, metadata) => {
          handleSetActiveSection(route);
          setActivityOpen(false);
        }}
      />
    </WorkflowEnhancer>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppProviders>
        <ErrorBoundary>
          <TooltipProvider>
            <AppContent />
          </TooltipProvider>
        </ErrorBoundary>
      </AppProviders>
    </ErrorBoundary>
  );
}