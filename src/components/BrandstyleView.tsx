/**
 * Brandstyle Analyzer
 * Extract and store brand visual identity from website URL or uploaded PDF styleguide
 * STRICT LAYOUT: One card per tab containing ALL content
 */

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import {
  Palette,
  Globe,
  FileText,
  CheckCircle2,
  Sparkles,
  Upload,
  RefreshCw,
  Circle,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { toast } from 'sonner';

type TabType = 'url' | 'pdf';
type PageState = 'input' | 'processing' | 'result';

interface ProcessingStep {
  id: string;
  label: string;
  status: 'done' | 'processing' | 'pending';
}

interface ColorSwatch {
  hex: string;
  name: string;
  shade: string;
}

interface ExtractedData {
  source: string;
  sourceType: 'url' | 'pdf';
  analyzedDate: string;
  colors: {
    primary: ColorSwatch[];
    secondary: ColorSwatch[];
    accent: ColorSwatch[];
  };
  typography: {
    headings: {
      font: string;
      weight: string;
      sizes: Array<{ level: string; size: string; example: string }>;
    };
    body: {
      font: string;
      weight: string;
      sizes: Array<{ level: string; size: string; example: string }>;
    };
  };
  spacing: {
    baseUnit: string;
    scale: string[];
    borderRadius: Array<{ name: string; value: string }>;
  };
  components: {
    buttons: Array<{ type: string; styles: string[] }>;
    shadows: Array<{ name: string; value: string }>;
  };
}

const MOCK_EXTRACTED_DATA: ExtractedData = {
  source: 'brandshift.ai',
  sourceType: 'url',
  analyzedDate: 'Jan 22, 2026',
  colors: {
    primary: [
      { hex: '#0D9488', name: 'Teal', shade: '600' },
      { hex: '#14B8A6', name: 'Teal', shade: '500' },
      { hex: '#5EEAD4', name: 'Teal', shade: '300' },
    ],
    secondary: [
      { hex: '#1F2937', name: 'Gray', shade: '800' },
      { hex: '#6B7280', name: 'Gray', shade: '500' },
      { hex: '#F3F4F6', name: 'Gray', shade: '100' },
    ],
    accent: [
      { hex: '#F59E0B', name: 'Amber', shade: '500' },
      { hex: '#EF4444', name: 'Red', shade: '500' },
    ],
  },
  typography: {
    headings: {
      font: 'Inter',
      weight: '600 (Semibold)',
      sizes: [
        { level: 'Heading 1', size: '48px / 3rem', example: 'The quick brown fox' },
        { level: 'Heading 2', size: '36px / 2.25rem', example: 'The quick brown fox' },
        { level: 'Heading 3', size: '24px / 1.5rem', example: 'The quick brown fox' },
        { level: 'Heading 4', size: '20px / 1.25rem', example: 'The quick brown fox' },
      ],
    },
    body: {
      font: 'Inter',
      weight: '400 (Regular)',
      sizes: [
        { level: 'Body', size: '16px / 1rem', example: 'The quick brown fox jumps' },
        { level: 'Small', size: '14px / 0.875rem', example: 'The quick brown fox jumps' },
        { level: 'Caption', size: '12px / 0.75rem', example: 'The quick brown fox jumps' },
      ],
    },
  },
  spacing: {
    baseUnit: '4px',
    scale: ['4px', '8px', '12px', '16px', '24px', '32px', '48px', '64px'],
    borderRadius: [
      { name: 'sm', value: '4px' },
      { name: 'md', value: '8px' },
      { name: 'lg', value: '12px' },
      { name: 'xl', value: '16px' },
    ],
  },
  components: {
    buttons: [
      { type: 'Primary Button', styles: ['bg-primary', 'text-white', 'rounded-xl'] },
      { type: 'Secondary Button', styles: ['bg-secondary', 'text-white', 'rounded-xl'] },
      { type: 'Outline Button', styles: ['border', 'text-foreground', 'rounded-xl'] },
    ],
    shadows: [
      { name: 'sm', value: '0 1px 2px' },
      { name: 'md', value: '0 4px 6px' },
      { name: 'lg', value: '0 10px 15px' },
    ],
  },
};

interface BrandstyleViewProps {
  onNavigateToResult?: () => void;
}

export function BrandstyleView({ onNavigateToResult }: BrandstyleViewProps) {
  const [activeTab, setActiveTab] = useState<TabType>('url');
  const [pageState, setPageState] = useState<PageState>('input');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [processingSteps, setProcessingSteps] = useState<ProcessingStep[]>([]);
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);

  const handleAnalyzeUrl = () => {
    if (!websiteUrl.trim()) {
      toast.error('Please enter a website URL');
      return;
    }

    // Start processing
    setPageState('processing');
    setProcessingSteps([
      { id: '1', label: 'Scanning website structure', status: 'processing' },
      { id: '2', label: 'Extracting color palette', status: 'pending' },
      { id: '3', label: 'Analyzing typography', status: 'pending' },
      { id: '4', label: 'Detecting component styles', status: 'pending' },
      { id: '5', label: 'Generating styleguide', status: 'pending' },
    ]);

    // Simulate processing
    simulateProcessing();
  };

  const handleFileUpload = (file: File) => {
    if (!file.type.includes('pdf')) {
      toast.error('Please upload a PDF file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB');
      return;
    }

    setUploadedFile(file);
    setPageState('processing');
    setProcessingSteps([
      { id: '1', label: 'Uploading PDF', status: 'processing' },
      { id: '2', label: 'Extracting color palette', status: 'pending' },
      { id: '3', label: 'Analyzing typography', status: 'pending' },
      { id: '4', label: 'Detecting logos and assets', status: 'pending' },
      { id: '5', label: 'Generating styleguide', status: 'pending' },
    ]);

    // Simulate processing
    simulateProcessing();
  };

  const simulateProcessing = () => {
    let currentStep = 0;

    const interval = setInterval(() => {
      setProcessingSteps((prev) => {
        const updated = [...prev];
        
        // Mark current as done
        if (currentStep > 0) {
          updated[currentStep - 1].status = 'done';
        }
        
        // Mark next as processing
        if (currentStep < updated.length) {
          updated[currentStep].status = 'processing';
          currentStep++;
        } else {
          clearInterval(interval);
          // Show results after a delay
          setTimeout(() => {
            setExtractedData(MOCK_EXTRACTED_DATA);
            setPageState('result');
            if (onNavigateToResult) onNavigateToResult();
          }, 500);
        }
        
        return updated;
      });
    }, 1500);
  };

  const handleAnalyzeNew = () => {
    setPageState('input');
    setWebsiteUrl('');
    setUploadedFile(null);
    setProcessingSteps([]);
    setExtractedData(null);
  };

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    toast.success(`Copied ${hex}`);
  };

  const handleCopySection = (sectionName: string) => {
    toast.success(`${sectionName} copied to clipboard`);
  };

  const handleSaveToBrandFoundation = () => {
    toast.success('Styleguide saved to Brand Foundation');
  };

  return (
    <div className="flex-1 overflow-auto bg-background">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Page Header */}
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-primary/10 dark:bg-primary/20">
            <Palette className="h-8 w-8 text-primary" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-semibold">Brandstyle Analyzer</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Analyze a website or upload a brand styleguide PDF
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="inline-flex bg-muted rounded-xl p-1">
          <button
            onClick={() => setActiveTab('url')}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all',
              activeTab === 'url'
                ? 'bg-background shadow-sm text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Globe className="h-4 w-4" />
            Website URL
          </button>
          <button
            onClick={() => setActiveTab('pdf')}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all',
              activeTab === 'pdf'
                ? 'bg-background shadow-sm text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <FileText className="h-4 w-4" />
            PDF Upload
          </button>
        </div>

        {/* Website URL Tab */}
        {activeTab === 'url' && (
          <Card className="p-6">
            {/* Section A: Header + Input */}
            <div>
              <div className="flex items-start gap-4 mb-4">
                <div className="p-2 rounded-xl bg-primary/10 dark:bg-primary/20">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">Analyze Website URL</h2>
                  <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
                    Enter a website URL and our AI automatically analyzes the brand style,
                    including colors, typography, spacing, and other visual elements.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Website URL</label>
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="www.example.com or https://example.com"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      className="pl-9 rounded-lg"
                      disabled={pageState === 'processing'}
                    />
                  </div>
                  <Button 
                    onClick={handleAnalyzeUrl} 
                    className="gap-2"
                    disabled={pageState === 'processing'}
                  >
                    {pageState === 'processing' ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        Analyze
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Section B: What gets extracted */}
            <div className="border-t mt-6 pt-6">
              <h3 className="text-sm font-medium mb-4">What we extract:</h3>
              <div className="grid grid-cols-2 gap-4">
                <FeatureItem
                  title="Color Palette Extraction"
                  description="Primary, secondary, accent"
                />
                <FeatureItem
                  title="Typography Analysis"
                  description="Fonts, sizes and hierarchy"
                />
                <FeatureItem
                  title="Spacing & Layout"
                  description="Margins, padding, grid"
                />
                <FeatureItem
                  title="Component Styles"
                  description="Buttons, borders, shadows"
                />
              </div>
            </div>

            {/* Section C: How it works */}
            <div className="border-t mt-6 pt-6">
              <h3 className="text-lg font-semibold mb-4">How does it work?</h3>
              <div className="space-y-4">
                <HowItWorksStep
                  number="1"
                  title="Enter a website URL"
                  description="Paste the URL of a website whose style you want to analyze"
                />
                <HowItWorksStep
                  number="2"
                  title="AI analyzes the website"
                  description="Our AI scans the website and extracts all visual design elements"
                />
                <HowItWorksStep
                  number="3"
                  title="View your styleguide"
                  description="You get a complete styleguide with all colors, fonts and style elements"
                />
              </div>
            </div>
          </Card>
        )}

        {/* PDF Upload Tab */}
        {activeTab === 'pdf' && (
          <Card className="p-6">
            {/* Section A: Header + Upload */}
            <div>
              <div className="flex items-start gap-4 mb-4">
                <div className="p-2 rounded-xl bg-primary/10 dark:bg-primary/20">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">Upload Brand Styleguide PDF</h2>
                  <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
                    Upload an existing brand styleguide in PDF format. Our AI analyzes the
                    document and extracts all visual elements automatically.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Brand Styleguide PDF</label>
                <div
                  className={cn(
                    "border-2 border-dashed rounded-xl p-8 transition-all cursor-pointer",
                    pageState === 'processing'
                      ? "border-muted-foreground/25 opacity-50 cursor-not-allowed"
                      : "border-muted-foreground/25 hover:border-primary hover:bg-primary/5"
                  )}
                  onClick={() => pageState !== 'processing' && document.getElementById('pdf-upload')?.click()}
                >
                  <input
                    id="pdf-upload"
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    disabled={pageState === 'processing'}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file);
                    }}
                  />
                  <div className="flex flex-col items-center text-center">
                    {pageState === 'processing' ? (
                      <RefreshCw className="h-10 w-10 text-primary mb-3 animate-spin" />
                    ) : (
                      <Upload className="h-10 w-10 text-muted-foreground mb-3" />
                    )}
                    <p className="text-sm font-medium">
                      {pageState === 'processing' ? 'Analyzing PDF...' : 'Click to upload a file'}
                    </p>
                    {pageState !== 'processing' && (
                      <>
                        <p className="text-sm text-muted-foreground">
                          Or drag and drop a PDF file here
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">PDF • Max 10MB</p>
                      </>
                    )}
                    {uploadedFile && (
                      <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                        {uploadedFile.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Section B: What gets extracted */}
            <div className="border-t mt-6 pt-6">
              <h3 className="text-sm font-medium mb-4">What we extract:</h3>
              <div className="grid grid-cols-2 gap-4">
                <FeatureItem
                  title="Automatic Extraction"
                  description="Colors, fonts, design elements"
                />
                <FeatureItem
                  title="Logo Detection"
                  description="Primary logos and variations"
                />
                <FeatureItem
                  title="Tone of Voice"
                  description="Communication style, guidelines"
                />
                <FeatureItem
                  title="Visual Assets"
                  description="Photos and illustrations"
                />
              </div>
            </div>

            {/* Section C: How it works */}
            <div className="border-t mt-6 pt-6">
              <h3 className="text-lg font-semibold mb-4">How does it work?</h3>
              <div className="space-y-4">
                <HowItWorksStep
                  number="1"
                  title="Upload a PDF styleguide"
                  description="Upload an existing brand styleguide document in PDF format"
                />
                <HowItWorksStep
                  number="2"
                  title="AI analyzes the PDF"
                  description="Our AI reads the document and extracts all design elements and guidelines"
                />
                <HowItWorksStep
                  number="3"
                  title="View your styleguide"
                  description="You get a complete styleguide with all colors, fonts and style elements"
                />
              </div>
            </div>
          </Card>
        )}

        {/* Processing Steps */}
        {pageState === 'processing' && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Processing...</h3>
            <div className="space-y-4">
              {processingSteps.map(step => (
                <div key={step.id} className="flex items-center gap-4">
                  <div
                    className={cn(
                      'w-6 h-6 rounded-full text-sm font-medium flex items-center justify-center flex-shrink-0',
                      step.status === 'done' ? 'bg-green-500' :
                      step.status === 'processing' ? 'bg-blue-500' : 'bg-gray-300'
                    )}
                  >
                    {step.status === 'done' ? (
                      <CheckCircle2 className="h-5 w-5 text-white" />
                    ) : step.status === 'processing' ? (
                      <RefreshCw className="h-5 w-5 text-white animate-spin" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">{step.label}</h4>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Result Section */}
        {pageState === 'result' && extractedData && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Brand Styleguide</h3>
            <div className="space-y-4">
              <div className="border-t mt-6 pt-6">
                <h4 className="text-sm font-medium mb-4">Colors</h4>
                <div className="grid grid-cols-3 gap-4">
                  {extractedData.colors.primary.map(color => (
                    <div key={color.hex} className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: color.hex }}
                      />
                      <div className="flex flex-col">
                        <p className="text-sm font-medium">{color.name} {color.shade}</p>
                        <p className="text-xs text-muted-foreground">{color.hex}</p>
                      </div>
                      <Button
                        onClick={() => handleCopyHex(color.hex)}
                        className="text-sm"
                      >
                        Copy
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t mt-6 pt-6">
                <h4 className="text-sm font-medium mb-4">Typography</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-medium">Headings</h5>
                    <p className="text-xs text-muted-foreground">
                      Font: {extractedData.typography.headings.font}, Weight: {extractedData.typography.headings.weight}
                    </p>
                    {extractedData.typography.headings.sizes.map(size => (
                      <div key={size.level} className="flex items-center gap-2">
                        <p className="text-sm font-medium">{size.level}</p>
                        <p className="text-xs text-muted-foreground">{size.size}</p>
                        <p className="text-sm font-medium">{size.example}</p>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h5 className="text-sm font-medium">Body</h5>
                    <p className="text-xs text-muted-foreground">
                      Font: {extractedData.typography.body.font}, Weight: {extractedData.typography.body.weight}
                    </p>
                    {extractedData.typography.body.sizes.map(size => (
                      <div key={size.level} className="flex items-center gap-2">
                        <p className="text-sm font-medium">{size.level}</p>
                        <p className="text-xs text-muted-foreground">{size.size}</p>
                        <p className="text-sm font-medium">{size.example}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t mt-6 pt-6">
                <h4 className="text-sm font-medium mb-4">Spacing</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-medium">Base Unit</h5>
                    <p className="text-xs text-muted-foreground">{extractedData.spacing.baseUnit}</p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium">Scale</h5>
                    <p className="text-xs text-muted-foreground">{extractedData.spacing.scale.join(', ')}</p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium">Border Radius</h5>
                    {extractedData.spacing.borderRadius.map(radius => (
                      <div key={radius.name} className="flex items-center gap-2">
                        <p className="text-sm font-medium">{radius.name}</p>
                        <p className="text-xs text-muted-foreground">{radius.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t mt-6 pt-6">
                <h4 className="text-sm font-medium mb-4">Components</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-medium">Buttons</h5>
                    {extractedData.components.buttons.map(button => (
                      <div key={button.type} className="flex items-center gap-2">
                        <p className="text-sm font-medium">{button.type}</p>
                        <p className="text-xs text-muted-foreground">{button.styles.join(', ')}</p>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h5 className="text-sm font-medium">Shadows</h5>
                    {extractedData.components.shadows.map(shadow => (
                      <div key={shadow.name} className="flex items-center gap-2">
                        <p className="text-sm font-medium">{shadow.name}</p>
                        <p className="text-xs text-muted-foreground">{shadow.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  onClick={handleAnalyzeNew}
                  className="mr-2"
                >
                  Analyze New
                </Button>
                <Button
                  onClick={handleCopySection}
                  className="mr-2"
                >
                  Copy All
                </Button>
                <Button
                  onClick={handleSaveToBrandFoundation}
                >
                  Save to Brand Foundation
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

// Helper Components

function FeatureItem({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex items-start gap-3">
      <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
      <div>
        <h4 className="text-sm font-medium">{title}</h4>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </div>
    </div>
  );
}

function HowItWorksStep({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-6 h-6 rounded-full bg-primary text-white text-sm font-medium flex items-center justify-center flex-shrink-0">
        {number}
      </div>
      <div>
        <h4 className="text-sm font-medium">{title}</h4>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
    </div>
  );
}