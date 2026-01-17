#!/bin/bash
# =============================================================================
# BRANDSHIFT.AI - CLEANUP SCRIPT
# Verwijdert ongebruikte componenten, services en utils
# =============================================================================

# Kleuren voor output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}========================================${NC}"
echo -e "${YELLOW}  BRANDSHIFT.AI CLEANUP SCRIPT${NC}"
echo -e "${YELLOW}========================================${NC}"
echo ""

# Maak backup directory
BACKUP_DIR="./backup_unused_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"
echo -e "${GREEN}✓ Backup directory aangemaakt: $BACKUP_DIR${NC}"
echo ""

# =============================================================================
# ONGEBRUIKTE COMPONENTEN (HOOFDMAP)
# =============================================================================
echo -e "${YELLOW}[1/5] Ongebruikte componenten (hoofdmap)...${NC}"

UNUSED_MAIN_COMPONENTS=(
  "components/AdvancedDataView.tsx"
  "components/AssetAccessBadge.tsx"
  "components/AssetOwnershipBanner.tsx"
  "components/AssetProgressBadge.tsx"
  "components/BulkActionBar.tsx"
  "components/BulkActionDialog.tsx"
  "components/BulkSelectionControls.tsx"
  "components/BundleMatrixView.tsx"
  "components/CrossTargetResearchPanel.tsx"
  "components/KeyboardShortcutsModal.tsx"
  "components/PersonaResearchMethods.tsx"
  "components/QualityProgressBar.tsx"
  "components/QuickActionsMenu.tsx"
  "components/QuickStartChecklist.tsx"
  "components/RecentItemsSidebar.tsx"
  "components/RelationshipsWidget.tsx"
  "components/ResearchApproachSelection.tsx"
  "components/ResearchMethodsDashboard.tsx"
  "components/ResearchOptionsView.tsx"
  "components/ResearchTemplates.tsx"
  "components/ResearchToolComparison.tsx"
  "components/ResearchToolNav.tsx"
  "components/StripePaymentForm.tsx"
)

for file in "${UNUSED_MAIN_COMPONENTS[@]}"; do
  if [ -f "$file" ]; then
    mkdir -p "$BACKUP_DIR/$(dirname $file)"
    mv "$file" "$BACKUP_DIR/$file"
    echo -e "  ${RED}✗ Verwijderd:${NC} $file"
  fi
done

# =============================================================================
# ONGEBRUIKTE COMPONENTEN (SUBMAPPEN)
# =============================================================================
echo ""
echo -e "${YELLOW}[2/5] Ongebruikte componenten (submappen)...${NC}"

UNUSED_SUB_COMPONENTS=(
  # brand-assets
  "components/brand-assets/AssetFilters.tsx"
  "components/brand-assets/AssetMethodMatrix.tsx"
  "components/brand-assets/EnhancedAssetCardNew.tsx"
  
  # canvases
  "components/canvases/AIExportOptions.tsx"
  "components/canvases/AIVersionHistory.tsx"
  "components/canvases/AssetRelationshipIndicator.tsx"
  "components/canvases/GoldenCircleVisualization.tsx"
  "components/canvases/QuestionnaireReport.tsx"
  
  # collaboration
  "components/collaboration/CommentsPanel.tsx"
  "components/collaboration/ShareModal.tsx"
  "components/collaboration/TeamManagementModal.tsx"
  
  # commercial
  "components/commercial/TierIndicator.tsx"
  
  # dashboard
  "components/dashboard/DecisionCockpit.tsx"
  "components/dashboard/DecisionStatusSimple.tsx"
  "components/dashboard/NextBestAction.tsx"
  "components/dashboard/PrimaryNextStepCard.tsx"
  "components/dashboard/RiskOverviewPanel.tsx"
  "components/dashboard/TopStrategicRisks.tsx"
  
  # decision-analysis
  "components/decision-analysis/DecisionAnalysisCompact.tsx"
  
  # decision-status
  "components/decision-status/DecisionStatusShowcase.tsx"
  "components/decision-status/PlatformDecisionSummary.tsx"
  "components/decision-status/ResearchImpactIndicator.tsx"
  
  # export
  "components/export/PDFExportModal.tsx"
  
  # impact
  "components/impact/ChangeImpactDemo.tsx"
  
  # personas
  "components/personas/EnhancedPersonaCard.tsx"
  "components/personas/EnhancedPersonaCardUnified.tsx"
  "components/personas/PersonaResearchMethods.tsx"
  "components/personas/PersonaResearchValidationPanel.tsx"
  
  # quality
  "components/quality/QualityMethodConnection.tsx"
  
  # relationships
  "components/relationships/ConsistencyChecker.tsx"
  "components/relationships/ImpactAnalysisModal.tsx"
  "components/relationships/RelationshipGraph.tsx"
  "components/relationships/SmartSuggestionsPanel.tsx"
  
  # research-hub
  "components/research-hub/AssumptionsRegisterPreview.tsx"
  "components/research-hub/DecisionReadinessBlock.tsx"
  "components/research-hub/ImpactPrioritizedActions.tsx"
  "components/research-hub/ResearchDecisionSummary.tsx"
  "components/research-hub/ResearchImpactCard.tsx"
  
  # services
  "components/services/ResearchStatusService.tsx"
  "components/services/SessionDataService.tsx"
  
  # stakeholder
  "components/stakeholder/ExecutiveView.tsx"
  "components/stakeholder/ReportMode.tsx"
  
  # strategy-tools
  "components/strategy-tools/CampaignStrategyGeneratorDetail-clean.tsx"
)

