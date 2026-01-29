import React, { useState, useMemo, useEffect } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Search,
  X,
  ChevronRight,
  Hexagon,
  Users,
  Megaphone,
  FileText,
  FlaskConical,
  ArrowUp,
  ArrowDown,
  CornerDownLeft,
} from 'lucide-react';
import { mockSearchResults, SearchResult } from '../data/search-results';
import { cn } from '../lib/utils';

interface SearchResultsProps {
  initialQuery?: string;
  onClose?: () => void;
}

export function SearchResults({ initialQuery = '', onClose }: SearchResultsProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Filter results based on query and active filter
  const filteredResults = useMemo(() => {
    let results = mockSearchResults;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        result =>
          result.title.toLowerCase().includes(query) ||
          result.description.toLowerCase().includes(query)
      );
    }

    // Filter by type
    if (activeFilter !== 'all') {
      results = results.filter(result => result.type === activeFilter);
    }

    return results;
  }, [searchQuery, activeFilter]);

  // Group results by type
  const groupedResults = useMemo(() => {
    const groups: Record<string, SearchResult[]> = {
      'brand-asset': [],
      'persona': [],
      'campaign': [],
      'content': [],
      'research': [],
    };

    filteredResults.forEach(result => {
      groups[result.type].push(result);
    });

    return groups;
  }, [filteredResults]);

  // Highlight matching text
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;

    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark
          key={index}
          className="bg-amber-200 dark:bg-amber-800 text-foreground rounded px-0.5"
        >
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, filteredResults.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter' && filteredResults[selectedIndex]) {
        e.preventDefault();
        handleOpenResult(filteredResults[selectedIndex]);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredResults, selectedIndex, onClose]);

  const handleOpenResult = (result: SearchResult) => {
    console.log('Opening result:', result.path);
    // Navigate to result path
  };

  const getTypeConfig = (type: string) => {
    switch (type) {
      case 'brand-asset':
        return {
          label: 'Brand Assets',
          icon: Hexagon,
          color: 'text-blue-600 dark:text-blue-400',
          bg: 'bg-blue-100 dark:bg-blue-900/30',
        };
      case 'persona':
        return {
          label: 'Personas',
          icon: Users,
          color: 'text-purple-600 dark:text-purple-400',
          bg: 'bg-purple-100 dark:bg-purple-900/30',
        };
      case 'campaign':
        return {
          label: 'Campaigns',
          icon: Megaphone,
          color: 'text-green-600 dark:text-green-400',
          bg: 'bg-green-100 dark:bg-green-900/30',
        };
      case 'content':
        return {
          label: 'Content',
          icon: FileText,
          color: 'text-orange-600 dark:text-orange-400',
          bg: 'bg-orange-100 dark:bg-orange-900/30',
        };
      case 'research':
        return {
          label: 'Research',
          icon: FlaskConical,
          color: 'text-pink-600 dark:text-pink-400',
          bg: 'bg-pink-100 dark:bg-pink-900/30',
        };
      default:
        return {
          label: 'Other',
          icon: FileText,
          color: 'text-gray-600 dark:text-gray-400',
          bg: 'bg-gray-100 dark:bg-gray-900/30',
        };
    }
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'active':
        return (
          <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
            Active
          </Badge>
        );
      case 'draft':
        return (
          <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
            Draft
          </Badge>
        );
      case 'completed':
        return (
          <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
            Completed
          </Badge>
        );
      default:
        return null;
    }
  };

  const filters = [
    { value: 'all', label: 'All' },
    { value: 'brand-asset', label: 'Brand Assets' },
    { value: 'persona', label: 'Personas' },
    { value: 'campaign', label: 'Campaigns' },
    { value: 'content', label: 'Content' },
    { value: 'research', label: 'Research' },
  ];

  let resultIndex = 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-10">
        <div className="max-w-4xl mx-auto px-8 py-6 space-y-6">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="rounded-xl border p-4 pl-12 pr-12 text-lg"
              autoFocus
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                onClick={() => setSearchQuery('')}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Results Summary */}
          <div className="space-y-4">
            <h1 className="text-xl font-semibold">
              {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''} for "
              {searchQuery || initialQuery}"
            </h1>

            {/* Filter Chips */}
            <div className="flex items-center gap-2 flex-wrap">
              {filters.map(filter => (
                <Button
                  key={filter.value}
                  variant={activeFilter === filter.value ? 'default' : 'secondary'}
                  size="sm"
                  onClick={() => setActiveFilter(filter.value)}
                  className={cn(
                    'rounded-full',
                    activeFilter === filter.value
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted hover:bg-muted/80'
                  )}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-8 py-8">
        {filteredResults.length > 0 ? (
          <div className="space-y-8">
            {/* Brand Assets Section */}
            {groupedResults['brand-asset'].length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-2 border-b border-border">
                  <Hexagon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <h2 className="text-lg font-semibold">Brand Assets</h2>
                  <Badge className="rounded-full bg-muted text-foreground">
                    {groupedResults['brand-asset'].length}
                  </Badge>
                </div>

                <div className="space-y-2">
                  {groupedResults['brand-asset'].map(result => {
                    const currentIndex = resultIndex++;
                    const config = getTypeConfig(result.type);
                    const Icon = config.icon;

                    return (
                      <Card
                        key={result.id}
                        className={cn(
                          'rounded-xl border p-4 hover:bg-muted/50 transition-colors duration-200 cursor-pointer',
                          selectedIndex === currentIndex && 'ring-2 ring-primary'
                        )}
                        onClick={() => handleOpenResult(result)}
                      >
                        <div className="flex items-start gap-4">
                          {/* Icon */}
                          <div className={cn('rounded-lg p-2 flex-shrink-0', config.bg)}>
                            <Icon className={cn('h-5 w-5', config.color)} />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold mb-1">
                              {highlightText(result.title, searchQuery)}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              {result.breadcrumb}
                            </p>
                            <p className="text-sm line-clamp-2">
                              {highlightText(result.description, searchQuery)}
                            </p>
                          </div>

                          {/* Right Side */}
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <Badge className="rounded-full bg-muted text-foreground text-xs">
                              {config.label.slice(0, -1)}
                            </Badge>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Personas Section */}
            {groupedResults['persona'].length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-2 border-b border-border">
                  <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  <h2 className="text-lg font-semibold">Personas</h2>
                  <Badge className="rounded-full bg-muted text-foreground">
                    {groupedResults['persona'].length}
                  </Badge>
                </div>

                <div className="space-y-2">
                  {groupedResults['persona'].map(result => {
                    const currentIndex = resultIndex++;
                    const config = getTypeConfig(result.type);

                    return (
                      <Card
                        key={result.id}
                        className={cn(
                          'rounded-xl border p-4 hover:bg-muted/50 transition-colors duration-200 cursor-pointer',
                          selectedIndex === currentIndex && 'ring-2 ring-primary'
                        )}
                        onClick={() => handleOpenResult(result)}
                      >
                        <div className="flex items-start gap-4">
                          {/* Avatar */}
                          <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                            <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold mb-1">
                              {highlightText(result.title, searchQuery)}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              {result.breadcrumb}
                            </p>
                            <p className="text-sm line-clamp-2">
                              {highlightText(result.description, searchQuery)}
                            </p>
                          </div>

                          {/* Right Side */}
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <Badge className="rounded-full bg-muted text-foreground text-xs">
                              Persona
                            </Badge>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Campaigns Section */}
            {groupedResults['campaign'].length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-2 border-b border-border">
                  <Megaphone className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <h2 className="text-lg font-semibold">Campaigns</h2>
                  <Badge className="rounded-full bg-muted text-foreground">
                    {groupedResults['campaign'].length}
                  </Badge>
                </div>

                <div className="space-y-2">
                  {groupedResults['campaign'].map(result => {
                    const currentIndex = resultIndex++;
                    const config = getTypeConfig(result.type);
                    const Icon = config.icon;

                    return (
                      <Card
                        key={result.id}
                        className={cn(
                          'rounded-xl border p-4 hover:bg-muted/50 transition-colors duration-200 cursor-pointer',
                          selectedIndex === currentIndex && 'ring-2 ring-primary'
                        )}
                        onClick={() => handleOpenResult(result)}
                      >
                        <div className="flex items-start gap-4">
                          {/* Icon */}
                          <div className={cn('rounded-lg p-2 flex-shrink-0', config.bg)}>
                            <Icon className={cn('h-5 w-5', config.color)} />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold mb-1">
                              {highlightText(result.title, searchQuery)}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              {result.breadcrumb}
                            </p>
                            <p className="text-sm line-clamp-2">
                              {highlightText(result.description, searchQuery)}
                            </p>
                          </div>

                          {/* Right Side */}
                          <div className="flex items-center gap-2 flex-shrink-0">
                            {result.metadata?.status && getStatusBadge(result.metadata.status)}
                            <Badge className="rounded-full bg-muted text-foreground text-xs">
                              Campaign
                            </Badge>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Content Section */}
            {groupedResults['content'].length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-2 border-b border-border">
                  <FileText className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  <h2 className="text-lg font-semibold">Content</h2>
                  <Badge className="rounded-full bg-muted text-foreground">
                    {groupedResults['content'].length}
                  </Badge>
                </div>

                <div className="space-y-2">
                  {groupedResults['content'].map(result => {
                    const currentIndex = resultIndex++;
                    const config = getTypeConfig(result.type);
                    const Icon = config.icon;

                    return (
                      <Card
                        key={result.id}
                        className={cn(
                          'rounded-xl border p-4 hover:bg-muted/50 transition-colors duration-200 cursor-pointer',
                          selectedIndex === currentIndex && 'ring-2 ring-primary'
                        )}
                        onClick={() => handleOpenResult(result)}
                      >
                        <div className="flex items-start gap-4">
                          {/* Icon */}
                          <div className={cn('rounded-lg p-2 flex-shrink-0', config.bg)}>
                            <Icon className={cn('h-5 w-5', config.color)} />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold mb-1">
                              {highlightText(result.title, searchQuery)}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              {result.breadcrumb}
                            </p>
                            <p className="text-sm line-clamp-2">
                              {highlightText(result.description, searchQuery)}
                            </p>
                          </div>

                          {/* Right Side */}
                          <div className="flex items-center gap-2 flex-shrink-0">
                            {result.metadata?.contentType && (
                              <Badge className="rounded-full bg-muted text-foreground text-xs">
                                {result.metadata.contentType}
                              </Badge>
                            )}
                            {result.metadata?.wordCount && (
                              <span className="text-xs text-muted-foreground">
                                {result.metadata.wordCount.toLocaleString()} words
                              </span>
                            )}
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Research Section */}
            {groupedResults['research'].length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-2 border-b border-border">
                  <FlaskConical className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                  <h2 className="text-lg font-semibold">Research</h2>
                  <Badge className="rounded-full bg-muted text-foreground">
                    {groupedResults['research'].length}
                  </Badge>
                </div>

                <div className="space-y-2">
                  {groupedResults['research'].map(result => {
                    const currentIndex = resultIndex++;
                    const config = getTypeConfig(result.type);
                    const Icon = config.icon;

                    return (
                      <Card
                        key={result.id}
                        className={cn(
                          'rounded-xl border p-4 hover:bg-muted/50 transition-colors duration-200 cursor-pointer',
                          selectedIndex === currentIndex && 'ring-2 ring-primary'
                        )}
                        onClick={() => handleOpenResult(result)}
                      >
                        <div className="flex items-start gap-4">
                          {/* Icon */}
                          <div className={cn('rounded-lg p-2 flex-shrink-0', config.bg)}>
                            <Icon className={cn('h-5 w-5', config.color)} />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold mb-1">
                              {highlightText(result.title, searchQuery)}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              {result.breadcrumb}
                            </p>
                            <p className="text-sm line-clamp-2">
                              {highlightText(result.description, searchQuery)}
                            </p>
                          </div>

                          {/* Right Side */}
                          <div className="flex items-center gap-2 flex-shrink-0">
                            {result.metadata?.confidence && (
                              <Badge className="rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 text-xs">
                                {result.metadata.confidence}% confidence
                              </Badge>
                            )}
                            {result.metadata?.completion && (
                              <Badge className="rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-xs">
                                {result.metadata.completion}% complete
                              </Badge>
                            )}
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-16">
            <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-4">
              <Search className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              No results found for "{searchQuery || initialQuery}"
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Try different keywords or browse categories
            </p>

            {/* Quick Links */}
            <div className="flex items-center gap-3">
              <Button variant="outline">Browse Brand Assets</Button>
              <Button variant="outline">View Campaigns</Button>
              <Button variant="outline">Explore Research</Button>
            </div>
          </div>
        )}
      </div>

      {/* Keyboard Navigation Hints */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border py-3">
        <div className="max-w-4xl mx-auto px-8">
          <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-muted rounded text-xs font-semibold">
                <ArrowUp className="h-3 w-3 inline" />
                <ArrowDown className="h-3 w-3 inline" />
              </kbd>
              <span>Navigate</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-muted rounded text-xs font-semibold">
                <CornerDownLeft className="h-3 w-3 inline" />
              </kbd>
              <span>Open</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-muted rounded text-xs font-semibold">Esc</kbd>
              <span>Close</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
