/**
 * COMPONENT: Executive View
 * 
 * Ontworpen voor directie en stakeholders - alleen de essentie.
 * Geen details, geen researchlijsten, geen methoden.
 */

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  Shield,
  AlertTriangle,
  TrendingUp,
  Calendar,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Megaphone,
  BarChart3,
  Target
} from 'lucide-react';
import { useBrandAssets } from '../../contexts';
import { mockBrandAssets } from '../../data/mock-brand-assets';
import { calculateCampaignDecision } from '../../utils/campaign-decision-calculator-v2';

interface ExecutiveViewProps {
  onNavigate?: (section: string, itemId?: string) => void;
}

export function ExecutiveView({ onNavigate }: ExecutiveViewProps) {
  // Calculate overall brand decision status
  const brandAssetIds = mockBrandAssets.map(a => a.id);
  const overallDecision = calculateCampaignDecision(brandAssetIds, []);

  // Mock lopende campagnes (in real app, would come from context)
  const activeCampaigns = [
    {
      id: 'campaign-1',
      name: 'Summer Product Launch 2025',
      status: 'safe-to-decide' as const,
      priority: 'high' as const,
      startDate: '2025-01-15',
      budget: '€75K'
    },
    {
      id: 'campaign-2',
      name: 'Q1 Brand Awareness Campaign',
      status: 'decision-at-risk' as const,
      priority: 'medium' as const,
      startDate: '2025-02-01',
      budget: '€50K'
    },
    {
      id: 'campaign-3',
      name: 'Customer Retention Initiative',
      status: 'safe-to-decide' as const,
      priority: 'high' as const,
      startDate: '2025-01-20',
      budget: '€35K'
    }
  ];

  // Top 3 strategic risks
  const strategicRisks = [
    {
      id: 'risk-1',
      title: 'Beperkte validatie van nieuwe doelgroep segmenten',
      severity: 'high' as const,
      impact: 'Marketing naar ongevalideerde personas verhoogt het risico op lage conversie',
      affectedCampaigns: 2
    },
    {
      id: 'risk-2',
      title: 'Inconsistente brand messaging across channels',
      severity: 'medium' as const,
      impact: 'Merk boodschap is niet consistent getest voor alle kanalen',
      affectedCampaigns: 1
    },
    {
      id: 'risk-3',
      title: 'Verouderde competitive positioning data',
      severity: 'medium' as const,
      impact: 'Positionering is gebaseerd op 6 maanden oude marktdata',
      affectedCampaigns: 3
    }
  ];

  // Next recommended decision
  const nextDecision = {
    title: 'Valideer nieuwe product messaging',
    deadline: '15 januari 2025',
    reason: 'Vereist voor Summer Product Launch campagne',
    priority: 'high' as const,
    action: 'Start user research voor messaging validatie'
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe-to-decide':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
      case 'decision-at-risk':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300';
      case 'do-not-decide':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'safe-to-decide':
        return 'Safe to Decide';
      case 'decision-at-risk':
        return 'At Risk';
      case 'do-not-decide':
        return 'Blocked';
      default:
        return status;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 'medium':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
      case 'low':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityIcon = (priority: string) => {
    return priority === 'high' ? AlertTriangle : Target;
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Executive Overview</h1>
        <p className="text-muted-foreground">
          Strategic decision dashboard voor directie en stakeholders
        </p>
      </div>

      {/* Top Grid - Brand Status & Next Decision */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Brand Decision Status */}
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-blue-700 dark:text-blue-400" />
                </div>
                <div>
                  <CardTitle>Brand Decision Status</CardTitle>
                  <CardDescription>Huidige staat van strategische besluitvorming</CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Overall Status */}
            <div className="p-4 rounded-lg bg-muted/50 border">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-muted-foreground">Overall Status</p>
                <Badge className={getStatusColor(overallDecision.status)}>
                  {getStatusLabel(overallDecision.status)}
                </Badge>
              </div>
              <p className="text-sm">
                {overallDecision.status === 'safe-to-decide' && 
                  'Alle kritieke brand assets zijn voldoende gevalideerd voor besluitvorming'}
                {overallDecision.status === 'decision-at-risk' && 
                  'Sommige brand assets hebben beperkte validatie - verhoogd risico'}
                {overallDecision.status === 'do-not-decide' && 
                  'Kritieke brand assets hebben onvoldoende validatie - niet geschikt voor beslissingen'}
              </p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold">{mockBrandAssets.length}</p>
                <p className="text-xs text-muted-foreground">Brand Assets</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{activeCampaigns.length}</p>
                <p className="text-xs text-muted-foreground">Active Campaigns</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{strategicRisks.length}</p>
                <p className="text-xs text-muted-foreground">Strategic Risks</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Recommended Decision */}
        <Card className="border-2 border-amber-200 dark:border-amber-800 bg-amber-50/30 dark:bg-amber-950/20">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-amber-700 dark:text-amber-400" />
              </div>
              <div>
                <CardTitle>Eerstvolgende Beslissing</CardTitle>
                <CardDescription>Prioriteit actie voor strategische voortgang</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="destructive" className="text-xs">
                  Hoge Prioriteit
                </Badge>
                <Badge variant="outline" className="text-xs gap-1">
                  <Calendar className="h-3 w-3" />
                  {nextDecision.deadline}
                </Badge>
              </div>
              <h3 className="font-semibold mb-2">{nextDecision.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">
                {nextDecision.reason}
              </p>
              <div className="p-3 rounded-lg bg-background/60 border">
                <p className="text-sm font-medium mb-1">Aanbevolen Actie</p>
                <p className="text-sm text-muted-foreground">{nextDecision.action}</p>
              </div>
            </div>
            <Button className="w-full gap-2" onClick={() => onNavigate?.('research')}>
              Start Validatie
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Strategic Risks */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-red-100 dark:bg-red-900/50 flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-red-700 dark:text-red-400" />
              </div>
              <div>
                <CardTitle>Top 3 Strategische Risico's</CardTitle>
                <CardDescription>Belangrijkste aandachtspunten voor besluitvorming</CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {strategicRisks.map((risk, index) => {
              const PriorityIcon = getPriorityIcon(risk.severity);
              return (
                <div
                  key={risk.id}
                  className="p-4 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-background flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-sm font-bold text-muted-foreground">{index + 1}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-sm">{risk.title}</h4>
                        <Badge className={`${getSeverityColor(risk.severity)} text-xs`}>
                          {risk.severity === 'high' ? 'Hoog' : risk.severity === 'medium' ? 'Middel' : 'Laag'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{risk.impact}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Megaphone className="h-3 w-3" />
                          {risk.affectedCampaigns} {risk.affectedCampaigns === 1 ? 'campagne' : 'campagnes'} affected
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Active Campaigns */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                <Megaphone className="h-5 w-5 text-purple-700 dark:text-purple-400" />
              </div>
              <div>
                <CardTitle>Lopende Campagnes</CardTitle>
                <CardDescription>Overzicht van actieve strategische initiatieven</CardDescription>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => onNavigate?.('strategy')}>
              Bekijk Alles
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {activeCampaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="p-4 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => onNavigate?.('strategy', campaign.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">{campaign.name}</h4>
                      <Badge className={getStatusColor(campaign.status)}>
                        {getStatusLabel(campaign.status)}
                      </Badge>
                      {campaign.priority === 'high' && (
                        <Badge variant="outline" className="text-xs gap-1">
                          <AlertTriangle className="h-3 w-3" />
                          Hoge Prioriteit
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        Start: {new Date(campaign.startDate).toLocaleDateString('nl-NL')}
                      </span>
                      <span className="flex items-center gap-1">
                        <BarChart3 className="h-3.5 w-3.5" />
                        Budget: {campaign.budget}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground flex-shrink-0 ml-4" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
