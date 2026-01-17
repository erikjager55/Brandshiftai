/**
 * Unified Action Components
 * Standardized buttons, icons, and action patterns for consistency
 * 
 * USE THESE COMPONENTS instead of creating custom implementations!
 */

import React from 'react';
import { Button } from './button';
import { Badge } from './badge';
import {
  Trash2,
  Lock,
  Unlock,
  Edit,
  Eye,
  EyeOff,
  Plus,
  X,
  Check,
  ChevronRight,
  ArrowRight,
  Download,
  Upload,
  Share2,
  Copy,
  MoreHorizontal,
  Settings,
  RefreshCw,
  ExternalLink,
  type LucideIcon
} from 'lucide-react';
import { cn } from '../../lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip';

// ============================================================================
// STANDARDIZED ICON MAPPINGS
// Always use these icons for consistency across the app
// ============================================================================

export const STANDARD_ICONS = {
  // Destructive actions
  delete: Trash2,
  remove: Trash2,
  
  // Lock/Unlock
  lock: Lock,
  unlock: Unlock,
  locked: Lock,
  unlocked: Unlock,
  
  // Edit/View
  edit: Edit,
  view: Eye,
  hide: EyeOff,
  
  // Add/Create
  add: Plus,
  create: Plus,
  new: Plus,
  
  // Close/Cancel
  close: X,
  cancel: X,
  dismiss: X,
  
  // Confirm/Success
  confirm: Check,
  success: Check,
  done: Check,
  
  // Navigation
  next: ChevronRight,
  forward: ArrowRight,
  navigate: ChevronRight,
  
  // File operations
  download: Download,
  upload: Upload,
  export: Download,
  import: Upload,
  
  // Share/Copy
  share: Share2,
  copy: Copy,
  
  // Misc
  more: MoreHorizontal,
  settings: Settings,
  refresh: RefreshCw,
  external: ExternalLink,
} as const;

// ============================================================================
// ICON BUTTON - Standard icon-only button with tooltip
// ============================================================================

