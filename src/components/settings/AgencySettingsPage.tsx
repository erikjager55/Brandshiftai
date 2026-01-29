import React from 'react';
import { Building } from 'lucide-react';
import { Card } from '../ui/card';

export function AgencySettingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold">Agency</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your agency profile and branding
        </p>
      </div>

      {/* Placeholder Card */}
      <Card className="rounded-xl border p-6">
        <div className="text-center py-8">
          <Building className="h-12 w-12 text-muted-foreground mx-auto" />
          <h2 className="text-lg font-semibold mt-4">
            Agency Settings Coming Soon
          </h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
            Configure your agency profile, white-label options, and client management settings.
          </p>
        </div>
      </Card>
    </div>
  );
}
