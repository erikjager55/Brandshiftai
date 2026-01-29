import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { X, Calendar } from 'lucide-react';
import { BusinessStrategy } from '../../data/mock-business-strategies';

interface AddStrategyModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (strategy: Partial<BusinessStrategy>) => void;
  editStrategy?: BusinessStrategy;
}

type StrategyType = 'growth' | 'market-entry' | 'product-launch' | 'brand-building' | 'operational-excellence' | 'custom';

export function AddStrategyModal({ open, onClose, onSave, editStrategy }: AddStrategyModalProps) {
  const [name, setName] = useState(editStrategy?.name || '');
  const [description, setDescription] = useState(editStrategy?.description || '');
  const [startDate, setStartDate] = useState(editStrategy?.startDate || '2026-01-01');
  const [endDate, setEndDate] = useState(editStrategy?.endDate || '2026-12-31');
  const [strategyType, setStrategyType] = useState<StrategyType>(editStrategy?.type || 'growth');
  const [vision, setVision] = useState(editStrategy?.vision || '');
  const [focusAreas, setFocusAreas] = useState(
    editStrategy?.focusAreas.map(fa => fa.name).join(', ') || ''
  );
  const [addObjectivesAfter, setAddObjectivesAfter] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const strategyData: Partial<BusinessStrategy> = {
      name,
      description,
      startDate,
      endDate,
      type: strategyType,
      vision,
      status: editStrategy?.status || 'draft',
      icon: strategyType === 'growth' ? 'target' : strategyType === 'product-launch' ? 'rocket' : 'trending-up',
      progress: editStrategy?.progress || 0,
      objectives: editStrategy?.objectives || [],
      focusAreas: focusAreas.split(',').map((area, i) => ({
        id: `fa-${i + 1}`,
        name: area.trim(),
        icon: 'target',
        description: '',
        objectiveCount: 0,
      })),
      linkedCampaigns: editStrategy?.linkedCampaigns || [],
      milestones: editStrategy?.milestones || [],
      rationale: editStrategy?.rationale || '',
      assumptions: editStrategy?.assumptions || [],
      lastUpdated: new Date().toISOString(),
      createdBy: 'Current User',
      createdDate: editStrategy?.createdDate || new Date().toISOString(),
    };

    onSave(strategyData);
    onClose();
  };

  const strategyTypes: { value: StrategyType; label: string }[] = [
    { value: 'growth', label: 'Growth' },
    { value: 'market-entry', label: 'Market Entry' },
    { value: 'product-launch', label: 'Product Launch' },
    { value: 'brand-building', label: 'Brand Building' },
    { value: 'operational-excellence', label: 'Operational Excellence' },
    { value: 'custom', label: 'Custom' },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            {editStrategy ? 'Edit Business Strategy' : 'Create Business Strategy'}
          </DialogTitle>
          <DialogDescription>
            {editStrategy
              ? 'Update your strategic initiative'
              : 'Define a new strategic initiative for your business'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Strategy Name */}
          <div className="space-y-2">
            <Label htmlFor="name">
              Strategy Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder="e.g., Growth Strategy 2026"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              placeholder="Describe the strategic focus and goals..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              required
            />
          </div>

          {/* Timeframe */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Strategy Type */}
          <div className="space-y-2">
            <Label>Strategy Type</Label>
            <div className="grid grid-cols-2 gap-3">
              {strategyTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setStrategyType(type.value)}
                  className={`
                    p-3 rounded-lg border text-left text-sm font-medium transition-colors
                    ${
                      strategyType === type.value
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:bg-muted'
                    }
                  `}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t" />

          {/* Strategic Vision */}
          <div className="space-y-2">
            <Label htmlFor="vision">Strategic Vision</Label>
            <Textarea
              id="vision"
              placeholder="What does success look like for this strategy?"
              value={vision}
              onChange={(e) => setVision(e.target.value)}
              rows={3}
            />
          </div>

          {/* Key Focus Areas */}
          <div className="space-y-2">
            <Label htmlFor="focusAreas">Key Focus Areas</Label>
            <Input
              id="focusAreas"
              placeholder="Market Share, Revenue Growth, Customer Acquisition (comma-separated)"
              value={focusAreas}
              onChange={(e) => setFocusAreas(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Separate multiple areas with commas
            </p>
          </div>

          {/* Divider */}
          <div className="border-t" />

          {/* Add Objectives Checkbox */}
          {!editStrategy && (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="addObjectives"
                checked={addObjectivesAfter}
                onChange={(e) => setAddObjectivesAfter(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="addObjectives" className="cursor-pointer">
                Add initial objectives after creation
              </Label>
            </div>
          )}

          {/* Required Fields Notice */}
          <p className="text-xs text-muted-foreground">
            <span className="text-red-500">*</span> Required fields
          </p>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!name || !description}>
              {editStrategy ? 'Save Changes' : 'Create Strategy'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