interface IconButtonProps {
  icon: keyof typeof STANDARD_ICONS | LucideIcon;
  label: string;
  onClick?: () => void;
  variant?: 'ghost' | 'outline' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

export function IconButton({
  icon,
  label,
  onClick,
  variant = 'ghost',
  size = 'md',
  disabled = false,
  className,
}: IconButtonProps) {
  const Icon = typeof icon === 'string' ? STANDARD_ICONS[icon] : icon;
  
  const sizeClasses = {
    sm: 'h-7 w-7 [&_svg]:h-3.5 [&_svg]:w-3.5',
    md: 'h-8 w-8 [&_svg]:h-4 [&_svg]:w-4',
    lg: 'h-10 w-10 [&_svg]:h-5 [&_svg]:w-5',
  };

  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={variant}
            size="icon"
            onClick={onClick}
            disabled={disabled}
            className={cn(sizeClasses[size], className)}
          >
            <Icon />
            <span className="sr-only">{label}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// ============================================================================
// DELETE BUTTON - Standard delete action
// ============================================================================

interface DeleteButtonProps {
  onDelete: () => void;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  disabled?: boolean;
  className?: string;
}

export function DeleteButton({
  onDelete,
  label = 'Delete',
  size = 'md',
  showLabel = false,
  disabled = false,
  className,
}: DeleteButtonProps) {
  if (showLabel) {
    return (
      <Button
        variant="ghost"
        size={size === 'lg' ? 'default' : 'sm'}
        onClick={onDelete}
        disabled={disabled}
        className={cn('text-destructive hover:text-destructive hover:bg-destructive/10', className)}
      >
        <Trash2 className="h-4 w-4 mr-2" />
        {label}
      </Button>
    );
  }

  return (
    <IconButton
      icon="delete"
      label={label}
      onClick={onDelete}
      variant="ghost"
      size={size}
      disabled={disabled}
      className={cn('text-muted-foreground hover:text-destructive hover:bg-destructive/10', className)}
    />
  );
}

// ============================================================================
// LOCK/UNLOCK BUTTON - Standard lock toggle
// ============================================================================

interface LockButtonProps {
  isLocked: boolean;
  onToggle: () => void;
  lockedLabel?: string;
  unlockedLabel?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  disabled?: boolean;
  className?: string;
}

export function LockButton({
  isLocked,
  onToggle,
  lockedLabel = 'Unlock',
  unlockedLabel = 'Lock',
  size = 'md',
  showLabel = false,
  disabled = false,
  className,
}: LockButtonProps) {
  const Icon = isLocked ? Lock : Unlock;
  const label = isLocked ? lockedLabel : unlockedLabel;

  if (showLabel) {
    return (
      <Button
        variant="outline"
        size={size === 'lg' ? 'default' : 'sm'}
        onClick={onToggle}
        disabled={disabled}
        className={cn(
          isLocked ? 'text-amber-600 border-amber-200 hover:bg-amber-50' : '',
          className
        )}
      >
        <Icon className="h-4 w-4 mr-2" />
        {label}
      </Button>
    );
  }

  return (
    <IconButton
      icon={isLocked ? 'lock' : 'unlock'}
      label={label}
      onClick={onToggle}
      variant="ghost"
      size={size}
      disabled={disabled}
      className={cn(
        isLocked ? 'text-amber-600 hover:text-amber-700 hover:bg-amber-50' : '',
        className
      )}
    />
  );
}

// ============================================================================
// EDIT BUTTON - Standard edit action
// ============================================================================

interface EditButtonProps {
  onEdit: () => void;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  disabled?: boolean;
  className?: string;
}

export function EditButton({
  onEdit,
  label = 'Edit',
  size = 'md',
  showLabel = false,
  disabled = false,
  className,
}: EditButtonProps) {
  if (showLabel) {
    return (
      <Button
        variant="outline"
        size={size === 'lg' ? 'default' : 'sm'}
        onClick={onEdit}
        disabled={disabled}
        className={className}
      >
        <Edit className="h-4 w-4 mr-2" />
        {label}
      </Button>
    );
  }

  return (
    <IconButton
      icon="edit"
      label={label}
      onClick={onEdit}
      variant="ghost"
      size={size}
      disabled={disabled}
      className={className}
    />
  );
}

// ============================================================================
// VIEW/HIDE BUTTON - Standard visibility toggle
// ============================================================================

interface ViewButtonProps {
  isVisible: boolean;
  onToggle: () => void;
  visibleLabel?: string;
  hiddenLabel?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

export function ViewButton({
  isVisible,
  onToggle,
  visibleLabel = 'Hide',
  hiddenLabel = 'Show',
  size = 'md',
  disabled = false,
  className,
}: ViewButtonProps) {
  return (
    <IconButton
      icon={isVisible ? 'hide' : 'view'}
      label={isVisible ? visibleLabel : hiddenLabel}
      onClick={onToggle}
      variant="ghost"
      size={size}
      disabled={disabled}
      className={className}
    />
  );
}

// ============================================================================
// ADD BUTTON - Standard add/create action
// ============================================================================

interface AddButtonProps {
  onAdd: () => void;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'ghost';
  disabled?: boolean;
  className?: string;
}

export function AddButton({
  onAdd,
  label = 'Add',
  size = 'md',
  variant = 'default',
  disabled = false,
  className,
}: AddButtonProps) {
  return (
    <Button
      variant={variant}
      size={size === 'lg' ? 'lg' : size === 'sm' ? 'sm' : 'default'}
      onClick={onAdd}
      disabled={disabled}
      className={cn('gap-2', className)}
    >
      <Plus className="h-4 w-4" />
      {label}
    </Button>
  );
}

// ============================================================================
// CTA BUTTON - Standard call-to-action with arrow animation
// ============================================================================

interface CTAButtonProps {
  onClick: () => void;
  label: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'success';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

export function CTAButton({
  onClick,
  label,
  size = 'md',
  variant = 'primary',
  disabled = false,
  loading = false,
  className,
}: CTAButtonProps) {
  return (
    <Button
      variant={variant === 'success' ? 'ctaSuccess' : 'cta'}
      animated
      size={size === 'lg' ? 'lg' : size === 'sm' ? 'sm' : 'default'}
      onClick={onClick}
      disabled={disabled || loading}
      className={cn('gap-2', className)}
    >
      {loading ? (
        <RefreshCw className="h-4 w-4 animate-spin" />
      ) : null}
      {label}
      {!loading && <ArrowRight className="h-4 w-4 arrow-icon" />}
    </Button>
  );
}

// ============================================================================
// STATUS BADGE - Standard status indicator
// ============================================================================

type StatusType = 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'locked';

interface StatusBadgeProps {
  status: StatusType;
  label: string;
  size?: 'sm' | 'md';
  className?: string;
}

const statusStyles: Record<StatusType, string> = {
  success: 'bg-green-100 text-green-800 border-green-200',
  warning: 'bg-amber-100 text-amber-800 border-amber-200',
  error: 'bg-red-100 text-red-800 border-red-200',
  info: 'bg-blue-100 text-blue-800 border-blue-200',
  neutral: 'bg-gray-100 text-gray-800 border-gray-200',
  locked: 'bg-amber-100 text-amber-800 border-amber-200',
};

const statusIcons: Record<StatusType, LucideIcon | null> = {
  success: Check,
  warning: null,
  error: X,
  info: null,
  neutral: null,
  locked: Lock,
};

export function StatusBadge({
  status,
  label,
  size = 'md',
  className,
}: StatusBadgeProps) {
  const Icon = statusIcons[status];
  
  return (
    <Badge
      variant="outline"
      className={cn(
        statusStyles[status],
        size === 'sm' ? 'text-xs px-1.5 py-0.5' : 'text-xs px-2 py-1',
        className
      )}
    >
      {Icon && <Icon className="h-3 w-3 mr-1" />}
      {label}
    </Badge>
  );
}

// ============================================================================
// ACTION GROUP - Standard group of action buttons
// ============================================================================

interface ActionGroupProps {
  children: React.ReactNode;
  className?: string;
}

export function ActionGroup({ children, className }: ActionGroupProps) {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      {children}
    </div>
  );
}

// ============================================================================
// MORE ACTIONS MENU TRIGGER - Standard "..." button
// ============================================================================

interface MoreActionsProps {
  className?: string;
}

export function MoreActionsButton({ className }: MoreActionsProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn('h-8 w-8', className)}
    >
      <MoreHorizontal className="h-4 w-4" />
      <span className="sr-only">More actions</span>
    </Button>
  );
}
