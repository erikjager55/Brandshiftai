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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { X, Plus, Target } from 'lucide-react';
import { Objective, FocusArea } from '../../data/mock-business-strategies';

interface AddObjectiveModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (objective: Partial<Objective>) => void;
  focusAreas: FocusArea[];
  editObjective?: Objective;
}

type MetricType = 'percentage' | 'number' | 'currency';
type Priority = 'high' | 'medium' | 'low';

export function AddObjectiveModal({
  open,
  onClose,
  onSave,
  focusAreas,
  editObjective,
}: AddObjectiveModalProps) {
  const [title, setTitle] = useState(editObjective?.title || '');
  const [description, setDescription] = useState(editObjective?.description || '');
  const [focusArea, setFocusArea] = useState(editObjective?.focusArea || '');
  const [priority, setPriority] = useState<Priority>(editObjective?.priority || 'high');
  const [metricType, setMetricType] = useState<MetricType>(editObjective?.metricType || 'percentage');
  const [startValue, setStartValue] = useState(editObjective?.startValue || '0');
  const [targetValue, setTargetValue] = useState(editObjective?.targetValue || '100');
  const [currentValue, setCurrentValue] = useState(editObjective?.currentValue || '0');
  const [keyResults, setKeyResults] = useState<string[]>(
    editObjective?.keyResults.map(kr => kr.description) || []
  );
  const [newKeyResult, setNewKeyResult] = useState('');
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>(
    editObjective?.linkedCampaigns || []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const objectiveData: Partial<Objective> = {
      title,
      description,
      focusArea,
      priority,
      status: editObjective?.status || 'not-started',
      progress: editObjective?.progress || 0,
      metricType,
      startValue,
      targetValue,
      currentValue,
      keyResults: keyResults.map((kr, i) => ({
        id: `kr-${Date.now()}-${i}`,
        description: kr,
        status: 'not-started',
        progress: 0,
      })),
      linkedCampaigns: selectedCampaigns,
    };

    onSave(objectiveData);
    onClose();
  };

  const handleAddKeyResult = () => {
    if (newKeyResult.trim()) {
      setKeyResults([...keyResults, newKeyResult.trim()]);
      setNewKeyResult('');
    }
  };

  const handleRemoveKeyResult = (index: number) => {
    setKeyResults(keyResults.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col p-0 gap-0">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            {editObjective ? 'Edit Strategic Objective' : 'Add Strategic Objective'}
          </DialogTitle>
          <DialogDescription>
            Define a measurable objective for this strategy
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
          <div className="px-6 py-6 overflow-y-auto flex-1 space-y-6">
            {/* Objective Title */}
            <div className="space-y-2">
              <Label htmlFor="title">
                Objective Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                placeholder="e.g., Increase Market Share"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="What does this objective aim to achieve?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>

            {/* Focus Area and Priority */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="focusArea">Focus Area</Label>
                <Select value={focusArea} onValueChange={setFocusArea}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select focus area" />
                  </SelectTrigger>
                  <SelectContent>
                    {focusAreas.map((area) => (
                      <SelectItem key={area.id} value={area.name}>
                        {area.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select value={priority} onValueChange={(value) => setPriority(value as Priority)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t">
              <div className="flex items-center gap-2 -mt-3 mb-2">
                <div className="bg-background px-2">
                  <span className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    <Target className="h-4 w-4" />
                    Metrics
                  </span>
                </div>
              </div>
            </div>

            {/* Metric Type */}
            <div className="space-y-2">
              <Label>Metric Type</Label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'percentage', label: 'Percentage' },
                  { value: 'number', label: 'Number' },
                  { value: 'currency', label: 'Currency' },
                ].map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setMetricType(type.value as MetricType)}
                    className={`
                      p-3 rounded-lg border text-sm font-medium transition-colors
                      ${
                        metricType === type.value
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

            {/* Metric Values */}
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startValue">Starting Value</Label>
                <Input
                  id="startValue"
                  type="text"
                  placeholder={metricType === 'percentage' ? '8%' : '0'}
                  value={startValue}
                  onChange={(e) => setStartValue(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="targetValue">Target Value</Label>
                <Input
                  id="targetValue"
                  type="text"
                  placeholder={metricType === 'percentage' ? '15%' : '100'}
                  value={targetValue}
                  onChange={(e) => setTargetValue(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currentValue">Current Value</Label>
                <Input
                  id="currentValue"
                  type="text"
                  placeholder={metricType === 'percentage' ? '8%' : '0'}
                  value={currentValue}
                  onChange={(e) => setCurrentValue(e.target.value)}
                />
              </div>
            </div>

            {/* Divider */}
            <div className="border-t">
              <div className="flex items-center gap-2 -mt-3 mb-2">
                <div className="bg-background px-2">
                  <span className="text-sm font-medium text-muted-foreground">
                    Key Results (Optional)
                  </span>
                </div>
              </div>
            </div>

            {/* Key Results */}
            <div className="space-y-3">
              {/* Existing Key Results */}
              {keyResults.map((result, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input value={result} readOnly className="flex-1" />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveKeyResult(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              {/* Add New Key Result */}
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Add a key result..."
                  value={newKeyResult}
                  onChange={(e) => setNewKeyResult(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddKeyResult();
                    }
                  }}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddKeyResult}
                  disabled={!newKeyResult.trim()}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t">
              <div className="flex items-center gap-2 -mt-3 mb-2">
                <div className="bg-background px-2">
                  <span className="text-sm font-medium text-muted-foreground">
                    Link to Campaigns (Optional)
                  </span>
                </div>
              </div>
            </div>

            {/* Campaign Selector (Placeholder) */}
            <div className="space-y-2">
              <Select
                value={selectedCampaigns[0] || ''}
                onValueChange={(value) => {
                  if (value && !selectedCampaigns.includes(value)) {
                    setSelectedCampaigns([...selectedCampaigns, value]);
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select campaigns..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="campaign-1">Brand Awareness Q1</SelectItem>
                  <SelectItem value="campaign-2">Enterprise Customer Push</SelectItem>
                  <SelectItem value="campaign-3">Premium Tier Launch</SelectItem>
                  <SelectItem value="campaign-4">Content Marketing Program</SelectItem>
                </SelectContent>
              </Select>

              {selectedCampaigns.length > 0 && (
                <div className="text-sm text-muted-foreground">
                  Selected: {selectedCampaigns.length} campaign(s)
                </div>
              )}
            </div>

            {/* Required Fields Notice */}
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500">*</span> Required fields
            </p>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={!title}>
                {editObjective ? 'Save Changes' : 'Add Objective'}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}