import React, { useEffect, useRef } from 'react';
import { QuickAction } from '../types/workflow';
import * as LucideIcons from 'lucide-react';

interface QuickActionsMenuProps {
  x: number;
  y: number;
  actions: QuickAction[];
  onClose: () => void;
}

export function QuickActionsMenu({ x, y, actions, onClose }: QuickActionsMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  // Adjust position if menu would go off-screen
  useEffect(() => {
    if (!menuRef.current) return;

    const menu = menuRef.current;
    const rect = menu.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let adjustedX = x;
    let adjustedY = y;

    if (rect.right > viewportWidth) {
      adjustedX = viewportWidth - rect.width - 10;
    }

    if (rect.bottom > viewportHeight) {
      adjustedY = viewportHeight - rect.height - 10;
    }

    menu.style.left = `${adjustedX}px`;
    menu.style.top = `${adjustedY}px`;
  }, [x, y]);

  const handleAction = (action: QuickAction) => {
    if (!action.disabled) {
      action.action();
      onClose();
    }
  };

  return (
    <>
      {/* Invisible backdrop */}
      <div className="fixed inset-0 z-40" />

      {/* Context menu */}
      <div
        ref={menuRef}
        className="fixed z-50 min-w-[200px] bg-background border border-border rounded-lg shadow-lg py-1 animate-in fade-in slide-in-from-top-1 duration-100"
        style={{ left: x, top: y }}
      >
        {actions.map((action, index) => {
          const Icon = (LucideIcons as any)[action.icon];
          
          return (
            <React.Fragment key={action.id}>
              <button
                onClick={() => handleAction(action)}
                disabled={action.disabled}
                className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                  action.disabled
                    ? 'opacity-50 cursor-not-allowed'
                    : action.danger
                    ? 'hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20 dark:hover:text-red-400'
                    : 'hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                {/* Icon */}
                {Icon && (
                  <Icon className={`h-4 w-4 flex-shrink-0 ${
                    action.danger ? 'text-red-500' : ''
                  }`} />
                )}

                {/* Label & Description */}
                <div className="flex-1 text-left min-w-0">
                  <div className="font-medium">{action.label}</div>
                  {action.description && (
                    <div className="text-xs text-muted-foreground truncate">
                      {action.description}
                    </div>
                  )}
                </div>

                {/* Shortcut hint */}
                {action.shortcut && (
                  <kbd className="text-xs font-mono text-muted-foreground">
                    {action.shortcut}
                  </kbd>
                )}
              </button>

              {/* Divider */}
              {action.divider && index < actions.length - 1 && (
                <div className="my-1 border-t border-border" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
}
