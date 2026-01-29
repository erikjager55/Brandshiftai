import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, ArrowRight, Command, X } from 'lucide-react';
import { globalSearch } from '../services/GlobalSearchService';
import { SearchSection } from '../types/workflow';
import * as LucideIcons from 'lucide-react';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: string) => void;
  onAction?: (actionId: string) => void;
}

export function GlobalSearchModal({ isOpen, onClose, onNavigate, onAction }: GlobalSearchModalProps) {
  const [query, setQuery] = useState('');
  const [sections, setSections] = useState<SearchSection[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      const results = globalSearch.search(query);
      setSections(results);
      setSelectedIndex(0);
    }, 150);

    return () => clearTimeout(timer);
  }, [query]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setQuery('');
      setSections(globalSearch.search(''));
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      const allResults = sections.flatMap(s => s.results);
      const maxIndex = allResults.length - 1;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => Math.min(prev + 1, maxIndex));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          const selectedResult = allResults[selectedIndex];
          if (selectedResult) {
            handleSelect(selectedResult);
          }
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, sections, selectedIndex]);

  // Auto-scroll to selected item
  useEffect(() => {
    const selectedElement = resultsRef.current?.querySelector(`[data-index="${selectedIndex}"]`);
    if (selectedElement) {
      selectedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [selectedIndex]);

  const handleSelect = (result: any) => {
    if (!result) return;
    
    if (result.action && typeof result.action === 'function') {
      result.action();
      onAction?.(result.id);
    } else if (result.route) {
      onNavigate(result.route);
    }
    onClose();
  };

  const allResults = useMemo(() => 
    sections.flatMap(s => s.results),
    [sections]
  );

  const hasQuery = query.trim().length > 0;
  const hasResults = sections.length > 0;

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-start justify-center">
        <div 
          className="w-full max-w-lg mx-4 mt-[15vh] bg-background border rounded-2xl shadow-2xl max-h-[70vh] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Input */}
          <div className="px-4 py-3 border-b flex items-center gap-3">
            <Search className="h-5 w-5 text-muted-foreground" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search everything..."
              className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground"
            />
            <kbd className="text-xs bg-muted px-2 py-1 rounded">ESC</kbd>
          </div>

          {/* Content Area (scrollable) */}
          <div 
            ref={resultsRef}
            className="flex-1 overflow-y-auto py-2"
          >
            {/* No results state */}
            {hasQuery && !hasResults ? (
              <div className="px-4 py-12">
                <div className="text-center">
                  <div className="text-sm font-medium mb-2">No results found</div>
                  <p className="text-sm text-muted-foreground mb-8">
                    Try a different search term or browse<br />
                    the options below.
                  </p>
                </div>

                {/* Show Go To section as fallback */}
                <div>
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide px-4 py-2">
                    Go To
                  </div>
                  <div className="space-y-1">
                    {globalSearch.search('').find(s => s.id === 'go-to')?.results.map((result) => {
                      const Icon = (LucideIcons as any)[result.icon || 'Circle'];
                      return (
                        <button
                          key={result.id}
                          onClick={() => handleSelect(result)}
                          className="w-full px-4 py-3 hover:bg-muted rounded-lg mx-2 cursor-pointer flex items-start gap-3 transition-colors duration-200"
                        >
                          <div className="flex-shrink-0 mt-0.5">
                            {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
                          </div>
                          <div className="flex-1 text-left">
                            <div className="text-sm font-medium">{result.title}</div>
                            {result.description && (
                              <div className="text-xs text-muted-foreground">{result.description}</div>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Search results header */}
                {hasQuery && hasResults && (
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide px-4 py-2">
                    Results for "{query}"
                  </div>
                )}

                {/* Sections */}
                {sections.map((section, sectionIdx) => {
                  let globalIndexOffset = 0;
                  for (let i = 0; i < sectionIdx; i++) {
                    globalIndexOffset += sections[i].results.length;
                  }

                  return (
                    <div key={section.id}>
                      {/* Section Label - only show if no query or it's a default section */}
                      {!hasQuery && (
                        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide px-4 py-2">
                          {section.label}
                        </div>
                      )}

                      {/* Section Items */}
                      <div className="space-y-1">
                        {section.results.map((result, resultIdx) => {
                          const globalIndex = globalIndexOffset + resultIdx;
                          const isSelected = globalIndex === selectedIndex;
                          const Icon = (LucideIcons as any)[result.icon || 'Circle'];
                          const isQuickAction = section.id === 'quick-actions';

                          return (
                            <button
                              key={result.id}
                              data-index={globalIndex}
                              onClick={() => handleSelect(result)}
                              className={`w-full px-4 py-3 rounded-lg mx-2 cursor-pointer flex items-start gap-3 transition-colors duration-200 ${
                                isSelected ? 'bg-muted' : 'hover:bg-muted'
                              }`}
                            >
                              <div className="flex-shrink-0 mt-0.5">
                                {Icon && (
                                  <Icon 
                                    className={`h-5 w-5 ${
                                      isQuickAction ? 'text-primary' : 'text-muted-foreground'
                                    }`} 
                                  />
                                )}
                              </div>
                              <div className="flex-1 text-left min-w-0">
                                <div className="text-sm font-medium">{result.title}</div>
                                {(result.subtitle || result.description) && (
                                  <div className="text-xs text-muted-foreground">
                                    {result.subtitle || result.description}
                                  </div>
                                )}
                              </div>
                              {isQuickAction && isSelected && (
                                <div className="flex-shrink-0 mt-0.5">
                                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-2 border-t bg-muted/30 flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <span>↑ ↓</span>
                <span>Navigate</span>
              </div>
              <div className="flex items-center gap-1">
                <span>↵</span>
                <span>Select</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Command className="h-3 w-3" />
              <span>Powered by search</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
