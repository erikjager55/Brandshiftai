/**
 * Simplified Interviews Manager with StatusDropdown Integration
 * This is a streamlined version that uses the new StatusDropdown component
 */

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { 
  Users,
  CheckCircle2,
  Calendar,
  Download,
  Clock,
  Plus,
  Package,
  Lock,
  Mail,
  Phone,
} from 'lucide-react';
import { StatusDropdown, ExtendedStatus } from '../research/StatusDropdown';

interface InterviewsManagerSimplifiedProps {
  assetId: string;
}

export function InterviewsManagerSimplified({ assetId }: InterviewsManagerSimplifiedProps) {
  const [researchStatus, setResearchStatus] = useState<ExtendedStatus>('in_progress');

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header with StatusDropdown */}
      <div className="bg-card border border-border rounded-xl p-6">
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
            onChange={(newStatus) => setResearchStatus(newStatus as ExtendedStatus)}
          />
        </div>
      </div>

      {/* Summary Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div>
                <div className="text-2xl font-semibold">4</div>
                <div className="text-sm text-muted-foreground">Total Interviews</div>
              </div>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Interview
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Placeholder content */}
      <Card>
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground text-center py-8">
            Interview workflow content here...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
