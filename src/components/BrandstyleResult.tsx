/**
 * Brandstyle Result Page
 * Display extracted brand elements, allow editing, save as knowledge
 * PROMPT 1 of 2: Page structure + Logo, Colors, Typography sections
 */

import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import {
  Palette,
  Type,
  Image,
  Download,
  Edit,
  Copy,
  CheckCircle2,
  Save,
  RefreshCw,
  Lightbulb,
  FileText,
  Mic,
  ImageIcon,
  X,
  Plus,
  Upload,
  Trash2,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { toast } from 'sonner';
import { AnalyzingModal } from './AnalyzingModal';

type TabId = 'logo' | 'colors' | 'typography' | 'tone' | 'imagery';

interface ColorSwatch {
  name: string;
  hex: string;
}

const BRAND_DATA = {
  source: 'brandshift.ai',
  analyzedDate: 'Jan 22, 2026',
  logo: {
    variations: [
      { id: 'primary', name: 'Primary Logo', darkBg: false },
      { id: 'inverted', name: 'Inverted', darkBg: true },
      { id: 'icon', name: 'Icon Only', darkBg: false },
    ],
    guidelines: [
      'Minimum clear space: 24px around logo',
      'Minimum size: 80px width (digital), 25mm (print)',
      'Always use provided files, never recreate',
    ],
    donts: ['Stretch', 'Rotate', 'Recolor', 'Add FX'],
  },
  colors: {
    primary: [
      { name: 'Teal 600', hex: '#0D9488' },
      { name: 'Teal 500', hex: '#14B8A6' },
      { name: 'Teal 300', hex: '#5EEAD4' },
    ],
    secondary: [
      { name: 'Slate 900', hex: '#0F172A' },
      { name: 'Slate 500', hex: '#64748B' },
      { name: 'Slate 100', hex: '#F1F5F9' },
    ],
    accent: [
      { name: 'Success', hex: '#22C55E' },
      { name: 'Warning', hex: '#F59E0B' },
      { name: 'Error', hex: '#EF4444' },
    ],
  },
  typography: {
    primaryFont: 'Inter',
    typeScale: [
      { level: 'H1', example: 'The quick brown fox', size: '36px', weight: 'Semibold' },
      { level: 'H2', example: 'The quick brown fox', size: '30px', weight: 'Semibold' },
      { level: 'H3', example: 'The quick brown fox', size: '24px', weight: 'Semibold' },
      { level: 'H4', example: 'The quick brown fox', size: '20px', weight: 'Medium' },
      { level: 'Body', example: 'The quick brown fox', size: '16px', weight: 'Regular' },
      { level: 'Small', example: 'The quick brown fox', size: '14px', weight: 'Regular' },
    ],
    guidelines: [
      'Use Inter for all text',
      'Maximum 2 font weights per layout',
      'Headings: Semibold (600)',
      'Body text: Regular (400)',
    ],
  },
  toneOfVoice: {
    personality: [
      { trait: 'Professional', strength: 4 },
      { trait: 'Friendly', strength: 5 },
      { trait: 'Innovative', strength: 3 },
      { trait: 'Trustworthy', strength: 4 },
    ],
    characteristics: {
      weAre: [
        'Confident but not arrogant',
        'Helpful and supportive',
        'Clear and concise',
        'Warm and approachable',
      ],
      weAreNot: [
        'Overly formal or stiff',
        'Condescending or patronizing',
        'Verbose or jargon-heavy',
        'Cold or impersonal',
      ],
    },
    writingGuidelines: [
      'Use active voice',
      'Keep sentences under 25 words',
      'Address the reader with "you"',
      'Lead with benefits, not features',
      'Use contractions (we\'re, you\'ll)',
    ],
    examplePhrases: {
      dos: [
        'Get started in minutes',
        'We\'re here to help you succeed',
        'Create content that connects',
      ],
      donts: [
        'Utilize our platform to optimize workflow efficiency',
        'The system enables content generation capabilities',
      ],
    },
  },
  imagery: {
    photographyGuidelines: [
      'Natural lighting preferred',
      'Authentic moments over staged poses',
      'Diverse and inclusive representation',
      'Clean, uncluttered backgrounds',
      'Warm color grading aligned with brand palette',
    ],
    illustrationStyle: [
      'Flat design with subtle gradients',
      'Consistent 2px line weight',
      'Brand colors only',
      'Rounded corners on all shapes',
    ],
    imageDonts: [
      { label: 'Generic', sublabel: 'stock' },
      { label: 'Heavy', sublabel: 'filters' },
      { label: 'Clip', sublabel: 'art' },
      { label: 'Busy', sublabel: 'backgrounds' },
    ],
  },
};

export function BrandstyleResult() {
  const [activeTab, setActiveTab] = useState<TabId>('logo');
  const [hasChanges, setHasChanges] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [showAnalyzingModal, setShowAnalyzingModal] = useState(false);

  const logoRef = useRef<HTMLDivElement>(null);
  const colorsRef = useRef<HTMLDivElement>(null);
  const typographyRef = useRef<HTMLDivElement>(null);
  const toneRef = useRef<HTMLDivElement>(null);
  const imageryRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (tabId: TabId) => {
    setActiveTab(tabId);
    
    const refs = {
      logo: logoRef,
      colors: colorsRef,
      typography: typographyRef,
      tone: toneRef,
      imagery: imageryRef,
    };

    const ref = refs[tabId];
    if (ref?.current) {
      // Use scrollIntoView with offset
      const yOffset = -140; // Negative offset for sticky header + tabs
      const element = ref.current;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;

      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    toast.success(`Copied ${hex}`);
  };

  const handleCopyAll = (section: string) => {
    toast.success(`${section} copied to clipboard`);
  };

  const handleDownloadLogo = (variant: string) => {
    toast.success(`Downloading ${variant} logo`);
  };

  const handleDownloadAll = () => {
    toast.success('Downloading all logos as ZIP');
  };

  const handleExportPDF = () => {
    toast.success('Exporting styleguide as PDF');
  };

  const handleSaveChanges = () => {
    setIsSaved(true);
    setHasChanges(false);
    toast.success('Styleguide saved to Knowledge');
    
    setTimeout(() => {
      setIsSaved(false);
    }, 3000);
  };

  const handleDiscard = () => {
    setHasChanges(false);
    toast.info('Changes discarded');
  };

  return (
    <div className="flex-1 overflow-auto bg-background">
      {/* Header */}
      <div className="border-b bg-background sticky top-0 z-20">
        <div className="max-w-4xl mx-auto p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 rounded-xl bg-primary/10 dark:bg-primary/20">
              <Palette className="h-8 w-8 text-primary" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-semibold">Brand Styleguide</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Extracted from {BRAND_DATA.source}
              </p>
            </div>
          </div>

          {/* Status Bar */}
          <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium">Analysis Complete</span>
              <span className="text-sm text-muted-foreground">• {BRAND_DATA.analyzedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowAnalyzingModal(true)}>
                Analyze New
              </Button>
              <Button variant="outline" size="sm" onClick={handleExportPDF}>
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex gap-1 border-b">
            <TabButton
              active={activeTab === 'logo'}
              onClick={() => scrollToSection('logo')}
              icon={Image}
              label="Logo"
            />
            <TabButton
              active={activeTab === 'colors'}
              onClick={() => scrollToSection('colors')}
              icon={Palette}
              label="Colors"
            />
            <TabButton
              active={activeTab === 'typography'}
              onClick={() => scrollToSection('typography')}
              icon={Type}
              label="Typography"
            />
            <TabButton
              active={activeTab === 'tone'}
              onClick={() => scrollToSection('tone')}
              icon={Mic}
              label="Tone of Voice"
            />
            <TabButton
              active={activeTab === 'imagery'}
              onClick={() => scrollToSection('imagery')}
              icon={ImageIcon}
              label="Imagery"
            />
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-4xl mx-auto p-6 space-y-6 pb-32">
        {/* Section 1: Logo */}
        <div ref={logoRef} id="logo">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Image className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Logo</h2>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleDownloadAll}>
                  <Download className="h-4 w-4 mr-2" />
                  Download All
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>
            </div>

            {/* Logo Variations */}
            <div>
              <h3 className="text-sm font-medium mb-3">Logo Variations</h3>
              <div className="grid grid-cols-3 gap-4">
                {BRAND_DATA.logo.variations.map((variant) => (
                  <div
                    key={variant.id}
                    className={cn(
                      'rounded-xl p-6 flex flex-col items-center',
                      variant.darkBg ? 'bg-gray-900' : 'bg-muted'
                    )}
                  >
                    <div
                      className={cn(
                        'h-16 w-32 rounded flex items-center justify-center text-sm',
                        variant.darkBg
                          ? 'bg-gray-800 text-gray-400'
                          : 'bg-muted-foreground/20 text-muted-foreground'
                      )}
                    >
                      Logo
                    </div>
                    <p
                      className={cn(
                        'text-sm font-medium mt-3',
                        variant.darkBg ? 'text-white' : ''
                      )}
                    >
                      {variant.name}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 text-xs"
                      onClick={() => handleDownloadLogo(variant.name)}
                    >
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Usage Guidelines */}
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-2">Usage Guidelines</h3>
              <ul className="space-y-1">
                {BRAND_DATA.logo.guidelines.map((guideline, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="mt-1">•</span>
                    <span>{guideline}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Don'ts */}
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-2">Don'ts</h3>
              <div className="grid grid-cols-4 gap-3">
                {BRAND_DATA.logo.donts.map((dont) => (
                  <div
                    key={dont}
                    className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-center"
                  >
                    <p className="text-xs text-red-600 dark:text-red-400">❌ {dont}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Section 2: Colors */}
        <div ref={colorsRef} id="colors">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Color Palette</h2>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopyAll('Color Palette')}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy All
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>
            </div>

            {/* Primary Colors */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Primary Colors</h3>
              <div className="grid grid-cols-3 gap-4">
                {BRAND_DATA.colors.primary.map((color) => (
                  <ColorSwatchCard
                    key={color.hex}
                    color={color}
                    onClick={() => handleCopyHex(color.hex)}
                  />
                ))}
              </div>
            </div>

            {/* Secondary Colors */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Secondary Colors</h3>
              <div className="grid grid-cols-3 gap-4">
                {BRAND_DATA.colors.secondary.map((color) => (
                  <ColorSwatchCard
                    key={color.hex}
                    color={color}
                    onClick={() => handleCopyHex(color.hex)}
                  />
                ))}
              </div>
            </div>

            {/* Accent Colors */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Accent Colors</h3>
              <div className="grid grid-cols-3 gap-4">
                {BRAND_DATA.colors.accent.map((color) => (
                  <ColorSwatchCard
                    key={color.hex}
                    color={color}
                    onClick={() => handleCopyHex(color.hex)}
                  />
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Section 3: Typography */}
        <div ref={typographyRef} id="typography">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Type className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Typography</h2>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopyAll('Typography')}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>
            </div>

            {/* Primary Font */}
            <div>
              <h3 className="text-sm font-medium mb-3">Primary Font</h3>
              <div className="bg-muted rounded-xl p-6">
                <p className="text-lg font-semibold mb-2">{BRAND_DATA.typography.primaryFont}</p>
                <p className="text-sm text-muted-foreground font-['Inter']">
                  ABCDEFGHIJKLMNOPQRSTUVWXYZ
                </p>
                <p className="text-sm text-muted-foreground font-['Inter']">
                  abcdefghijklmnopqrstuvwxyz
                </p>
                <p className="text-sm text-muted-foreground font-['Inter']">0123456789</p>
              </div>
            </div>

            {/* Type Scale */}
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-3">Type Scale</h3>
              <div className="bg-muted rounded-xl p-4">
                {BRAND_DATA.typography.typeScale.map((scale, idx) => (
                  <div
                    key={scale.level}
                    className={cn(
                      'flex items-baseline gap-4 py-3',
                      idx < BRAND_DATA.typography.typeScale.length - 1 && 'border-b'
                    )}
                  >
                    <div className="w-12 text-sm font-medium text-muted-foreground">
                      {scale.level}
                    </div>
                    <div
                      className="flex-1 font-['Inter']"
                      style={{
                        fontSize: scale.size,
                        fontWeight:
                          scale.weight === 'Semibold'
                            ? 600
                            : scale.weight === 'Medium'
                            ? 500
                            : 400,
                      }}
                    >
                      {scale.example}
                    </div>
                    <div className="w-16 text-xs text-muted-foreground text-right">
                      {scale.size}
                    </div>
                    <div className="w-20 text-xs text-muted-foreground text-right">
                      {scale.weight}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Guidelines */}
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-2">Guidelines</h3>
              <ul className="space-y-1">
                {BRAND_DATA.typography.guidelines.map((guideline, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="mt-1">•</span>
                    <span>{guideline}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>

        {/* Section 4: Tone of Voice */}
        <div ref={toneRef} id="tone">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Mic className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Tone of Voice</h2>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopyAll('Tone of Voice')}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>
            </div>

            {/* Brand Personality */}
            <div>
              <h3 className="text-sm font-medium mb-3">Brand Personality</h3>
              <div className="grid grid-cols-4 gap-3">
                {BRAND_DATA.toneOfVoice.personality.map((item) => (
                  <div key={item.trait} className="bg-muted rounded-xl p-4 text-center">
                    <p className="text-sm font-medium mb-2">{item.trait}</p>
                    <div className="flex items-center justify-center gap-1">
                      {[1, 2, 3, 4, 5].map((dot) => (
                        <div
                          key={dot}
                          className={cn(
                            'w-2 h-2 rounded-full',
                            dot <= item.strength
                              ? 'bg-primary'
                              : 'bg-muted-foreground/30'
                          )}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Voice Characteristics */}
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-3">Voice Characteristics</h3>
              <div className="bg-muted rounded-xl overflow-hidden">
                {/* Header */}
                <div className="grid grid-cols-2">
                  <div className="bg-green-100 dark:bg-green-900/30 p-3 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <span className="text-sm font-medium">We are</span>
                  </div>
                  <div className="bg-red-100 dark:bg-red-900/30 p-3 flex items-center gap-2">
                    <X className="h-4 w-4 text-red-600 dark:text-red-400" />
                    <span className="text-sm font-medium">We are not</span>
                  </div>
                </div>
                {/* Body */}
                {BRAND_DATA.toneOfVoice.characteristics.weAre.map((item, idx) => (
                  <div key={idx} className="grid grid-cols-2 border-t">
                    <div className="p-3 text-sm">{item}</div>
                    <div className="p-3 text-sm text-muted-foreground border-l">
                      {BRAND_DATA.toneOfVoice.characteristics.weAreNot[idx]}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Writing Guidelines */}
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-3">Writing Guidelines</h3>
              <ul className="space-y-1">
                {BRAND_DATA.toneOfVoice.writingGuidelines.map((guideline, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="mt-1">•</span>
                    <span>{guideline}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Example Phrases */}
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-3">Example Phrases</h3>
              <div className="bg-muted rounded-xl overflow-hidden">
                {/* Do's */}
                {BRAND_DATA.toneOfVoice.examplePhrases.dos.map((phrase, idx) => (
                  <div
                    key={`do-${idx}`}
                    className="p-3 border-b flex items-center gap-2"
                  >
                    <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                    <span className="text-sm">\"{phrase}\"</span>
                  </div>
                ))}
                {/* Divider */}
                <div className="border-t-2" />
                {/* Don'ts */}
                {BRAND_DATA.toneOfVoice.examplePhrases.donts.map((phrase, idx) => (
                  <div
                    key={`dont-${idx}`}
                    className={cn(
                      'p-3 flex items-center gap-2',
                      idx < BRAND_DATA.toneOfVoice.examplePhrases.donts.length - 1 && 'border-b'
                    )}
                  >
                    <X className="h-4 w-4 text-red-600 dark:text-red-400 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">\"{phrase}\"</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Section 5: Imagery */}
        <div ref={imageryRef} id="imagery">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Imagery Guidelines</h2>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>
            </div>

            {/* Photography Style */}
            <div>
              <h3 className="text-sm font-medium mb-3">Photography Style</h3>
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((idx) => (
                  <div
                    key={idx}
                    className="bg-muted rounded-xl aspect-video flex flex-col items-center justify-center gap-2"
                  >
                    <ImageIcon className="h-8 w-8 text-muted-foreground/50" />
                    <span className="text-sm text-muted-foreground">Example {idx}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Photography Guidelines */}
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-3">Photography Guidelines</h3>
              <ul className="space-y-1">
                {BRAND_DATA.imagery.photographyGuidelines.map((guideline, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="mt-1">•</span>
                    <span>{guideline}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Illustration Style */}
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-3">Illustration Style</h3>
              <ul className="space-y-1">
                {BRAND_DATA.imagery.illustrationStyle.map((guideline, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="mt-1">•</span>
                    <span>{guideline}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Image Don'ts */}
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-3">Image Don'ts</h3>
              <div className="grid grid-cols-4 gap-3">
                {BRAND_DATA.imagery.imageDonts.map((item) => (
                  <div
                    key={item.label}
                    className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 text-center"
                  >
                    <X className="h-5 w-5 text-red-500 dark:text-red-400 mx-auto mb-2" />
                    <p className="text-sm font-medium text-red-700 dark:text-red-400">
                      ❌ {item.label}
                    </p>
                    <p className="text-xs text-red-600 dark:text-red-500 mt-1">{item.sublabel}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Sticky Save Bar */}
      {hasChanges && (
        <div className="fixed bottom-4 left-0 right-0 z-30 pointer-events-none">
          <div className="max-w-4xl mx-auto px-6 pointer-events-auto">
            <div
              className={cn(
                'rounded-xl p-4 flex items-center justify-between shadow-lg',
                isSaved
                  ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800'
                  : 'bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800'
              )}
            >
              <div className="flex items-center gap-2">
                {isSaved ? (
                  <>
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <span className="text-sm font-medium text-green-800 dark:text-green-200">
                      ✓ Saved to Knowledge
                    </span>
                  </>
                ) : (
                  <>
                    <Lightbulb className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    <span className="text-sm">
                      This styleguide is used for AI content generation
                    </span>
                  </>
                )}
              </div>
              {!isSaved && (
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={handleDiscard}>
                    Discard
                  </Button>
                  <Button size="sm" onClick={handleSaveChanges}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Analyzing Modal */}
      <AnalyzingModal
        isOpen={showAnalyzingModal}
        onClose={() => setShowAnalyzingModal(false)}
        onComplete={() => {
          setShowAnalyzingModal(false);
          toast.success('Analysis complete!');
        }}
        analysisType="brandstyle"
        inputType="url"
        source="brandshift.ai"
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
        'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
        active
          ? 'bg-primary/10 text-primary'
          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
      )}
    >
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4" />
        {label}
      </div>
    </button>
  );
}

function ColorSwatchCard({
  color,
  onClick,
}: {
  color: ColorSwatch;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-xl overflow-hidden border cursor-pointer hover:ring-2 hover:ring-primary transition-all text-left"
    >
      <div className="h-20 w-full" style={{ backgroundColor: color.hex }} />
      <div className="p-3 bg-background">
        <p className="text-sm font-medium">{color.name}</p>
        <p className="text-xs font-mono text-muted-foreground">{color.hex}</p>
      </div>
    </button>
  );
}