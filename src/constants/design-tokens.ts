/**
 * Design Tokens - Single Source of Truth
 * 
 * ALLE DESIGN BESLISSINGEN STAAN HIER
 * Importeer deze tokens in plaats van hardcoded waarden te gebruiken
 */

// ============================================================================
// ICON STANDARDS - Gebruik ALTIJD deze icons
// ============================================================================

export { 
  Trash2 as DeleteIcon,
  Plus as AddIcon,
  Edit as EditIcon,
  CheckCircle2 as CheckIcon,
  X as CloseIcon,
  Lock as LockIcon,
  Unlock as UnlockIcon,
  Eye as ViewIcon,
  EyeOff as HideIcon,
  Search as SearchIcon,
  Filter as FilterIcon,
  ChevronRight as ChevronIcon,
  ArrowRight as ArrowIcon,
  MoreHorizontal as MoreIcon,
  Settings as SettingsIcon,
  RefreshCw as RefreshIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
  Share2 as ShareIcon,
  Copy as CopyIcon,
  AlertTriangle as WarningIcon,
  Info as InfoIcon,
  HelpCircle as HelpIcon,
} from 'lucide-react';

// ============================================================================
// COLOR TOKENS - Status kleuren
// ============================================================================

export const STATUS_COLORS = {
  // Success - Groen
  success: {
    text: 'text-green-600',
    textDark: 'dark:text-green-400',
    bg: 'bg-green-50',
    bgDark: 'dark:bg-green-900/20',
    border: 'border-green-200',
    borderDark: 'dark:border-green-800',
    icon: 'text-green-600',
  },
  
  // Warning - Amber
  warning: {
    text: 'text-amber-600',
    textDark: 'dark:text-amber-400',
    bg: 'bg-amber-50',
    bgDark: 'dark:bg-amber-900/20',
    border: 'border-amber-200',
    borderDark: 'dark:border-amber-800',
    icon: 'text-amber-600',
  },
  
  // Error - Red
  error: {
    text: 'text-red-600',
    textDark: 'dark:text-red-400',
    bg: 'bg-red-50',
    bgDark: 'dark:bg-red-900/20',
    border: 'border-red-200',
    borderDark: 'dark:border-red-800',
    icon: 'text-red-600',
  },
  
  // Info - Blue
  info: {
    text: 'text-blue-600',
    textDark: 'dark:text-blue-400',
    bg: 'bg-blue-50',
    bgDark: 'dark:bg-blue-900/20',
    border: 'border-blue-200',
    borderDark: 'dark:border-blue-800',
    icon: 'text-blue-600',
  },
  
  // Neutral - Gray
  neutral: {
    text: 'text-gray-600',
    textDark: 'dark:text-gray-400',
    bg: 'bg-gray-50',
    bgDark: 'dark:bg-gray-900/20',
    border: 'border-gray-200',
    borderDark: 'dark:border-gray-800',
    icon: 'text-gray-600',
  },
  
  // Locked - Amber variant
  locked: {
    text: 'text-amber-700',
    textDark: 'dark:text-amber-400',
    bg: 'bg-amber-50',
    bgDark: 'dark:bg-amber-900/20',
    border: 'border-amber-300',
    borderDark: 'dark:border-amber-700',
    icon: 'text-amber-600',
  },
} as const;

// Helper function to get full status class string
export function getStatusClasses(status: keyof typeof STATUS_COLORS) {
  const colors = STATUS_COLORS[status];
  return `${colors.bg} ${colors.bgDark} ${colors.text} ${colors.textDark} ${colors.border} ${colors.borderDark}`;
}

// ============================================================================
// SPACING TOKENS
// ============================================================================

export const SPACING = {
  // Padding
  card: 'p-6',           // Standard card padding
  cardCompact: 'p-4',    // Compact card padding
  cardLarge: 'p-8',      // Large/hero card padding
  section: 'py-6',       // Section vertical padding
  
  // Gap
  inline: 'gap-1',       // Inline elements (icon + text)
  tight: 'gap-2',        // Tight spacing
  default: 'gap-3',      // Default spacing
  relaxed: 'gap-4',      // Relaxed spacing
  section: 'gap-6',      // Section spacing
  
  // Margin
  elementY: 'space-y-4', // Between elements vertically
  sectionY: 'space-y-6', // Between sections
} as const;

