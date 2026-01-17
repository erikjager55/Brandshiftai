# 📁 Component Organization Plan - Phase 3

**Date**: December 22, 2024  
**Status**: Planning Complete

---

## 🎯 Folder Structure

```
/components/
├── /brand/                    # Brand-related components
│   ├── AllAssetsDashboard.tsx
│   ├── AssetAccessBadge.tsx
│   ├── AssetOwnershipBanner.tsx
│   ├── AssetProgressBadge.tsx
│   ├── AssetResultsPageNew.tsx
│   ├── BrandAssetDetail.tsx
│   ├── BrandAssetsViewSimple.tsx
│   ├── BrandLibraryNew.tsx
│   ├── BrandMatrixView.tsx
│   ├── BrandOverview.tsx
│   ├── YourBrandStartPage.tsx
│   └── QualityProgressBar.tsx
│
├── /brand-assets/             # KEEP AS IS (already organized)
│   ├── AssetFilters.tsx
│   ├── AssetMethodMatrix.tsx
│   ├── AssetStatusBadge.tsx
│   ├── EnhancedAssetCard.tsx
│   ├── ResearchCoverageBar.tsx
│   └── ResearchMethodBadge.tsx
│
├── /research/                 # Research-related components
│   ├── CrossTargetResearchPanel.tsx
│   ├── ResearchApproachSelection.tsx
│   ├── ResearchDashboard.tsx
│   ├── ResearchHubWithTargets.tsx
│   ├── ResearchMethodCard.tsx
│   ├── ResearchMethodsDashboard.tsx
│   ├── ResearchOptionsView.tsx
│   ├── ResearchPlansSectionGamified.tsx
│   ├── ResearchTargetSelector.tsx
│   ├── ResearchTemplates.tsx
│   ├── ResearchToolComparison.tsx
│   ├── ResearchToolNav.tsx
│   ├── ResearchWorkflow.tsx
│   ├── SessionNavigator.tsx
│   ├── SessionOutcomeHeader.tsx
│   └── StrategicResearchPlanner.tsx
│
├── /persona/                  # Persona-related components
│   ├── PersonaDetail.tsx
│   ├── PersonaResearchMethods.tsx
│   └── PersonasSection.tsx
│
├── /strategy/                 # Strategy-related components
│   └── StrategyHubSection.tsx
│
├── /foundation/               # Foundation/Library components
│   ├── KnowledgeLibrary.tsx
│   ├── ProductsServices.tsx
│   └── TrendLibrary.tsx
│
├── /layout/                   # Layout/Navigation components
│   ├── Dashboard.tsx
│   ├── DashboardView.tsx
│   ├── EnhancedSidebarSimple.tsx
│   └── PageHeader.tsx
│
├── /shared/                   # Shared/Common components
│   └── ErrorBoundary.tsx      # MOVE HERE
│
├── /canvases/                 # KEEP AS IS (already organized)
│   └── ... (all canvas components)
│
├── /services/                 # KEEP AS IS (already organized)
│   └── ... (service components)
│
├── /figma/                    # KEEP AS IS (protected)
│   └── ImageWithFallback.tsx
│
└── /ui/                       # KEEP AS IS (UI library)
    └── ... (all UI components)
```

---

## 📋 Migration Checklist

### Phase 3A: Create Folders & Move Components (2h)

#### Step 1: Create New Folders ✅
- [ ] `/components/brand/`
- [ ] `/components/research/`
- [ ] `/components/persona/`
- [ ] `/components/strategy/`
- [ ] `/components/foundation/`
- [ ] `/components/layout/`
- [ ] `/components/shared/`

#### Step 2: Move Brand Components (12 files)
- [ ] AllAssetsDashboard.tsx
- [ ] AssetAccessBadge.tsx
- [ ] AssetOwnershipBanner.tsx
- [ ] AssetProgressBadge.tsx
- [ ] AssetResultsPageNew.tsx
- [ ] BrandAssetDetail.tsx
- [ ] BrandAssetsViewSimple.tsx
- [ ] BrandLibraryNew.tsx
- [ ] BrandMatrixView.tsx
- [ ] BrandOverview.tsx
- [ ] YourBrandStartPage.tsx
- [ ] QualityProgressBar.tsx

#### Step 3: Move Research Components (16 files)
- [ ] CrossTargetResearchPanel.tsx
- [ ] ResearchApproachSelection.tsx
- [ ] ResearchDashboard.tsx
- [ ] ResearchHubWithTargets.tsx
- [ ] ResearchMethodCard.tsx
- [ ] ResearchMethodsDashboard.tsx
- [ ] ResearchOptionsView.tsx
- [ ] ResearchPlansSectionGamified.tsx
- [ ] ResearchTargetSelector.tsx
- [ ] ResearchTemplates.tsx
- [ ] ResearchToolComparison.tsx
- [ ] ResearchToolNav.tsx
- [ ] ResearchWorkflow.tsx
- [ ] SessionNavigator.tsx
- [ ] SessionOutcomeHeader.tsx
- [ ] StrategicResearchPlanner.tsx

#### Step 4: Move Persona Components (3 files)
- [ ] PersonaDetail.tsx
- [ ] PersonaResearchMethods.tsx
- [ ] PersonasSection.tsx

#### Step 5: Move Strategy Components (1 file)
- [ ] StrategyHubSection.tsx

#### Step 6: Move Foundation Components (3 files)
- [ ] KnowledgeLibrary.tsx
- [ ] ProductsServices.tsx
- [ ] TrendLibrary.tsx

#### Step 7: Move Layout Components (4 files)
- [ ] Dashboard.tsx
- [ ] DashboardView.tsx
- [ ] EnhancedSidebarSimple.tsx
- [ ] PageHeader.tsx

#### Step 8: Move Shared Components (1 file)
- [ ] ErrorBoundary.tsx

### Phase 3B: Update Import Paths (1h)

#### Files that import components:
- [ ] App.tsx (MAIN - most imports)
- [ ] Dashboard.tsx
- [ ] BrandLibraryNew.tsx
- [ ] PersonasSection.tsx
- [ ] ResearchDashboard.tsx
- [ ] StrategyHubSection.tsx
- [ ] Other component files (scan for imports)

---

## 🔄 Import Path Changes

### Before:
```typescript
import { BrandLibraryNew } from './components/BrandLibraryNew';
import { Dashboard } from './components/Dashboard';
import { ErrorBoundary } from './components/ErrorBoundary';
```

### After:
```typescript
import { BrandLibraryNew } from './components/brand/BrandLibraryNew';
import { Dashboard } from './components/layout/Dashboard';
import { ErrorBoundary } from './components/shared/ErrorBoundary';
```

---

## 📊 Migration Statistics

**Total Components to Move**: 39 files  
**New Folders to Create**: 7 folders  
**Files to Update**: ~10-15 files  
**Estimated Time**: 2-3 hours

---

## ✅ Benefits

1. **Better Organization** - Clear separation of concerns
2. **Easier Navigation** - Find components faster
3. **Logical Grouping** - Related components together
4. **Scalability** - Easy to add new components
5. **Onboarding** - New developers understand structure

---

## 🎯 Success Criteria

- [ ] All components in correct folders
- [ ] All imports updated and working
- [ ] No broken imports
- [ ] App builds successfully
- [ ] All features still working
- [ ] Documentation updated

---

**Status**: Ready to execute!
