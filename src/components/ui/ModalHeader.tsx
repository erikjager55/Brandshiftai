/**
 * ModalHeader - Master Component
 * Unified modal/dialog header with icon, title, and close button
 */

import React from 'react';
import { LucideIcon, X } from 'lucide-react';
import { Button } from './button';
import { IconContainer } from './IconContainer';
import { COLORS, cn } from '@/constants/design-system';

export interface ModalHeaderProps {
  // Icon
  icon?: LucideIcon;
  iconGradient?: keyof typeof COLORS.gradients;
  
  // Content
  title: string;
  subtitle?: string;
  
  // Close button
  onClose?: () => void;
  
  // Layout
  centered?: boolean;
  
  // Custom className
  className?: string;
}

export function ModalHeader({
  icon,
  iconGradient = 'combined',
  title,
  subtitle,
  onClose,
  centered = false,
  className,
}: ModalHeaderProps) {
  return (
    <div
      className={cn(
        'flex items-start gap-4 mb-6',
        centered && 'flex-col items-center text-center',
        className
      )}
    >
      {/* Icon (optional) */}
      {icon && (
        <IconContainer
          icon={icon}
          size="lg"
          gradient={iconGradient}
          shadow="md"
        />
      )}

      {/* Title & Subtitle */}
      <div className={cn('flex-1', centered && 'flex flex-col items-center')}>
        <h2 className="text-2xl font-semibold mb-1">{title}</h2>
        {subtitle && (
          <p className="text-muted-foreground text-sm">{subtitle}</p>
        )}
      </div>

      {/* Close button */}
      {onClose && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="h-8 w-8 p-0 -mt-1 -mr-1"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
