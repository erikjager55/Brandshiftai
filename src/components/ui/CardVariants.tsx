/**
 * Unified Card Variants
 * Standardized card styles and patterns for consistency
 * 
 * USE THESE COMPONENTS instead of creating custom card implementations!
 */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from './card';
import { Badge } from './badge';
import { Button } from './button';
import { Progress } from './progress';
import { 
  ChevronRight, 
  ArrowRight,
  LucideIcon,
  MoreHorizontal,
} from 'lucide-react';
import { cn } from '../../lib/utils';

// ============================================================================
// STAT CARD - Standard statistics display
// ============================================================================

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  iconColor?: string;
  trend?: {
    value: number;
    label?: string;
    isPositive?: boolean;
  };
  progress?: number;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'muted';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
}

const statVariantStyles = {
  default: '',
  success: 'border-green-200 bg-green-50/50',
  warning: 'border-amber-200 bg-amber-50/50',
  error: 'border-red-200 bg-red-50/50',
  muted: 'border-gray-200 bg-gray-50/50',
};

const statValueStyles = {
  default: 'text-foreground',
  success: 'text-green-600',
  warning: 'text-amber-600',
  error: 'text-red-600',
  muted: 'text-gray-400',
};

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = 'text-primary',
  trend,
  progress,
  variant = 'default',
  size = 'md',
  onClick,
  className,
}: StatCardProps) {
  const sizeClasses = {
    sm: { padding: 'p-3', title: 'text-xs', value: 'text-xl', icon: 'h-4 w-4' },
    md: { padding: 'p-4', title: 'text-xs', value: 'text-2xl', icon: 'h-4 w-4' },
    lg: { padding: 'p-6', title: 'text-sm', value: 'text-3xl', icon: 'h-5 w-5' },
  };

  const styles = sizeClasses[size];

  return (
    <Card 
      className={cn(
        statVariantStyles[variant],
        onClick && 'cursor-pointer hover:shadow-md transition-shadow',
        className
      )}
      onClick={onClick}
    >
      <CardContent className={styles.padding}>
        <div className="flex items-center justify-between mb-1">
          <span className={cn(styles.title, 'font-medium text-muted-foreground uppercase tracking-wide')}>
            {title}
          </span>
          {Icon && <Icon className={cn(styles.icon, iconColor)} />}
        </div>
        <div className={cn(styles.value, 'font-bold', statValueStyles[variant])}>
          {value}
        </div>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        )}
        {trend && (
          <div className={cn(
            'flex items-center gap-1 mt-2 text-xs font-medium',
            trend.isPositive ? 'text-green-600' : 'text-red-600'
          )}>
            <span>{trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%</span>
            {trend.label && <span className="text-muted-foreground">{trend.label}</span>}
          </div>
        )}
        {progress !== undefined && (
          <Progress value={progress} className="h-1.5 mt-2" />
        )}
      </CardContent>
    </Card>
  );
}

// ============================================================================
// LIST ITEM CARD - Standard clickable list item
// ============================================================================

interface ListItemCardProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  iconColor?: string;
  iconBgColor?: string;
  badge?: {
    label: string;
    variant?: 'default' | 'success' | 'warning' | 'error';
  };
  meta?: string;
  onClick?: () => void;
  showArrow?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const badgeVariantStyles = {
  default: 'bg-gray-100 text-gray-800',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-amber-100 text-amber-800',
  error: 'bg-red-100 text-red-800',
};

