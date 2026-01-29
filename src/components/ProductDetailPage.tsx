/**
 * Product Detail Page
 * Show all extracted/entered product information
 */

import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Package,
  ArrowLeft,
  Edit,
  FileText,
  DollarSign,
  CheckCircle2,
  Users,
  Lightbulb,
  Plus,
} from 'lucide-react';

interface ProductDetailPageProps {
  productId: string;
  onBack: () => void;
  onEdit?: () => void;
}

// Mock product data
const MOCK_PRODUCT = {
  id: '1',
  name: 'Digital Platform Suite',
  category: 'Software',
  source: 'Manual Entry',
  status: 'Analyzed',
  description:
    'Comprehensive digital platform solution with AI-powered analytics, user management, and custom integrations for enterprise clients. Built on modern cloud infrastructure with real-time data processing capabilities.',
  pricing: {
    model: 'Enterprise',
    details: 'Custom pricing based on usage and features',
  },
  features: [
    'AI-powered Analytics Dashboard',
    'Custom API Integrations',
    'Advanced User Management',
    'Real-time Data Processing',
    'Cloud-based Infrastructure',
  ],
  benefits: [
    'Reduce operational costs by 40%',
    'Increase team productivity',
    'Make data-driven decisions faster',
    'Scalable for growth',
  ],
  useCases: [
    'Enterprise Resource Planning',
    'Customer Data Management',
    'Business Intelligence & Reporting',
    'Team Collaboration',
  ],
  personas: [],
};

export function ProductDetailPage({ productId, onBack, onEdit }: ProductDetailPageProps) {
  const product = MOCK_PRODUCT;

  return (
    <div className="flex-1 overflow-auto bg-background">
      {/* Header */}
      <div className="border-b bg-background sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-6 py-6">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-primary/10 dark:bg-primary/20">
                <Package className="h-12 w-12 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-semibold">{product.name}</h1>
                <p className="text-sm text-muted-foreground mt-1">{product.category}</p>
              </div>
            </div>
            <Button variant="outline" onClick={onEdit} className="rounded-xl">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>

          {/* Status Bar */}
          <div className="bg-muted/50 rounded-xl p-4 mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Source:</span>
              <span className="text-sm font-medium">{product.source}</span>
            </div>
            <Badge className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full px-3 py-1 border-0">
              {product.status}
            </Badge>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-4xl mx-auto px-6 py-6 space-y-6">
        {/* Row 1: Description + Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Description */}
          <Card className="rounded-xl border p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Description</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
          </Card>

          {/* Pricing Model */}
          <Card className="rounded-xl border p-6">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Pricing Model</h2>
            </div>
            <div className="space-y-2">
              <div>
                <p className="text-xs text-muted-foreground">Model</p>
                <p className="text-sm font-medium">{product.pricing.model}</p>
              </div>
              {product.pricing.details && (
                <div>
                  <p className="text-xs text-muted-foreground mt-3">Details</p>
                  <p className="text-sm text-muted-foreground">{product.pricing.details}</p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Row 2: Features */}
        <Card className="rounded-xl border p-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Features & Specifications</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {product.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Row 3: Benefits */}
        <Card className="rounded-xl border p-6">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Benefits & Advantages</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.benefits.map((benefit, idx) => (
              <Card key={idx} className="rounded-xl border p-4 bg-muted/30">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium flex-shrink-0">
                    {idx + 1}
                  </div>
                  <p className="text-sm">{benefit}</p>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        {/* Row 4: Target Audience + Use Cases */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Target Audience */}
          <Card className="rounded-xl border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">Target Audience</h2>
              </div>
              <Button variant="outline" size="sm" className="rounded-xl">
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>

            {product.personas.length === 0 ? (
              <Card className="rounded-xl border p-6 bg-muted/50">
                <div className="flex flex-col items-center text-center">
                  <Users className="h-12 w-12 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-3">No personas linked yet</p>
                  <Button variant="outline" size="sm" className="rounded-xl">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Persona
                  </Button>
                </div>
              </Card>
            ) : (
              <div className="space-y-2">
                {product.personas.map((persona: any, idx: number) => (
                  <div key={idx} className="p-3 rounded-lg bg-muted flex items-center gap-3">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{persona.name}</span>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Use Cases */}
          <Card className="rounded-xl border p-6">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Use Cases & Applications</h2>
            </div>
            <div className="space-y-3">
              {product.useCases.map((useCase, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium flex-shrink-0">
                    {idx + 1}
                  </div>
                  <p className="text-sm">{useCase}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
