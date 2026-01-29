import React, { useState, useMemo } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { SearchBar } from './ui/SearchBar';
import {
  Plus,
  Edit,
  Trash2,
  BookOpen,
  FileText,
  Lightbulb,
  Search,
  ExternalLink,
  Clock,
  ChevronRight,
  MoreVertical,
  Archive,
  LayoutGrid,
  List,
  Heart,
  Download,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { AddResourceModal } from './knowledge/AddResourceModal';
import { mockKnowledgeResources, KnowledgeResource } from '../data/knowledge-resources';
import { cn } from '../lib/utils';

export function KnowledgeLibrary() {
  const [resources, setResources] = useState<KnowledgeResource[]>(mockKnowledgeResources);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter resources
  const filteredResources = useMemo(() => {
    return resources.filter(resource => {
      const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           resource.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === 'all' || resource.type === selectedType;
      const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;

      return matchesSearch && matchesType && matchesCategory;
    });
  }, [resources, searchTerm, selectedType, selectedCategory]);

  // Featured resources (top 3 by rating)
  const featuredResources = useMemo(() => {
    return [...resources]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);
  }, [resources]);

  const handleDelete = (id: string) => {
    setResources(resources.filter(r => r.id !== id));
  };

  const handleToggleFavorite = (id: string) => {
    setResources(resources.map(r =>
      r.id === id ? { ...r, isFavorite: !r.isFavorite } : r
    ));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'book': return BookOpen;
      case 'document': return FileText;
      case 'article': return FileText;
      case 'video': return FileText;
      case 'course': return Lightbulb;
      case 'website': return ExternalLink;
      default: return FileText;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'book': return 'Guide';
      case 'document': return 'Template';
      case 'article': return 'Article';
      case 'video': return 'Case Study';
      case 'course': return 'Research';
      default: return 'Article';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-10">
        <div className="max-w-7xl mx-auto px-8 py-6 space-y-6">
          {/* Title Row */}
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-primary/10 p-3">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-semibold">Knowledge Library</h1>
                <p className="text-sm text-muted-foreground">
                  Resources and documentation to support your brand strategy
                </p>
              </div>
            </div>
            <Button onClick={() => setShowAddModal(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Resource
            </Button>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center gap-3">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search resources..."
              className="flex-1 max-w-md"
            />

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-48 rounded-lg">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="book">Guide</SelectItem>
                <SelectItem value="document">Template</SelectItem>
                <SelectItem value="video">Case Study</SelectItem>
                <SelectItem value="course">Research</SelectItem>
                <SelectItem value="article">Article</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48 rounded-lg">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Brand Strategy">Brand Strategy</SelectItem>
                <SelectItem value="Research">Research</SelectItem>
                <SelectItem value="Content">Content</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center rounded-xl border bg-background">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-8 space-y-8">
        {/* Featured Resources Section */}
        {featuredResources.length > 0 && selectedType === 'all' && selectedCategory === 'all' && !searchTerm && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-1">Featured Resources</h2>
              <p className="text-sm text-muted-foreground">Top-rated resources for your team</p>
            </div>

            {/* Horizontal scroll container */}
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {featuredResources.map((resource) => {
                const Icon = getTypeIcon(resource.type);

                return (
                  <Card
                    key={resource.id}
                    className="rounded-xl border p-6 hover:shadow-md hover:border-primary/30 transition-all duration-200 min-w-[320px] flex-shrink-0"
                  >
                    {/* Thumbnail/icon area */}
                    <div className="rounded-lg bg-muted h-32 flex items-center justify-center mb-4 relative">
                      <Icon className="h-12 w-12 text-muted-foreground" />
                      <Badge className="absolute top-2 right-2 rounded-full bg-background/90 backdrop-blur px-2 py-1 text-xs">
                        {getTypeLabel(resource.type)}
                      </Badge>
                    </div>

                    <h3 className="text-lg font-semibold line-clamp-2 mb-2">{resource.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {resource.description}
                    </p>

                    {/* Meta row */}
                    <div className="flex items-center gap-2 mb-4 text-xs text-muted-foreground">
                      <Badge className="rounded-full bg-muted text-foreground px-2 py-1 text-xs">
                        {resource.category}
                      </Badge>
                      {resource.estimatedDuration && (
                        <>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{resource.estimatedDuration}</span>
                          </div>
                        </>
                      )}
                    </div>

                    <Button variant="outline" className="w-full gap-2" onClick={() => window.open(resource.url, '_blank')}>
                      Open Resource
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Resources Grid/List */}
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold mb-1">All Resources</h2>
            <p className="text-sm text-muted-foreground">
              {filteredResources.length} {filteredResources.length === 1 ? 'resource' : 'resources'} available
            </p>
          </div>

          {filteredResources.length > 0 ? (
            <div className={cn(
              "grid gap-6",
              viewMode === 'grid' ? "md:grid-cols-2" : "grid-cols-1"
            )}>
              {filteredResources.map((resource) => {
                const Icon = getTypeIcon(resource.type);

                return (
                  <Card
                    key={resource.id}
                    className="rounded-xl border p-6 hover:shadow-md hover:border-primary/30 transition-all duration-200"
                  >
                    {/* Thumbnail/icon area */}
                    <div className="rounded-lg bg-muted h-32 w-full flex items-center justify-center mb-4 relative">
                      <Icon className="h-12 w-12 text-muted-foreground" />
                      
                      {/* Type badge (overlay) */}
                      <Badge className="absolute top-2 right-2 rounded-full bg-background/90 backdrop-blur px-2 py-1 text-xs">
                        {getTypeLabel(resource.type)}
                      </Badge>

                      {/* Favorite button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 left-2 h-8 w-8 p-0 hover:bg-background/90"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleFavorite(resource.id);
                        }}
                      >
                        <Heart className={cn("h-4 w-4", resource.isFavorite && "fill-current text-red-500")} />
                      </Button>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold line-clamp-2 mb-2">{resource.title}</h3>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {resource.description}
                    </p>

                    {/* Meta row */}
                    <div className="flex items-center gap-2 mb-4 text-xs text-muted-foreground flex-wrap">
                      <Badge className="rounded-full bg-muted text-foreground px-2 py-1 text-xs">
                        {resource.category}
                      </Badge>
                      
                      {resource.estimatedDuration && (
                        <>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{resource.estimatedDuration}</span>
                          </div>
                        </>
                      )}
                      
                      {resource.dateAdded && (
                        <>
                          <span>•</span>
                          <span>
                            {new Date(resource.dateAdded).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        className="flex-1 gap-2" 
                        onClick={() => window.open(resource.url, '_blank')}
                      >
                        Open Resource
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-10 w-10 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Archive className="h-4 w-4 mr-2" />
                            Archive
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600 dark:text-red-400"
                            onClick={() => handleDelete(resource.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-16">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <BookOpen className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No resources yet</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Add resources to build your knowledge base
              </p>
              <Button onClick={() => setShowAddModal(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Add First Resource
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Add Resource Modal */}
      {showAddModal && (
        <AddResourceModal
          onClose={() => setShowAddModal(false)}
          onAddResource={(newResource) => {
            const resource: KnowledgeResource = {
              ...newResource,
              id: `kr-${Date.now()}`,
              dateAdded: new Date().toISOString().split('T')[0],
              views: 0,
              favorites: 0,
              completions: 0,
            };
            setResources([resource, ...resources]);
            setShowAddModal(false);
          }}
        />
      )}
    </div>
  );
}
