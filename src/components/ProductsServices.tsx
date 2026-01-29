import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { PageHeader } from './ui/PageHeader';
import { Flex } from './ui/Flex';
import { Stack } from './ui/Stack';
import { EmptyState } from './EmptyState';
import { SimpleEmptyState } from './ui/SimpleEmptyState';
import {
  Package,
  Plus,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  Users,
  Target,
  Smartphone,
  Zap,
  Globe
} from 'lucide-react';
import { useProducts } from '../contexts';

interface ProductsServicesProps {
  onNavigate?: (section: string, productId?: string) => void;
}

export function ProductsServices({ onNavigate }: ProductsServicesProps) {
  const { products } = useProducts();

  const getIcon = (category: string) => {
    switch (category) {
      case 'Software': return Package;
      case 'Mobile': return Smartphone;
      case 'Consulting': return Zap;
      case 'Transformation': return Globe;
      default: return Package;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-[#1FD1B2]/10 text-[#1FD1B2] border-[#1FD1B2]/30';
      case 'beta': return 'bg-[#5252E3]/10 text-[#5252E3] border-[#5252E3]/30';
      case 'deprecated': return 'bg-[#FF6B48]/10 text-[#FF6B48] border-[#FF6B48]/30';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getTypeColor = (type: string) => {
    return type === 'Product' 
      ? 'bg-[#5252E3]/10 text-[#5252E3] border-[#5252E3]/30'
      : 'bg-[#FECFBD]/40 text-[#FF6B48] border-[#FECFBD]';
  };

  return (
    <div className="h-full overflow-auto">
      {/* Header - Using master component */}
      <PageHeader
        icon={Package}
        iconGradient="primary"
        title="Products & Services"
        subtitle="Manage your product catalog and service offerings"
        actions={
          <Button 
            size="lg" 
            className="gap-2"
            onClick={() => onNavigate?.('product-analyzer')}
          >
            <Plus className="h-5 w-5" />
            Add Product/Service
          </Button>
        }
      />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        {products.length === 0 ? (
          <SimpleEmptyState
            icon={Package}
            title="No products or services yet"
            description="Add your first product or service to get started with your catalog."
            action={{
              label: 'Add Product/Service',
              onClick: () => onNavigate?.('product-analyzer')
            }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((product) => {
              const Icon = getIcon(product.category);
              const pricingDisplay = product.pricing?.amount || product.pricing?.model || 'Custom';
              
              return (
                <Card 
                  key={product.id} 
                  className="rounded-xl border-border/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer group"
                  onClick={() => onNavigate?.('product-detail', product.id)}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0 group-hover:from-primary/30 group-hover:to-primary/20 transition-colors">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0 space-y-1">
                          <CardTitle className="text-lg truncate group-hover:text-primary transition-colors">
                            {product.name}
                          </CardTitle>
                          <CardDescription>
                            {product.category} • {pricingDisplay}
                          </CardDescription>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {product.description}
                      </p>
                      {product.features && product.features.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Key Features:</h4>
                          <div className="flex flex-wrap gap-1.5">
                            {product.features.slice(0, 4).map((feature, index) => (
                              <Badge key={index} variant="outline" className="text-xs rounded-md">
                                {feature}
                              </Badge>
                            ))}
                            {product.features.length > 4 && (
                              <Badge variant="outline" className="text-xs rounded-md bg-muted">
                                +{product.features.length - 4} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}