// ============================================================================
// TYPOGRAPHY TOKENS
// ============================================================================

export const TYPOGRAPHY = {
  // Headings
  pageTitle: 'text-3xl font-semibold',
  sectionTitle: 'text-xl font-semibold',
  cardTitle: 'text-lg font-semibold',
  subsectionTitle: 'text-base font-semibold',
  
  // Body
  body: 'text-sm',
  bodyLarge: 'text-base',
  
  // Small text
  label: 'text-xs font-medium uppercase tracking-wide',
  meta: 'text-xs text-muted-foreground',
  helper: 'text-xs text-muted-foreground',
  
  // Special
  stat: 'text-2xl font-bold',
  statLarge: 'text-3xl font-bold',
} as const;

// ============================================================================
// BORDER RADIUS TOKENS
// ============================================================================

export const RADIUS = {
  card: 'rounded-xl',
  button: 'rounded-xl',
  input: 'rounded-lg',
  badge: 'rounded-md',
  avatar: 'rounded-full',
  modal: 'rounded-2xl',
  tag: 'rounded-full',
} as const;

// ============================================================================
// ICON SIZE TOKENS
// ============================================================================

export const ICON_SIZES = {
  xs: 'h-3 w-3',
  sm: 'h-3.5 w-3.5',
  default: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
  xl: 'h-8 w-8',
  '2xl': 'h-10 w-10',
  '3xl': 'h-12 w-12',
} as const;

// ============================================================================
// TRANSITION TOKENS
// ============================================================================

export const TRANSITIONS = {
  fast: 'transition-colors duration-150',
  default: 'transition-all duration-200',
  slow: 'transition-all duration-300',
  modal: 'transition-all duration-300 ease-out',
} as const;

// ============================================================================
// SHADOW TOKENS
// ============================================================================

export const SHADOWS = {
  sm: 'shadow-sm',
  default: 'shadow-md',
  lg: 'shadow-lg',
  hover: 'hover:shadow-lg',
  card: 'shadow-sm hover:shadow-md',
} as const;

// ============================================================================
// LAYOUT TOKENS
// ============================================================================

export const LAYOUT = {
  maxWidth: 'max-w-7xl',
  containerPadding: 'px-8',
  sidebarWidth: 'w-64',
  
  // Grid patterns
  grid2: 'grid grid-cols-1 md:grid-cols-2',
  grid3: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  grid4: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
} as const;

// ============================================================================
// COMPONENT PATTERNS - Pre-composed class strings
// ============================================================================

export const PATTERNS = {
  // Page header
  pageHeader: 'sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b',
  pageHeaderContent: 'max-w-7xl mx-auto px-8 py-6',
  
  // Card styles
  card: 'rounded-xl border bg-card shadow-sm',
  cardHover: 'rounded-xl border bg-card shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-200 cursor-pointer',
  cardHighlight: 'rounded-xl border-2 border-primary/20 bg-primary/5',
  
  // Stat card
  statCard: 'p-4 rounded-xl border bg-card',
  statValue: 'text-2xl font-bold text-primary',
  statLabel: 'text-xs font-medium text-muted-foreground uppercase tracking-wide',
  
  // List item
  listItem: 'flex items-center gap-3 p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors cursor-pointer',
  
  // Icon container
  iconContainer: 'h-10 w-10 rounded-lg flex items-center justify-center',
  iconContainerSm: 'h-8 w-8 rounded-lg flex items-center justify-center',
  iconContainerLg: 'h-12 w-12 rounded-xl flex items-center justify-center',
  
  // Search bar
  searchWrapper: 'relative flex-1',
  searchIcon: 'absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none',
  searchInput: 'pl-10 h-10',
  
  // Empty state
  emptyState: 'py-12 text-center',
  emptyStateIcon: 'mx-auto h-16 w-16 rounded-xl bg-muted flex items-center justify-center mb-4',
} as const;
