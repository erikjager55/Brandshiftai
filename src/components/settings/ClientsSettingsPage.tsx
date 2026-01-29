import React from 'react';
import { Briefcase } from 'lucide-react';
import { Card } from '../ui/card';

export function ClientsSettingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold">Clients</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your client accounts and workspaces
        </p>
      </div>

      {/* Placeholder Card */}
      <Card className="rounded-xl border p-6">
        <div className="text-center py-8">
          <Briefcase className="h-12 w-12 text-muted-foreground mx-auto" />
          <h2 className="text-lg font-semibold mt-4">
            Client Management Coming Soon
          </h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
            Add and manage client accounts, assign team members, and track project progress.
          </p>
        </div>
      </Card>
    </div>
  );
}
