#!/bin/bash
# Phase 3 Component Migration Script
# This script documents the file moves needed for Phase 3

echo "🚀 Phase 3: Component Organization - Migration Script"
echo "======================================================"
echo ""

# Create new folder structure
echo "📁 Step 1: Creating folder structure..."
mkdir -p components/brand
mkdir -p components/research
mkdir -p components/persona
mkdir -p components/strategy
mkdir -p components/foundation
mkdir -p components/layout
mkdir -p components/shared

echo "✅ Folders created!"
echo ""

# Move Brand Components
echo "📦 Step 2: Moving Brand components..."
mv components/AllAssetsDashboard.tsx components/brand/
mv components/AssetAccessBadge.tsx components/brand/
mv components/AssetOwnershipBanner.tsx components/brand/
mv components/AssetProgressBadge.tsx components/brand/
mv components/AssetResultsPageNew.tsx components/brand/
mv components/BrandAssetDetail.tsx components/brand/
mv components/BrandAssetsViewSimple.tsx components/brand/
mv components/BrandLibraryNew.tsx components/brand/
mv components/BrandMatrixView.tsx components/brand/
mv components/BrandOverview.tsx components/brand/
mv components/YourBrandStartPage.tsx components/brand/
mv components/QualityProgressBar.tsx components/brand/
echo "✅ Brand components moved (12 files)"

# Move Research Components
echo "📦 Step 3: Moving Research components..."
mv components/CrossTargetResearchPanel.tsx components/research/
mv components/ResearchApproachSelection.tsx components/research/
mv components/ResearchDashboard.tsx components/research/
mv components/ResearchHubWithTargets.tsx components/research/
mv components/ResearchMethodCard.tsx components/research/
mv components/ResearchMethodsDashboard.tsx components/research/
mv components/ResearchOptionsView.tsx components/research/
mv components/ResearchPlansSectionGamified.tsx components/research/
mv components/ResearchTargetSelector.tsx components/research/
mv components/ResearchTemplates.tsx components/research/
mv components/ResearchToolComparison.tsx components/research/
mv components/ResearchToolNav.tsx components/research/
mv components/ResearchWorkflow.tsx components/research/
mv components/SessionNavigator.tsx components/research/
mv components/SessionOutcomeHeader.tsx components/research/
mv components/StrategicResearchPlanner.tsx components/research/
echo "✅ Research components moved (16 files)"

# Move Persona Components
echo "📦 Step 4: Moving Persona components..."
mv components/PersonaDetail.tsx components/persona/
mv components/PersonaResearchMethods.tsx components/persona/
mv components/PersonasSection.tsx components/persona/
echo "✅ Persona components moved (3 files)"

# Move Strategy Components
echo "📦 Step 5: Moving Strategy components..."
mv components/StrategyHubSection.tsx components/strategy/
echo "✅ Strategy components moved (1 file)"

# Move Foundation Components
echo "📦 Step 6: Moving Foundation components..."
mv components/KnowledgeLibrary.tsx components/foundation/
mv components/ProductsServices.tsx components/foundation/
mv components/TrendLibrary.tsx components/foundation/
echo "✅ Foundation components moved (3 files)"

# Move Layout Components
echo "📦 Step 7: Moving Layout components..."
mv components/Dashboard.tsx components/layout/
mv components/DashboardView.tsx components/layout/
mv components/EnhancedSidebarSimple.tsx components/layout/
mv components/PageHeader.tsx components/layout/
echo "✅ Layout components moved (4 files)"

# Move Shared Components
echo "📦 Step 8: Moving Shared components..."
mv components/ErrorBoundary.tsx components/shared/
echo "✅ Shared components moved (1 file)"

echo ""
echo "✅ All components moved successfully!"
echo ""
echo "⚠️  IMPORTANT: You now need to update import paths in:"
echo "   - App.tsx"
echo "   - All moved component files (update relative imports)"
echo ""
echo "🎯 Total: 40 files moved into 7 new folders"
