import React from 'react';
import { AssetStatus, ResearchMethodType } from '../../types/brand-asset';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { CheckCircle2, Clock, Circle, AlertTriangle, LayoutGrid, Filter } from 'lucide-react';
import { getMethodInfo, getStatusInfo } from '../../utils/asset-status';

interface AssetFiltersProps {
  selectedStatuses: AssetStatus[];
  selectedMethods: ResearchMethodType[];
  onStatusToggle: (status: AssetStatus) => void;
  onMethodToggle: (method: ResearchMethodType) => void;
  onClearFilters: () => void;
  statusCounts: Record<AssetStatus, number>;
  totalCount: number;
}

export function AssetFilters({
  selectedStatuses,
  selectedMethods,
  onStatusToggle,
  onMethodToggle,
  onClearFilters,
  statusCounts,
  totalCount
}: AssetFiltersProps) {
  const allStatuses: AssetStatus[] = ['ready-to-validate', 'in-development', 'awaiting-research', 'validated'];
  const allMethods: ResearchMethodType[] = ['workshop', 'interviews', 'questionnaire', 'ai-exploration'];
  
  const getStatusIcon = (status: AssetStatus) => {
    const info = getStatusInfo(status);
    switch (info.icon) {
      case 'CheckCircle':
        return CheckCircle2;
      case 'Clock':
        return Clock;
      case 'AlertTriangle':
        return AlertTriangle;
      case 'Circle':
      default:
        return Circle;
    }
  };
  
  const hasActiveFilters = selectedStatuses.length > 0 || selectedMethods.length > 0;
  
  return (
    <div className="space-y-4">
      {/* Primary Status Filters */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Filter by Status</CardTitle>
          <CardDescription className="text-xs">
            Show assets by their validation state
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {/* All Assets */}
          <Button
            variant={selectedStatuses.length === 0 ? 'default' : 'ghost'}
            size="sm"
            className="w-full justify-start"
            onClick={onClearFilters}
          >
            <LayoutGrid className="h-4 w-4 mr-2" />
            All Assets
            <Badge variant="secondary" className="ml-auto">
              {totalCount}
            </Badge>
          </Button>
          
          {/* Individual Statuses */}
          {allStatuses.map(status => {
            const info = getStatusInfo(status);
            const Icon = getStatusIcon(status);
            const isSelected = selectedStatuses.includes(status);
            const count = statusCounts[status] || 0;
            
            return (
              <Button
                key={status}
                variant={isSelected ? 'default' : 'ghost'}
                size="sm"
                className="w-full justify-start"
                onClick={() => onStatusToggle(status)}
              >
                <Icon className="h-4 w-4 mr-2" />
                {info.label}
                <Badge 
                  variant="secondary" 
                  className={`ml-auto ${info.bgClass} ${info.textClass}`}
                >
                  {count}
                </Badge>
              </Button>
            );
          })}
        </CardContent>
      </Card>
      
      {/* Research Method Filters */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Filter by Validation Method</CardTitle>
          <CardDescription className="text-xs">
            Show assets that have completed specific research
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {allMethods.map(methodType => {
            const info = getMethodInfo(methodType);
            const isSelected = selectedMethods.includes(methodType);
            
            return (
              <Button
                key={methodType}
                variant={isSelected ? 'default' : 'ghost'}
                size="sm"
                className="w-full justify-start"
                onClick={() => onMethodToggle(methodType)}
              >
                <span className="mr-2">{info.icon}</span>
                {info.label}
                {isSelected && <CheckCircle2 className="h-4 w-4 ml-auto" />}
              </Button>
            );
          })}
        </CardContent>
      </Card>
      
      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={onClearFilters}
        >
          <Filter className="h-4 w-4 mr-2" />
          Clear All Filters
        </Button>
      )}
    </div>
  );
}

interface CompactAssetFiltersProps {
  selectedStatuses: AssetStatus[];
  onStatusChange: (status: AssetStatus | 'all') => void;
  statusCounts: Record<AssetStatus, number>;
  totalCount: number;
}

export function CompactAssetFilters({
  selectedStatuses,
  onStatusChange,
  statusCounts,
  totalCount
}: CompactAssetFiltersProps) {
  const allStatuses: AssetStatus[] = ['ready-to-validate', 'in-development', 'awaiting-research', 'validated'];
  
  const getStatusIcon = (status: AssetStatus) => {
    const info = getStatusInfo(status);
    switch (info.icon) {
      case 'CheckCircle':
        return CheckCircle2;
      case 'Clock':
        return Clock;
      case 'AlertTriangle':
        return AlertTriangle;
      case 'Circle':
      default:
        return Circle;
    }
  };
  
  return (
    <div className="flex items-center space-x-2 overflow-x-auto pb-2">
      <Button
        variant={selectedStatuses.length === 0 ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onStatusChange('all')}
      >
        <LayoutGrid className="h-4 w-4 mr-2" />
        All
        <Badge variant="secondary" className="ml-2">
          {totalCount}
        </Badge>
      </Button>
      
      {allStatuses.map(status => {
        const info = getStatusInfo(status);
        const Icon = getStatusIcon(status);
        const isSelected = selectedStatuses.length === 1 && selectedStatuses[0] === status;
        const count = statusCounts[status] || 0;
        
        if (count === 0) return null;
        
        return (
          <Button
            key={status}
            variant={isSelected ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onStatusChange(status)}
          >
            <Icon className="h-4 w-4 mr-2" />
            {info.label}
            <Badge 
              variant="secondary" 
              className={`ml-2 ${isSelected ? '' : info.bgClass + ' ' + info.textClass}`}
            >
              {count}
            </Badge>
          </Button>
        );
      })}
    </div>
  );
}