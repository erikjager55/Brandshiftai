/**
 * Products & Services Overview Page
 * Shows all products and services in a grid with proper layout
 */

import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Package,
  Plus,
  ChevronRight,
  Smartphone,
  Zap,
  Globe,
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  pricing: string;
  description: string;
  features: string[];
  icon?: string;
}

interface ProductsServicesOverviewProps {
  onNavigate: (page: 'analyzer' | 'detail', productId?: string) => void;
}

// Sample products for demo
const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Digital Platform Suite',
    category: 'Software',
    pricing: 'Enterprise',
    description:
      'Comprehensive digital platform solution with AI-powered analytics, user management, and custom integrations for enterprise clients.',
    features: [
      'AI-powered Analytics',
      'Custom API Integration',
      'Advanced User Management',
      'Real-time Data Processing',
      'Cloud Infrastructure',
    ],
    icon: 'software',
  },
  {
    id: '2',
    name: 'Brand Strategy Consulting',
    category: 'Consulting',
    pricing: 'Custom',
    description:
      'Strategic brand development and positioning services for companies looking to strengthen their market presence and brand identity.',
    features: [
      'Brand Positioning',
      'Market Analysis',
      'Competitive Research',
      'Strategy Workshop',
    ],
    icon: 'consulting',
  },
  {
    id: '3',
    name: 'Mobile App Framework',
    category: 'Mobile',
    pricing: '€149/month',
    description:
      'Ready-to-use mobile app framework with built-in authentication, push notifications, and cloud sync capabilities.',
    features: [
      'Cross-platform Support',
      'Push Notifications',
      'Cloud Sync',
      'Offline Mode',
      'Analytics Dashboard',
    ],
    icon: 'mobile',
  },
];

export function ProductsServicesOverview({ onNavigate }: ProductsServicesOverviewProps) {
  const products = SAMPLE_PRODUCTS;

  const getIcon = (iconType?: string) => {
    switch (iconType) {
      case 'software':
        return Package;
      case 'mobile':
        return Smartphone;
      case 'consulting':
        return Zap;
      default:
        return Package;
    }
  };

  return (
    <div className="flex-1 overflow-auto bg-background">
      {/* Header */}
      <div className="border-b bg-background">
        <div className="max-w-7xl mx-auto px-6 py-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <span>Dashboard</span>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Products & Services</span>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-primary/10 dark:bg-primary/20">
              <Package className="h-8 w-8 text-primary" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-semibold">Products & Services</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Manage your product catalog and service offerings
              </p>
            </div>
            <Button onClick={() => onNavigate('analyzer')} className="rounded-xl">
              <Plus className="h-4 w-4 mr-2" />
              Add Product/Service
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {products.length === 0 ? (
          /* Empty State */
          <Card className="rounded-xl p-12">
            <div className="flex flex-col items-center text-center max-w-md mx-auto">
              <div className="p-4 rounded-xl bg-muted mb-4">
                <Package className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No products yet</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Add your first product or service to get started. This information helps AI generate
                better content.
              </p>
              <Button onClick={() => onNavigate('analyzer')} className="rounded-xl">
                <Plus className="h-4 w-4 mr-2" />
                Add Product/Service
              </Button>
            </div>
          </Card>
        ) : (
          /* Products Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((product) => {
              const Icon = getIcon(product.icon);
              const visibleFeatures = product.features.slice(0, 2);
              const remainingCount = product.features.length - 2;

              return (
                <Card
                  key={product.id}
                  className="rounded-xl border p-6 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => onNavigate('detail', product.id)}
                >
                  {/* Header Row */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3 flex-1">
                      {/* Icon */}
                      <div className="p-2.5 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      {/* Title & Category */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {product.category} • {product.pricing}
                        </p>
                      </div>
                    </div>
                    {/* Arrow */}
                    <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0 ml-2" />
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Key Features */}
                  <div className="mt-4">
                    <p className="text-sm font-medium mb-2">Key Features</p>
                    <div className="inline-flex flex-wrap gap-2">
                      {visibleFeatures.map((feature, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="bg-muted px-3 py-1 rounded-full text-xs font-normal"
                        >
                          {feature}
                        </Badge>
                      ))}
                      {remainingCount > 0 && (
                        <span className="text-xs text-muted-foreground self-center">
                          +{remainingCount} more
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
