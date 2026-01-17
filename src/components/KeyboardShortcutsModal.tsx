import React from 'react';
import { X, Command, Keyboard } from 'lucide-react';
import { keyboardShortcuts } from '../services/KeyboardShortcutsService';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function KeyboardShortcutsModal({ isOpen, onClose }: KeyboardShortcutsModalProps) {
  if (!isOpen) return null;

  const categories = keyboardShortcuts.getByCategory();
  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
          className="w-full max-w-3xl bg-background border border-border rounded-lg shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/30">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Keyboard className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Keyboard Shortcuts</h2>
                <p className="text-sm text-muted-foreground">
                  Work faster with keyboard shortcuts
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="max-h-[70vh] overflow-y-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categories.map((category) => (
                <Card key={category.id} className="border-border/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">{category.label}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {category.shortcuts.map((shortcut) => (
                      <div 
                        key={shortcut.key}
                        className="flex items-center justify-between gap-4"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm">{shortcut.label}</div>
                          <div className="text-xs text-muted-foreground truncate">
                            {shortcut.description}
                          </div>
                        </div>
                        <kbd className="flex-shrink-0 px-2 py-1 text-xs font-mono bg-muted rounded border border-border whitespace-nowrap">
                          {keyboardShortcuts.formatKey(shortcut.key)}
                        </kbd>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Platform hint */}
            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/30">
                <Command className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium text-foreground mb-1">Platform shortcuts</p>
                  <p>
                    {isMac 
                      ? 'On macOS, ⌘ (Command) is used as the modifier key.'
                      : 'On Windows/Linux, Ctrl is used as the modifier key.'}
                  </p>
                  <p className="mt-2">
                    Press <kbd className="px-1.5 py-0.5 bg-background rounded border border-border font-mono text-xs">?</kbd> or <kbd className="px-1.5 py-0.5 bg-background rounded border border-border font-mono text-xs">{isMac ? '⌘' : 'Ctrl'} /</kbd> anytime to open this help.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-border bg-muted/30 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {categories.reduce((acc, c) => acc + c.shortcuts.length, 0)} shortcuts available
            </p>
            <Button onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
