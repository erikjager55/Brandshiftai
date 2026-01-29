/**
 * Simplified Questionnaire Manager with StatusDropdown Integration
 * This is a streamlined version that uses the new StatusDropdown component
 */

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { 
  ClipboardList,
  Plus,
} from 'lucide-react';
import { StatusDropdown, SimpleStatus } from '../research/StatusDropdown';

interface QuestionnaireManagerSimplifiedProps {
  assetId: string;
}

export function QuestionnaireManagerSimplified({ assetId }: QuestionnaireManagerSimplifiedProps) {
  const [researchStatus, setResearchStatus] = useState<SimpleStatus>('in_progress');

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header with StatusDropdown */}
      <div className="bg-card border border-border rounded-xl p-6">
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
            onChange={(newStatus) => setResearchStatus(newStatus as SimpleStatus)}
          />
        </div>
      </div>

      {/* Summary Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div>
                <div className="text-2xl font-semibold">6</div>
                <div className="text-sm text-muted-foreground">Total Questionnaires</div>
              </div>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Questionnaire
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Placeholder content */}
      <Card>
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground text-center py-8">
            Questionnaire workflow content here...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
