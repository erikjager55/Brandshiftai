/**
 * Simplified Workshop Manager with StatusDropdown Integration  
 * This is a streamlined version that uses the new StatusDropdown component
 */

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { 
  Users,
  Plus,
  Calendar,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { StatusDropdown, ExtendedStatus } from '../research/StatusDropdown';

interface WorkshopManagerSimplifiedProps {
  assetId: string;
}

export function WorkshopManagerSimplified({ assetId }: WorkshopManagerSimplifiedProps) {
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
              <h2 className="text-xl font-semibold">Workshop Manager</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {researchStatus === 'draft' && 'Plan your workshop session'}
                {researchStatus === 'scheduled' && 'Workshop is scheduled and participants invited'}
                {researchStatus === 'in_progress' && 'Conduct collaborative workshop with team'}
                {researchStatus === 'in_review' && 'Reviewing workshop outcomes and insights'}
                {researchStatus === 'completed' && 'Workshop completed and results finalized'}
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
                <div className="text-2xl font-semibold">1</div>
                <div className="text-sm text-muted-foreground">Workshop Session</div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                Sep 5, 2025
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                2.5 hours
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                8 participants
              </div>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Schedule Workshop
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Placeholder content */}
      <Card>
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground text-center py-8">
            Workshop workflow content here...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
