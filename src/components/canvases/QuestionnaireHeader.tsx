/**
 * Questionnaire Manager Header Component
 * Clean header with StatusDropdown integration
 */

import React from 'react';
import { ClipboardList } from 'lucide-react';
import { StatusDropdown, SimpleStatus } from '../research/StatusDropdown';

interface QuestionnaireHeaderProps {
  researchStatus: SimpleStatus;
  onStatusChange: (status: SimpleStatus) => void;
}

export function QuestionnaireHeader({ researchStatus, onStatusChange }: QuestionnaireHeaderProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 sticky top-20 z-40 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <ClipboardList className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Questionnaire Manager</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {researchStatus === 'draft' && 'Set up your questionnaires'}
              {researchStatus === 'in_progress' && 'Collect responses from stakeholders'}
              {researchStatus === 'completed' && 'All questionnaires completed'}
            </p>
          </div>
        </div>
        
        <StatusDropdown
          variant="simple"
          currentStatus={researchStatus}
          onChange={onStatusChange}
        />
      </div>
    </div>
  );
}
