/**
 * COMPONENT: Advanced Data View
 * 
 * Complete data view with filtering, sorting, grouping, and multiple view modes.
 * This is the main component that ties everything together.
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import {
  ViewMode,
  ViewState,
  FilterGroup,
  FilterField,
  SortConfig,
  SortField,
  GroupConfig,
  GroupField,
  SearchConfig,
  FilterPreset
} from '../types/filtering';
import { filterService } from '../services/FilterService';
import { ViewModeSelector } from './ViewModeSelector';
import { FilterPanel } from './FilterPanel';
import { SortGroupControls } from './SortGroupControls';
import { DataViewRenderer, KanbanView } from './DataViewRenderer';
import { Button } from './ui/button';

interface AdvancedDataViewProps<T> {
  items: T[];
  availableFields: FilterField[];
  availableSortFields: SortField[];
  availableGroupFields: GroupField[];
  searchFields: string[];
  renderCard: (item: T) => React.ReactNode;
  renderListItem: (item: T) => React.ReactNode;
  renderTableRow: (item: T) => React.ReactNode;
  tableHeaders: string[];
  defaultViewMode?: ViewMode;
  defaultSort?: SortConfig;
  availableViewModes?: ViewMode[];
  emptyMessage?: string;
  onItemClick?: (item: T) => void;
}

export function AdvancedDataView<T>({
  items,
  availableFields,
  availableSortFields,
  availableGroupFields,
  searchFields,
  renderCard,
  renderListItem,
  renderTableRow,
  tableHeaders,
  defaultViewMode = 'grid',
  defaultSort,
  availableViewModes,
  emptyMessage,
  onItemClick
}: AdvancedDataViewProps<T>) {
  // View state
  const [viewState, setViewState] = useState<ViewState>({
    viewMode: defaultViewMode,
    filters: {
      id: 'default',
      conditions: [],
      logic: 'AND'
    },
    sort: defaultSort || {
      options: availableSortFields.length > 0 ? [{
        field: availableSortFields[0].id,
        direction: 'asc'
      }] : []
    },
    search: {
      query: '',
      fields: searchFields
    }
  });

  // Presets
  const [presets, setPresets] = useState<FilterPreset[]>([]);

  // Load presets
  useEffect(() => {
    setPresets(filterService.getPresets());
    const unsubscribe = filterService.subscribe(() => {
      setPresets(filterService.getPresets());
    });
    return unsubscribe;
  }, []);

  // Apply filters, sorting, grouping, and search
  const result = useMemo(() => {
    return filterService.applyAll(
      items,
      viewState.filters,
      viewState.sort,
      viewState.group,
      viewState.search
    );
  }, [items, viewState]);

  // Handle view mode change
  const handleViewModeChange = (viewMode: ViewMode) => {
    setViewState(prev => ({ ...prev, viewMode }));
  };

  // Handle filter changes
  const handleFiltersChange = (filters: FilterGroup) => {
    setViewState(prev => ({ ...prev, filters, activePreset: undefined }));
  };

  // Handle preset select
  const handlePresetSelect = (presetId: string) => {
    const preset = filterService.getPreset(presetId);
    if (preset) {
      setViewState(prev => ({
        ...prev,
        filters: preset.filters,
        sort: preset.sort || prev.sort,
        group: preset.group,
        activePreset: presetId
      }));
    }
  };

  // Handle preset save
  const handlePresetSave = (name: string, filters: FilterGroup) => {
    const preset: FilterPreset = {
      id: `preset-${Date.now()}`,
      name,
      filters,
      sort: viewState.sort,
      group: viewState.group,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    filterService.savePreset(preset);
  };

  // Handle preset delete
  const handlePresetDelete = (presetId: string) => {
    filterService.deletePreset(presetId);
  };

  // Handle sort change
  const handleSortChange = (sort: SortConfig) => {
    setViewState(prev => ({ ...prev, sort }));
  };

  // Handle group change
  const handleGroupChange = (group?: GroupConfig) => {
    setViewState(prev => ({ ...prev, group }));
  };

  // Handle search change
  const handleSearchChange = (query: string) => {
    setViewState(prev => ({
      ...prev,
      search: { ...prev.search!, query }
    }));
  };

  // Handle group toggle (collapse/expand)
  const handleGroupToggle = (groupKey: string) => {
    setViewState(prev => {
      if (!prev.group) return prev;

      const collapsedGroups = prev.group.collapsedGroups || [];
      const isCollapsed = collapsedGroups.includes(groupKey);

      return {
        ...prev,
        group: {
          ...prev.group,
          collapsedGroups: isCollapsed
            ? collapsedGroups.filter(k => k !== groupKey)
            : [...collapsedGroups, groupKey]
        }
      };
    });
  };

  const hasActiveFilters = viewState.filters.conditions.length > 0;
  const hasSearch = viewState.search && viewState.search.query.length > 0;

  return (
    <div className="space-y-4">
      {/* Top Bar */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Left: View Mode Selector */}
        <ViewModeSelector
          currentMode={viewState.viewMode}
          onChange={handleViewModeChange}
          availableModes={availableViewModes}
        />

        {/* Center: Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={viewState.search?.query || ''}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search..."
            className="w-full h-10 pl-10 pr-10 border border-border rounded-lg bg-background"
          />
          {hasSearch && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleSearchChange('')}
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Right: Sort & Group */}
        <SortGroupControls
          sort={viewState.sort}
          group={viewState.group}
          availableSortFields={availableSortFields}
          availableGroupFields={availableGroupFields}
          onSortChange={handleSortChange}
          onGroupChange={handleGroupChange}
        />
      </div>

      {/* Filter Panel */}
      <FilterPanel
        filters={viewState.filters}
        availableFields={availableFields}
        presets={presets}
        activePreset={viewState.activePreset}
        onFiltersChange={handleFiltersChange}
        onPresetSelect={handlePresetSelect}
        onPresetSave={handlePresetSave}
        onPresetDelete={handlePresetDelete}
      />

      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div>
          Showing {result.filteredCount} of {result.totalCount} items
          {hasActiveFilters && ` (${result.appliedFilters.length} filters active)`}
          {hasSearch && ` (search: "${viewState.search!.query}")`}
        </div>
      </div>

      {/* Data View */}
      <div className="min-h-[400px]">
        {viewState.viewMode === 'kanban' && result.groups ? (
          <KanbanView
            groups={result.groups}
            renderCard={renderCard}
            onGroupToggle={handleGroupToggle}
          />
        ) : (
          <DataViewRenderer
            viewMode={viewState.viewMode}
            items={result.items}
            groups={result.groups}
            renderCard={renderCard}
            renderListItem={renderListItem}
            renderTableRow={renderTableRow}
            tableHeaders={tableHeaders}
            onGroupToggle={handleGroupToggle}
            emptyMessage={emptyMessage}
          />
        )}
      </div>
    </div>
  );
}
