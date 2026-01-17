/**
 * Unified UI Components Index
 * 
 * Import all standardized components from here for consistency!
 * 
 * Example usage:
 * import { SearchBar, DeleteButton, StatCard, CTAButton } from '@/components/ui/unified';
 */

// ============================================================================
// ACTION COMPONENTS
// ============================================================================
export {
  // Standard icon mappings
  STANDARD_ICONS,
  
  // Icon buttons
  IconButton,
  DeleteButton,
  LockButton,
  EditButton,
  ViewButton,
  AddButton,
  CTAButton,
  MoreActionsButton,
  
  // Status & Groups
  StatusBadge,
  ActionGroup,
} from './ActionComponents';

// ============================================================================
// SEARCH & FILTER COMPONENTS
// ============================================================================
export {
  // Search
  SearchBar,
  
  // Filters
  FilterSelect,
  FilterDropdown,
  
  // Combined
  SearchFilterBar,
  ActiveFilters,
  QuickFilterTabs,
} from './SearchFilter';

// ============================================================================
// CARD VARIANTS
// ============================================================================
export {
  // Stats
  StatCard,
  
  // List items
  ListItemCard,
  
  // Actions
  ActionCard,
  
  // Features
  FeatureCard,
  
  // Sections
  SectionCard,
  
  // Empty states
  EmptyStateCard,
} from './CardVariants';

// ============================================================================
// SUCCESS & CELEBRATION
// ============================================================================
export {
  SuccessCelebration,
  useSuccessCelebration,
  SuccessCheckmark,
} from './SuccessCelebration';

// ============================================================================
// USAGE GUIDE
// ============================================================================
/**
 * WHEN TO USE WHAT:
 * 
 * BUTTONS:
 * - DeleteButton: For all delete/remove actions (uses Trash2 icon)
 * - LockButton: For lock/unlock toggles
 * - EditButton: For edit actions
 * - AddButton: For add/create actions (uses Plus icon)
 * - CTAButton: For primary call-to-actions with arrow animation
 * - IconButton: For any other icon-only button with tooltip
 * 
 * SEARCH & FILTER:
 * - SearchBar: Standalone search input
 * - FilterSelect: Single-select dropdown filter
 * - FilterDropdown: Multi-select filter with checkboxes
 * - SearchFilterBar: Combined search + filters (most common)
 * - QuickFilterTabs: Tab-style status filters
 * 
 * CARDS:
 * - StatCard: For displaying metrics/numbers
 * - ListItemCard: For clickable list items
 * - ActionCard: For prominent CTAs
 * - FeatureCard: For feature/tool display
 * - SectionCard: For grouping content
 * - EmptyStateCard: For empty states
 * 
 * ICONS (use STANDARD_ICONS for consistency):
 * - delete/remove: Trash2
 * - lock/unlock: Lock/Unlock
 * - edit: Edit
 * - view/hide: Eye/EyeOff
 * - add/create: Plus
 * - close/cancel: X
 * - confirm: Check
 */
