/**
 * COMPONENT: Report Mode
 * 
 * Ontworpen voor externe communicatie en verantwoording.
 * Printbaar en deelbaar (PDF/link).
 */

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  FileText,
  Download,
  Share2,
  Printer,
  Search,
  Package,
  Megaphone,
  Calendar,
  Filter
} from 'lucide-react';
import { mockBrandAssets } from '../../data/mock-brand-assets';
import { ShareableBrandReport } from './ShareableBrandReport';
import { ShareableCampaignReport } from './ShareableCampaignReport';

interface ReportModeProps {
  onBack?: () => void;
}

export function ReportMode({ onBack }: ReportModeProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReport, setSelectedReport] = useState<{ type: 'brand' | 'campaign'; id: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'brand' | 'campaign'>('brand');

  // Mock campaigns (in real app, would come from context)
  const mockCampaigns = [
    {
      id: 'campaign-1',
      name: 'Summer Product Launch 2025',
      objective: 'product-launch',
      createdAt: new Date('2024-12-25'),
      status: 'generated' as const,
      generationMetadata: {
        generatedAt: '2024-12-25T10:30:00.000Z',
        usedBrandAssets: [
          { id: 'brand-1', title: 'Core Brand Values', version: '2.1' },
          { id: 'brand-2', title: 'Target Positioning Strategy', version: '1.0' }
        ],
        usedPersonas: [
          { id: 'persona-1', name: 'Sarah - Product Manager' }
        ],
        researchCoverageSnapshot: 85,
        decisionStatus: 'safe-to-decide' as const,
        decisionRisks: [],
        totalAssets: 2,
        totalPersonas: 1
      }
    },
    {
      id: 'campaign-2',
      name: 'Q1 Brand Awareness Campaign',
      objective: 'brand-awareness',
      createdAt: new Date('2024-12-20'),
      status: 'generated' as const,
      generationMetadata: {
        generatedAt: '2024-12-20T14:15:00.000Z',
        usedBrandAssets: [
          { id: 'brand-1', title: 'Core Brand Values', version: '2.1' }
        ],
        usedPersonas: [
          { id: 'persona-2', name: 'Marcus - Tech Lead' }
        ],
        researchCoverageSnapshot: 65,
        decisionStatus: 'decision-at-risk' as const,
        decisionRisks: [
          'Beperkte validatie van doelgroep segment',
          'Incomplete competitive analysis'
        ],
        totalAssets: 1,
        totalPersonas: 1
      }
    }
  ];

  const filteredBrandAssets = mockBrandAssets.filter(asset =>
    asset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCampaigns = mockCampaigns.filter(campaign =>
    campaign.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // If a report is selected, show the full report view
  if (selectedReport) {
    if (selectedReport.type === 'brand') {
      const asset = mockBrandAssets.find(a => a.id === selectedReport.id);
      if (asset) {
        return (
          <ShareableBrandReport
            asset={asset}
            onBack={() => setSelectedReport(null)}
          />
        );
      }
    } else {
      const campaign = mockCampaigns.find(c => c.id === selectedReport.id);
      if (campaign) {
        return (
          <ShareableCampaignReport
            campaign={campaign}
            onBack={() => setSelectedReport(null)}
          />
        );
      }
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Report Mode</h1>
          <p className="text-muted-foreground">
            Genereer en deel professionele rapporten voor externe communicatie
          </p>
        </div>
        {onBack && (
          <Button variant="outline" onClick={onBack}>
            Terug naar Platform
          </Button>
        )}
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Zoek brand assets of campagnes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for Brand vs Campaign Reports */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'brand' | 'campaign')}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="brand" className="gap-2">
            <Package className="h-4 w-4" />
            Brand Assets ({filteredBrandAssets.length})
          </TabsTrigger>
          <TabsTrigger value="campaign" className="gap-2">
            <Megaphone className="h-4 w-4" />
            Campagnes ({filteredCampaigns.length})
          </TabsTrigger>
        </TabsList>

        {/* Brand Assets Reports */}
        <TabsContent value="brand" className="mt-6">
          <div className="grid gap-4">
            {filteredBrandAssets.map((asset) => (
              <Card
                key={asset.id}
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedReport({ type: 'brand', id: asset.id })}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                          <Package className="h-5 w-5 text-blue-700 dark:text-blue-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{asset.title}</h3>
                          <p className="text-sm text-muted-foreground">{asset.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground ml-13">
                        <span>Versie {asset.version}</span>
                        <span>•</span>
                        <span>Research Coverage: {asset.researchCoverage}%</span>
                        <span>•</span>
                        <span>
                          {new Date(asset.lastUpdated).toLocaleDateString('nl-NL')}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          alert('Print functionaliteit komt binnenkort...');
                        }}
                      >
                        <Printer className="h-4 w-4" />
                        Print
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          alert('Share link gekopieerd naar clipboard!');
                        }}
                      >
                        <Share2 className="h-4 w-4" />
                        Deel
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        className="gap-2"
                      >
                        <FileText className="h-4 w-4" />
                        Bekijk Rapport
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredBrandAssets.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                  <p className="text-muted-foreground">
                    Geen brand assets gevonden
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Campaign Reports */}
        <TabsContent value="campaign" className="mt-6">
          <div className="grid gap-4">
            {filteredCampaigns.map((campaign) => (
              <Card
                key={campaign.id}
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedReport({ type: 'campaign', id: campaign.id })}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                          <Megaphone className="h-5 w-5 text-purple-700 dark:text-purple-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{campaign.name}</h3>
                          <p className="text-sm text-muted-foreground capitalize">
                            {campaign.objective.replace('-', ' ')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground ml-13">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          Gegenereerd: {new Date(campaign.createdAt).toLocaleDateString('nl-NL')}
                        </span>
                        <span>•</span>
                        <span>
                          Decision Status: {campaign.generationMetadata?.decisionStatus === 'safe-to-decide' ? 'Safe' : 'At Risk'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          alert('Print functionaliteit komt binnenkort...');
                        }}
                      >
                        <Printer className="h-4 w-4" />
                        Print
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          alert('Share link gekopieerd naar clipboard!');
                        }}
                      >
                        <Share2 className="h-4 w-4" />
                        Deel
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        className="gap-2"
                      >
                        <FileText className="h-4 w-4" />
                        Bekijk Rapport
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredCampaigns.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Megaphone className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                  <p className="text-muted-foreground">
                    Geen campagnes gevonden
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
