/**
 * COMPONENT: Campaign Strategy Generator Detail Page
 * 
 * Detailed view for the Campaign Strategy Generator tool - 3 tabs (Configure, Insights, Output)
 */

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { Checkbox } from '../ui/checkbox';
import { 
  ArrowRight,
  Megaphone,
  Target,
  Users,
  FileText,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Info,
  Lightbulb,
  ArrowUpRight,
  Sparkles,
  Shield,
  Download,
  Calendar,
  DollarSign,
  BarChart3,
  X,
  Package,
  BookOpen
} from 'lucide-react';
import { StrategyTool } from '../../types/strategy';
import { RelationshipService } from '../../services/RelationshipService';
import { SmartSuggestionsService } from '../../services/SmartSuggestionsService';
import { EntityType } from '../../types/relationship';
import { mockBrandAssets } from '../../data/mock-brand-assets';
import { mockPersonas } from '../../data/mock-personas';
import { mockProducts } from '../../data/mock-products';
import { mockTrends } from '../../data/mock-trends';
import { mockKnowledge } from '../../data/mock-knowledge';

interface CampaignStrategyGeneratorDetailProps {
  tool: StrategyTool;
  onBack: () => void;
}

// Mock research data
const mockResearch = [
  { id: 'research-1', name: 'Q4 Market Analysis', type: 'Market Research' },
  { id: 'research-2', name: 'Competitor Study 2024', type: 'Competitive Analysis' },
  { id: 'research-3', name: 'Customer Insights Report', type: 'User Research' }
];

