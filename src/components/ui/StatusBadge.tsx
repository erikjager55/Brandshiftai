import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

/**
 * ============================================================================
 * STATUS BADGE - SINGLE SOURCE OF TRUTH
 * ============================================================================
 * 
 * Consistent StatusBadge systeem met exact 6 semantische varianten.
 * 
 * DESIGN PRINCIPES:
 * - Badges zijn NOOIT klikbaar (geen onClick)
 * - Kleur + tekst communiceren samen de status
 * - Alle badges: rounded-full, text-xs, font-medium, px-2.5 py-0.5
 * - Optioneel icon support voor extra context
 * 
 * VARIANTEN:
 * 1. SUCCESS (groen) - Positief afgerond
 * 2. WARNING (amber) - Actie nodig
 * 3. ERROR (rood) - Probleem/geblokkeerd
 * 4. INFO (blauw) - Informatief/nieuw
 * 5. NEUTRAL (grijs) - Inactief/default
 * 6. LOCKED (amber accent) - Premium/vergrendeld
 * 
 * ============================================================================
 */

// ============================================================================
// TYPES
// ============================================================================

export type StatusBadgeVariant = 
  | 'success'  // Completed, Ready, Active, Validated, Approved
  | 'warning'  // Pending, In Progress, Needs Attention, Draft
  | 'error'    // Failed, Error, Blocked, Rejected, Overdue
  | 'info'     // New, Processing, Info, Beta, Updated
  | 'neutral'  // Inactive, Disabled, Archived, None
  | 'locked';  // Premium, Pro, Locked, Upgrade Required

export interface StatusBadgeProps {
  /**
   * Semantische variant met specifieke betekenis
   */
  variant: StatusBadgeVariant;
  
  /**
   * Badge tekst
   */
  children: React.ReactNode;
  
  /**
   * Optioneel Lucide icon (h-3 w-3 size)
   */
  icon?: LucideIcon;
  
  /**
   * Extra CSS classes
   */
  className?: string;
}

// ============================================================================
// VARIANT CONFIGURATIONS
// ============================================================================

const VARIANT_STYLES: Record<StatusBadgeVariant, string> = {
  success: 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800',
  warning: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800',
  error: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800',
  info: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800',
  neutral: 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700',
  locked: 'bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700',
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function StatusBadge({ 
  variant, 
  children, 
  icon: Icon,
  className 
}: StatusBadgeProps) {
  return (
    <span 
      className={cn(
        // Base styles - consistent voor alle badges
        'inline-flex items-center gap-1',
        'rounded-full border',
        'text-xs font-medium',
        'px-2.5 py-0.5',
        // Variant-specifieke kleuren
        VARIANT_STYLES[variant],
        className
      )}
    >
      {Icon && <Icon className="h-3 w-3" />}
      {children}
    </span>
  );
}

/**
 * ============================================================================
 * SPECIALIZED BADGE VARIANTS (Convenience Components)
 * ============================================================================
 */

/**
 * Success Badge - Groen voor positief afgeronde statussen
 * Gebruik voor: Completed, Ready, Active, Validated, Approved
 */
export function SuccessBadge({ 
  children, 
  icon, 
  className 
}: Omit<StatusBadgeProps, 'variant'>) {
  return (
    <StatusBadge variant="success" icon={icon} className={className}>
      {children}
    </StatusBadge>
  );
}

/**
 * Warning Badge - Amber voor statussen die actie vereisen
 * Gebruik voor: Pending, In Progress, Needs Attention, Draft
 */
export function WarningBadge({ 
  children, 
  icon, 
  className 
}: Omit<StatusBadgeProps, 'variant'>) {
  return (
    <StatusBadge variant="warning" icon={icon} className={className}>
      {children}
    </StatusBadge>
  );
}

/**
 * Error Badge - Rood voor problemen en geblokkeerde statussen
 * Gebruik voor: Failed, Error, Blocked, Rejected, Overdue
 */
export function ErrorBadge({ 
  children, 
  icon, 
  className 
}: Omit<StatusBadgeProps, 'variant'>) {
  return (
    <StatusBadge variant="error" icon={icon} className={className}>
      {children}
    </StatusBadge>
  );
}

/**
 * Info Badge - Blauw voor informatieve en nieuwe statussen
 * Gebruik voor: New, Processing, Info, Beta, Updated
 */
export function InfoBadge({ 
  children, 
  icon, 
  className 
}: Omit<StatusBadgeProps, 'variant'>) {
  return (
    <StatusBadge variant="info" icon={icon} className={className}>
      {children}
    </StatusBadge>
  );
}

/**
 * Neutral Badge - Grijs voor inactieve en default statussen
 * Gebruik voor: Inactive, Disabled, Archived, None
 */
export function NeutralBadge({ 
  children, 
  icon, 
  className 
}: Omit<StatusBadgeProps, 'variant'>) {
  return (
    <StatusBadge variant="neutral" icon={icon} className={className}>
      {children}
    </StatusBadge>
  );
}

/**
 * Locked Badge - Amber accent voor premium/vergrendelde features
 * Gebruik voor: Premium, Pro, Locked, Upgrade Required
 * Vaak gecombineerd met Lock icon
 */
export function LockedBadge({ 
  children, 
  icon, 
  className 
}: Omit<StatusBadgeProps, 'variant'>) {
  return (
    <StatusBadge variant="locked" icon={icon} className={className}>
      {children}
    </StatusBadge>
  );
}
