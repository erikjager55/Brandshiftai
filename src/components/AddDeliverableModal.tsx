/**
 * Add Deliverable Modal
 * Simplified modal for adding deliverables to existing campaigns
 * Inherits knowledge context, audience, and strategy from parent campaign
 */

import React, { useState, useMemo } from 'react';
import { Dialog, DialogContent } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  X,
  FileText,
  Image,
  Video,
  Mail,
  Share2,
  Search,
  User,
  Calendar,
  Flag,
  Info,
  Loader2,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { CONTENT_TYPES_BY_CATEGORY, getContentTypeById, type ContentType } from '../types/content-types';
import { toast } from 'sonner';

interface AddDeliverableModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  campaignId: string;
  campaignName: string;
  onDeliverableAdded?: (deliverable: NewDeliverable) => void;
}

interface NewDeliverable {
  id: string;
  title: string;
  description?: string;
  type: string; // content type id
  assignee?: string;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'not-started';
  progress: 0;
}

interface TeamMember {
  id: string;
  name: string;
  avatar: string;
}

// Mock team members
const TEAM_MEMBERS: TeamMember[] = [
  { id: 'user-1', name: 'Sarah Johnson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
  { id: 'user-2', name: 'Mike Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike' },
  { id: 'user-3', name: 'Emma Davis', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma' },
  { id: 'user-4', name: 'Alex Turner', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' },
];

// Category icons and colors
const CATEGORY_CONFIG = {
  written: {
    icon: FileText,
    label: 'Written',
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-100 dark:bg-blue-950',
  },
  social: {
    icon: Share2,
    label: 'Social',
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-100 dark:bg-purple-950',
  },
  visual: {
    icon: Image,
    label: 'Visual',
    color: 'text-pink-600 dark:text-pink-400',
    bgColor: 'bg-pink-100 dark:bg-pink-950',
  },
  video: {
    icon: Video,
    label: 'Video',
    color: 'text-red-600 dark:text-red-400',
    bgColor: 'bg-red-100 dark:bg-red-950',
  },
  email: {
    icon: Mail,
    label: 'Email',
    color: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-100 dark:bg-emerald-950',
  },
};

// Placeholder text by content type
const PLACEHOLDER_BY_TYPE: Record<string, string> = {
  'blog-post': 'e.g., Industry Trends Analysis',
  'linkedin-post': 'e.g., Product Announcement',
  'twitter-post': 'e.g., Launch Day Tweet',
  'newsletter': 'e.g., Welcome Sequence Part 1',
  'email-campaign': 'e.g., Product Launch Email',
  'promotional-email': 'e.g., Special Offer Email',
  'welcome-email': 'e.g., Welcome Sequence Part 1',
};

export function AddDeliverableModal({
  open,
  onOpenChange,
  campaignId,
  campaignName,
  onDeliverableAdded,
}: AddDeliverableModalProps) {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignee, setAssignee] = useState<string>('unassigned');
  const [dueDate, setDueDate] = useState<string>('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter content types based on search
  const filteredTypes = useMemo(() => {
    if (!searchQuery.trim()) return CONTENT_TYPES_BY_CATEGORY;

    const query = searchQuery.toLowerCase();
    const filtered: typeof CONTENT_TYPES_BY_CATEGORY = {
      written: [],
      social: [],
      visual: [],
      video: [],
      email: [],
    };

    Object.entries(CONTENT_TYPES_BY_CATEGORY).forEach(([category, types]) => {
      filtered[category as keyof typeof filtered] = types.filter((type) =>
        type.name.toLowerCase().includes(query)
      );
    });

    return filtered;
  }, [searchQuery]);

  // Check if form is valid
  const isFormValid = selectedType && title.trim().length >= 3;

  // Get selected type info
  const selectedTypeInfo = selectedType ? getContentTypeById(selectedType) : null;

  // Get placeholder for title input
  const titlePlaceholder = selectedType
    ? PLACEHOLDER_BY_TYPE[selectedType] || 'e.g., My Content Title'
    : 'Select a content type first';

  const handleReset = () => {
    setSelectedType(null);
    setSearchQuery('');
    setTitle('');
    setDescription('');
    setAssignee('unassigned');
    setDueDate('');
    setPriority('medium');
    setIsSubmitting(false);
  };

  const handleClose = () => {
    if (!isSubmitting) {
      handleReset();
      onOpenChange(false);
    }
  };

  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId);
    // Auto-scroll to details section after type selection
    setTimeout(() => {
      const detailsSection = document.getElementById('deliverable-details');
      if (detailsSection) {
        detailsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleSubmit = async () => {
    if (!isFormValid) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newDeliverable: NewDeliverable = {
        id: `deliverable-${Date.now()}`,
        title: title.trim(),
        description: description.trim() || undefined,
        type: selectedType!,
        assignee: assignee === 'unassigned' ? undefined : assignee,
        dueDate: dueDate || undefined,
        priority,
        status: 'not-started',
        progress: 0,
      };

      // Call parent callback
      onDeliverableAdded?.(newDeliverable);

      // Show success toast
      toast.success(`✓ ${title} added to campaign`);

      // Close modal and reset
      handleReset();
      onOpenChange(false);
    } catch (error) {
      toast.error('Failed to add deliverable. Please try again.');
      setIsSubmitting(false);
    }
  };

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="max-w-2xl max-h-[85vh] p-0 gap-0 overflow-hidden"
        onEscapeKeyDown={(e) => !isSubmitting && handleClose()}
        onPointerDownOutside={(e) => isSubmitting && e.preventDefault()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Add Deliverable</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Adding to: {campaignName}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            disabled={isSubmitting}
            className="h-8 w-8 p-0 rounded-lg hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 overflow-y-auto flex-1">
          {/* Section 1: Content Type Selection */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">
              What type of content?
            </h3>

            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search content types..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 rounded-lg"
                disabled={isSubmitting}
              />
            </div>

            {/* Content Types Grid */}
            <div className="space-y-6">
              {Object.entries(filteredTypes).map(([category, types]) => {
                if (types.length === 0) return null;

                const config = CATEGORY_CONFIG[category as keyof typeof CATEGORY_CONFIG];
                const Icon = config.icon;

                return (
                  <div key={category}>
                    {/* Category Header */}
                    <div className="flex items-center gap-2 mb-3">
                      <Icon className={cn('h-4 w-4', config.color)} />
                      <span className={cn('text-sm font-medium', config.color)}>
                        {config.label}
                      </span>
                    </div>

                    {/* Type Cards Grid */}
                    <div className="grid grid-cols-3 gap-3">
                      {types.map((type) => {
                        const isSelected = selectedType === type.id;
                        const TypeIcon = config.icon;

                        return (
                          <button
                            key={type.id}
                            onClick={() => handleTypeSelect(type.id)}
                            disabled={isSubmitting}
                            className={cn(
                              'border rounded-xl p-4 hover:border-primary hover:bg-primary/5 cursor-pointer transition-all',
                              'flex flex-col items-center gap-2 text-center',
                              'disabled:opacity-50 disabled:cursor-not-allowed',
                              isSelected &&
                                'border-primary bg-primary/10 ring-2 ring-primary dark:ring-primary/50'
                            )}
                          >
                            <TypeIcon className={cn('h-5 w-5', config.color)} />
                            <span className="text-sm font-medium">{type.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* No results */}
            {searchQuery &&
              Object.values(filteredTypes).every((types) => types.length === 0) && (
                <div className="text-center py-8">
                  <p className="text-sm text-muted-foreground">
                    No content types found for "{searchQuery}"
                  </p>
                </div>
              )}
          </div>

          {/* Section 2: Deliverable Details */}
          {selectedType && (
            <div
              id="deliverable-details"
              className="animate-in fade-in slide-in-from-top-2 duration-300"
            >
              <div className="border-t my-6" />

              {/* Inherited Context Info */}
              <div className="bg-muted/50 dark:bg-muted/20 rounded-lg p-4 mb-6 flex gap-3">
                <Info className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground italic">
                  This deliverable will use the knowledge context, audience, and strategy from{' '}
                  {campaignName}
                </p>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                {/* Title (Required) */}
                <div className="space-y-2">
                  <Label htmlFor="title">
                    Deliverable Title <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={titlePlaceholder}
                    disabled={isSubmitting}
                    className="rounded-lg"
                  />
                  {title.length > 0 && title.length < 3 && (
                    <p className="text-sm text-red-600">
                      Title must be at least 3 characters
                    </p>
                  )}
                </div>

                {/* Description (Optional) */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief description of what this deliverable should cover..."
                    rows={3}
                    disabled={isSubmitting}
                    className="rounded-lg resize-none"
                  />
                </div>

                {/* Assignee + Due Date (2-column grid) */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Assignee */}
                  <div className="space-y-2">
                    <Label htmlFor="assignee">Assign to</Label>
                    <Select
                      value={assignee}
                      onValueChange={setAssignee}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger id="assignee" className="rounded-lg">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <SelectValue placeholder="Select team member" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="unassigned">
                          <div className="flex items-center gap-2">
                            <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center">
                              <User className="h-3 w-3 text-muted-foreground" />
                            </div>
                            <span>Unassigned</span>
                          </div>
                        </SelectItem>
                        {TEAM_MEMBERS.map((member) => (
                          <SelectItem key={member.id} value={member.id}>
                            <div className="flex items-center gap-2">
                              <img
                                src={member.avatar}
                                alt={member.name}
                                className="h-6 w-6 rounded-full"
                              />
                              <span>{member.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Due Date */}
                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Due Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                      <Input
                        id="dueDate"
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        min={today}
                        disabled={isSubmitting}
                        className="rounded-lg pl-9"
                      />
                    </div>
                  </div>
                </div>

                {/* Priority */}
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <div className="flex items-center gap-2">
                    <Flag className="h-4 w-4 text-muted-foreground" />
                    <div className="flex items-center border rounded-xl overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setPriority('low')}
                        disabled={isSubmitting}
                        className={cn(
                          'px-4 py-2 text-sm font-medium transition-colors',
                          'border-r disabled:opacity-50',
                          priority === 'low'
                            ? 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                            : 'hover:bg-muted text-muted-foreground'
                        )}
                      >
                        Low
                      </button>
                      <button
                        type="button"
                        onClick={() => setPriority('medium')}
                        disabled={isSubmitting}
                        className={cn(
                          'px-4 py-2 text-sm font-medium transition-colors',
                          'border-r disabled:opacity-50',
                          priority === 'medium'
                            ? 'bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400'
                            : 'hover:bg-muted text-muted-foreground'
                        )}
                      >
                        Medium
                      </button>
                      <button
                        type="button"
                        onClick={() => setPriority('high')}
                        disabled={isSubmitting}
                        className={cn(
                          'px-4 py-2 text-sm font-medium transition-colors',
                          'disabled:opacity-50',
                          priority === 'high'
                            ? 'bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400'
                            : 'hover:bg-muted text-muted-foreground'
                        )}
                      >
                        High
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t flex items-center justify-between bg-muted/30 dark:bg-muted/10">
          {/* Left: Selected Type Badge */}
          <div className="flex-1">
            {selectedTypeInfo && (
              <Badge
                className={cn(
                  'gap-2',
                  CATEGORY_CONFIG[selectedTypeInfo.category as keyof typeof CATEGORY_CONFIG]
                    .bgColor,
                  CATEGORY_CONFIG[selectedTypeInfo.category as keyof typeof CATEGORY_CONFIG]
                    .color
                )}
              >
                {React.createElement(
                  CATEGORY_CONFIG[selectedTypeInfo.category as keyof typeof CATEGORY_CONFIG]
                    .icon,
                  { className: 'h-3 w-3' }
                )}
                {selectedTypeInfo.name.toUpperCase()}
              </Badge>
            )}
          </div>

          {/* Right: Action Buttons */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
              className="rounded-xl"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!isFormValid || isSubmitting}
              className="rounded-xl"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Adding...
                </>
              ) : (
                'Add Deliverable'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