export function CampaignStrategyGeneratorDetail({ 
  tool, 
  onBack 
}: CampaignStrategyGeneratorDetailProps) {
  const [selectedTab, setSelectedTab] = useState('configure');
  const [selectedBrandAssets, setSelectedBrandAssets] = useState<string[]>([]);
  const [selectedPersonas, setSelectedPersonas] = useState<string[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [selectedTrends, setSelectedTrends] = useState<string[]>([]);
  const [selectedKnowledge, setSelectedKnowledge] = useState<string[]>([]);
  const [selectedResearch, setSelectedResearch] = useState<string[]>([]);
  const [hasGenerated, setHasGenerated] = useState(false);

  const [campaignConfig, setCampaignConfig] = useState({
    name: '',
    objective: '',
    targetMarket: '',
    keyMessage: '',
    timeline: '',
    budget: '',
    primaryKPI: '',
    secondaryKPIs: [] as string[]
  });

  const [showAssetPicker, setShowAssetPicker] = useState(false);
  const [showPersonaPicker, setShowPersonaPicker] = useState(false);
  const [showProductPicker, setShowProductPicker] = useState(false);
  const [showTrendPicker, setShowTrendPicker] = useState(false);
  const [showKnowledgePicker, setShowKnowledgePicker] = useState(false);
  const [showResearchPicker, setShowResearchPicker] = useState(false);

  // Mock navigation functions
  const navigateToBrandAssets = () => {
    console.log('Navigate to Brand Assets');
  };

  const navigateToPersonas = () => {
    console.log('Navigate to Personas');
  };

  // Calculate readiness score
  const readinessScore = useMemo(() => {
    let score = 0;
    if (campaignConfig.name) score += 15;
    if (campaignConfig.objective) score += 15;
    if (campaignConfig.targetMarket) score += 15;
    if (campaignConfig.keyMessage) score += 15;
    if (selectedBrandAssets.length > 0) score += 20;
    if (selectedPersonas.length > 0) score += 20;
    return score;
  }, [campaignConfig, selectedBrandAssets, selectedPersonas]);

  // Mock required assets (assets that don't exist yet)
  const missingRequiredAssets = [
    { type: 'Golden Circle', route: '#/research/brand-assets' },
    { type: 'Mission', route: '#/research/brand-assets' }
  ];

  const handleGenerate = () => {
    setHasGenerated(true);
    setSelectedTab('output');
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
            ← Back
          </Button>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center">
              <Megaphone className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl">{tool.name}</h1>
              <p className="text-sm text-muted-foreground">{tool.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Connection Status Badges */}
      <div className="flex flex-wrap gap-2">
        <Badge variant={selectedBrandAssets.length > 0 ? "default" : "outline"} className="gap-1">
          <Shield className="h-3 w-3" />
          {selectedBrandAssets.length} Brand Assets
        </Badge>
        <Badge variant={selectedPersonas.length > 0 ? "default" : "outline"} className="gap-1">
          <Users className="h-3 w-3" />
          {selectedPersonas.length} Personas
        </Badge>
        <Badge variant={selectedResearch.length > 0 ? "default" : "outline"} className="gap-1">
          <FileText className="h-3 w-3" />
          {selectedResearch.length} Research
        </Badge>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="configure" className="gap-2">
                <Target className="h-4 w-4" />
                Configure
              </TabsTrigger>
              <TabsTrigger value="insights" className="gap-2">
                <Lightbulb className="h-4 w-4" />
                Insights
              </TabsTrigger>
              <TabsTrigger value="output" className="gap-2">
                <FileText className="h-4 w-4" />
                Output
              </TabsTrigger>
            </TabsList>

            {/* Configure Tab */}
            <TabsContent value="configure" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Campaign Details</CardTitle>
                  <CardDescription>Define your campaign objectives and parameters</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Campaign Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-md"
                      value={campaignConfig.name}
                      onChange={(e) => setCampaignConfig({...campaignConfig, name: e.target.value})}
                      placeholder="e.g., Q1 2025 Product Launch"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Primary Objective</label>
                    <select
                      className="w-full px-3 py-2 border rounded-md"
                      value={campaignConfig.objective}
                      onChange={(e) => setCampaignConfig({...campaignConfig, objective: e.target.value})}
                    >
                      <option value="">Select objective...</option>
                      <option value="brand-awareness">Build Brand Awareness</option>
                      <option value="lead-generation">Generate Qualified Leads</option>
                      <option value="product-launch">Launch New Product/Service</option>
                      <option value="customer-retention">Improve Customer Retention</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Target Market</label>
                    <textarea
                      className="w-full px-3 py-2 border rounded-md"
                      value={campaignConfig.targetMarket}
                      onChange={(e) => setCampaignConfig({...campaignConfig, targetMarket: e.target.value})}
                      placeholder="Describe your target audience..."
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Core Message</label>
                    <textarea
                      className="w-full px-3 py-2 border rounded-md"
                      value={campaignConfig.keyMessage}
                      onChange={(e) => setCampaignConfig({...campaignConfig, keyMessage: e.target.value})}
                      placeholder="What's your key campaign message?"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Connect Brand Assets</CardTitle>
                  <CardDescription>Link existing brand assets to inform your strategy</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-between"
                    onClick={() => setShowAssetPicker(true)}
                  >
                    <span>Brand Assets ({selectedBrandAssets.length})</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-between"
                    onClick={() => setShowPersonaPicker(true)}
                  >
                    <span>Personas ({selectedPersonas.length})</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-between"
                    onClick={() => setShowResearchPicker(true)}
                  >
                    <span>Research ({selectedResearch.length})</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Insights Tab */}
            <TabsContent value="insights" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Readiness Overview</CardTitle>
                  <CardDescription>Your campaign strategy readiness score</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Completion</span>
                      <span className="text-sm font-medium">{readinessScore}%</span>
                    </div>
                    <Progress value={readinessScore} />
                  </div>
                  {readinessScore < 100 && (
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        Complete all required fields and connections to generate your campaign strategy.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Output Tab */}
            <TabsContent value="output" className="space-y-6">
              {hasGenerated ? (
                <GeneratedOutput 
                  campaignConfig={campaignConfig}
                  selectedBrandAssets={selectedBrandAssets}
                  selectedPersonas={selectedPersonas}
                  selectedResearch={selectedResearch}
                />
              ) : (
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    {readinessScore < 100 
                      ? 'Complete all required inputs and click "Generate Campaign Strategy" to see your output'
                      : 'Click the "Generate Campaign Strategy" button to create your brief'
                    }
                  </AlertDescription>
                </Alert>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                className="w-full gap-2"
                onClick={handleGenerate}
                disabled={readinessScore < 60}
              >
                <Sparkles className="h-4 w-4" />
                Generate Strategy
              </Button>
              <Button variant="outline" className="w-full gap-2">
                <Download className="h-4 w-4" />
                Export Brief
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Picker Modals */}
      {showAssetPicker && (
        <SimplePickerModal
          title="Select Brand Assets"
          items={mockBrandAssets.map(a => ({ id: a.id, name: a.title, subtitle: a.category }))}
          selected={selectedBrandAssets}
          onSelect={setSelectedBrandAssets}
          onClose={() => setShowAssetPicker(false)}
        />
      )}

      {showPersonaPicker && (
        <SimplePickerModal
          title="Select Personas"
          items={mockPersonas.map(p => ({ id: p.id, name: p.name, subtitle: p.role }))}
          selected={selectedPersonas}
          onSelect={setSelectedPersonas}
          onClose={() => setShowPersonaPicker(false)}
        />
      )}

      {showResearchPicker && (
        <SimplePickerModal
          title="Select Research"
          items={mockResearch.map(r => ({ id: r.id, name: r.name, subtitle: r.type }))}
          selected={selectedResearch}
          onSelect={setSelectedResearch}
          onClose={() => setShowResearchPicker(false)}
        />
      )}
    </div>
  );
}

// Simple Picker Modal Component
function SimplePickerModal({ 
  title,
  items,
  selected, 
  onSelect, 
  onClose 
}: { 
  title: string;
  items: Array<{ id: string; name: string; subtitle?: string; }>;
  selected: string[]; 
  onSelect: (ids: string[]) => void; 
  onClose: () => void;
}) {
  const [tempSelected, setTempSelected] = useState(selected);

  const toggleItem = (id: string) => {
    setTempSelected(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[80vh] overflow-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{title}</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {items.map(item => (
            <div
              key={item.id}
              className="flex items-start gap-3 p-3 rounded-lg border cursor-pointer hover:bg-muted/50"
              onClick={() => toggleItem(item.id)}
            >
              <Checkbox checked={tempSelected.includes(item.id)} />
              <div className="flex-1">
                <p className="font-medium text-sm">{item.name}</p>
                {item.subtitle && (
                  <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                )}
              </div>
            </div>
          ))}
        </CardContent>
        <div className="p-4 border-t flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={() => { onSelect(tempSelected); onClose(); }}>
            Select ({tempSelected.length})
          </Button>
        </div>
      </Card>
    </div>
  );
}

// Generated Output Component
function GeneratedOutput({ 
  campaignConfig,
  selectedBrandAssets,
  selectedPersonas,
  selectedResearch
}: {
  campaignConfig: {
    name: string;
    objective: string;
    targetMarket: string;
    keyMessage: string;
    timeline: string;
    budget: string;
    primaryKPI: string;
    secondaryKPIs: string[];
  };
  selectedBrandAssets: string[];
  selectedPersonas: string[];
  selectedResearch: string[];
}) {
  const getObjectiveLabel = (value: string) => {
    const labels: Record<string, string> = {
      'brand-awareness': 'Build Brand Awareness',
      'lead-generation': 'Generate Qualified Leads',
      'product-launch': 'Launch New Product/Service',
      'customer-retention': 'Improve Customer Retention'
    };
    return labels[value] || value;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{campaignConfig.name || 'Campaign Strategy Brief'}</CardTitle>
              <CardDescription className="mt-2">
                Generated on {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </CardDescription>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
              <CheckCircle className="h-3 w-3 mr-1" />
              Generated
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              Campaign Overview
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border bg-muted/30">
                <p className="text-xs text-muted-foreground mb-1">OBJECTIVE</p>
                <p className="font-medium">{getObjectiveLabel(campaignConfig.objective)}</p>
              </div>
              <div className="p-4 rounded-lg border bg-muted/30">
                <p className="text-xs text-muted-foreground mb-1">CONNECTED ASSETS</p>
                <p className="font-medium">
                  {selectedBrandAssets.length + selectedPersonas.length + selectedResearch.length} Total
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-600" />
              Target Audience
            </h3>
            <div className="p-4 rounded-lg border bg-purple-50 dark:bg-purple-900/10">
              <p className="text-sm leading-relaxed">
                {campaignConfig.targetMarket || 'No target market defined.'}
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-orange-600" />
              Core Campaign Message
            </h3>
            <div className="p-4 rounded-lg border bg-orange-50 dark:bg-orange-900/10">
              <p className="text-sm font-medium leading-relaxed">
                "{campaignConfig.keyMessage || 'No core message defined.'}"
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/30">
        <Button variant="outline">
          Back to Configure
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2">
            <CheckCircle className="h-4 w-4" />
            Approve & Launch
          </Button>
        </div>
      </div>
    </div>
  );
}
