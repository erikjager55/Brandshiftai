import React, { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { ResearchDashboard } from './components/ResearchDashboard';
import { StrategicResearchPlanner } from './components/StrategicResearchPlanner';
import { ResearchPlansSectionGamified } from './components/ResearchPlansSectionGamified';
import { ResearchPlansPage } from './components/ResearchPlansPage';
import { ResearchHubEnhanced } from './components/ResearchHubEnhanced';
import { PersonasSection } from './components/PersonasSection';
import { StrategyHubSection } from './components/StrategyHubSection';
import { RelationshipsPage } from './components/RelationshipsPage';
import { WorkflowEnhancer } from './components/WorkflowEnhancer';
import { TopNavigationBar } from './components/TopNavigationBar';
import { ProductsServicesSection } from './components/ProductsServicesSection';
import { ProductServiceView } from './components/ProductServiceView';
import { MarketInsights } from './components/MarketInsights';
import { KnowledgeLibrary } from './components/KnowledgeLibrary';
import { BrandAlignmentDashboard } from './components/BrandAlignmentDashboard';
import { BusinessStrategyOverview } from './components/BusinessStrategyOverview';
import { BusinessStrategyDetail } from './components/BusinessStrategyDetail';
import { mockBusinessStrategies } from './data/mock-business-strategies';
import { researchBundles } from './data/research-bundles';
import { ErrorBoundary } from './components/ErrorBoundary';
import { TooltipProvider } from './components/ui/tooltip';
import { AppProviders, useBrandAssets, useResearchPlan, useUIState } from './contexts';
import { BrandAssetsViewSimple } from './components/BrandAssetsViewSimple';
import { EnhancedSidebarSimple } from './components/EnhancedSidebarSimple';
import { AssetUnlockDetailView } from './components/AssetUnlockDetailView';
import { TransformativeGoalsDashboard } from './components/TransformativeGoalsDashboard';
import { SocialRelevancyDashboard } from './components/SocialRelevancyDashboard';
import { UniversalAssetDashboard } from './components/UniversalAssetDashboard';
import { AIExplorationPage } from './components/research/AIExplorationPage';
import { getResearchOptionId, ResearchMethodType } from './utils/research-method-helpers';
import { logger } from './utils/logger';
import { recentItems } from './services/RecentItemsService';
import { calculateBrandScore } from './utils/brand-score-calculator';
import { generateMockActivities } from './data/mock-activities';
import { ActivityFeed } from './components/ActivityFeed';
import { BrandAsset } from './data/brand-assets';
import { useBreadcrumbs } from './hooks/useBreadcrumbs';
import { mockBrandAssets } from './data/mock-brand-assets';
import { TemplateLibraryPage } from './components/templates/TemplateLibraryPage';
import { AgencySettingsPage } from './components/white-label/AgencySettingsPage';
import { ClientManagementPage } from './components/white-label/ClientManagementPage';
import { TeamManagementPage } from './components/collaboration/TeamManagementPage';
import { AccountSettingsPage } from './components/settings/AccountSettingsPage';
import { SettingsLayout } from './components/settings/SettingsLayout';
import { NotificationsSettingsPage } from './components/settings/NotificationsSettingsPage';
import { AppearanceSettingsPage } from './components/settings/AppearanceSettingsPage';
import { BillingSettingsPage } from './components/settings/BillingSettingsPage';
import { AgencySettingsPage as AgencySettingsPlaceholder } from './components/settings/AgencySettingsPage';
import { ClientsSettingsPage } from './components/settings/ClientsSettingsPage';
import { CommercialDemoPage } from './components/commercial/CommercialDemoPage';
import { ActiveCampaignsPage } from './components/ActiveCampaignsPage';
import { NewStrategyPage } from './components/NewStrategyPage';
import { CampaignWorkspace } from './components/CampaignWorkspace';
import { CampaignDeliverableDetailView } from './components/CampaignDeliverableDetailView';
import { ContentStudioNew as ContentStudio } from './components/ContentStudioNew';
import { ContentLibrary } from './components/ContentLibraryNew';
import { ResearchValidationPage } from './components/ResearchValidationPage';
import { ValidationPlanLandingPage } from './components/ValidationPlanLandingPage';
import { BundleDetailsPage } from './components/BundleDetailsPage';
import { ResearchBundle } from './data/research-bundles';
import { ValidationMethodDemo } from './components/ValidationMethodDemo';
import { BrandstyleView } from './components/BrandstyleView';
import { BrandstyleResult } from './components/BrandstyleResult';
import { SearchResults } from './components/SearchResults';
import { QuickContentModal } from './components/QuickContentModalNew';
import { NewCampaignWizard } from './components/NewCampaignWizard';
import { LoginPage } from './components/auth/LoginPage';
import { RegisterPage } from './components/auth/RegisterPage';
import { ForgotPasswordPage } from './components/auth/ForgotPasswordPage';
import { WelcomeScreen } from './components/onboarding/WelcomeScreen';
import { OnboardingWizard } from './components/onboarding/OnboardingWizard';
import { LoadingStatesLibrary } from './components/loading/LoadingStatesLibrary';
import { EmptyStatesLibrary } from './components/empty-states/EmptyStatesLibrary';
import { ErrorStatesLibrary } from './components/error-states/ErrorStatesLibrary';
import { DemoModeBanner, DemoControlPanel, DemoQuickActions, DemoSpotlight, InvestorMetricsDashboard, DemoModeSettings } from './components/demo';
import { StatusDropdownDemo } from './components/StatusDropdownDemo';
import { WorkshopImprovementsDemo } from './components/WorkshopImprovementsDemo';
import { HelpSupportPage } from './components/help/HelpSupportPage';

function AppContent() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activityOpen, setActivityOpen] = useState(false);
  const [quickContentOpen, setQuickContentOpen] = useState(false);
  const [newCampaignWizardOpen, setNewCampaignWizardOpen] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);
  const [selectedCampaignTab, setSelectedCampaignTab] = useState<'configure' | 'result'>('configure');
  const [selectedBundle, setSelectedBundle] = useState<ResearchBundle | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedDeliverableId, setSelectedDeliverableId] = useState<string | null>(null);
  const [selectedStrategyId, setSelectedStrategyId] = useState<string | null>(null);
  const [showAddStrategyModal, setShowAddStrategyModal] = useState(false);
  
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
        'trends': { title: 'Market Insights', subtitle: 'Market Insights' },
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
            
            // ✅ Direct navigation naar detail pagina's voor interviews en questionnaires
            // Interviews en Questionnaires gaan altijd naar hun completed detail view
            // Workshop gaat naar Custom Validation (betaalde method, AVAILABLE state)
            // AI Exploration is gratis en gaat direct naar de research pagina
            
            const isWorkshop = methodId === 'workshop';
            const isInterviewsOrQuestionnaire = methodId === 'interviews' || methodId === 'questionnaire';
            const isAvailableState = mode === 'work'; // AVAILABLE state uses 'work' mode
            
            if (isWorkshop && isAvailableState) {
              // Workshop: Redirect to Custom Validation with pre-filled data
              handleSetActiveSection('custom-validation');
              const params = new URLSearchParams();
              params.set('asset', selectedAssetId);
              params.set('method', methodId);
              window.history.replaceState({}, '', `/custom-validation?${params.toString()}`);
            } else if (isInterviewsOrQuestionnaire) {
              // Interviews & Questionnaires: Direct naar completed detail pagina
              handleNavigateToResearchMethod(selectedAssetId, methodId as ResearchMethodType, 'work');
            } else {
              // AI Exploration en andere methods: Standard navigation
              handleNavigateToResearchMethod(selectedAssetId, methodId as ResearchMethodType, mode);
            }
          }}
        />
      );
    }

    // Check if we're viewing a specific validation method
    if (activeSection.startsWith('brand-') && selectedAssetId && selectedResearchOption) {
      // Special handling for AI Exploration - use dedicated page
      if (selectedResearchOption === 'ai-exploration') {
        return (
          <AIExplorationPage
            assetId={selectedAssetId}
            sessionId={undefined} // TODO: Add session management
            mode="work"
            onBack={() => {
              setSelectedResearchOption(null);
              setViewingAssetResults(true);
            }}
          />
        );
      }

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
              handleSetActiveSection(url);
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
      
      // 🔍 NEW: Search Results
      case 'search':
        return <SearchResults 
          initialQuery={searchQuery} 
          onClose={() => {
            setSearchQuery('');
            handleSetActiveSection('dashboard');
          }}
        />;
      
      // 🎨 NEW: Brandstyle Analyzer
      case 'brandstyle':
        return <BrandstyleView onNavigateToResult={() => handleSetActiveSection('brandstyle-result')} />;
      
      // 🎨 NEW: Brandstyle Result
      case 'brandstyle-result':
        return <BrandstyleResult />;
      
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
          // Don't call state setter during render - return to bundles page
          return <ResearchPlansPage 
            onSelectBundle={(bundle) => {
              logger.navigation('Bundle selected', { bundleId: bundle.id });
              setSelectedBundle(bundle);
              handleSetActiveSection('bundle-details');
            }}
            onNavigateToCustomValidation={() => {
              logger.navigation('Navigating to custom validation');
              handleSetActiveSection('custom-validation');
            }}
          />;
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
        return <ProductsServicesSection />;
      case 'product-analyzer':
        return <ProductServiceView />;
      case 'product-detail':
        if (!selectedProductId) {
          // Don't call state setter during render - return to products page
          return <ProductsServicesSection onNavigate={(section, productId) => {
            if (section === 'product-detail' && productId) {
              setSelectedProductId(productId);
              handleSetActiveSection('product-detail');
            } else {
              handleSetActiveSection(section);
            }
          }} />;
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
      case 'new-strategy':
      case 'new-campaign':
        // Redirect to active campaigns page - wizard will be opened via useEffect
        return <ActiveCampaignsPage onNavigateToCampaign={(campaignId, tab = 'result') => {
          setSelectedCampaignId(campaignId);
          setSelectedCampaignTab(tab);
          handleSetActiveSection('campaign-workspace');
        }} />;
      case 'strategy': // Deprecated - redirect to active campaigns
        return <ActiveCampaignsPage onNavigateToCampaign={(campaignId, tab = 'result') => {
          setSelectedCampaignId(campaignId);
          setSelectedCampaignTab(tab);
          handleSetActiveSection('campaign-workspace');
        }} />;
      case 'active-campaigns':
        return <ActiveCampaignsPage onNavigateToCampaign={(campaignId, tab = 'result') => {
          setSelectedCampaignId(campaignId);
          setSelectedCampaignTab(tab);
          handleSetActiveSection('campaign-workspace');
        }} />;
      case 'content-library':
        return <ContentLibrary 
          onOpenQuickContent={() => setQuickContentOpen(true)}
          onNavigateToContent={(contentId, campaignId) => {
            setSelectedDeliverableId(contentId);
            setSelectedCampaignId(campaignId);
            handleSetActiveSection('campaign-deliverable-detail');
          }}
          onNavigateToCampaign={(campaignId) => {
            setSelectedCampaignId(campaignId);
            setSelectedCampaignTab('result');
            handleSetActiveSection('campaign-workspace');
          }}
        />;
      case 'campaign-workspace':
        if (!selectedCampaignId) {
          // Don't call state setter during render - return to campaigns page
          return <ActiveCampaignsPage onNavigateToCampaign={(campaignId, tab = 'result') => {
            setSelectedCampaignId(campaignId);
            setSelectedCampaignTab(tab);
            handleSetActiveSection('campaign-workspace');
          }} />;
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
            onNavigateToDeliverable={(deliverableId) => {
              setSelectedDeliverableId(deliverableId);
              handleSetActiveSection('campaign-deliverable-detail');
            }}
          />
        );
      case 'campaign-deliverable-detail':
        if (!selectedCampaignId || !selectedDeliverableId) {
          // Don't call state setter during render - return to campaigns page
          return <ActiveCampaignsPage onNavigateToCampaign={(campaignId, tab = 'result') => {
            setSelectedCampaignId(campaignId);
            setSelectedCampaignTab(tab);
            handleSetActiveSection('campaign-workspace');
          }} />;
        }
        return (
          <ContentStudio 
            deliverableId={selectedDeliverableId}
            campaignId={selectedCampaignId}
            onBack={() => {
              setSelectedDeliverableId(null);
              handleSetActiveSection('campaign-workspace');
            }} 
          />
        );
      case 'trends':
        return <MarketInsights />;
      case 'business-strategy':
        return <BusinessStrategyOverview 
          onNavigateToDetail={(strategyId) => {
            setSelectedStrategyId(strategyId);
            handleSetActiveSection('business-strategy-detail');
          }}
          onCreateStrategy={() => {
            // TODO: Open Create Strategy Modal
            alert('Create Strategy Modal coming soon!');
          }}
        />;
      case 'business-strategy-detail':
        if (!selectedStrategyId) {
          // Don't call state setter during render - return to overview
          return <BusinessStrategyOverview 
            onNavigateToDetail={(strategyId) => {
              setSelectedStrategyId(strategyId);
              handleSetActiveSection('business-strategy-detail');
            }}
            onCreateStrategy={() => {
              alert('Create Strategy Modal coming soon!');
            }}
          />;
        }
        const selectedStrategy = mockBusinessStrategies.find(s => s.id === selectedStrategyId);
        if (!selectedStrategy) {
          // Strategy not found - return to overview
          setSelectedStrategyId(null);
          handleSetActiveSection('business-strategy');
          return null;
        }
        return (
          <BusinessStrategyDetail
            strategy={selectedStrategy}
            onBack={() => {
              setSelectedStrategyId(null);
              handleSetActiveSection('business-strategy');
            }}
            onEdit={() => {
              // TODO: Open Edit Strategy Modal
              alert('Edit Strategy Modal coming soon!');
            }}
            onArchive={() => {
              // TODO: Implement archive
              if (confirm('Are you sure you want to archive this strategy?')) {
                setSelectedStrategyId(null);
                handleSetActiveSection('business-strategy');
              }
            }}
            onAddObjective={() => {
              // TODO: Open Add Objective Modal
              alert('Add Objective Modal coming soon!');
            }}
            onLinkCampaign={() => {
              // TODO: Open Link Campaign Modal
              alert('Link Campaign Modal coming soon!');
            }}
            onAddMilestone={() => {
              // TODO: Open Add Milestone Modal
              alert('Add Milestone Modal coming soon!');
            }}
            onNavigateToCampaign={(campaignId) => {
              // Navigate to campaign workspace
              setSelectedCampaignId(campaignId);
              setSelectedCampaignTab('result');
              handleSetActiveSection('campaign-workspace');
            }}
          />
        );
      case 'knowledge':
        return <KnowledgeLibrary />;
      case 'brand-alignment':
        return <BrandAlignmentDashboard />;
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
        return <TeamManagementPage 
          activeSettingsSection={activeSection}
          onNavigateToSettings={handleSetActiveSection}
        />;
      
      // ⚙️ Settings Subsections
      case 'settings-account':
        return (
          <SettingsLayout
            activeSection={activeSection}
            onNavigate={handleSetActiveSection}
            isAgencyAccount={false}
          >
            <AccountSettingsPage 
              activeSettingsSection={activeSection}
              onNavigateToSettings={handleSetActiveSection}
            />
          </SettingsLayout>
        );
      
      case 'settings-team':
        return (
          <SettingsLayout
            activeSection={activeSection}
            onNavigate={handleSetActiveSection}
            isAgencyAccount={false}
          >
            <TeamManagementPage 
              activeSettingsSection={activeSection}
              onNavigateToSettings={handleSetActiveSection}
            />
          </SettingsLayout>
        );
      
      case 'settings-agency':
        return (
          <SettingsLayout
            activeSection={activeSection}
            onNavigate={handleSetActiveSection}
            isAgencyAccount={true}
          >
            <AgencySettingsPlaceholder />
          </SettingsLayout>
        );
      
      case 'settings-clients':
        return (
          <SettingsLayout
            activeSection={activeSection}
            onNavigate={handleSetActiveSection}
            isAgencyAccount={true}
          >
            <ClientsSettingsPage />
          </SettingsLayout>
        );
      
      case 'settings-notifications':
        return (
          <SettingsLayout
            activeSection={activeSection}
            onNavigate={handleSetActiveSection}
            isAgencyAccount={false}
          >
            <NotificationsSettingsPage 
              activeSettingsSection={activeSection}
              onNavigateToSettings={handleSetActiveSection}
            />
          </SettingsLayout>
        );
      
      case 'settings-appearance':
        return (
          <SettingsLayout
            activeSection={activeSection}
            onNavigate={handleSetActiveSection}
            isAgencyAccount={false}
          >
            <AppearanceSettingsPage />
          </SettingsLayout>
        );
      
      case 'settings-billing':
        return (
          <SettingsLayout
            activeSection={activeSection}
            onNavigate={handleSetActiveSection}
            isAgencyAccount={false}
          >
            <BillingSettingsPage 
              activeSettingsSection={activeSection}
              onNavigateToSettings={handleSetActiveSection}
            />
          </SettingsLayout>
        );
      
      // 🆕 NEW: Commercial Demo
      case 'commercial-demo':
      case 'settings-commercial-demo':
        return <CommercialDemoPage />;
      
      // 🎨 DEMO: ValidationMethodButton Demo
      case 'validation-demo':
        return <ValidationMethodDemo />;
      
      // 🎨 LOADING: Loading States & Micro-interactions Library
      case 'loading-states':
        return <LoadingStatesLibrary />;
      
      // 🎨 EMPTY: Empty States & Micro-interactions Library
      case 'empty-states':
        return <EmptyStatesLibrary />;
      
      // 🎨 ERROR: Error States & Micro-interactions Library
      case 'error-states':
        return <ErrorStatesLibrary />;
      
      // 🎨 STATUS: StatusDropdown Component Demo
      case 'status-dropdown-demo':
        return <StatusDropdownDemo />;
      
      // 🎨 WORKSHOP IMPROVEMENTS: Workshop Improvements Demo
      case 'workshop-improvements-demo':
        return <WorkshopImprovementsDemo />;
      
      // ❓ HELP: Help & Support Page
      case 'help-support':
        return <HelpSupportPage />;
      
      // 🎬 DEMO: Demo Mode Settings
      case 'demo-settings':
        return <DemoModeSettings />;
      
      // 📊 DEMO: Investor Metrics Dashboard
      case 'investor-metrics':
        return <InvestorMetricsDashboard onBack={() => handleSetActiveSection('dashboard')} />;
      
      // 🔐 AUTH: Login, Register, Forgot Password
      case 'login':
        return <LoginPage 
          onNavigateToRegister={() => handleSetActiveSection('register')}
          onNavigateToForgotPassword={() => handleSetActiveSection('forgot-password')}
          onLogin={(email, password) => {
            console.log('Login:', { email });
            // Simulate successful login
            handleSetActiveSection('dashboard');
          }}
        />;
      
      case 'register':
        return <RegisterPage 
          onNavigateToLogin={() => handleSetActiveSection('login')}
          onRegister={(data) => {
            console.log('Register:', data);
            // Simulate successful registration - navigate to welcome screen
            handleSetActiveSection('welcome');
          }}
        />;
      
      case 'forgot-password':
        return <ForgotPasswordPage 
          onNavigateToLogin={() => handleSetActiveSection('login')}
          onSendResetLink={(email) => {
            console.log('Send reset link to:', email);
          }}
        />;
      
      // 🎉 ONBOARDING: Welcome Screen
      case 'welcome':
        return <WelcomeScreen 
          firstName="Sarah"
          onGetStarted={() => {
            console.log('Starting onboarding wizard...');
            // Navigate to onboarding wizard
            handleSetActiveSection('onboarding-wizard');
          }}
          onSkip={() => {
            console.log('Skipping onboarding...');
            // Navigate directly to dashboard
            handleSetActiveSection('dashboard');
          }}
        />;
      
      // 🎉 ONBOARDING: Onboarding Wizard
      case 'onboarding-wizard':
        return <OnboardingWizard 
          onComplete={(data) => {
            console.log('Onboarding completed:', data);
            // Navigate to dashboard
            handleSetActiveSection('dashboard');
          }}
          onSkip={() => {
            console.log('Onboarding skipped...');
            // Navigate directly to dashboard
            handleSetActiveSection('dashboard');
          }}
        />;
      
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
      {/* Demo Mode Banner */}
      <DemoModeBanner />

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
            onOpenQuickContent={() => setQuickContentOpen(true)}
          />
          <main className="flex-1 overflow-y-auto bg-background">
            {renderContent()}
          </main>
        </div>
      </div>

      {/* Demo Control Panel */}
      <DemoControlPanel onNavigate={handleSetActiveSection} />

      {/* Demo Quick Actions */}
      <DemoQuickActions onNavigate={handleSetActiveSection} />

      {/* Demo Spotlight Effect */}
      <DemoSpotlight />

      {/* Quick Content Modal */}
      <QuickContentModal
        open={quickContentOpen}
        onOpenChange={setQuickContentOpen}
        onCreateContent={(data) => {
          console.log('Creating quick content:', data);
          
          // Create a mock quick campaign
          const quickCampaignId = `quick-${Date.now()}`;
          const deliverableId = `content-${Date.now()}`;
          
          // Navigate to Content Studio
          setSelectedCampaignId(quickCampaignId);
          setSelectedDeliverableId(deliverableId);
          setQuickContentOpen(false);
          handleSetActiveSection('campaign-deliverable-detail');
        }}
      />

      {/* New Campaign Wizard Modal */}
      {newCampaignWizardOpen && (
        <div className="fixed inset-0 z-50">
          <NewCampaignWizard 
            onClose={() => {
              setNewCampaignWizardOpen(false);
              handleSetActiveSection('active-campaigns');
            }}
            onComplete={(campaignId) => {
              console.log('Campaign created:', campaignId);
              setNewCampaignWizardOpen(false);
              setSelectedCampaignId(campaignId);
              setSelectedCampaignTab('result');
              handleSetActiveSection('campaign-workspace');
            }}
          />
        </div>
      )}

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