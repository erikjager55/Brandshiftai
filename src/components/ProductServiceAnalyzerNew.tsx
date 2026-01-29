/**
 * Product & Service Analyzer
 * Add new product via URL analysis, PDF upload, or manual entry
 * All text in English, no example URLs section
 */

import React, { useState, useRef } from 'react';
import {
  Package,
  Globe,
  FileText,
  Edit,
  Sparkles,
  CheckCircle2,
  Upload,
  Plus,
  X,
  Users,
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { cn } from '../lib/utils';
import { AnalyzingModal } from './AnalyzingModal';

type TabId = 'url' | 'pdf' | 'manual';

interface ProductServiceAnalyzerNewProps {
  onComplete: (data: any) => void;
  onBack?: () => void;
}

export function ProductServiceAnalyzerNew({
  onComplete,
  onBack,
}: ProductServiceAnalyzerNewProps) {
  const [activeTab, setActiveTab] = useState<TabId>('url');
  const [url, setUrl] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showAnalyzingModal, setShowAnalyzingModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Manual form state
  const [manualForm, setManualForm] = useState({
    name: '',
    description: '',
    category: '',
    pricing: '',
    features: '',
    benefits: '',
    useCases: '',
  });

  const handleAnalyzeUrl = () => {
    if (!url.trim()) return;
    setShowAnalyzingModal(true);
  };

  const handleAnalyzePdf = () => {
    if (!uploadedFile) return;
    setShowAnalyzingModal(true);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file);
    }
  };

  const handleSaveManual = () => {
    // Validate required fields
    if (!manualForm.name.trim() || !manualForm.description.trim()) {
      return;
    }

    const productData = {
      source: 'Manual Entry',
      name: manualForm.name,
      description: manualForm.description,
      category: manualForm.category,
      pricing: manualForm.pricing,
      features: manualForm.features.split('\n').filter((f) => f.trim()),
      benefits: manualForm.benefits.split('\n').filter((b) => b.trim()),
      useCases: manualForm.useCases.split('\n').filter((u) => u.trim()),
    };

    onComplete(productData);
  };

  return (
    <div className="flex-1 overflow-auto bg-background">
      {/* Header */}
      <div className="border-b bg-background">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-primary/10 dark:bg-primary/20">
              <Package className="h-8 w-8 text-primary" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-semibold">Product & Service Analyzer</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Analyze a product via URL, upload a PDF, or enter manually
              </p>
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="mt-6 inline-flex bg-muted rounded-xl p-1">
            <TabButton
              active={activeTab === 'url'}
              onClick={() => setActiveTab('url')}
              icon={Globe}
              label="Website URL"
            />
            <TabButton
              active={activeTab === 'pdf'}
              onClick={() => setActiveTab('pdf')}
              icon={FileText}
              label="PDF Upload"
            />
            <TabButton
              active={activeTab === 'manual'}
              onClick={() => setActiveTab('manual')}
              icon={Edit}
              label="Manual Entry"
            />
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-4xl mx-auto px-6 py-6">
        {/* Tab 1: Website URL */}
        {activeTab === 'url' && (
          <Card className="rounded-xl border p-6">
            {/* Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-xl bg-primary/10 dark:bg-primary/20">
                <Globe className="h-12 w-12 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold">Analyze Product URL</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Enter a product page URL and our AI automatically extracts all features, benefits,
                  and specs.
                </p>
              </div>
            </div>

            {/* URL Input */}
            <div>
              <Label htmlFor="url" className="text-sm font-medium">
                Product/Service URL
              </Label>
              <div className="flex gap-2 mt-2">
                <div className="flex-1 relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="url"
                    type="url"
                    placeholder="www.example.com/product"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="pl-10 rounded-lg"
                  />
                </div>
                <Button
                  onClick={handleAnalyzeUrl}
                  disabled={!url.trim()}
                  className="rounded-xl"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Analyze
                </Button>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t my-6" />

            {/* What we extract */}
            <div>
              <h3 className="text-sm font-medium mb-4">What we extract:</h3>
              <div className="grid grid-cols-2 gap-4">
                <FeatureItem
                  icon={CheckCircle2}
                  title="Feature Extraction"
                  description="Features and specs"
                />
                <FeatureItem
                  icon={CheckCircle2}
                  title="Benefits Analysis"
                  description="Benefits and USPs"
                />
                <FeatureItem
                  icon={CheckCircle2}
                  title="Target Audience"
                  description="Target segments"
                />
                <FeatureItem
                  icon={CheckCircle2}
                  title="Pricing Model"
                  description="Pricing and value prop"
                />
              </div>
            </div>

            {/* Divider */}
            <div className="border-t my-6" />

            {/* How does it work */}
            <div>
              <h3 className="text-sm font-medium mb-4">How does it work?</h3>
              <div className="space-y-4">
                <StepItem
                  number={1}
                  title="Enter a product URL"
                  description="Paste the URL of a product page you want to analyze"
                />
                <StepItem
                  number={2}
                  title="AI analyzes the page"
                  description="Our AI extracts all product information automatically"
                />
                <StepItem
                  number={3}
                  title="Review and save"
                  description="Use the extracted data in campaigns and strategies"
                />
              </div>
            </div>
          </Card>
        )}

        {/* Tab 2: PDF Upload */}
        {activeTab === 'pdf' && (
          <Card className="rounded-xl border p-6">
            {/* Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-xl bg-primary/10 dark:bg-primary/20">
                <FileText className="h-12 w-12 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold">Upload Product/Service PDF</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Upload a product sheet, brochure, or service description. Our AI extracts all
                  information.
                </p>
              </div>
            </div>

            {/* Upload Area */}
            <div>
              <Label className="text-sm font-medium">Product/Service Document PDF</Label>
              <div
                className={cn(
                  'mt-2 border-2 border-dashed rounded-xl p-12 text-center transition-colors cursor-pointer',
                  isDragging
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50 hover:bg-muted/50'
                )}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                {uploadedFile ? (
                  <div className="space-y-2">
                    <FileText className="h-12 w-12 text-primary mx-auto" />
                    <p className="text-sm font-medium">{uploadedFile.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <div className="flex items-center justify-center gap-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setUploadedFile(null);
                        }}
                        className="rounded-xl"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAnalyzePdf();
                        }}
                        className="rounded-xl"
                      >
                        <Sparkles className="h-4 w-4 mr-2" />
                        Analyze PDF
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto" />
                    <p className="text-sm font-medium">Click to upload a file</p>
                    <p className="text-sm text-muted-foreground">Or drag and drop a PDF file here</p>
                    <p className="text-xs text-muted-foreground mt-2">PDF • Max 10MB</p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            </div>

            {/* Divider */}
            <div className="border-t my-6" />

            {/* What we extract */}
            <div>
              <h3 className="text-sm font-medium mb-4">What we extract:</h3>
              <div className="grid grid-cols-2 gap-4">
                <FeatureItem
                  icon={CheckCircle2}
                  title="Automatic Extraction"
                  description="Features and specs"
                />
                <FeatureItem
                  icon={CheckCircle2}
                  title="Pricing Information"
                  description="Pricing models and options"
                />
                <FeatureItem
                  icon={CheckCircle2}
                  title="Use Cases"
                  description="Applications and examples"
                />
                <FeatureItem icon={CheckCircle2} title="Images" description="Product visual extraction" />
              </div>
            </div>

            {/* Divider */}
            <div className="border-t my-6" />

            {/* What can I upload */}
            <div>
              <h3 className="text-sm font-medium mb-4">What can I upload?</h3>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Product Sheets</p>
                    <p className="text-sm text-muted-foreground">
                      Complete product descriptions with specs
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Service Brochures</p>
                    <p className="text-sm text-muted-foreground">Service descriptions and benefits</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Product Catalogs</p>
                    <p className="text-sm text-muted-foreground">Catalogs with multiple products</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t my-6" />

            {/* How does it work */}
            <div>
              <h3 className="text-sm font-medium mb-4">How does it work?</h3>
              <div className="space-y-4">
                <StepItem number={1} title="Upload a PDF document" description="" />
                <StepItem number={2} title="AI analyzes the document" description="" />
                <StepItem number={3} title="Review and save" description="" />
              </div>
            </div>
          </Card>
        )}

        {/* Tab 3: Manual Entry */}
        {activeTab === 'manual' && (
          <div className="space-y-6">
            <Card className="rounded-xl border p-6">
              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 rounded-xl bg-primary/10 dark:bg-primary/20">
                  <Edit className="h-12 w-12 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">Manual Product/Service Entry</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Fill in the form below with all relevant info. You can always edit details later.
                  </p>
                </div>
              </div>

              {/* Form */}
              <div className="space-y-6">
                {/* Product/Service Name */}
                <div>
                  <Label htmlFor="name" className="text-sm font-medium">
                    Product/Service Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="e.g., Premium Marketing Suite"
                    value={manualForm.name}
                    onChange={(e) => setManualForm({ ...manualForm, name: e.target.value })}
                    className="mt-2 rounded-lg"
                  />
                </div>

                {/* Description */}
                <div>
                  <Label htmlFor="description" className="text-sm font-medium">
                    Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of your product or service..."
                    value={manualForm.description}
                    onChange={(e) => setManualForm({ ...manualForm, description: e.target.value })}
                    className="mt-2 rounded-lg min-h-[100px]"
                  />
                </div>

                {/* Category & Pricing */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category" className="text-sm font-medium">
                      Category
                    </Label>
                    <Input
                      id="category"
                      placeholder="e.g., Marketing Software"
                      value={manualForm.category}
                      onChange={(e) => setManualForm({ ...manualForm, category: e.target.value })}
                      className="mt-2 rounded-lg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pricing" className="text-sm font-medium">
                      Pricing Model
                    </Label>
                    <Input
                      id="pricing"
                      placeholder="e.g., €99/month or Custom"
                      value={manualForm.pricing}
                      onChange={(e) => setManualForm({ ...manualForm, pricing: e.target.value })}
                      className="mt-2 rounded-lg"
                    />
                  </div>
                </div>

                {/* Features */}
                <div>
                  <Label htmlFor="features" className="text-sm font-medium">
                    Features & Specifications <span className="text-muted-foreground">(One per line)</span>
                  </Label>
                  <Textarea
                    id="features"
                    placeholder="Multi-channel campaign management&#10;Advanced analytics dashboard&#10;Marketing automation workflows"
                    value={manualForm.features}
                    onChange={(e) => setManualForm({ ...manualForm, features: e.target.value })}
                    className="mt-2 rounded-lg min-h-[120px] font-mono text-sm"
                  />
                </div>

                {/* Benefits */}
                <div>
                  <Label htmlFor="benefits" className="text-sm font-medium">
                    Benefits & Advantages <span className="text-muted-foreground">(One per line)</span>
                  </Label>
                  <Textarea
                    id="benefits"
                    placeholder="Increase conversion by 40% on average&#10;Save 15 hours per week on repetitive tasks&#10;Get 360° insight into customer behavior"
                    value={manualForm.benefits}
                    onChange={(e) => setManualForm({ ...manualForm, benefits: e.target.value })}
                    className="mt-2 rounded-lg min-h-[120px] font-mono text-sm"
                  />
                </div>

                {/* Use Cases */}
                <div>
                  <Label htmlFor="useCases" className="text-sm font-medium">
                    Use Cases & Applications <span className="text-muted-foreground">(One per line)</span>
                  </Label>
                  <Textarea
                    id="useCases"
                    placeholder="Lead generation campaigns&#10;Customer retention programs&#10;Product launches"
                    value={manualForm.useCases}
                    onChange={(e) => setManualForm({ ...manualForm, useCases: e.target.value })}
                    className="mt-2 rounded-lg min-h-[100px] font-mono text-sm"
                  />
                </div>

                {/* Target Audience */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-sm font-medium">Target Audience (Personas)</Label>
                    <Button variant="outline" size="sm" className="rounded-xl">
                      <Plus className="h-4 w-4 mr-2" />
                      Select Personas
                    </Button>
                  </div>
                  <Card className="rounded-xl border p-6 bg-muted/50">
                    <div className="flex flex-col items-center text-center">
                      <Users className="h-12 w-12 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-3">No personas selected</p>
                      <Button variant="outline" size="sm" className="rounded-xl">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Persona
                      </Button>
                    </div>
                  </Card>
                </div>

                {/* Save Button */}
                <Button
                  onClick={handleSaveManual}
                  disabled={!manualForm.name.trim() || !manualForm.description.trim()}
                  className="w-full rounded-xl"
                  size="lg"
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Save Product/Service
                </Button>
              </div>
            </Card>

            {/* Tips Card */}
            <Card className="rounded-xl border p-6 bg-muted/30">
              <h3 className="text-sm font-semibold mb-4">Tips for filling in</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">💡</span>
                  <div>
                    <p className="text-sm font-medium">Be specific</p>
                    <p className="text-sm text-muted-foreground">
                      The more specific you are with features and benefits, the better AI can help you.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📝</span>
                  <div>
                    <p className="text-sm font-medium">One item per line</p>
                    <p className="text-sm text-muted-foreground">
                      For features, benefits, and use cases, put each item on a new line.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">✏️</span>
                  <div>
                    <p className="text-sm font-medium">Edit later</p>
                    <p className="text-sm text-muted-foreground">
                      You can always edit and update information later.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Analyzing Modal */}
      <AnalyzingModal
        isOpen={showAnalyzingModal}
        onClose={() => setShowAnalyzingModal(false)}
        onComplete={() => {
          setShowAnalyzingModal(false);
          // Mock data for demo
          onComplete({
            source: activeTab === 'url' ? url : uploadedFile?.name || 'Manual Entry',
            name: 'Premium Marketing Suite',
            description: 'Complete marketing solution for mid-sized companies',
            category: 'Marketing Software',
            pricing: '€99/month',
          });
        }}
        analysisType="product"
        inputType={activeTab === 'pdf' ? 'pdf' : 'url'}
        source={activeTab === 'url' ? url : uploadedFile?.name || ''}
      />
    </div>
  );
}

// Helper Components

function TabButton({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ElementType;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-4 py-2 rounded-lg text-sm font-medium transition-all',
        active
          ? 'bg-background shadow-sm text-foreground'
          : 'text-muted-foreground hover:text-foreground'
      )}
    >
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4" />
        {label}
      </div>
    </button>
  );
}

function FeatureItem({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function StepItem({
  number,
  title,
  description,
}: {
  number: number;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium flex-shrink-0">
        {number}
      </div>
      <div>
        <p className="text-sm font-medium">{title}</p>
        {description && <p className="text-sm text-muted-foreground mt-0.5">{description}</p>}
      </div>
    </div>
  );
}
