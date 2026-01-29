/**
 * Canvas Workshop Header Component
 * Clean header with StatusDropdown integration
 */

import React from 'react';
import { Presentation } from 'lucide-react';
import { StatusDropdown, ExtendedStatus } from '../research/StatusDropdown';

interface CanvasWorkshopHeaderProps {
  researchStatus: ExtendedStatus;
  onStatusChange: (status: ExtendedStatus) => void;
}

export function CanvasWorkshopHeader({ researchStatus, onStatusChange }: CanvasWorkshopHeaderProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 sticky top-20 z-40 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Presentation className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Canvas Workshop</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {researchStatus === 'draft' && 'Plan your workshop session'}
              {researchStatus === 'scheduled' && 'Workshop is scheduled and participants invited'}
              {researchStatus === 'in_progress' && 'Active workshop sessions in progress'}
              {researchStatus === 'in_review' && 'Reviewing workshop outcomes and insights'}
              {researchStatus === 'completed' && 'Workshop completed and results finalized'}
            </p>
          </div>
        </div>
        
        <StatusDropdown
          variant="extended"
          currentStatus={researchStatus}
          onChange={onStatusChange}
        />
      </div>
    </div>
  );
}
