import React, { useState } from 'react';
import { useWhiteLabel } from '../../contexts';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import { FileDown, Loader2, CheckCircle2, FileText, Palette, Layout, Settings2 } from 'lucide-react';
import { PDFExportSettings } from '../../types/white-label';

interface PDFExportModalProps {
  open: boolean;
  onClose: () => void;
  strategyName: string;
  strategyData: any;
}

export function PDFExportModal({ open, onClose, strategyName, strategyData }: PDFExportModalProps) {
  const { defaultPDFSettings, agencySettings, clients } = useWhiteLabel();
  const [settings, setSettings] = useState<PDFExportSettings>(defaultPDFSettings);
  const [selectedClient, setSelectedClient] = useState<string>('');
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    
    // Simulate PDF generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real implementation, this would call a PDF generation service
    console.log('Exporting PDF with settings:', settings);
    console.log('Strategy data:', strategyData);
    console.log('Agency settings:', agencySettings);
    console.log('Selected client:', selectedClient);
    
    setIsExporting(false);
    setExportComplete(true);
    
    // Auto close after 2 seconds
    setTimeout(() => {
      setExportComplete(false);
      onClose();
    }, 2000);
  };

  const updateSetting = <K extends keyof PDFExportSettings>(key: K, value: PDFExportSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileDown className="h-5 w-5" />
            Export as PDF
          </DialogTitle>
          <DialogDescription>
            Customize your PDF export settings for "{strategyName}"
          </DialogDescription>
        </DialogHeader>

        {exportComplete ? (
          <div className="py-12 text-center space-y-4">
            <CheckCircle2 className="h-16 w-16 mx-auto text-green-500" />
            <div>
              <h3 className="text-lg font-semibold mb-2">Export Complete!</h3>
              <p className="text-sm text-muted-foreground">Your PDF has been downloaded</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Template Selection */}
            <Card className="p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Layout className="h-4 w-4" />
                <Label>PDF Template</Label>
              </div>
              <RadioGroup 
                value={settings.template} 
                onValueChange={(value) => updateSetting('template', value as any)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="professional" id="professional" />
                  <Label htmlFor="professional" className="cursor-pointer">
                    Professional - Executive-ready format with full branding
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="minimal" id="minimal" />
                  <Label htmlFor="minimal" className="cursor-pointer">
                    Minimal - Clean and focused on content
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="branded" id="branded" />
                  <Label htmlFor="branded" className="cursor-pointer">
                    Branded - Highlights agency branding prominently
                  </Label>
                </div>
              </RadioGroup>
            </Card>

            {/* Client Selection */}
            {clients.length > 0 && (
              <Card className="p-4 space-y-3">
                <Label>Client (Optional)</Label>
                <Select value={selectedClient} onValueChange={setSelectedClient}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a client" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">None</SelectItem>
                    {clients.map(client => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Include client branding in the PDF
                </p>
              </Card>
            )}

            {/* Branding Options */}
            <Card className="p-4 space-y-4">
              <div className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                <Label>Branding</Label>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Include Agency Branding</Label>
                    <p className="text-xs text-muted-foreground">
                      Add your agency logo and colors
                    </p>
                  </div>
                  <Switch
                    checked={settings.includeAgencyBranding}
                    onCheckedChange={(checked) => updateSetting('includeAgencyBranding', checked)}
                  />
                </div>

                {selectedClient && (
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Include Client Branding</Label>
                      <p className="text-xs text-muted-foreground">
                        Add client logo and brand colors
                      </p>
                    </div>
                    <Switch
                      checked={settings.includeClientBranding}
                      onCheckedChange={(checked) => updateSetting('includeClientBranding', checked)}
                    />
                  </div>
                )}
              </div>
            </Card>

            {/* Content Options */}
            <Card className="p-4 space-y-4">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <Label>Content Options</Label>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Cover Page</Label>
                  <Switch
                    checked={settings.includeCoverPage}
                    onCheckedChange={(checked) => updateSetting('includeCoverPage', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label>Table of Contents</Label>
                  <Switch
                    checked={settings.includeTableOfContents}
                    onCheckedChange={(checked) => updateSetting('includeTableOfContents', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label>Executive Summary</Label>
                  <Switch
                    checked={settings.includeExecutiveSummary}
                    onCheckedChange={(checked) => updateSetting('includeExecutiveSummary', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label>Page Numbering</Label>
                  <Switch
                    checked={settings.pageNumbering}
                    onCheckedChange={(checked) => updateSetting('pageNumbering', checked)}
                  />
                </div>
              </div>
            </Card>

            {/* Advanced Options */}
            <Card className="p-4 space-y-4">
              <div className="flex items-center gap-2">
                <Settings2 className="h-4 w-4" />
                <Label>Advanced Options</Label>
              </div>

              <div className="space-y-3">
                <div className="grid gap-2">
                  <Label>Color Scheme</Label>
                  <RadioGroup 
                    value={settings.colorScheme} 
                    onValueChange={(value) => updateSetting('colorScheme', value as any)}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="color" id="color" />
                      <Label htmlFor="color" className="cursor-pointer">Color</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="grayscale" id="grayscale" />
                      <Label htmlFor="grayscale" className="cursor-pointer">Grayscale</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="watermark">Watermark (Optional)</Label>
                  <Input
                    id="watermark"
                    placeholder="e.g., CONFIDENTIAL"
                    value={settings.watermark || ''}
                    onChange={(e) => updateSetting('watermark', e.target.value || undefined)}
                  />
                </div>
              </div>
            </Card>

            {/* Export Button */}
            <div className="flex justify-end gap-2 pt-4 border-t border-border">
              <Button variant="outline" onClick={onClose} disabled={isExporting}>
                Cancel
              </Button>
              <Button onClick={handleExport} disabled={isExporting} className="gap-2 min-w-[140px]">
                {isExporting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <FileDown className="h-4 w-4" />
                    Export PDF
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
