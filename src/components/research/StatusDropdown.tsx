/**
 * Status Dropdown Component
 * Reusable dropdown for managing research method status
 * Two variants: SIMPLE (AI/Questionnaire) and EXTENDED (Workshop/Interviews)
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  CheckCircle2,
  FileEdit,
  Play,
  Calendar,
  Eye,
  ChevronDown,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

// Status types
export type SimpleStatus = 'draft' | 'in_progress' | 'completed';
export type ExtendedStatus = 'draft' | 'scheduled' | 'in_progress' | 'in_review' | 'completed';

export interface StatusDropdownProps {
  variant: 'simple' | 'extended';
  currentStatus: SimpleStatus | ExtendedStatus;
  onChange: (status: SimpleStatus | ExtendedStatus) => void;
  showConfirmation?: boolean;
  onConfirmationNeeded?: (targetStatus: SimpleStatus | ExtendedStatus, onConfirm: () => void) => void;
}

// Status configuration
const statusConfig = {
  draft: {
    icon: FileEdit,
    label: 'Draft',
    lightColor: 'text-gray-500',
    darkColor: 'dark:text-gray-400',
  },
  scheduled: {
    icon: Calendar,
    label: 'Scheduled',
    lightColor: 'text-blue-600',
    darkColor: 'dark:text-blue-400',
  },
  in_progress: {
    icon: Play,
    label: 'In Progress',
    lightColor: 'text-blue-600',
    darkColor: 'dark:text-blue-400',
  },
  in_review: {
    icon: Eye,
    label: 'In Review',
    lightColor: 'text-amber-600',
    darkColor: 'dark:text-amber-400',
  },
  completed: {
    icon: CheckCircle2,
    label: 'Completed',
    lightColor: 'text-green-600',
    darkColor: 'dark:text-green-400',
  },
};

// Simple variant statuses
const simpleStatuses: SimpleStatus[] = ['draft', 'in_progress', 'completed'];

// Extended variant statuses
const extendedStatuses: ExtendedStatus[] = ['draft', 'scheduled', 'in_progress', 'in_review', 'completed'];

export function StatusDropdown({
  variant,
  currentStatus,
  onChange,
  showConfirmation = true,
  onConfirmationNeeded,
}: StatusDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get available statuses based on variant
  const availableStatuses = variant === 'simple' ? simpleStatuses : extendedStatuses;

  // Get current status config
  const currentConfig = statusConfig[currentStatus];
  const CurrentIcon = currentConfig.icon;

  // Check if status transition is allowed
  const isTransitionAllowed = (from: string, to: string): boolean => {
    // Don't allow going back to draft from in_progress
    if (from === 'in_progress' && to === 'draft') return false;
    
    // All other transitions are allowed
    return true;
  };

  // Handle status change
  const handleStatusChange = (newStatus: SimpleStatus | ExtendedStatus) => {
    if (newStatus === currentStatus) {
      setIsOpen(false);
      return;
    }

    if (!isTransitionAllowed(currentStatus, newStatus)) {
      toast.error('Status change not allowed', {
        description: 'This status transition is not permitted.',
      });
      setIsOpen(false);
      return;
    }

    // Check if confirmation is needed
    const needsConfirmation = showConfirmation && (
      newStatus === 'completed' || 
      (currentStatus === 'completed' && newStatus !== 'completed')
    );

    if (needsConfirmation && onConfirmationNeeded) {
      onConfirmationNeeded(newStatus, () => {
        performStatusChange(newStatus);
      });
    } else {
      performStatusChange(newStatus);
    }

    setIsOpen(false);
  };

  // Perform the actual status change
  const performStatusChange = (newStatus: SimpleStatus | ExtendedStatus) => {
    onChange(newStatus);
    const config = statusConfig[newStatus];
    toast.success('Status updated', {
      description: `Research status changed to ${config.label}`,
    });
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case 'Escape':
          setIsOpen(false);
          break;
        case 'ArrowDown':
          event.preventDefault();
          setSelectedIndex((prev) => 
            prev < availableStatuses.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          event.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case 'Enter':
          event.preventDefault();
          if (selectedIndex >= 0) {
            handleStatusChange(availableStatuses[selectedIndex]);
          }
          break;
        case 'Tab':
          setIsOpen(false);
          break;
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, selectedIndex, availableStatuses]);

  // Reset selected index when dropdown opens
  useEffect(() => {
    if (isOpen) {
      setSelectedIndex(availableStatuses.indexOf(currentStatus as any));
    }
  }, [isOpen, currentStatus, availableStatuses]);

  return (
    <div ref={dropdownRef} className="relative">
      {/* Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border bg-card hover:bg-muted transition-colors cursor-pointer min-w-40 ${
          isOpen ? 'border-primary/50' : 'border-border dark:border-border'
        }`}
      >
        <CurrentIcon className={`h-4 w-4 ${currentConfig.lightColor} ${currentConfig.darkColor}`} />
        <span className="text-sm font-medium">{currentConfig.label}</span>
        <ChevronDown 
          className={`h-4 w-4 text-muted-foreground ml-auto transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 min-w-48 rounded-xl border border-border dark:border-border bg-popover dark:bg-popover shadow-lg p-1 z-50"
          >
            {availableStatuses.map((status, index) => {
              const config = statusConfig[status];
              const Icon = config.icon;
              const isSelected = status === currentStatus;
              const isDisabled = !isTransitionAllowed(currentStatus, status);
              const isHovered = index === selectedIndex;

              return (
                <button
                  key={status}
                  onClick={() => !isDisabled && handleStatusChange(status)}
                  disabled={isDisabled}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors w-full text-left ${
                    isDisabled
                      ? 'opacity-50 cursor-not-allowed'
                      : isSelected || isHovered
                      ? 'bg-muted dark:bg-muted'
                      : 'hover:bg-muted dark:hover:bg-muted'
                  }`}
                  onMouseEnter={() => !isDisabled && setSelectedIndex(index)}
                >
                  <Icon className={`h-4 w-4 ${config.lightColor} ${config.darkColor}`} />
                  <span className="text-sm flex-1">{config.label}</span>
                  {isSelected && <CheckCircle2 className="h-4 w-4 text-primary" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
