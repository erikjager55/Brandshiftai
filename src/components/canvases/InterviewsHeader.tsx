/**
 * Interviews Manager Header Component
 * Clean header with StatusDropdown integration
 */

import React from 'react';
import { Users } from 'lucide-react';
import { StatusDropdown, ExtendedStatus } from '../research/StatusDropdown';

interface InterviewsHeaderProps {
  researchStatus: ExtendedStatus;
  onStatusChange: (status: ExtendedStatus) => void;
}

export function InterviewsHeader({ researchStatus, onStatusChange }: InterviewsHeaderProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 sticky top-20 z-40 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">1-on-1 Interview Manager</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {researchStatus === 'draft' && 'Set up your interview plan'}
              {researchStatus === 'scheduled' && 'Interviews are scheduled and ready to conduct'}
              {researchStatus === 'in_progress' && 'Conduct structured interviews with stakeholders'}
              {researchStatus === 'in_review' && 'Reviewing interview results and findings'}
              {researchStatus === 'completed' && 'All interviews completed and locked'}
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
