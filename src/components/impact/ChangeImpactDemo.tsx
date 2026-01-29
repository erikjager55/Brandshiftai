/**
 * Change Impact Demo
 * 
 * Demo component om te testen hoe het change impact systeem werkt.
 * Laat zien hoe asset wijzigingen automatisch worden getracked.
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Plus, RefreshCw, CheckCircle2, Activity } from 'lucide-react';
import { useBrandAssets } from '../../contexts';
import { useChangeImpact } from '../../contexts';
import { ImpactSummaryList } from './ImpactSummary';

export function ChangeImpactDemo() {
  const { brandAssets, updateBrandAsset } = useBrandAssets();
  const { store, getNotifications } = useChangeImpact();
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);

  // Simuleer verschillende soorten wijzigingen
  const simulateContentUpdate = () => {
    const asset = brandAssets[0];
    if (!asset) return;

    updateBrandAsset(
      asset.id,
      {
        content: `Updated content at ${new Date().toLocaleTimeString()}`,
        lastUpdated: new Date().toISOString(),
      },
      'content-update',
      'Content geüpdatet zonder nieuw onderzoek'
    );
  };

  const simulateResearchAdded = () => {
    const asset = brandAssets[0];
    if (!asset) return;

    const newCoverage = Math.min((asset.researchCoverage || 0) + 20, 100);
    updateBrandAsset(
      asset.id,
      {
        researchCoverage: newCoverage,
        researchMethods: [
          ...asset.researchMethods,
          {
            type: 'interviews' as const,
            status: 'completed' as const,
            progress: 100,
            completedAt: new Date().toISOString(),
          }
        ],
        lastUpdated: new Date().toISOString(),
      },
      'research-added',
      'Nieuw interview onderzoek toegevoegd, coverage verhoogd naar ' + newCoverage + '%'
    );
  };

  const simulateValidation = () => {
    const asset = brandAssets[0];
    if (!asset) return;

    updateBrandAsset(
      asset.id,
      {
        status: 'validated',
        validatedAt: new Date().toISOString(),
        validatedBy: 'Demo User',
        lastUpdated: new Date().toISOString(),
      },
      'validation',
      'Asset gevalideerd en goedgekeurd voor gebruik'
    );
  };

  const notifications = getNotifications();
  const recentImpacts = store.impactAnalyses.slice(0, 5);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Change Impact System Demo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-slate-600 mb-4">
              Simuleer verschillende soorten asset wijzigingen en zie hoe het systeem
              automatisch de impact analyseert.
            </p>

            <div className="flex flex-wrap gap-2">
              <Button
                onClick={simulateContentUpdate}
                variant="outline"
                size="sm"
              >
                <RefreshCw className="w-3.5 h-3.5 mr-2" />
                Content Update
              </Button>

              <Button
                onClick={simulateResearchAdded}
                variant="outline"
                size="sm"
              >
                <Plus className="w-3.5 h-3.5 mr-2" />
                Onderzoek Toevoegen
              </Button>

              <Button
                onClick={simulateValidation}
                variant="outline"
                size="sm"
              >
                <CheckCircle2 className="w-3.5 h-3.5 mr-2" />
                Valideren
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div>
              <div className="text-2xl font-bold">{store.changes.length}</div>
              <div className="text-xs text-slate-600">Totale wijzigingen</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{store.impactAnalyses.length}</div>
              <div className="text-xs text-slate-600">Impact analyses</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{notifications.length}</div>
              <div className="text-xs text-slate-600">Actieve notificaties</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent impacts */}
      {recentImpacts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recente Impact Analyses</CardTitle>
          </CardHeader>
          <CardContent>
            <ImpactSummaryList impactAnalyses={recentImpacts} maxVisible={5} />
          </CardContent>
        </Card>
      )}

      {/* Notifications */}
      {notifications.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Actieve Notificaties</CardTitle>
              <Badge variant="secondary">{notifications.length}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className="p-3 bg-slate-50 rounded-lg border"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">
                        {notif.impactAnalysis.change.assetTitle}
                      </p>
                      <p className="text-xs text-slate-600 mt-1">
                        {notif.impactAnalysis.decisionImpact.summary}
                      </p>
                    </div>
                    {!notif.seen && (
                      <Badge variant="default" className="text-xs">
                        Nieuw
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}