for file in "${UNUSED_SUB_COMPONENTS[@]}"; do
  if [ -f "$file" ]; then
    mkdir -p "$BACKUP_DIR/$(dirname $file)"
    mv "$file" "$BACKUP_DIR/$file"
    echo -e "  ${RED}✗ Verwijderd:${NC} $file"
  fi
done

# =============================================================================
# ONGEBRUIKTE UI COMPONENTEN (shadcn - voorzichtig mee)
# =============================================================================
echo ""
echo -e "${YELLOW}[3/5] Ongebruikte UI componenten...${NC}"

UNUSED_UI_COMPONENTS=(
  "components/ui/FilterBar.tsx"
  "components/ui/ModalHeader.tsx"
  "components/ui/SectionHeader.tsx"
  "components/ui/alert-dialog.tsx"
  "components/ui/aspect-ratio.tsx"
  "components/ui/breadcrumb.tsx"
  "components/ui/calendar.tsx"
  "components/ui/carousel.tsx"
  "components/ui/chart.tsx"
  "components/ui/command.tsx"
  "components/ui/context-menu.tsx"
  "components/ui/drawer.tsx"
  "components/ui/hover-card.tsx"
  "components/ui/input-otp.tsx"
  "components/ui/menubar.tsx"
  "components/ui/navigation-menu.tsx"
  "components/ui/pagination.tsx"
  "components/ui/resizable.tsx"
  "components/ui/sheet.tsx"
  "components/ui/sidebar.tsx"
  "components/ui/table.tsx"
  "components/ui/toggle-group.tsx"
)

for file in "${UNUSED_UI_COMPONENTS[@]}"; do
  if [ -f "$file" ]; then
    mkdir -p "$BACKUP_DIR/$(dirname $file)"
    mv "$file" "$BACKUP_DIR/$file"
    echo -e "  ${RED}✗ Verwijderd:${NC} $file"
  fi
done

# =============================================================================
# ONGEBRUIKTE SERVICES
# =============================================================================
echo ""
echo -e "${YELLOW}[4/5] Ongebruikte services...${NC}"

UNUSED_SERVICES=(
  "services/BulkOperationsService.ts"
)

for file in "${UNUSED_SERVICES[@]}"; do
  if [ -f "$file" ]; then
    mkdir -p "$BACKUP_DIR/$(dirname $file)"
    mv "$file" "$BACKUP_DIR/$file"
    echo -e "  ${RED}✗ Verwijderd:${NC} $file"
  fi
done

# =============================================================================
# ONGEBRUIKTE UTILS
# =============================================================================
echo ""
echo -e "${YELLOW}[5/5] Ongebruikte utils...${NC}"

UNUSED_UTILS=(
  "utils/asset-decision-calculator.ts"
  "utils/assignPriorities.ts"
  "utils/brandHelpers.ts"
  "utils/compliance-checker.ts"
  "utils/design-helpers.ts"
  "utils/persona-decision-calculator.ts"
  "utils/research-hub-decision-transformer.ts"
  "utils/research-mapping.ts"
)

for file in "${UNUSED_UTILS[@]}"; do
  if [ -f "$file" ]; then
    mkdir -p "$BACKUP_DIR/$(dirname $file)"
    mv "$file" "$BACKUP_DIR/$file"
    echo -e "  ${RED}✗ Verwijderd:${NC} $file"
  fi
done

# =============================================================================
# DEPRECATED FOLDER
# =============================================================================
echo ""
echo -e "${YELLOW}[BONUS] _DEPRECATED folder...${NC}"

if [ -d "components/_DEPRECATED" ]; then
  mv "components/_DEPRECATED" "$BACKUP_DIR/components/_DEPRECATED"
  echo -e "  ${RED}✗ Verwijderd:${NC} components/_DEPRECATED/"
fi

# =============================================================================
# SAMENVATTING
# =============================================================================
echo ""
echo -e "${YELLOW}========================================${NC}"
echo -e "${GREEN}  CLEANUP VOLTOOID!${NC}"
echo -e "${YELLOW}========================================${NC}"
echo ""

# Tel verwijderde bestanden
REMOVED_COUNT=$(find "$BACKUP_DIR" -type f | wc -l)
REMOVED_SIZE=$(du -sh "$BACKUP_DIR" 2>/dev/null | cut -f1)

echo -e "Verwijderde bestanden: ${RED}$REMOVED_COUNT${NC}"
echo -e "Vrijgemaakte ruimte:   ${RED}$REMOVED_SIZE${NC}"
echo -e "Backup locatie:        ${GREEN}$BACKUP_DIR${NC}"
echo ""
echo -e "${YELLOW}TIP:${NC} Als alles werkt, verwijder de backup met:"
echo -e "     rm -rf $BACKUP_DIR"
echo ""