export function ListItemCard({
  title,
  subtitle,
  icon: Icon,
  iconColor = 'text-primary',
  iconBgColor = 'bg-primary/10',
  badge,
  meta,
  onClick,
  showArrow = true,
  className,
  children,
}: ListItemCardProps) {
  return (
    <div
      className={cn(
        'flex items-start gap-3 p-4 rounded-lg border bg-card',
        onClick && 'cursor-pointer hover:bg-muted/50 hover:border-primary/30 transition-colors group',
        className
      )}
      onClick={onClick}
    >
      {Icon && (
        <div className={cn('h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0', iconBgColor)}>
          <Icon className={cn('h-5 w-5', iconColor)} />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-medium truncate">{title}</h4>
          {badge && (
            <Badge variant="outline" className={cn('text-xs', badgeVariantStyles[badge.variant || 'default'])}>
              {badge.label}
            </Badge>
          )}
        </div>
        {subtitle && (
          <p className="text-sm text-muted-foreground line-clamp-2">{subtitle}</p>
        )}
        {meta && (
          <p className="text-xs text-muted-foreground mt-1">{meta}</p>
        )}
        {children}
      </div>
      {onClick && showArrow && (
        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
      )}
    </div>
  );
}

// ============================================================================
// ACTION CARD - Card with prominent CTA
// ============================================================================

interface ActionCardProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  iconColor?: string;
  actionLabel: string;
  onAction: () => void;
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  variant?: 'default' | 'highlighted' | 'gradient';
  className?: string;
}

export function ActionCard({
  title,
  description,
  icon: Icon,
  iconColor = 'text-primary',
  actionLabel,
  onAction,
  secondaryAction,
  variant = 'default',
  className,
}: ActionCardProps) {
  const variantStyles = {
    default: '',
    highlighted: 'border-2 border-primary/20 bg-primary/5',
    gradient: 'border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent',
  };

  return (
    <Card className={cn(variantStyles[variant], className)}>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          {Icon && (
            <div className="p-3 rounded-xl bg-primary/10 flex-shrink-0">
              <Icon className={cn('h-6 w-6', iconColor)} />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{description}</p>
            <div className="flex items-center gap-3">
              <Button 
                variant="cta" 
                animated
                onClick={onAction}
                className="gap-2"
              >
                {actionLabel}
                <ArrowRight className="h-4 w-4 arrow-icon" />
              </Button>
              {secondaryAction && (
                <Button variant="ghost" onClick={secondaryAction.onClick}>
                  {secondaryAction.label}
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================================================
// FEATURE CARD - Card for feature/tool display
// ============================================================================

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  iconColor?: string;
  iconBgColor?: string;
  status?: 'available' | 'locked' | 'coming-soon' | 'new';
  onClick?: () => void;
  footer?: React.ReactNode;
  className?: string;
}

const featureStatusConfig = {
  available: { label: null, style: '' },
  locked: { label: 'Locked', style: 'bg-amber-100 text-amber-800' },
  'coming-soon': { label: 'Coming Soon', style: 'bg-gray-100 text-gray-600' },
  new: { label: 'New', style: 'bg-green-100 text-green-800' },
};

export function FeatureCard({
  title,
  description,
  icon: Icon,
  iconColor = 'text-primary',
  iconBgColor = 'bg-primary/10',
  status = 'available',
  onClick,
  footer,
  className,
}: FeatureCardProps) {
  const statusConfig = featureStatusConfig[status];
  const isDisabled = status === 'locked' || status === 'coming-soon';

  return (
    <Card 
      className={cn(
        'overflow-hidden transition-all duration-200',
        onClick && !isDisabled && 'cursor-pointer hover:shadow-lg hover:border-primary/30',
        isDisabled && 'opacity-60',
        className
      )}
      onClick={!isDisabled ? onClick : undefined}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          {Icon && (
            <div className={cn('h-12 w-12 rounded-xl flex items-center justify-center', iconBgColor)}>
              <Icon className={cn('h-6 w-6', iconColor)} />
            </div>
          )}
          {statusConfig.label && (
            <Badge variant="outline" className={cn('text-xs', statusConfig.style)}>
              {statusConfig.label}
            </Badge>
          )}
        </div>
        <h3 className="font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
        {footer && (
          <div className="mt-4 pt-4 border-t">
            {footer}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ============================================================================
// SECTION CARD - Card for grouping content sections
// ============================================================================

interface SectionCardProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  headerAction?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  className?: string;
}

export function SectionCard({
  title,
  subtitle,
  icon: Icon,
  headerAction,
  children,
  footer,
  collapsible = false,
  defaultCollapsed = false,
  className,
}: SectionCardProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

  return (
    <Card className={className}>
      <CardHeader 
        className={cn(
          'pb-3',
          collapsible && 'cursor-pointer hover:bg-muted/50 transition-colors'
        )}
        onClick={collapsible ? () => setIsCollapsed(!isCollapsed) : undefined}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {Icon && <Icon className="h-5 w-5 text-primary" />}
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              {subtitle && <CardDescription>{subtitle}</CardDescription>}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {headerAction}
            {collapsible && (
              <ChevronRight className={cn(
                'h-4 w-4 text-muted-foreground transition-transform',
                !isCollapsed && 'rotate-90'
              )} />
            )}
          </div>
        </div>
      </CardHeader>
      {!isCollapsed && (
        <>
          <CardContent>{children}</CardContent>
          {footer && <CardFooter className="pt-0">{footer}</CardFooter>}
        </>
      )}
    </Card>
  );
}

// ============================================================================
// EMPTY STATE CARD - Standard empty state display
// ============================================================================

interface EmptyStateCardProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyStateCard({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateCardProps) {
  return (
    <Card className={cn('border-dashed', className)}>
      <CardContent className="py-12 text-center">
        {Icon && (
          <div className="mx-auto h-16 w-16 rounded-xl bg-muted flex items-center justify-center mb-4">
            <Icon className="h-8 w-8 text-muted-foreground" />
          </div>
        )}
        <h3 className="font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4 max-w-sm mx-auto">{description}</p>
        {action && (
          <Button onClick={action.onClick} className="gap-2">
            {action.label}
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
