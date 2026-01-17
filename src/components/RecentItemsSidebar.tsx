import React, { useState, useEffect } from 'react';
import { Clock, X, Trash2 } from 'lucide-react';
import { recentItems } from '../services/RecentItemsService';
import { RecentItem } from '../types/workflow';
import { Button } from './ui/button';
import * as LucideIcons from 'lucide-react';

interface RecentItemsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: string) => void;
}

export function RecentItemsSidebar({ isOpen, onClose, onNavigate }: RecentItemsSidebarProps) {
  const [items, setItems] = useState<RecentItem[]>([]);

  useEffect(() => {
    // Initial load
    setItems(recentItems.getItems());

    // Subscribe to changes
    const unsubscribe = recentItems.subscribe((newItems) => {
      setItems(newItems);
    });

    return unsubscribe;
  }, []);

  const handleItemClick = (item: RecentItem) => {
    onNavigate(item.route);
    onClose();
  };

  const handleClearAll = () => {
    if (confirm('Clear all recent items?')) {
      recentItems.clear();
    }
  };

  const handleRemoveItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    recentItems.removeItem(id);
  };

  const groupedItems = recentItems.getItemsGroupedByType();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full w-80 bg-background border-l border-border shadow-2xl z-50 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            <h2 className="font-semibold">Recent Items</h2>
          </div>
          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearAll}
                className="h-8 px-2"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="h-[calc(100%-65px)] overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-6 text-center">
              <Clock className="h-12 w-12 text-muted-foreground/30 mb-3" />
              <p className="text-muted-foreground">No recent items</p>
              <p className="text-sm text-muted-foreground mt-1">
                Items you visit will appear here
              </p>
            </div>
          ) : (
            <div className="p-4 space-y-6">
              {/* Group by type */}
              {Array.from(groupedItems.entries()).map(([type, typeItems]) => (
                <div key={type}>
                  <div className="text-xs font-medium text-muted-foreground mb-2 px-1">
                    {recentItems.getTypeLabel(type)}
                  </div>
                  <div className="space-y-1">
                    {typeItems.map((item) => {
                      const Icon = (LucideIcons as any)[item.icon || recentItems.getTypeIcon(item.type)];
                      
                      return (
                        <div
                          key={item.id}
                          className="w-full group flex items-start gap-3 p-2 rounded-lg hover:bg-accent transition-colors cursor-pointer"
                          onClick={() => handleItemClick(item)}
                        >
                          {/* Icon */}
                          <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            {Icon && <Icon className="h-4 w-4 text-primary" />}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0 text-left">
                            <div className="font-medium text-sm truncate">
                              {item.title}
                            </div>
                            {item.subtitle && (
                              <div className="text-xs text-muted-foreground truncate">
                                {item.subtitle}
                              </div>
                            )}
                            <div className="text-xs text-muted-foreground mt-0.5">
                              {recentItems.getTimeAgo(item.timestamp)}
                            </div>
                          </div>

                          {/* Status & Remove */}
                          <div className="flex flex-col items-end gap-1">
                            {item.metadata?.status && (
                              <span className={`text-xs px-2 py-0.5 rounded-full ${
                                item.metadata.status === 'approved' 
                                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                  : item.metadata.status === 'ready-to-validate'
                                  ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                                  : 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
                              }`}>
                                {item.metadata.status}
                              </span>
                            )}
                            <button
                              onClick={(e) => handleRemoveItem(item.id, e)}
                              className="opacity-0 group-hover:opacity-100 p-1 hover:bg-background rounded transition-opacity"
                            >
                              <X className="h-3 w-3 text-muted-foreground" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer hint */}
        <div className="absolute bottom-0 left-0 right-0 px-4 py-3 border-t border-border bg-muted/30">
          <p className="text-xs text-muted-foreground text-center">
            Showing last {items.length} of 10 items
          </p>
        </div>
      </div>
    </>
  );
}